namespace Core;

public class Item : BaseEntity
{
    public RawItem RawItem { get; set; }
    
    public long RawItemId { get; set; }
    public IList<Review> Reviews { get; set; }
    public IList<PriceHistory> PriceHistories { get; set; }
    
}

public class AddReviewDto
{
    public Review Review { get; set; }
    public User User { get; set; }
}