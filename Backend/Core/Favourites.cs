namespace Core;

public class Favourites : BaseEntity
{
    public Item Item { get; set; }
    public User User { get; set; }
}