using logivity_api.DB;
using logivity_api.Models;
using Microsoft.AspNetCore.Mvc;

namespace logivity_api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WeatherForecastsController(ILogger<WeatherForecastsController> logger, LogivityDb dbContext) : ControllerBase
{
    private readonly ILogger<WeatherForecastsController> _logger = logger;
    private readonly LogivityDb _dbContext = dbContext;

    [HttpGet(Name = "GetWeatherForecasts")]
    public IEnumerable<WeatherForecast> Get()
    {
        List<WeatherForecast> allForecasts = _dbContext.WeatherForecasts.ToList();
        return allForecasts;
    }

    [HttpPost(Name = "CreateWeatherForecast")]
    public async Task<IActionResult> Create(WeatherForecast forecast)
    {
        _dbContext.WeatherForecasts.Add(forecast);
        await _dbContext.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = forecast.Id }, forecast);
    }
}
