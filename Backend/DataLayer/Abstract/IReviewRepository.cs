using Core;

namespace DataLayer.Abstract;

public interface IReviewRepository
{
    public Task<bool> AddReview(int grade, string? reviewText, long itemId, User currentUser);
    
    public Task<bool> DeleteReview(int reviewId, User user);
    
    public Task<ResultPage<Review>> GetAllReviews(long itemId, int offset, int limit);
}




