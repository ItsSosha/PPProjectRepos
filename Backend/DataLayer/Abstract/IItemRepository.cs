using Core;

namespace DataLayer.Abstract;

public interface IItemRepository
{
    public Task<bool> AddReview(Review review, long id, String userId); // check, think makes sense,  do we need User???

    public Task<List<Item>> GetAllAsync();

    public Task<Item> GetByIdAsync(long id);

    public void Delete(long id); // in what way deleting m?

    public Task<List<PriceHistory>> GetPriceHistory(long id); // can't figure out what fields are required // seems clear

    public List<Specification> GetSpecifications(long id); //  can't figure out what fields are required // seems clear
}