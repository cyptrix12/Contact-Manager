using System.Text.Json.Serialization;

namespace ContactManager.Models
{
	public class Category
	{

		[JsonPropertyName("id")]
		public int Id { get; set; }

		[JsonPropertyName("name")]
		public string Name { get; set; } = string.Empty;

		public ICollection<Subcategory> Subcategories { get; set; } = new List<Subcategory>();
	}
}