using Core;

namespace DataLayer.Abstract;

public interface ICategoryRepository
{
  public Task<bool> BindRawCategoryAsync(long categoryId, long rawCategoryId);
  public Task<IList<Category>?> GetAllCategories();
  public Task<IList<RawCategory>?> GetAllRawCategories();
  public Task<Category?> GetCategoryById(long categoryId);
  public Task<bool> CreateCategory(string categoryName, User user);
  public Task<bool> DeleteCategory(long categoryId, User user);

}
