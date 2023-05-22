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

    public async Task<bool> AddReview(int grade, string? reviewText, long itemId, User currentUser)
    {
        var item = await _db.Items.FindAsync(itemId);

        if (item != null && currentUser != null && grade >= 0 && grade <= 5)
        {
            var review = new Review()
            {
                ItemId = itemId,
                UserId = currentUser.Id,
                Grade = grade,
                ReviewText = reviewText
            };

            item.Reviews.Add(review);
            await _db.SaveChangesAsync();

            return true;
        }

        return false;
    }

    public async Task<bool> DeleteReview(int reviewId, User user)
    {
        // get review by id
        var review = await _db.Reviews.FirstOrDefaultAsync(r => r.Id == reviewId);

        // existence of review
        if (review != null)
        {
            // check access admin/ user(written review)
            if (user.IsAdmin || review.UserId == user.Id)
            {
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
        IQueryable<Review> query = _db.Reviews
            .Include(x => x.User)
            .Where(r => r.ItemId == itemId);

        var paginatedQuery = GenericPaginator.Paginate(query, offset, limit);
        
        return await paginatedQuery;
    }

}


