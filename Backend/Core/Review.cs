namespace Core;

public class Review : BaseEntity
{
    public int Grade { get; set; }
    public Item Item { get; set; }
    
    public long ItemId { get; set; }
    public User User { get; set; }
    public long UserId { get; set; }
    public string? ReviewText { get; set; }
}