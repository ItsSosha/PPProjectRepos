using Core;

namespace DataLayer.Abstract;

public interface ISubscriptionRepository
{
    Task<bool> IsUserPremium(User user);
    Task AddSubscription(User user, TimeSpan duration);
}