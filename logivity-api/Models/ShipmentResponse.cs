using logivity_api.Entities;

namespace logivity_api.Models;

public record ShipmentResponse(
    int Id,
    string Origin,
    string Destination,
    DateOnly PickupDate,
    string Description,
    ShipmentStatus Status,
    DateTimeOffset CreatedAt)
{
    public static ShipmentResponse FromEntity(Shipment shipment) => new(
        shipment.Id,
        shipment.Origin,
        shipment.Destination,
        shipment.PickupDate,
        shipment.Description,
        shipment.Status,
        shipment.CreatedAt);
}
