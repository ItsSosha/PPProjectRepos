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
        optionsBuilder.UseNpgsql("User ID=doadmin;Password=AVNS_y5YBzYRh_TXY10W9cwL;Host=db-postgresql-fra1-48384-do-user-11887088-0.b.db.ondigitalocean.com;Port=25060;Database=StoreDb;sslmode=require;Trust Server Certificate=true;");
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
