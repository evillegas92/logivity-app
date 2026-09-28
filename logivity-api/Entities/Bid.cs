using Microsoft.EntityFrameworkCore;

namespace logivity_api.Entities;

/// <summary>A carrier's offer to transport a shipment.</summary>
public class Bid
{
    public int Id { get; set; }
    public int ShipmentId { get; set; }
    public Shipment? Shipment { get; set; }

    /// <summary>Who placed the bid. Typed in by the carrier until the app has user accounts.</summary>
    public required string CarrierName { get; set; }

    /// <summary>Price in SEK.</summary>
    [Precision(18, 2)]
    public decimal Price { get; set; }

    public string? Note { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
}
