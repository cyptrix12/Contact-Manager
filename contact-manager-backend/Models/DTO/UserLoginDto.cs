using System.ComponentModel.DataAnnotations;

namespace ContactManager.Models.Dto
{
    public class UserLoginDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = "";

        [Required]
        public string Password { get; set; } = "";
    }
}
