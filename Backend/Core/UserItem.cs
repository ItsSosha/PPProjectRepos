namespace Core;

public class UserItem : BaseEntity
{
    public Item Item { get; set; }
    public long ItemId { get; set; }
    public long UserId { get; set; }
    public User User { get; set; }
}