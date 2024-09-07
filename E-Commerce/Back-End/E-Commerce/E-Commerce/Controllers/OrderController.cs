using E_Commerce.DTOs;
using E_Commerce.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace E_Commerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly MyDbContext _db;
        public OrderController(MyDbContext db)
        {
            _db = db;
        }

        [HttpPost("CreateOrder")]
        public IActionResult CreateOrder([FromBody] OrderRequestDTO orderDTO)
        {
            var newOrder = new Order()
            {
                UserId = orderDTO.UserId,
                Amount = orderDTO.Amount,
                CoponId = orderDTO.CoponId,
                Status = "Completed",
                TransactionId = orderDTO.TransactionId,
            };

            _db.Orders.Add(newOrder);
            _db.SaveChanges();

            var cartItems = _db.CartItems.Where(l => l.UserId == newOrder.UserId).ToList();

            foreach (var cartItem in cartItems)
            {
                var item = new OrderItem()
                {
                    OrderId = newOrder.OrderId,
                    ProductId = cartItem.ProductId,
                    Quantity = cartItem.Quantity,
                };

                _db.OrderItems.Add(item);
                _db.CartItems.Remove(cartItem);
                _db.SaveChanges();

            }





            return Ok(newOrder);

        }
    }
}
