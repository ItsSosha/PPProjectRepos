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

    public async Task<bool> AddReview(Review review, long id)
    {
        Item item = await _db.Items.FirstOrDefaultAsync(x => x.Id == id);

        if (item != null)
        {
            item.Reviews.Add(review);
            await _db.SaveChangesAsync();

            return true;
        }

        return false;
    }

    public async Task<bool> AddToItems(long rawItemId)
    {
        if (_db.Items.All(x => x.RawItemId != rawItemId))
        {
            RawItem rawItem = await _db.RawItems.FindAsync(rawItemId);

            Item item = new Item()
            {
                RawItem = rawItem,
                RawItemId = rawItemId,
            };

            _db.Items.Add(item);
            _db.SaveChangesAsync();
            return true;
        }

        return false;
    }

    public async Task<ResultPage<Item>> GetAll(int offset, int limit)
    {
        return await GenericPaginator.Paginate(_db.Items
            .Include(i => i.RawItem)
            .ThenInclude(c => c.RawCategory), offset, limit);
    }

    public async Task<ResultPage<RawItem>> GetAllNotApproved(int offset, int limit)
    {
        return await GenericPaginator.Paginate(_db.RawItems
            .Where(ri => !_db.Items.Any(i => i.RawItemId == ri.Id)), offset, limit);
    }

    public async Task<IList<Item>> GetAllSale()
    {
        return await _db.Items
            .Include(i => i.RawItem)
            .ThenInclude(c => c.RawCategory)
            .Where(ri => ri.RawItem.IsOnSale == true)
            .Take(10)
            .ToListAsync();
    }

    public async Task<IList<Item>> GetAllNew()
    {
        var totalItems = await _db.Items.CountAsync();
        var startIndex = Math.Max(totalItems - 10, 0);

        return await _db.Items
            .Include(i => i.RawItem)
            .ThenInclude(c => c.RawCategory)
            .Skip(startIndex)
            .Take(10)
            .ToListAsync();
    }

    public async Task<IList<Item>> GetRecommended(Item item)
    {
        Random random = new Random();
        var itemsLength = _db.RawItems.Count();
        var startIndex = random.Next(itemsLength - 5);

        return await _db.Items
            .Include(ri => ri.RawItem)
            .Skip(startIndex)
            .Take(5)
            .Where(c => c.RawItem.RawCategory == item.RawItem.RawCategory)
            .ToListAsync();
        
        /*return await _db.Items
            .Include(ri => ri.RawItem)
            .ThenInclude(c => c.RawCategory)
            .ThenInclude(c => c.Category)
            .Skip(startIndex)
            .Take(5)
            .Where(c => c.RawItem.RawCategory.Category == item.RawItem.RawCategory.Category)
            .ToListAsync();*/
    }

    public async Task<Item?> GetByIdAsync(long id)
    {
        var item = _db.Items.FirstOrDefault(x => x.Id == id);
        if (item == null)
        {
            return null;
        }

        var rawItem = await _db.RawItems.FirstOrDefaultAsync(x => x.Id == item.RawItemId);
        var rawCategory = await _db.RawCategories.FirstOrDefaultAsync(x => x.Id == rawItem.RawCategoryId);
        //var category = await _db.Categories.FirstOrDefaultAsync(x => x.Id == rawCategory.Category.Id);
        var store = await _db.Stores.FirstOrDefaultAsync(x => x.Id == rawCategory.StoreId);

        //rawCategory.Category = category;
        rawCategory.Store = store;
        rawItem.RawCategory = rawCategory;

        var specifications = await _db.Specifications
            .Where(x => x.RawItemId == item.RawItem.Id)
            .Select(x => x)
            .ToListAsync();

        var reviews = await _db.Reviews
            .Where(x => x.ItemId == item.Id)
            .Select(x => x)
            .ToListAsync();

        rawItem.Specifications = specifications;
        item.RawItem = rawItem;
        item.Reviews = reviews;

        specifications.ForEach(x => x.RawItem = null);
        reviews.ForEach(x => x.Item = null);

        return item;
    }

    public async Task<RawItem?> GetRawItemById(long id)
    {
        var rawItem = await _db.RawItems.FindAsync(id);
        var rawCategory = await _db.RawCategories.FirstOrDefaultAsync(x => x.Id == rawItem.RawCategoryId);
        //var category = await _db.Categories.FirstOrDefaultAsync(x => x.Id == rawCategory.Category.Id);
        var store = await _db.Stores.FirstOrDefaultAsync(x => x.Id == rawCategory.StoreId);

        //rawCategory.Category = category;
        rawCategory.Store = store;
        rawItem.RawCategory = rawCategory;

        var specifications = await _db.Specifications
            .Where(x=> x.RawItemId == rawItem.Id)
            .Select(x => x)
            .ToListAsync();

        rawItem.Specifications = specifications;

        specifications.ForEach(x => x.RawItem = null);

        return rawItem;
    }

    public async Task<List<PriceHistory>> GetPriceHistory(long id)
    {
        Item item = _db.Items.Find(id);

        if (item != null)
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

    public async Task<ResultPage<Item>> GetItemsByCategory(string categoryName, int priceFrom, int priceTo, bool isOnSale, bool isFoxtrot, bool isRozetka, int offset, int limit)
    {
        /*var query = _db.Items
            .Include(i => i.RawItem)
            .ThenInclude(c => c.RawCategory)
            .ThenInclude(rc => rc.Category)
            .Include(i => i.RawItem)
            .ThenInclude(c => c.RawCategory)
            .ThenInclude(rc => rc.Store)
            .Where(c => c.RawItem.RawCategory.Category.Name == categoryName);*/
        
        var query = _db.Items
            .Include(i => i.RawItem)
            .ThenInclude(c => c.RawCategory)
            .ThenInclude(s => s.Store)
            .Where(c => c.RawItem.RawCategory.ParsedName == categoryName);

        if (priceFrom != 0)
        {
            query = query.Where(c => c.RawItem.RawPrice >= priceFrom);
        }

        if (priceTo != 0)
        {
            query = query.Where(c => c.RawItem.RawPrice <= priceTo);
        }

        if (isOnSale)
        {
            query = query.Where(c => c.RawItem.IsOnSale == true);
        }
        
        if (isRozetka && isFoxtrot)
        {
            query = query.Where(c => c.RawItem.RawCategory.Store.Name == "Foxtrot" ||  c.RawItem.RawCategory.Store.Name == "Rozetka");
        }
        
        else if (isFoxtrot)
        {
            query = query.Where(c => c.RawItem.RawCategory.Store.Name == "Foxtrot");
        }
        
        else if (isRozetka)
        {
            query = query.Where(c => c.RawItem.RawCategory.Store.Name == "Rozetka");
        }

        return await GenericPaginator.Paginate(query, offset, limit);
    }
    
    public async Task<ResultPage<Item>> GetItemsBySearch(string searchResult, int priceFrom, int priceTo, bool isOnSale, bool isFoxtrot, bool isRozetka, int offset, int limit)
    {
        /*var query = _db.Items
            .Include(i => i.RawItem)
            .ThenInclude(c => c.RawCategory)
            .ThenInclude(rc => rc.Category)
            .Include(i => i.RawItem)
            .ThenInclude(c => c.RawCategory)
            .ThenInclude(rc => rc.Store)
            .Where((c => c.RawItem.Name.ToLower().Contains(searchResult.ToLower()) || 
                        c.RawItem.Description.ToLower().Contains(searchResult.ToLower())));*/
        
        var query = _db.Items
            .Include(i => i.RawItem)
            .ThenInclude(c => c.RawCategory)
            .ThenInclude(s => s.Store)
            .Where((c => c.RawItem.Name.ToLower().Contains(searchResult.ToLower()) || 
                        c.RawItem.Description.ToLower().Contains(searchResult.ToLower())));

        if (priceFrom != 0)
        {
            query = query.Where(c => c.RawItem.RawPrice >= priceFrom);
        }

        if (priceTo != 0)
        {
            query = query.Where(c => c.RawItem.RawPrice <= priceTo);
        }

        if (isOnSale)
        {
            query = query.Where(c => c.RawItem.IsOnSale == true);
        }

        if (isRozetka && isFoxtrot)
        {
            query = query.Where(c => c.RawItem.RawCategory.Store.Name == "Foxtrot" ||  c.RawItem.RawCategory.Store.Name == "Rozetka");
        }
        else if (isFoxtrot)
        {
            query = query.Where(c => c.RawItem.RawCategory.Store.Name == "Foxtrot");
        }
        
        else if (isRozetka)
        {
            query = query.Where(c => c.RawItem.RawCategory.Store.Name == "Rozetka");
        }

        return await GenericPaginator.Paginate(query, offset, limit);
    }
}