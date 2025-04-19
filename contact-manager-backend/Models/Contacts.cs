using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ContactManager.Models
{
    public class Contact
    {
        // Primary key (auto-incremented)
        [JsonPropertyName("id")]
        public int Id { get; set; }

        // First name of the contact (required)
        [Required(ErrorMessage = "First name is required.")]
        [JsonPropertyName("firstName")]
        public string FirstName { get; set; } = "";

        // Last name of the contact (required)
        [Required(ErrorMessage = "Last name is required.")]
        [JsonPropertyName("lastName")]
        public string LastName { get; set; } = "";

        // Email address (required and must be valid format)
        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        [JsonPropertyName("email")]
        public string Email { get; set; } = "";

        // Password (required, minimum 6 characters)
        [Required(ErrorMessage = "Password is required.")]
        [MinLength(6, ErrorMessage = "Password must be at least 6 characters.")]
        [JsonPropertyName("password")]
        public string Password { get; set; } = "";

        // Main category (e.g. "business", "private", "other") - required
        [Required(ErrorMessage = "Category is required.")]
        [JsonPropertyName("category")]
        public string Category { get; set; } = "";

        // Subcategory (e.g. "client", "boss")
        [JsonPropertyName("subcategory")]
        public string? Subcategory { get; set; }

        // Optional phone number
        [JsonPropertyName("phone")]
        public string? Phone { get; set; }

        // Optional birth date
        [JsonPropertyName("birthDate")]
        public DateTime? BirthDate { get; set; }
    }
}
