using Core;
using DataLayer.Abstract;
using Google.Apis.Auth;
using Microsoft.EntityFrameworkCore;

namespace DataLayer.Repository;

public class CategoryRepository: ICategoryRepository
{
    private readonly StoreContext _db;

    public CaregoryRepository(StoreContext db)
    {
        _db = db;
    }
    
    public async Task<bool> BindRawCategoryAsync(long categoryId, string rawCategory)
    {
        var category = await _db.Categories.FindAsync(categoryId);
        if (category == null)
            return false;

        // Сonnect `RawCategory` & `Category`
        category.RawCategory = rawCategory;

        await _db.SaveChangesAsync();
        return true;
    }
    
    public async Task<ResultPage<Category>> GetAllCategories(int offset, int limit, string userId)
    {
        if (!await IsAdmin(userId))
        {
            throw new UnauthorizedAccessException("Only administrators can access this method.");
        }

        var categories = _db.Categories;
        var resultPage = await GenericPaginator.Paginate(categories, offset, limit);
        return resultPage;
    }

    public async Task<Category> GetCategoryById(int categoryId, string userId)
    {
        if (!await IsAdmin(userId))
        {
            throw new UnauthorizedAccessException("Only administrators can access this method.");
        }

        var category = await _db.Categories.FindAsync(categoryId);
        return category;
    }

    public async Task<Category> CreateCategory(Category category, string userId)
    {
        if (!await IsAdmin(userId))
        {
            throw new UnauthorizedAccessException("Only administrators can access this method.");
        }

        _db.Categories.Add(category);
        await _db.SaveChangesAsync();
        return category;
    }

    public async Task<bool> DeleteCategory(int categoryId, string userId)
    {
        if (!await IsAdmin(userId))
        {
            throw new UnauthorizedAccessException("Only administrators can access this method.");
        }

        var category = await _db.Categories.FindAsync(categoryId);
        if (category == null)
        {
            return false;
        }

        _db.Categories.Remove(category);
        await _db.SaveChangesAsync();
        return true;
    }

    public async Task<bool> IsAdmin(string userId)
    {
        var user = await _db.Users.FindAsync(userId);
        return user != null && user.Admin;
    }
}

    


