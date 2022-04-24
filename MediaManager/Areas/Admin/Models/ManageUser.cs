using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MediaManager.SystemAdminService;

namespace MediaManager.Areas.Admin.Models
{
   // [Serializable]
    public class ManageUser
    {
        public SystemAdminService.PersistFlagEnum PersistFlag { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string ManagerName { get; set; }
        public string DepartmentName { get; set; }
        public bool UserStatus { get; set; }
        public List<Role> RoleList { get; set; }
        public List<Role> OldRoleList { get; set; }
        public string CopyRoleFromEditUserID { get; set; }
        public bool IsNew { get; set; }
        public List<string> RegionCodeList { get; set; }
        public List<string> UnAssignRegionCodeList { get; set; }

    }
}