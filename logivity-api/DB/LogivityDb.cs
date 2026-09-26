using logivity_api.Models;
using Microsoft.EntityFrameworkCore;

namespace logivity_api.DB;

public class LogivityDb : DbContext
{
    public LogivityDb(DbContextOptions<LogivityDb> options) : base(options)
    {
    }

    public DbSet<WeatherForecast> WeatherForecasts { get; set; }
}