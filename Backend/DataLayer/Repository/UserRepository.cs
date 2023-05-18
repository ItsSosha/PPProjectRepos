using Core;
using DataLayer.Abstract;
using Google.Apis.Auth;
using Microsoft.EntityFrameworkCore;

namespace DataLayer.Repository;

public class UserRepository : IUserRepository
{
    private readonly StoreContext _db;

    public UserRepository(StoreContext db)
    {
        _db = db;
    }

    public async Task<User?> GetById(long id)
    {
        var user = _db.Users.FirstOrDefault(x => x.Id == id);

        if (user == null)
        {
            return null;
        }
        
        user.Favourites = await _db.UserItems
            .Include(ui => ui.User)
            .Include(ui => ui.Item)
            .Where(x => x.User.Id == user.Id)
            .Select(x => new UserItem()
            {
                Id = x.Id,
                Item = x.Item
            })
            .ToListAsync();

        return user;
    }
    
    public async Task<User?> GetOrRegisterUser(string jwt)
    {
        GoogleJsonWebSignature.Payload payload;

        try
        {
            payload = await GoogleJsonWebSignature.ValidateAsync(jwt);
        }
        catch (InvalidJwtException ex)
        {
            return null;
        }

        if (!_db.Users.Any(x => x.Email == payload.Email))
        {
            var user = new User()
            {
                Email = payload.Email,
                IsAdmin = false,
                FirstName = payload.GivenName,
                Surname = payload.FamilyName,
                PictureLink = payload.Picture
            };

            _db.Users.Add(user);
            await _db.SaveChangesAsync();
        }
        
        var returnUser = _db.Users.First(x => x.Email == payload.Email);

        returnUser.Favourites = await _db.UserItems
            .Include(ui => ui.User)
            .Include(ui => ui.Item)
            .Where(x => x.User.Id == returnUser.Id)
            .Select(x => new UserItem()
            {
                Id = x.Id,
                Item = x.Item
            })
            .ToListAsync();

        return returnUser;
    }
    
    
    public async Task<bool> AddToFavourites(User user, Item item)
    {
        if (user == null || item == null ||
            _db.UserItems
            .Include(ui => ui.User)
            .Include(ui => ui.Item)
            .Any(x => x.User.Id == user.Id && x.Item.Id == item.Id))
        {
            return false;
        }

        UserItem favourite = new UserItem()
        {
            User = user,
            Item = item,
        };
        
        _db.UserItems.Add(favourite);
        await _db.SaveChangesAsync();
        user.Favourites = (await this.GetById(user.Id))!.Favourites;

        return true;
    }

    public async Task<UserItem?> GetFavourite(User user, Item item)
    {
        return await _db.UserItems
            .Include(ui => ui.User)
            .Include(ui => ui.Item)
            .FirstOrDefaultAsync(x => x.User.Id == user.Id && x.Item.Id == item.Id);
    }
    
    public async Task<bool> RemoveFromFavourites(User user, Item item)
    {
        if (user == null || item == null ||
            !_db.UserItems
                .Include(ui => ui.User)
                .Include(ui => ui.Item)
                .Any(x => x.User.Id == user.Id && x.Item.Id == item.Id))
        {
            return false;
        }

        var favourite = (await GetFavourite(user, item))!;

        _db.UserItems.Remove(favourite);
        await _db.SaveChangesAsync();
        user.Favourites = (await this.GetById(user.Id))!.Favourites;

        return true;
    }

    public async Task<IList<UserItem>> GetFavourites(User user)
    {
        if (user == null)
        {
            return new List<UserItem>();
        }
        
        return await _db.UserItems
            .Include(ui => ui.User)
            .Include(ui => ui.Item)
                .ThenInclude(i => i.RawItem)
            .Where(x => x.User.Id == user.Id)
            .ToListAsync();
    }

    public async Task<ResultPage<UserItem>> GetFavouritesPaginated(User user, int offset, int limit)
    {
        if (user == null)
        {
            return new ResultPage<UserItem>()
            {
                Total = 0,
                Result = new List<UserItem>()
            };
        }
        
        return await GenericPaginator.Paginate(_db.UserItems
            .Include(ui => ui.User)
            .Include(ui => ui.Item)
            .ThenInclude(i => i.RawItem)
            .Where(x => x.User.Id == user.Id), offset, limit);
    }
    
    public async Task<bool> RemoveAllFromFavourites(User user)
    {
        if (user == null ||
            !_db.UserItems
                .Include(ui => ui.User)
                .Include(ui => ui.Item)
                .Any(x => x.User.Id == user.Id))
        {
            return false;
        }
        
        
        _db.UserItems.RemoveRange(_db.UserItems.Include(ui => ui.User).Where(x => x.Id == user.Id));
        await _db.SaveChangesAsync();
        user.Favourites = (await this.GetById(user.Id))!.Favourites;

        return true;
    }
}