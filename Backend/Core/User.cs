namespace Core;

public class User : BaseEntity
{
    public string Email { get; set; }
    public string AuthKey { get; set; }
    public bool IsAdmin { get; set; }
    public IList<UserItem> Favourites { get; set; }
}