using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MediaManager.SystemAdminService;
using MediaManager.LookupsServices;
using System.Configuration;
using System.Net.NetworkInformation;
using System.DirectoryServices.ActiveDirectory;

namespace MediaManager.Infrastructure.Lookups
{
    public class SystemAdminLookupManager
    {
        public static List<SystemUserVO> listsystemUsers;
        public static List<Role> roleList;
        public static string GetUserDomen()
        {
         string domenName = "";
            try
            {
                if (IPGlobalProperties.GetIPGlobalProperties().DomainName != null)
                    domenName = IPGlobalProperties.GetIPGlobalProperties().DomainName.Split('.')[0];
                if (string.IsNullOrEmpty(domenName))
                    domenName = Domain.GetComputerDomain().Forest.Name.Split('.')[0];
            }
            catch (ActiveDirectoryObjectNotFoundException)
            {
                domenName = ConfigurationManager.AppSettings["DomainName"];
            }
            return domenName;
        }
        public static List<SystemUserVO> GetSystemUsers()
        {
            SystemAdminClient proxy = new SystemAdminClient();

            try
            {
                proxy.Open();
                GetSystemUsersResponse response = proxy.GetSystemUsers();
                listsystemUsers = response.SystemUserList;

                for (int i = 0; i < listsystemUsers.Count; i++)
                {
                    listsystemUsers[i].PersistFlag = PersistFlagEnum.UnModified;
                    listsystemUsers[i].UserId = listsystemUsers[i].UserName.ToLower().Replace(GetUserDomen().ToLower() + "\\", "");

                    for (int j = 0; j < listsystemUsers[i].RoleList.Count; j++)
                    {
                        listsystemUsers[i].RoleList[j].PersistFlag = PersistFlagEnum.UnModified;
                    }
                }


            }

            finally
            {
                proxy.Close();
            }

            return listsystemUsers;
        }

        public static List<SystemDepartmentsVO> GetDepartmentDetails(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {
            if (HttpContext.Current.Session["callContext"] == null)
            {
                throw new Exception("Your session has expired.ReLogin is required.");
            }
            SystemAdminClient proxy = new SystemAdminClient();
            GetSystemDepartmentsResponse response = new GetSystemDepartmentsResponse();
            try
            {
                proxy.Open();
                GetSystemDepartmentsRequest request = new GetSystemDepartmentsRequest();

                response = proxy.GetSystemDepartmentDetails(request);
            }
            finally
            {
                proxy.Close();
            }

            return response.SystemDepartmentsVOList;
        }

        public static List<Role> GetRoles()
        {
            
            SystemAdminClient proxy = new SystemAdminClient();
            
            try
            {
                proxy.Open();
                GetRoleResponse response = proxy.GetRoles();
                roleList = response.RoleList;

                // mark all Roles & its tasks marked as Unmodified
                for (int i = 0; i < roleList.Count; i++)
                {

                    roleList[i].PersistFlag = PersistFlagEnum.UnModified;
                    for (int j = 0; j < roleList[i].TasksList.Count; j++)
                    {
                        roleList[i].TasksList[j].PersistFlag = PersistFlagEnum.UnModified;
                    }
                }
            }
            finally
            {
                proxy.Close();
            }
            return roleList;
        }

        public static List<MENUserVO> GetRegions(string UserId)
        {
            SystemAdminClient proxy = new SystemAdminClient();
            List<MENUserVO> regionList;
            try
            {
                GetRegionsRequest request = new GetRegionsRequest();
                request.UserData = new MENUserVO();
                request.UserData.MENUserId = UserId;
                proxy.Open();
                GetRegionsResponse response = proxy.GetRegions(request);
                regionList = response.RegionList;
                if (response.Messages != null && response.Messages.Count > 0)
                {
                    //CustomOracleMessage = new List<AppMessage>();
                    //CustomOracleMessage = response.Messages;
                }
            }
            finally
            {
                if (proxy.State == System.ServiceModel.CommunicationState.Faulted)
                    proxy.Abort();
                else
                    proxy.Close();
            }

            return regionList;
        }

        public static List<MENUserVO> GetRegionsDetails(string userId)
        {
            SystemAdminClient proxy = new SystemAdminClient();
            List<MENUserVO> regionList;

            try
            {

                GetRegionsRequest request = new GetRegionsRequest();
                request.UserData = new MENUserVO();
                request.UserData.MENUserId = userId;
                proxy.Open();
                GetRegionsResponse response = proxy.GetRegionsDetails(request);
                regionList = response.RegionList;
                if (response.Messages != null && response.Messages.Count > 0)
                {
                    //CustomOracleMessage = new List<AppMessage>();
                    //CustomOracleMessage = response.Messages;
                }
            }

            finally
            {
                if (proxy.State == System.ServiceModel.CommunicationState.Faulted)
                    proxy.Abort();
                else
                    proxy.Close();
            }

            return regionList;
        }
    }
}