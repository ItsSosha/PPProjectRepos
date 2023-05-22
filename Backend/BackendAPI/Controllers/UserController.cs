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
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly ISubscriptionRepository _subscriptionRepository;

        public UserController(IUserRepository userRepository, ISubscriptionRepository subscriptionRepository)
        {
            _userRepository = userRepository;
            _subscriptionRepository = subscriptionRepository;
        }
        
        // GET: api/User?jwt=
        [HttpGet]
        public async Task<ActionResult<User>> Get([FromQuery] string jwt)
        {
            var user = await _userRepository.GetOrRegisterUser(jwt);
            if (user == null)
            {
                return Unauthorized();
            }

            return user;
        }

        [HttpPost]
        [Route("setNotificationToken")]
        public async Task<ActionResult> SetNotificationToken([FromBody] string jwt, string token)
        {
            var user = await _userRepository.GetOrRegisterUser(jwt);
            if (user == null)
            {
                return Unauthorized();
            }

            if (await _userRepository.SetNotificationToken(user, token))
            {
                return Ok();
            }

            return NotFound();
        }
        
        [HttpGet]
        [Route("isUserPremium")]
        public async Task<ActionResult<bool>> IsUserPremium([FromQuery] string jwt)
        {
            var user = await _userRepository.GetOrRegisterUser(jwt);
            if (user == null)
            {
                return Unauthorized();
            }

            return await _subscriptionRepository.IsUserPremium(user);
        }

        [HttpGet]
        [Route("karas")]
        public async Task<ActionResult<User>> Get()
        {
            await _subscriptionRepository.AddSubscription(await _userRepository.GetById(3) ?? new User(),
                TimeSpan.FromDays(30));

            return Ok();
        }
    }
}
