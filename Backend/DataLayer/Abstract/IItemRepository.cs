using Core;

namespace DataLayer.Abstract;

public interface IItemRepository
{
    public void AddToFavourites(User user, long id); // makes sense now

    public void RemoveFromFavourites(User user, long id); // that's method by clicking a star

    public void AddReview(Review review, long id, User user); // check, think makes sense,  do we need User???

    public List<Item> GetAll();

    public Task<Item> GetById(long id);

    public void Delete(long id); // in what way deleting m?

    public List<PriceHistory> GetPriceHistory(long id); // can't figure out what fields are required // seems clear

    public List<Specification> GetSpecifications(long id); //  can't figure out what fields are required // seems clear
}