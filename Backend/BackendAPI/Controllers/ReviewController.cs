using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core;
using DataLayer.Abstract;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackendAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class ReviewController : ControllerBase
    {
        private readonly IReviewRepository _reviewRepository;
        private readonly IUserRepository _userRepository; 

        public ReviewController(IReviewRepository reviewRepository, IUserRepository userRepository,)
        {
            _reviewRepository = reviewRepository;
            _userRepository = userRepository;
        }

     [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddReview([FromBody] Review review, long itemId)
        {
            User currentUser = _userRepository.GetCurrentUser(); 

            if (currentUser != null && currentUser.IsAuthenticated)
            {
                bool success = await _reviewRepository.AddReview(review, itemId);

                if (success)
                {
                    return Ok();
                }

                return BadRequest("Failed to add review.");
            }

            return Unauthorized(); 
        }

        [HttpDelete("{reviewId}")]
        [Authorize]
        public async Task<IActionResult> DeleteReview(int reviewId)
        {
            User currentUser = _userRepository.GetCurrentUser(); // Получаем текущего пользователя

            if (currentUser != null && currentUser.IsAuthenticated)
            {
                bool isAdmin = currentUser.IsAdmin;
                bool success = await _reviewRepository.DeleteReview(reviewId, currentUser.Id, isAdmin);

                if (success)
                {
                    return Ok();
                }

                return BadRequest("Failed to delete review.");
            }

            return Unauthorized(); 
        }

        [HttpGet("items/{itemId}/reviews")]
        public async Task<IActionResult> GetReviewsForItemWithPagination(long itemId, int offset = 0, int limit = 10)
        {
            var reviewsPage = await _reviewRepository.GetAllReviews(itemId, offset, limit);

            if (reviewsPage.Result.Count == 0)
            {
                return NotFound();
            }

            return Ok(reviewsPage);
        }
        
    }
}