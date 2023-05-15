using Core;
using DataLayer.Abstract;
using Google.Apis.Auth;

namespace DataLayer.Repository;

public class UserRepository : IUserRepository
{
    private readonly StoreContext _db;

    public UserRepository(StoreContext db)
    {
        _db = db;
    }

    public async Task<User?> GetOrRegisterUser(string jwt)
    {
        GoogleJsonWebSignature.Payload payload;

        try
        {
            payload = await GoogleJsonWebSignature.ValidateAsync(jwt);
        }
        catch (InvalidJwtException ex)
        {
            return null;
        }

        if (!_db.Users.Any(x => x.Email == payload.Email))
        {
            var user = new User()
            {
                Email = payload.Email,
                IsAdmin = false,
                FirstName = payload.GivenName,
                Surname = payload.FamilyName,
                PictureLink = payload.Picture
            };

            await _db.Users.AddAsync(user);
        }
        
        return _db.Users.FirstOrDefault(x => x.Email == payload.Email);
    }
}