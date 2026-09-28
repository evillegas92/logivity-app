using logivity_api.Entities;
using Microsoft.EntityFrameworkCore;

namespace logivity_api.DB;

public class LogivityDb : DbContext
{
    public LogivityDb(DbContextOptions<LogivityDb> options) : base(options)
    {
    }

    public DbSet<Shipment> Shipments { get; set; }
    public DbSet<Bid> Bids { get; set; }
}
