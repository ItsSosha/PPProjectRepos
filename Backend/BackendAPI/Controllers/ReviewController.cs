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

        public ReviewController(IReviewRepository reviewRepository, IUserRepository userRepository)
        {
            _reviewRepository = reviewRepository;
            _userRepository = userRepository;
        }
        
        [HttpPost]
        [Route(("add"))]
        public async Task<IActionResult> AddReview([FromBody] string jwt, int grade, string? reviewText, long itemId)
        {
            var currentUser = await _userRepository.GetOrRegisterUser(jwt); 

            if (currentUser != null)
            {
                bool success = await _reviewRepository.AddReview(grade, reviewText, itemId, currentUser);

                if (success)
                {
                    return Ok();
                }

                return BadRequest("Failed to add review.");
            }

            return Unauthorized(); 
        }

        [HttpDelete]
        [Route(("delete/{reviewId}"))]
        public async Task<IActionResult> DeleteReview([FromBody] string jwt, int reviewId)
        {
            var currentUser = await _userRepository.GetOrRegisterUser(jwt); // Получаем текущего пользователя

            if (currentUser != null)
            {
                bool success = await _reviewRepository.DeleteReview(reviewId, currentUser);

                if (success)
                {
                    return Ok();
                }

                return BadRequest("Failed to delete review.");
            }

            return Unauthorized(); 
        }

        [HttpGet]
        [Route("get/{itemId}")]
        public async Task<IActionResult> GetReviewsForItem(long itemId, int offset = 0, int limit = Int32.MaxValue)
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