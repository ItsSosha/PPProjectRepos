namespace Core;

public class Specification : BaseEntity
{
    public RawItem RawItem { get; set; }
    public string Key { get; set; }
    public string Value { get; set; }
}