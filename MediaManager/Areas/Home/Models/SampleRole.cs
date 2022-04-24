using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MediaManager.Models
{
    public class SampleRole
    {
        public const string Admin = "Admin";
        public const string Buyer = "Buyer";
    }
    public class UserAuthentication
    {
        public  string UserName { get; set; }
        public  string Role { get; set; }

        public UserAuthentication(string userName, string role)
        {
            this.UserName = userName;
            this.Role = role;
        }
    }
}