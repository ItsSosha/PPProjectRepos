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
    public class FavouritesController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IItemRepository _itemRepository;

        public FavouritesController(IUserRepository userRepository, IItemRepository itemRepository)
        {
            _userRepository = userRepository;
            _itemRepository = itemRepository;
        }
        
        // GET: api/Favourites?userId=
        [HttpGet]
        public async Task<ActionResult<IList<UserItem>>> Get([FromQuery] long userId)
        {
            var user = await _userRepository.GetById(userId);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(await _userRepository.GetFavourites(user));
        }
        
        [HttpGet]
        [Route("getPaginated")]
        public async Task<ActionResult<ResultPage<UserItem>>> Get([FromQuery] long userId, int offset, int limit)
        {
            var user = await _userRepository.GetById(userId);
            if (user == null)
            {
                return NotFound();
            }

            return await _userRepository.GetFavouritesPaginated(user, offset, limit);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromForm] string jwt, long itemId)
        {
            var user = await _userRepository.GetOrRegisterUser(jwt);
            if (user == null)
            {
                return Unauthorized();
            }

            var item = await _itemRepository.GetByIdAsync(itemId);

            if (item == null || !await _userRepository.AddToFavourites(user, item))
            {
                return NotFound();
            }

            return Ok();
        }
        
        [HttpDelete]
        public async Task<ActionResult> Delete([FromForm] string jwt, long itemId)
        {
            var user = await _userRepository.GetOrRegisterUser(jwt);
            if (user == null)
            {
                return Unauthorized();
            }

            var item = await _itemRepository.GetByIdAsync(itemId);

            if (item == null || !await _userRepository.RemoveFromFavourites(user, item))
            {
                return NotFound();
            }

            return Ok();
        }
    }
}
