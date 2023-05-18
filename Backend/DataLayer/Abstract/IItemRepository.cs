using Core;

namespace DataLayer.Abstract;

public interface IItemRepository
{
    public Task<bool> AddReview(Review review, long id, User user);

    public Task<ResultPage<Item>> GetAll(int offset, int limit);
    
    public Task<IList<Item>> GetAllSale();
    
    public Task<IList<Item>> GetAllNew();
    
    public Task<IList<Item>> GetRecommended(Item item);
    
    public Task<Item> GetByIdAsync(long id);
    
    public Task<List<PriceHistory>> GetPriceHistory(long id);
}
    