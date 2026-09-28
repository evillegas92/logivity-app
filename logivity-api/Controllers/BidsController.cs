using logivity_api.DB;
using logivity_api.Entities;
using logivity_api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace logivity_api.Controllers;

/// <summary>Bids placed by carriers on a shipment.</summary>
[ApiController]
[Route("api/shipments/{shipmentId:int}/bids")]
public class BidsController(LogivityDb dbContext) : ControllerBase
{
    private readonly LogivityDb _dbContext = dbContext;

    [HttpGet("{id:int}", Name = "GetBid")]
    public async Task<ActionResult<BidResponse>> GetById(int shipmentId, int id)
    {
        Bid? bid = await _dbContext.Bids.SingleOrDefaultAsync(b => b.ShipmentId == shipmentId && b.Id == id);
        return bid is null ? NotFound() : BidResponse.FromEntity(bid);
    }

    /// <summary>Places a bid. Only <see cref="ShipmentStatus.Open"/> shipments accept bids.</summary>
    [HttpPost(Name = "CreateBid")]
    public async Task<ActionResult<BidResponse>> Create(int shipmentId, CreateBidRequest request)
    {
        Shipment? shipment = await _dbContext.Shipments.FindAsync(shipmentId);
        if (shipment is null)
        {
            return NotFound();
        }
        if (shipment.Status != ShipmentStatus.Open)
        {
            return Problem(
                title: "This shipment is no longer accepting bids.",
                statusCode: StatusCodes.Status409Conflict);
        }

        string? note = request.Note?.Trim();
        var bid = new Bid
        {
            ShipmentId = shipment.Id,
            CarrierName = request.CarrierName.Trim(),
            Price = request.Price!.Value,
            Note = string.IsNullOrEmpty(note) ? null : note,
            CreatedAt = DateTimeOffset.UtcNow,
        };

        _dbContext.Bids.Add(bid);
        await _dbContext.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { shipmentId, id = bid.Id }, BidResponse.FromEntity(bid));
    }
}
