using Microsoft.AspNetCore.Mvc;
using Core;
using DataLayer.Abstract;

namespace BackendAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IUserRepository _userRepository;

        public CategoryController(ICategoryRepository categoryRepository, IUserRepository userRepository)
        {
            _categoryRepository = categoryRepository;
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<ActionResult<ResultPage<Category>>> GetAllCategories()
        {
            var resultPage = await _categoryRepository.GetAllCategories();
            return Ok(resultPage);
        }

        [HttpGet("{categoryId}")]
        public async Task<ActionResult<Category>> GetCategoryById(int categoryId)
        {
            var category = await _categoryRepository.GetCategoryById(categoryId);
            if (category == null)
            {
                return NotFound();
            }

            return Ok(category);
        }

        [HttpPost]
        public async Task<ActionResult> CreateCategory([FromBody]string jwt, string categoryName)
        {
            var user = await _userRepository.GetOrRegisterUser(jwt);
            if (user == null || !user.IsAdmin)
            {
                return Unauthorized();
            }

            if (await _categoryRepository.CreateCategory(categoryName, user))
            {
                return Ok();
            }

            return BadRequest();
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteCategory([FromBody]string jwt, int categoryId)
        {
            var user = await _userRepository.GetOrRegisterUser(jwt);
            if (user == null || !user.IsAdmin)
            {
                return Unauthorized();
            }

            var result = await _categoryRepository.DeleteCategory(categoryId, user);
            if (result)
            {
                return Ok();
            }

            return NotFound();
        }
        [HttpPost]
        [Route("bindCategory")]
        public async Task<ActionResult<bool>> BindRawCategory(long categoryId, long rawCategoryId)
        {
            var success = await _categoryRepository.BindRawCategoryAsync(categoryId, rawCategoryId);
    
            if (success)
            {
                return Ok(true);
            }
            else
            {
                return NotFound();
            }
        }
 
    }
    
}
