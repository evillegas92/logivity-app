namespace logivity_api.Entities;

public class Shipment
{
    public int Id { get; set; }
    public required string Origin { get; set; }
    public required string Destination { get; set; }
    public DateOnly PickupDate { get; set; }
    public required string Description { get; set; }
    public ShipmentStatus Status { get; set; } = ShipmentStatus.Open;
    public DateTimeOffset CreatedAt { get; set; }

    /// <summary>Bids from any number of carriers.</summary>
    public List<Bid> Bids { get; set; } = [];
}
