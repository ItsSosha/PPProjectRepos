using System.ComponentModel;
using Core;
using DataLayer.Abstract;
using Microsoft.EntityFrameworkCore;

namespace DataLayer.Repository;

public class SubscriptionRepository : ISubscriptionRepository
{
    private readonly StoreContext _db;

    public SubscriptionRepository(StoreContext db)
    {
        _db = db;
    }
    
    public async Task<bool> IsUserPremium(User user)
    {
        return await Task.Run(() => _db.Subscriptions
            .Include(s => s.User)
            .Any(x => x.User.Id == user.Id && x.ExpireDate > DateTime.Today));
    }

    public async Task AddSubscription(User user, TimeSpan duration)
    {
        var subscriptionDate = await IsUserPremium(user)
            ? _db.Subscriptions
                .Include(s => s.User)
                .Where(x => x.User.Id == user.Id && x.ExpireDate > DateTime.Today)
                .Select(x => x.ExpireDate)
                .Max()
            : DateTime.Today;

        var subscription = new Subscription()
        {
            User = user,
            ExpireDate = subscriptionDate.Add(duration).ToUniversalTime(),
            SubDate = DateTime.Today.ToUniversalTime()
        };

        _db.Subscriptions.Add(subscription);
        await _db.SaveChangesAsync();
    }
}