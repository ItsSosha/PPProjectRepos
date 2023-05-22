using Core;

namespace DataLayer.Abstract;

public class ReviewRepository: IReviewRepository
{
    public async Task<bool> AddReview(Review review, long itemId, User currentUser);
    
    public async Task<bool> DeleteReview(int reviewId, string userId, bool isAdmin);
    
    public async Task<ResultPage<Review>> GetAllReviews(long itemId, int offset, int limit);
}




