using Core;

namespace DataLayer.Abstract;

public interface IUserRepository
{
    public Task<User?> GetOrRegisterUser(string jwt);
    Task<User?> GetById(long id);
    Task<bool> AddToFavourites(User user, Item item);
    Task<UserItem?> GetFavourite(User user, Item item);
    Task<bool> RemoveFromFavourites(User user, Item item);
    Task<IList<UserItem>> GetFavourites(User user);
    Task<ResultPage<UserItem>> GetFavouritesPaginated(User user, int offset, int limit);
    Task<bool> RemoveAllFromFavourites(User user);
}