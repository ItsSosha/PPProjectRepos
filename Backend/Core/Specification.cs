namespace Core;

public class Specification : BaseEntity
{
    public long RawItemId { get; set; }
    public string Key { get; set; }
    public string Value { get; set; }
}