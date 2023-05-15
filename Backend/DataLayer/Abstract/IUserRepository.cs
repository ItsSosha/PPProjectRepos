using Core;

namespace DataLayer.Abstract;

public interface IUserRepository
{
    public Task<User?> GetOrRegisterUser(string jwt);
}