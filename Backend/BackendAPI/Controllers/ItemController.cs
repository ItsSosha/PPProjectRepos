using System.ComponentModel;
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
        private readonly ISubscriptionRepository _subscriptionRepository;

        public ItemController(IItemRepository itemRepository, IUserRepository userRepository, ISubscriptionRepository subscriptionRepository)
        {
            _itemRepository = itemRepository;
            _userRepository = userRepository;
            _subscriptionRepository = subscriptionRepository;
        }

        [HttpGet]
        public async Task<ActionResult<ResultPage<Item>>> GetAll(int offset, int limit)
        {
            return await _itemRepository.GetAll(offset, limit);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Item>> GetById(long id, string? jwt = null)
        {
            Item item = await _itemRepository.GetByIdAsync(id);
            if (item != null)
            {
                User user = await _userRepository.GetOrRegisterUser(jwt ?? "uihfjhbf");

                if (user != null &&  await _subscriptionRepository.IsUserPremium(user))
                {
                    item.PriceHistories = await _itemRepository.GetPriceHistory(id);
                }

                return Ok(item);
            }
            
            return NotFound();
        }
        
        [HttpGet]
        [Route("getRawItemById")]
        public async Task<ActionResult<RawItem?>> GetRawItemById([FromQuery] string jwt, long id)
        {
            User user = await _userRepository.GetOrRegisterUser(jwt);

            if (user.IsAdmin)
            {
                var rawItem = await _itemRepository.GetRawItemById(id);
                if (rawItem != null)
                {
                    return Ok(rawItem);
                }
                else
                {
                    return NotFound();
                }
            }
            
            return Unauthorized(); // ?? 
        }
        
        [HttpPost]
        [Route("addReview")]
        public async Task<ActionResult> AddReview([FromBody] string jwt, long id, string reviewText, int rating) 
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

        [HttpPost]
        [Route("addToItems")]
        public async Task<ActionResult> AddToItems([FromBody] string jwt, long rawItemId)
        {
            var user = await _userRepository.GetOrRegisterUser(jwt);

            if (user?.IsAdmin != true)
            {
                return Unauthorized();
            }
            
            if (await _itemRepository.AddToItems(rawItemId))
            {
                return Ok();
            }

            return NotFound();
        }
        
        [HttpGet]
        [Route("getAllNotApproved")]
        public async Task<ActionResult<ResultPage<RawItem>>> GetAllNotApproved([FromQuery]string jwt, int offset, int limit)
        {
            var user = await _userRepository.GetOrRegisterUser(jwt);

            if (user?.IsAdmin != true)
            {
                return Unauthorized();
            }
            
            return await _itemRepository.GetAllNotApproved(offset, limit);
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

        [HttpDelete]
        public async Task<ActionResult> DeleteItem(long id)
        {
            if (await _itemRepository.DeleteItem(id))
            {
                return Ok();
            }

            return BadRequest();// ??

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
        public async Task<ActionResult<ResultPage<Item>>> GetItemsByCategory([FromQuery] string categoryName, int priceFrom, int priceTo, bool isOnSale, bool isFoxtrot, bool isRozetka, int offset, int limit)
        {
            var filteredItems = await _itemRepository.GetItemsByCategory(categoryName, priceFrom, priceTo, isOnSale, isFoxtrot, isRozetka, offset, limit);
            
            if (filteredItems != null)
            {
                return Ok(filteredItems);
            }

            return NotFound();
        }
        [HttpGet]
        [Route("searchByName")]
        public async Task<ActionResult<ResultPage<Item>>> GetItemsBySearch([FromQuery] string searchResult, int priceFrom, int priceTo, bool isOnSale, bool isFoxtrot, bool isRozetka, int offset, int limit)
        {
            var items = await _itemRepository.GetItemsBySearch(searchResult, priceFrom, priceTo, isOnSale, isFoxtrot, isRozetka, offset, limit);
            if (items != null)
            {
                return Ok(items);
            }

            return NotFound();
        }
    }
}
