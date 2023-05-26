namespace Core;

public class Subscription : BaseEntity
{
    public User User { get; set; }
    public DateTime SubDate { get; set; }
    public DateTime ExpireDate { get; set; }
}