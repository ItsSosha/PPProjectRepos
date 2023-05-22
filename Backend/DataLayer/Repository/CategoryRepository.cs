using Core;
using DataLayer.Abstract;
using Google.Apis.Auth;
using Microsoft.EntityFrameworkCore;

namespace DataLayer.Repository;

public class CategoryRepository: ICategoryRepository
{
    private readonly StoreContext _db;

    public CategoryRepository(StoreContext db)
    {
        _db = db;
    }
    
    public async Task<bool> BindRawCategoryAsync(long categoryId, long rawCategoryId)
    {
        var category = await _db.Categories.FindAsync(categoryId);
        var rawCategory = await _db.RawCategories.FindAsync(rawCategoryId);
        if (category == null || rawCategory == null)
            return false;

        // Сonnect `RawCategory` & `Category`
        rawCategory.Category = category;
        
        await _db.SaveChangesAsync();
        return true;
    }
    
    public async Task<IList<Category>?> GetAllCategories()
    {
        var categories = await _db.Categories.ToListAsync();
        return categories;
    }
    
    public async Task<IList<RawCategory>?> GetAllRawCategories()
    {
        var rawCategories = await _db.RawCategories
            .Include(x => x.Store)
            .Include(x => x.Category)
            .ToListAsync();
        return rawCategories;
    }

    public async Task<Category?> GetCategoryById(long categoryId)
    {
        var category = await _db.Categories.FindAsync(categoryId);
        return category;
    }

    public async Task<bool> CreateCategory(string categoryName, User user)
    {
        if (!user.IsAdmin)
        {
            return false;
        }

        var category = new Category()
        {
            Name = categoryName
        };

        _db.Categories.Add(category);
        await _db.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteCategory(long categoryId, User user)
    {
        if (!user.IsAdmin)
        {
            return false;
        }

        var category = await _db.Categories.FirstOrDefaultAsync(x => x.Id == categoryId);
        if (category == null)
        {
            return false;
        }

        _db.Categories.Remove(category);
        await _db.SaveChangesAsync();
        
        return true;
    }
}

    


