using System.ComponentModel.DataAnnotations;

namespace logivity_api.Models;

public class CreateBidRequest : IValidatableObject
{
    [Required(ErrorMessage = "Enter your carrier name.")]
    [StringLength(100, ErrorMessage = "Carrier name can be at most {1} characters.")]
    public string CarrierName { get; set; } = "";

    /// <summary>Price in SEK.</summary>
    [Required(ErrorMessage = "Enter a price.")]
    [Range(typeof(decimal), "1", "100000000", ErrorMessage = "Price must be between 1 and 100,000,000 SEK.")]
    public decimal? Price { get; set; }

    [StringLength(500, ErrorMessage = "Note can be at most {1} characters.")]
    public string? Note { get; set; }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (Price is { } price && decimal.Round(price, 2) != price)
        {
            yield return new ValidationResult("Price can have at most 2 decimals (öre).", [nameof(Price)]);
        }
    }
}
