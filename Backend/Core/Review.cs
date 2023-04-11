namespace Core;

public class Review : BaseEntity
{
    public int Grade { get; set; }
    public Item Item { get; set; }
    public string? ReviewText { get; set; }
}