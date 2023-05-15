namespace Core;

public class User : BaseEntity
{
    public string Email { get; set; }
    public string FirstName { get; set; }
    public string Surname { get; set; }
    public string PictureLink { get; set; }
    public bool IsAdmin { get; set; }
    public IList<UserItem> Favourites { get; set; }
}