using Core;

namespace DataLayer.Abstract;

public interface ICategoryRepository
{
  public Task<bool> BindRawCategoryAsync(long categoryId, long rawCategoryId);
  public Task<IList<Category>?> GetAllCategories();
  public Task<Category?> GetCategoryById(int categoryId);
  public Task<bool> CreateCategory(string categoryName, User user);
  public Task<bool> DeleteCategory(int categoryId, User user);

}
