using Microsoft.EntityFrameworkCore;
using Core;

namespace DataLayer;

public class StoreContext : DbContext
{
    public StoreContext()
    {
  
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql("User ID=postgres;Password=postgres;Host=localhost;Port=5432;Database=StoreDb;");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
    }
    //entities
    public DbSet<Store> Stores { get; set; }
    public DbSet<RawCategory> RawCategories { get; set; }
    public DbSet<RawItem> RawItems { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Item> Items { get; set; }
    public DbSet<UserItem> UserItems { get; set; }
    public DbSet<PriceHistory> PriceHistories { get; set; }
    public DbSet<Review> Reviews { get; set; }
    public DbSet<Specification> Specifications { get; set; }
    public DbSet<Subscription> Subscriptions { get; set; }
    public DbSet<User> Users { get; set; }
}
