using logivity_api.DB;
using logivity_api.Models;
using Microsoft.AspNetCore.Mvc;

namespace logivity_api.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController(ILogger<WeatherForecastController> logger, LogivityDb dbContext) : ControllerBase
{
    private readonly ILogger<WeatherForecastController> _logger = logger;
    private readonly LogivityDb _dbContext = dbContext;

    [HttpGet(Name = "GetWeatherForecast")]
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
