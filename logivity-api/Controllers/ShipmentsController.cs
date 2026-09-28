using logivity_api.DB;
using logivity_api.Entities;
using logivity_api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace logivity_api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ShipmentsController(LogivityDb dbContext) : ControllerBase
{
    private readonly LogivityDb _dbContext = dbContext;

    /// <summary>All shipments, newest first.</summary>
    /// <param name="status">Only return shipments with this status, e.g. <c>?status=Open</c>.</param>
    [HttpGet(Name = "GetShipments")]
    public async Task<IEnumerable<ShipmentResponse>> GetAll([FromQuery] ShipmentStatus? status)
    {
        IQueryable<Shipment> query = _dbContext.Shipments;
        if (status is not null)
        {
            query = query.Where(s => s.Status == status);
        }

        List<Shipment> shipments = await query
            .OrderByDescending(s => s.CreatedAt)
            .ToListAsync();
        return shipments.Select(ShipmentResponse.FromEntity);
    }

    [HttpGet("{id:int}", Name = "GetShipment")]
    public async Task<ActionResult<ShipmentResponse>> GetById(int id)
    {
        Shipment? shipment = await _dbContext.Shipments.FindAsync(id);
        return shipment is null ? NotFound() : ShipmentResponse.FromEntity(shipment);
    }

    /// <summary>Creates a shipment. New shipments always start as <see cref="ShipmentStatus.Open"/>.</summary>
    [HttpPost(Name = "CreateShipment")]
    public async Task<ActionResult<ShipmentResponse>> Create(CreateShipmentRequest request)
    {
        var shipment = new Shipment
        {
            Origin = request.Origin.Trim(),
            Destination = request.Destination.Trim(),
            PickupDate = request.PickupDate!.Value,
            Description = request.Description.Trim(),
            Status = ShipmentStatus.Open,
            CreatedAt = DateTimeOffset.UtcNow,
        };

        _dbContext.Shipments.Add(shipment);
        await _dbContext.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = shipment.Id }, ShipmentResponse.FromEntity(shipment));
    }
}
