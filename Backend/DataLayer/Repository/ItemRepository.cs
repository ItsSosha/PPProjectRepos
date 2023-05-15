using System.Collections;
using Core;
using DataLayer.Abstract;
using Microsoft.EntityFrameworkCore;

namespace DataLayer.Repository;

public class ItemRepository : IItemRepository
{
    private readonly StoreContext _db;

    public ItemRepository(StoreContext db)
    {
        _db = db;
    }

    public async Task<bool> AddToFavourites(User user, long id)
    {
        Item item = await _db.Items.FirstOrDefaultAsync(x => x.Id == id);

        if (item != null && !user.Favourites.Any(x => x.Item.Id == id))
        {
            UserItem favourite = new UserItem()
            {
                User = user,
                Item = item,
            };

            user.Favourites.Add(favourite);
            await _db.SaveChangesAsync();

            return true;
        }

        return false;
    }
    
    public async Task<bool> RemoveFromFavourites(User user, long id)
    {
        UserItem favourite = user.Favourites.FirstOrDefault(x => x.Item.Id == id);

        if (favourite != null)
        {
            user.Favourites.Remove(favourite);
            await _db.SaveChangesAsync();

            return true;
        }

        return false;
    }
    
    // it can be implemented in reviewRepository ??
    public async Task<bool> AddReview(Review review, long id, String userId)
    {
        Item item = await _db.Items.FirstOrDefaultAsync(x => x.Id == id);
        User user = await _db.Users.FindAsync(userId);
        
        if (item != null)
        {
            review.User = user; // makes sense ? 

            item.Reviews.Add(review);
            await _db.SaveChangesAsync();

            return true;
        }

        return false;
    } 
    
    public async Task<List<Item>> GetAllAsync()
    {
        var items = await _db.Items.ToListAsync();
        var rawItems = await _db.RawItems.ToListAsync();
        var rawCategories = await _db.RawCategories.ToListAsync();
        var stores = await _db.Stores.ToListAsync();

        foreach (var item in items)
        {
            var rawItem = rawItems.FirstOrDefault(x => x.Id == item.RawItemId);
            var rawCategory = rawCategories.FirstOrDefault(x => x.Id == rawItem.RawCategoryId);
            
            //var store = stores.FirstOrDefault(x => x.Id == rawCategory.StoreId);
            //rawCategory.Store = store;
            
            rawItem.RawCategory = rawCategory;

            /*var specifications = await _db.Specifications
                .Where(x => x.RawItemId == item.RawItem.Id)
                .Select(x => x)
                .ToListAsync();*/
    
            /*var priceHistories = await _db.PriceHistories
                .Where(x => x.ItemId == item.Id)
                .Select(x => x)
                .ToListAsync();*/
    
            /*var reviews = await _db.Reviews
                .Where(x => x.ItemId == item.Id)
                .Select(x => x)
                .ToListAsync();*/

            //rawItem.Specifications = specifications;
            //item.PriceHistories = priceHistories;
            item.RawItem = rawItem;
            //item.Reviews = reviews;

            //specifications.ForEach(x => x.RawItem = null);
            //priceHistories.ForEach(x => x.Item = null);
            //reviews.ForEach(x => x.Item = null);
        }

        return items;
    }
    
    public async Task<Item> GetByIdAsync(long id)
    {
        var item = await _db.Items.FindAsync(id);
        if (item == null)
        {
            return null;
        }

        var rawItem = await _db.RawItems.FirstOrDefaultAsync(x => x.Id == item.RawItemId);
        var rawCategory = await _db.RawCategories.FirstOrDefaultAsync(x => x.Id == rawItem.RawCategoryId);
        var store = await _db.Stores.FirstOrDefaultAsync(x => x.Id == rawCategory.StoreId);

        rawCategory.Store = store;
        rawItem.RawCategory = rawCategory;

        var specifications = await _db.Specifications
            .Where(x => x.RawItemId == item.RawItem.Id)
            .Select(x => x)
            .ToListAsync();

        /*var priceHistories = await _db.PriceHistories
            .Where(x => x.ItemId == item.Id)
            .Select(x => x)
            .ToListAsync();*/

        var reviews = await _db.Reviews
            .Where(x => x.ItemId == item.Id)
            .Select(x => x)
            .ToListAsync();

        rawItem.Specifications = specifications;
        //item.PriceHistories = priceHistories;
        item.RawItem = rawItem;
        item.Reviews = reviews;

        specifications.ForEach(x => x.RawItem = null);
        //priceHistories.ForEach(x => x.Item = null);
        reviews.ForEach(x => x.Item = null);

        return item;
    }

    // ??
    public async void Delete(long id)
    {
        Item item = await _db.Items.FindAsync(id);

        if (item != null)
        {
            _db.Items.Remove(item);
            await _db.SaveChangesAsync();
        }
    }

    public async Task<List<PriceHistory>> GetPriceHistory(long id)
    {
        Item item = _db.Items.Find(id);

        if(item != null)
        {
            var priceHistories = await _db.PriceHistories
                .Where(x => x.ItemId == item.Id)
                .Select(x => x)
                .ToListAsync();
            
            priceHistories.ForEach(x => x.Item = null);
            return priceHistories;
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