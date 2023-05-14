using Core;
using DataLayer.Abstract;

namespace DataLayer.Repository;

public class ItemRepository : IItemRepository
{
    private readonly StoreContext _db;

    public ItemRepository(StoreContext db)
    {
        _db = db;
    }

    public async void AddToFavourites(User user, long id)
    {
        Item item = await _db.Items.FindAsync(id);

        if (item != null)
        {
            UserItem favourite = new UserItem()
            {
                Item = item,
                User = user,
            };

            user.Favourites.Add(favourite);
            await _db.SaveChangesAsync();
        }
    }

    public async void RemoveFromFavourites(User user, long id)
    {
        Item item = await _db.Items.FindAsync(id);

        if(item != null)
        {
            UserItem favourite = new UserItem()
            {
                Item = item,
                User = user,
            };

            if (user.Favourites.Contains(favourite))
            {
                user.Favourites.Remove(favourite);
                await _db.SaveChangesAsync();
            }
        }
    }

    public async void AddReview(Review review, long id, User user)
    {
        Item item = await _db.Items.FindAsync(id);

        if(item != null)
        {
            review.User = user;

            item.Reviews.Add(review);
            await _db.SaveChangesAsync();
        }

    }

    public List<Item> GetAll()
    {
        List<Item> items = _db.Items.ToList();
        List<RawItem> rawItems = _db.RawItems.ToList();

        foreach (var item in items)
        {
            item.RawItem = rawItems.Find(x => x.Id == item.RawItemId);
        }

        return _db.Items.ToList();
    }

    public async Task<Item> GetById(long id)
    {
        Item item = await _db.Items.FindAsync(id);

        return item;
    }

    public async void Delete(long id)
    {
        Item item = await _db.Items.FindAsync(id);

        if (item != null)
        {
            _db.Items.Remove(item);
            await _db.SaveChangesAsync();
        }
    }

    public List<PriceHistory> GetPriceHistory(long id)
    {
        Item item = _db.Items.Find(id);

        if(item != null)
        {
            return item.PriceHistories.ToList();
        }
        return null;
    }

    public List<Specification> GetSpecifications(long id)
    {
        Item item = _db.Items.Find(id);
        RawItem rawItem = item.RawItem;

        if(item != null && rawItem != null)
        {
            return rawItem.Specifications.ToList();

        }

        return null;
    }
}