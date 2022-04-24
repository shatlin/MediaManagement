using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;
using MediaManager.InfrastructureService;
using MediaManager.Infrastructure.Menu;

namespace MediaManager.Models
{
    public class UsersContext : DbContext
    {
        public UsersContext()
            : base("DefaultConnection")
        {
        }
    }
    public class LoginModel
    {
        [Required]
        [Display(Name = "User name")]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }
    }
    public class App_MenuModel
    {
        public List<MenuVO> MainMenu { get; set; }
        public List<string> RoleBasedMenu { get; set; }

        public List<MediaManagerMenuVO> Menu { get; set; }

        public string Role { get; set; }
    }

 
}
