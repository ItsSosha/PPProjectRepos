using Core;

namespace DataLayer.Abstract;

public class CategoryRepository: ICategoryRepository
{
  public async Task<bool> BindRawCategoryAsync(long categoryId, string rawCategory);
  public async Task<ResultPage<Category>> GetAllCategories(int offset, int limit, string userId);
  public async Task<Category> GetCategoryById(int categoryId, string userId);
  public async Task<Category> CreateCategory(Category category, string userId);
  public async Task<bool> DeleteCategory(int categoryId, string userId);

}
