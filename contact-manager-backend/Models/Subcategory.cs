using System.Text.Json.Serialization;

namespace ContactManager.Models
{
    public class Subcategory
    {

        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; } = string.Empty;

        public int CategoryId { get; set; }
        public Category? Category { get; set; }
    }
}
