﻿using Core;

namespace DataLayer.Abstract;

public interface IItemRepository
{
    public Task<bool> AddReview(Review review, long id);

    public Task<ResultPage<Item>> GetAll(int offset, int limit);
    
    public Task<IList<Item>> GetAllSale();
    
    public Task<IList<Item>> GetAllNew();
    
    public Task<IList<Item>> GetRecommended(Item item);
    
    public Task<Item> GetByIdAsync(long id);
    
    public Task<List<PriceHistory>> GetPriceHistory(long id);
    
    public Task<ResultPage<Item>> GetItemsByCategory(string categoryName, int priceFrom, int PriceTo, bool isOnSale, bool isFoxtrot, bool isRozetka, int offset, int limit);
    
    public Task<ResultPage<Item>> GetItemsBySearch(string searchResult, int priceFrom, int priceTo, bool isOnSale, bool isFoxtrot, bool isRozetka, int offset, int limit);
}
    