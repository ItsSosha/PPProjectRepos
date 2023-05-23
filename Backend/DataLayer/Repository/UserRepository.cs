using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Core;
using DataLayer.Abstract;
using Google.Apis.Auth;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

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
            payload = await GetPayloadFromCustomJwt(jwt);
            if (payload == null)
            {
                return null;
            }
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
        
        return returnUser;
    }

    private async Task<GoogleJsonWebSignature.Payload?> GetPayloadFromCustomJwt(string jwt)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        try
        {
            var jwtToken = tokenHandler.ReadJwtToken(jwt);

            var claims = jwtToken.Claims;

            var payload = new GoogleJsonWebSignature.Payload
            {
                Email = claims.First(x => x.Type == "email").Value,
                GivenName = claims.First(x => x.Type == "given_name").Value,
                FamilyName = claims.First(x => x.Type == "family_name").Value,
                Picture = claims.First(x => x.Type == "picture").Value
            };

            return payload;
        }
        catch (Exception ex)
        {
            return null;
        }
    }
    
    
    public async Task<bool> AddToFavourites(User user, Item item)
    {
        if (user == null || item == null ||
            _db.UserItems
                .Any(x => x.UserId == user.Id && x.ItemId == item.Id))
        {
            return false;
        }

        UserItem favourite = new UserItem()
        {
            User = user,
            ItemId = item.Id,
        };
        
        
        _db.UserItems.Add(favourite);
        _db.Entry(item).State = EntityState.Unchanged;
        await _db.SaveChangesAsync();

        return true;
    }

    public async Task<UserItem?> GetFavourite(User user, Item item)
    {
        return await _db.UserItems
            .Include(ui => ui.Item)
                .ThenInclude(i => i.RawItem)
                    .ThenInclude(ri => ri.Specifications)
            .FirstOrDefaultAsync(x => x.UserId == user.Id && x.ItemId == item.Id);
    }
    
    public async Task<bool> RemoveFromFavourites(User user, Item item)
    {
        if (user == null || item == null ||
            !_db.UserItems
                .Any(x => x.UserId == user.Id && x.ItemId == item.Id))
        {
            return false;
        }
        
        _db.UserItems.Remove(_db.UserItems.First(x => user.Id == x.UserId && item.Id == x.ItemId));
        _db.Entry(item).State = EntityState.Unchanged;
        await _db.SaveChangesAsync();

        return true;
    }

    public async Task<IList<UserItem>> GetFavourites(User user)
    {
        if (user == null)
        {
            return new List<UserItem>();
        }
        
        return await _db.UserItems
            .Include(ui => ui.Item)
                .ThenInclude(i => i.RawItem)
                    .ThenInclude(ri => ri.Specifications)
            .Where(x => x.UserId == user.Id)
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
            .Include(ui => ui.Item)
                .ThenInclude(i => i.RawItem)
                    .ThenInclude(ri => ri.Specifications)
            .Where(x => x.UserId == user.Id), offset, limit);
    }
    
    public async Task<bool> RemoveAllFromFavourites(User user)
    {
        if (user == null ||
            !_db.UserItems
                .Any(x => x.UserId == user.Id))
        {
            return false;
        }
        
        
        _db.UserItems.RemoveRange(_db.UserItems.Where(x => x.UserId == user.Id));
        await _db.SaveChangesAsync();

        return true;
    }
    
    public async Task<bool> IsOnFavourites(User user, Item item)
    {
        return _db.UserItems.Any(x => x.ItemId == item.Id && x.UserId == user.Id);
    }

    public async Task<bool> SetNotificationToken(User user, string token)
    {
        if (token == null || user == null)
        {
            return false;
        }

        user.NotificationToken = token;

        _db.Users.Update(user);
        await _db.SaveChangesAsync();

        return true;
    }

    public async Task<Order?> CreateOrder(User? user)
    {
        if (user == null)
        {
            return null;
        }
    
        _db.Orders.Add(new Order
        {
            UserId = user.Id,
            Used = false
        });
        await _db.SaveChangesAsync();
    
        var order = await _db.Orders.OrderBy(x => x.Id).LastOrDefaultAsync(x => x.UserId == user.Id);
    
        return order;
    }

    public async Task<Order?> GetOrderById(long id)
    {
        return await _db.Orders.Include(x => x.User).FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<bool> UpdateOrder(Order order)
    {
        if (order == null)
        {
            return false;
        }
        
        _db.Orders.Update(order);
        await _db.SaveChangesAsync();
        return true;
    }
}