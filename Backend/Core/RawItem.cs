﻿namespace Core;

public class RawItem : BaseEntity
{
    public string Name { get; set; }
    public double RawPrice { get; set; }
    public double OldPrice { get; set; }
    public bool IsOnSale { get; set; }
    public string RawItemURL { get; set; }
    public RawCategory RawCategory { get; set; }
    public string Description { get; set; }
    public IList<Specification> Specifications { get; set; }
}