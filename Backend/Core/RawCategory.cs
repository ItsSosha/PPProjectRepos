namespace Core;

public class RawCategory : BaseEntity
{
    public string ParsedName { get; set; }
    public Store Store { get; set; }
    public Category? Category { get; set; }
    public string RawCategoryURL { get; set; }
}