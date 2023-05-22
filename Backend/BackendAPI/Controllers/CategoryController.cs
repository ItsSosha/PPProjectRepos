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

        public CategoryController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        [HttpGet]
        public async Task<ActionResult<ResultPage<Category>>> GetAllCategories(int offset, int limit, string jwt)
        {
            var user = await _categoryRepository.GetUserByJwt(jwt);
            if (user == null || !user.Admin)
            {
                return Unauthorized();
            }

            var resultPage = await _categoryRepository.GetAllCategories(offset, limit, user.Id);
            return Ok(resultPage);
        }

        [HttpGet("{categoryId}")]
        public async Task<ActionResult<Category>> GetCategoryById(int categoryId, string jwt)
        {
            var user = await _categoryRepository.GetUserByJwt(jwt);
            if (user == null || !user.Admin)
            {
                return Unauthorized();
            }

            var category = await _categoryRepository.GetCategoryById(categoryId, user.Id);
            if (category == null)
            {
                return NotFound();
            }

            return Ok(category);
        }

        [HttpPost]
        public async Task<ActionResult<Category>> CreateCategory(Category category, string jwt)
        {
            var user = await _categoryRepository.GetUserByJwt(jwt);
            if (user == null || !user.Admin)
            {
                return Unauthorized();
            }

            var createdCategory = await _categoryRepository.CreateCategory(category, user.Id);
            return CreatedAtAction(nameof(GetCategoryById), new { categoryId = createdCategory.Id }, createdCategory);
        }

        [HttpDelete("{categoryId}")]
        public async Task<ActionResult> DeleteCategory(int categoryId, string jwt)
        {
            var user = await _categoryRepository.GetUserByJwt(jwt);
            if (user == null || !user.Admin)
            {
                return Unauthorized();
            }

            var result = await _categoryRepository.DeleteCategory(categoryId, user.Id);
            if (result)
            {
                return NoContent();
            }

            return NotFound();
        }
    }
}
