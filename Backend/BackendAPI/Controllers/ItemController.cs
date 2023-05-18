using Core;
using Microsoft.AspNetCore.Mvc;
using DataLayer.Abstract;

namespace BackendAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly IItemRepository _itemRepository;
        private readonly IUserRepository _userRepository;

        public ItemController(IItemRepository itemRepository, IUserRepository userRepository)
        {
            _itemRepository = itemRepository;
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<ActionResult<ResultPage<Item>>> GetAll([FromQuery]int offset, int limit)
        {
            return await _itemRepository.GetAll(offset, limit);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Item>> GetById([FromQuery] long userId, long id)
        {
            Item item = await _itemRepository.GetByIdAsync(id);
            if (item != null)
            {
                User user = await _userRepository.GetById(userId);

                /*if (user != null && user.IsPremium())
                {
                    item.PriceHistories = await _itemRepository.GetPriceHistory(id);
                }
                else
                {
                    return Unauthorized();
                }*/

                return Ok(item);
            }
            
            return NotFound();
        }
        
        [HttpPost]
        public async Task<ActionResult> AddReview([FromForm] string jwt, long id, string reviewText, int rating) 
        {

            var user = await _userRepository.GetOrRegisterUser(jwt);
            
            if (user != null)
            {
                Review review = new Review()
                {
                    Grade = rating,
                    ReviewText = reviewText,
                    ItemId = id, // ??
                    User = user,
                };
                
                bool isAdded = await _itemRepository.AddReview(review, id);
            }

            return Unauthorized();

        }
        
        [HttpGet]
        [Route("getSaleItems")]
        public async Task<ActionResult<IList<Item>>> GetSaleItems()
        {
            IList<Item> items = await _itemRepository.GetAllSale();
            return Ok(items);
        }
        
        [HttpGet]
        [Route("getNewItems")]
        public async Task<ActionResult<IList<Item>>> GetNewItems()
        {
            IList<Item> items = await _itemRepository.GetAllNew();
            return Ok(items);
        }
        
        [HttpGet]
        [Route("getRecommended")]
        public async Task<ActionResult<IList<Item>>> GetRecommended([FromQuery]long id)
        {
            var item = await _itemRepository.GetByIdAsync(id);
            if (item != null)
            {
                IList<Item> recommendedItems = await _itemRepository.GetRecommended(item);
                if (recommendedItems != null)
                {
                    return Ok(recommendedItems);
                }
                return NotFound();
            }

            return NotFound();
        }

        [HttpGet]
        [Route("filterByCategory")]
        public async Task<ActionResult<ResultPage<Item>>> GetItemsByCategory([FromQuery] string categoryName, int priceFrom, int PriceTo, bool isOnSale, bool isFoxtrot, bool isRozetka, int offset, int limit)
        {
            var filteredItems = await _itemRepository.GetItemsByCategory(categoryName, priceFrom, PriceTo, isOnSale, isFoxtrot, isRozetka, offset, limit);
            
            if (filteredItems != null)
            {
                return Ok(filteredItems);
            }

            return NotFound();
        }
        [HttpGet]
        [Route("searchByName")]
        public async Task<ActionResult<ResultPage<Item>>> GetItemsBySearch([FromQuery] string searchResult, int priceFrom, int PriceTo, bool isOnSale, bool isFoxtrot, bool isRozetka, int offset, int limit)
        {
            var items = await _itemRepository.GetItemsBySearch(searchResult, priceFrom, PriceTo, isOnSale, isFoxtrot, isRozetka, offset, limit);
            if (items != null)
            {
                return Ok(items);
            }

            return NotFound();
        }
    }
}
