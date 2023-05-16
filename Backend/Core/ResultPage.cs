namespace Core;

public class ResultPage<T>
{
    public int Total { get; set; }
    public IList<T> Result { get; set; }
}