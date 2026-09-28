using System.ComponentModel.DataAnnotations;

namespace logivity_api.Models;

public class CreateShipmentRequest : IValidatableObject
{
    [Required(ErrorMessage = "Enter an origin.")]
    [StringLength(200, ErrorMessage = "Origin can be at most {1} characters.")]
    public string Origin { get; set; } = "";

    [Required(ErrorMessage = "Enter a destination.")]
    [StringLength(200, ErrorMessage = "Destination can be at most {1} characters.")]
    public string Destination { get; set; } = "";

    [Required(ErrorMessage = "Enter a pickup date.")]
    public DateOnly? PickupDate { get; set; }

    [Required(ErrorMessage = "Enter a description.")]
    [StringLength(500, ErrorMessage = "Description can be at most {1} characters.")]
    public string Description { get; set; } = "";

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        // The shipper's "today" depends on their time zone, which we don't know. Allow any date that
        // is still today somewhere in the world (UTC-12 is the furthest behind).
        DateOnly earliestToday = DateOnly.FromDateTime(DateTime.UtcNow.AddHours(-12));
        if (PickupDate < earliestToday)
        {
            yield return new ValidationResult("Pickup date can't be in the past.", [nameof(PickupDate)]);
        }
    }
}
