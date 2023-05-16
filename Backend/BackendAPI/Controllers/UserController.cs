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

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        
        // GET: api/User?jwt=
        [HttpGet]
        public async Task<ActionResult<User>> Get([FromQuery] string jwt)
        {
            var user = await _userRepository.GetOrRegisterUser(jwt);
            if (user == null)
            {
                return NotFound();
            }

            return user;
        }
    }
}
