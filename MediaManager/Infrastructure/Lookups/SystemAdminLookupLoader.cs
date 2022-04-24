using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MediaManager.SystemAdminService;
using MediaManager.LookupsServices;

namespace MediaManager.Infrastructure.Lookups
{
    public class SystemAdminLookupLoader
    {
        public List<SystemUserVO> GetSystemUsersLOV()
        {
            return SystemAdminLookupManager.GetSystemUsers();
        }

        public List<SystemDepartmentsVO> GetSystemDepartmentLOV()
        {
            return SystemAdminLookupManager.GetDepartmentDetails(ModuleEnum.SystemAdmin, LookupKeyEnum.SystemDepartmentLookUp);
        }

        public List<Role> GetRoles()
        {
            return SystemAdminLookupManager.GetRoles();
        }

        public List<MENUserVO> GetRegions(string userId)
        {
            return SystemAdminLookupManager.GetRegions(userId);
        }

        public List<MENUserVO> GetRegionsDetails(string userId)
        {
            return SystemAdminLookupManager.GetRegionsDetails(userId);
        }
    }
}