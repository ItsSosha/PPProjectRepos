namespace Core;

public class Order : BaseEntity
{
    public User User { get; set; }
    public long UserId { get; set; }
    public bool Used { get; set; }
}