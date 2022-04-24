using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MediaManager.SystemAdminService;

namespace MediaManager.Areas.Admin.Models
{
    public class ManageUsersRole
    {
        public string RoleName { get; set; }
        public List<ManageUser> UserList { get; set; }
        public List<ManageUser> UnAssignedUserList { get; set; }
        public List<string> UserNameList { get; set; }
        public List<string> UnAssignedUserNameList { get; set; }
    }
}