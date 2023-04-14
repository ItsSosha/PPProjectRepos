namespace Core;

public class Item : BaseEntity
{
    public RawItem RawItem { get; set; }
    public IList<Review> Reviews { get; set; }
    public IList<PriceHistory> PriceHistories { get; set; }
    
}