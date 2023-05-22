using Core;
using DataLayer.Abstract;
using Google.Apis.Auth;
using Microsoft.EntityFrameworkCore;

namespace DataLayer.Repository;

public class ReviewRepository: IReviewRepository
{
    private readonly StoreContext _db;

    public ReviewRepository(StoreContext db)
    {
        _db = db;
    }

    public async Task<bool> AddReview(Review review, long itemId, User currentUser)
{
    Item item = await _db.Items.FindAsync(itemId);

    if (item != null && currentUser != null && currentUser.IsAuthenticated)
    {
        review.ItemId = itemId;
        review.UserId = currentUser.Id;

        item.Reviews.Add(review);
        await _db.SaveChangesAsync();

        return true;
    }

    return false;
}

    public async Task<bool> DeleteReview(int reviewId, string userId, bool isAdmin)
    {
        // get review by id
        Review review = await _db.Reviews.FirstOrDefaultAsync(r => r.Id == reviewId);

        // existence of review
        if (review != null)
        {
            // check access admin/ user(written review)
            if (isAdmin || review.UserId == userId)
            {
                // delete review from Item
                Item item = await _db.Items.FirstOrDefaultAsync(i => i.Id == review.ItemId);
                if (item != null)
                {
                    item.Reviews.Remove(review);
                }

                //delete review from Review
                _db.Reviews.Remove(review);
                await _db.SaveChangesAsync();
                return true;
            }
        }

        return false;
    }

    public async Task<ResultPage<Review>> GetAllReviews(long itemId, int offset, int limit)
    {
        IQueryable<Review> query = _db.Reviews.Where(r => r.ItemId == itemId); 

       
        bool hasReviews = await query.AnyAsync();

        if (!hasReviews)
        {
            
            return new ResultPage<Review>()
            {
                Total = 0,
                Result = new List<Review>()
            };
        }
        
        var paginatedQuery = GenericPaginator.Paginate(query, offset, limit);
        
        return await paginatedQuery;
    }

}


