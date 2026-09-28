using logivity_api.Entities;

namespace logivity_api.Models;

public record BidResponse(
    int Id,
    int ShipmentId,
    string CarrierName,
    decimal Price,
    string? Note,
    DateTimeOffset CreatedAt)
{
    public static BidResponse FromEntity(Bid bid) => new(
        bid.Id,
        bid.ShipmentId,
        bid.CarrierName,
        bid.Price,
        bid.Note,
        bid.CreatedAt);
}
