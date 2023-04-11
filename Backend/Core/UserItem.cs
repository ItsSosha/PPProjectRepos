namespace Core;

public class UserItem : BaseEntity
{
    public Item Item { get; set; }
    public User User { get; set; }
}