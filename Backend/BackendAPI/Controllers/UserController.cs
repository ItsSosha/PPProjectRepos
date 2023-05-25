using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Core;
using DataLayer.Abstract;
using LiqPay.SDK;
using LiqPay.SDK.Dto;
using LiqPay.SDK.Dto.Enums;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace BackendAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly string publicKey = "sandbox_i70707516578";
        private readonly string privateKey = "sandbox_WYv7D6KQicBgBmYwsgQDAOdQG2bNcSHeY6GWrKad";
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
        [Route("getSubscription")]
        public async Task<ActionResult<Subscription>> GetSubscription(string jwt)
        {
            var user = await _userRepository.GetOrRegisterUser(jwt);
            if (user == null)
            {
                return Unauthorized();
            }

            var sub = await _subscriptionRepository.GetSubscription(user);

            if (sub == null)
            {
                return Ok(new Subscription()
                {
                    User = user,
                    ExpireDate = DateTime.UnixEpoch
                });
            }

            return Ok(sub);
        }

        [HttpGet]
        [Route("karas")]
        public async Task<ActionResult<User>> Get()
        {
            await _subscriptionRepository.AddSubscription(await _userRepository.GetById(3) ?? new User(),
                TimeSpan.FromDays(30));

            return Ok();
        }

        [HttpGet]
        [Route("pay")]
        public async Task<ActionResult> Pay(string jwt)
        {
            var user = await _userRepository.GetOrRegisterUser(jwt);
            if (user == null)
            {
                return Unauthorized();
            }

            var order = await _userRepository.CreateOrder(user);
            if (order == null)
            {
                return NotFound();
            }
            
            var invoiceRequest = new LiqPayRequest
            {
                Version = 3,
                Description = "Oplata pidpysky na Pricely na misiats",
                Email = user.Email,
                Amount = 20,
                Currency = "UAH",
                OrderId = "pricely.tech_unique_orderId_for_user_" + user.Email + "_" + order.Id.ToString(),
                Action = LiqPayRequestAction.InvoiceSend,
                Language = LiqPayRequestLanguage.EN,
            };
            
            var liqPayClient = new LiqPayClient(publicKey, privateKey);
            var response = await liqPayClient.RequestAsync("request", invoiceRequest);

            return Redirect(response.Href);
        }

        [HttpPost]
        [Route("liqpayEndpoint")]
        public async Task<ActionResult> LiqpayEndpoint([FromForm]string data, [FromForm]string signature)
        {
            String genSignature;
            using (SHA1Managed sha1 = new SHA1Managed())
            {
                genSignature =
                    System.Convert.ToBase64String(
                        sha1.ComputeHash(System.Text.Encoding.UTF8.GetBytes(privateKey + data + privateKey)));
            }

            if (genSignature != signature)
            {
                return Unauthorized();
            }

            dynamic answer = JsonConvert.DeserializeObject(LiqPayUtil.DecodeBase64(data));
            if (answer == null)
            {
                return NotFound();
            }
            
            string? status = answer?.status?.ToString();
            string? stringOrdersId = answer?.order_id?.ToString();
            string? stringOrderId = stringOrdersId?.Split('_').LastOrDefault();
            long orderId;
            if (status != "success" || stringOrderId == null || !long.TryParse(stringOrderId, out orderId))
            {
                return NotFound();
            }

            var order = await _userRepository.GetOrderById(orderId);
            if (order == null || order.Used)
            {
                return BadRequest();
            }

            order.Used = true;
            await _userRepository.UpdateOrder(order);

            var user = order.User;
            await _subscriptionRepository.AddSubscription(user, TimeSpan.FromDays(30));

            return Ok();
        }
    }
}
