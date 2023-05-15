namespace Core;

public class PriceHistory : BaseEntity
{
    public Item Item { get; set; }
    
    public long ItemId { get; set; }
    public double Price { get; set; }
    public DateTime Date { get; set; }
}