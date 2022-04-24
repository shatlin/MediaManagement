using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MediaManager.SystemAdminService;
using MediaManager.Infrastructure.Lookups;
using System.DirectoryServices;
using System.Text;
using MediaManager.Areas.Admin.BO;
using MediaManager.Areas.Admin.Models;
using MediaManager.Areas.Home.BO;
using System.Security.Cryptography;
using System.Web.Security;
using System.Configuration;
using System.DirectoryServices.ActiveDirectory;
using System.Net.NetworkInformation;

namespace MediaManager.Areas.Admin.ViewModels
{
    public class ManageUsersViewModel
    {
        #region Data Member
        public List<SystemUserVO> UserList { get; set; }
        public string UserName { get; set; }
        public List<SystemUserVO> ADUsersList { get; set; }
        SystemAdminLookupLoader systemAdminLookupLoader = new SystemAdminLookupLoader();
        public MenUserDetail MenUserDetail { get; set; }
        public List<SystemDepartmentsVO> SystemDepartmentList { get; set; }
        public List<Role> RoleList;
        #endregion

        #region LookUp

        public void GetSystemUserList()
        {
            this.UserList = systemAdminLookupLoader.GetSystemUsersLOV();
            if (!String.IsNullOrEmpty(UserName))
            {
                UserName = UserName.Replace("%", " ");
                UserName = UserName.Trim().ToUpper();

                UserList = (from user in UserList
                            where user.UserName.ToLower().StartsWith(UserName.ToLower())
                            select user).ToList();
            }
        }

        public void GetUsersLOVList()
        {
            this.UserList = systemAdminLookupLoader.GetSystemUsersLOV();
            if (!String.IsNullOrEmpty(UserName))
            {
                UserName = UserName.Replace("%", " ");
                UserName = UserName.Trim().ToUpper();

                UserList = (from user in UserList
                            where user.UserId.ToLower().StartsWith(UserName.ToLower())
                                       select user).ToList();
            }
        }

        public void GetADUsers(string strFilter, string secureUserName, string securePassword)
        {
            if (!string.IsNullOrEmpty(strFilter))
            {
                strFilter = strFilter.Replace("%", " ");
                strFilter = strFilter.Trim().ToUpper();
            }
            string sFilter = "((objectClass=user)";
            sFilter = string.Format("(&(objectClass=user)(cn={0}*))", strFilter);
            ADUsersList = new List<SystemUserVO>();
            ADUsersList = GetActiveDirectoryData(sFilter,secureUserName, securePassword);
            //return listADUsers;
        }

        private List<SystemUserVO> GetActiveDirectoryData(string sFilter, string secureUserName, string securePassword)
        {
            List<SystemUserVO> listUsers = new List<SystemUserVO>();
            int iCount = 1;
            DirectoryEntry de;
            DirectorySearcher ds;
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

            string ldapPath = "LDAP://" + domenName; 

            de = new DirectoryEntry(ldapPath, ManageUsersViewModel.Decryptdata(secureUserName), ManageUsersViewModel.Decryptdata(securePassword));
            //de = new DirectoryEntry();
            ds = new DirectorySearcher(de, sFilter);



            ds.PageSize = 100;
            SortOption objSortOption = new SortOption();
            objSortOption.Direction = SortDirection.Ascending;

            ds.Sort = objSortOption;
            ds.Asynchronous = true;

            SearchResultCollection src = ds.FindAll();

            foreach (SearchResult sr in src)
            {
                //if (iCount < 100)
                //{
                SystemUserVO adUser = new SystemUserVO();
                StringBuilder sRow = new StringBuilder();

                DirectoryEntry de1 = sr.GetDirectoryEntry();

                if (de1.Properties["givenName"].Value != null)
                {
                    adUser = new SystemUserVO();
                    adUser.UserName = de1.Properties["sAMAccountName"].Value.ToString();

                    //First Name
                    if (de1.Properties["givenName"].Value != null)
                    {
                        adUser.UserId = de1.Properties["givenName"].Value.ToString();

                        if (de1.Properties["sn"].Value != null)
                        {
                            adUser.UserId += " " + de1.Properties["sn"].Value.ToString();
                        }
                    }

                    listUsers.Add(adUser);
                }

                de1.Close();
                iCount++;

                //}
                //else
                //    break;
            }

            return listUsers;
        }

        public void GetMenUserDetails(string userName, bool isAdUser)
        {            
            string domenName="";
            try
            {
                if (IPGlobalProperties.GetIPGlobalProperties().DomainName!=null)
                    domenName = IPGlobalProperties.GetIPGlobalProperties().DomainName.Split('.')[0];
                if (string.IsNullOrEmpty(domenName))
                    domenName = Domain.GetComputerDomain().Forest.Name.Split('.')[0];
            }
            catch (ActiveDirectoryObjectNotFoundException)
            {
                domenName = ConfigurationManager.AppSettings["DomainName"];
            }

            if (isAdUser)
                userName = domenName + "\\" + userName;
            List<MENUserVO> menUserVOList = SystemAdminBO.GetMenUserDetails(userName);
            MenUserDetail = new MenUserDetail(menUserVOList);
            MenUserDetail.UserNameDesc =  userName;
        }

        public void GetSystemDepartments(string strFilter)
        {
            this.SystemDepartmentList = systemAdminLookupLoader.GetSystemDepartmentLOV();
            if (!String.IsNullOrEmpty(strFilter))
            {
                    strFilter = strFilter.Replace("%", " ");
                    strFilter = strFilter.Trim().ToUpper();
                SystemDepartmentList = (from user in SystemDepartmentList
                            where user.DepartmentId.ToLower().StartsWith(strFilter.ToLower())
                            select user).ToList();
            }
        }

        public void GetUserRoles(string strFilter)
        {
            this.RoleList = systemAdminLookupLoader.GetRoles();
            if (!String.IsNullOrEmpty(strFilter))
            {
                strFilter = strFilter.Replace("%", " ");
                strFilter = strFilter.Trim().ToUpper();

                RoleList = (from role in RoleList
                             where role.Name.ToLower().StartsWith(strFilter.ToLower())
                             select role).ToList();
            }
        }
        #endregion

        #region Save

        public List<AppMessage> SaveUserRegions(ManageUser objManageUser)
        {
            List<AppMessage> messageList = new List<AppMessage>();
            SystemAdminBO objSystemAdminBO = new SystemAdminBO();
            SystemAdminLookupLoader objSystemAdminLookupLoader = new SystemAdminLookupLoader();
            List<MENUserVO> regionList = new List<MENUserVO>();
            List<MENUserVO> allRegionList = objSystemAdminLookupLoader.GetRegions(objManageUser.UserId);
            List<MENUserVO> userRegionList = objSystemAdminLookupLoader.GetRegionsDetails(objManageUser.UserId);
            if (objManageUser.RegionCodeList != null && objManageUser.RegionCodeList.Count>0)
            {
                MENUserVO objRegion = null;
                    foreach(string regionCode in objManageUser.RegionCodeList)
                    {
                        //MENUserVO objOldRegion = (from item in userRegionList where item.RegionCode.ToUpper().Equals(regionCode) select item).FirstOrDefault();
                        //if (objOldRegion == null)
                        //{
                            objRegion = (from item in allRegionList where item.RegionCode.ToUpper().Equals(regionCode) select item).FirstOrDefault();
                            if (objRegion != null)
                            {
                                objRegion.PersistFlag = PersistFlagEnum.Added;
                                regionList.Add(objRegion);
                            }
                        //}
                    }
            }
            //if (objManageUser.UnAssignRegionCodeList != null && objManageUser.UnAssignRegionCodeList.Count>0)
            //{
            //    if (regionList==null)
            //        regionList = new List<MENUserVO>();

            //    foreach (string unAssignRegionCode in objManageUser.UnAssignRegionCodeList)
            //    {
            //        MENUserVO objOldRegion = (from item in userRegionList where item.RegionCode.ToUpper().Equals(unAssignRegionCode.ToUpper()) select item).FirstOrDefault();
            //        if (objOldRegion != null)
            //        {
            //            objOldRegion.PersistFlag = PersistFlagEnum.Deleted;
            //            regionList.Add(objOldRegion);
            //        }
            //    }
            //}
            objSystemAdminBO.SaveUserRegions(regionList, objManageUser.UserId.ToUpper());
            messageList = objSystemAdminBO.customOracleMessage;
            if (messageList == null || messageList.Count == 0)
            {
                messageList = new List<AppMessage>();
                messageList.Add(new AppMessage() { Type = MessageTypeEnum.Information, Message = "Data Saved Successfully !" });
            }

            //////////////////////////////////////  This code is not called in main Media /////////////////////////////
            //MENUserVO objMenUserVO = new MENUserVO();
            //objMenUserVO.PersistFlag = PersistFlagEnum.Modified;
            //objMenUserVO.ManagerName = objManageUser.ManagerName;
            //objMenUserVO.MENUserId = objManageUser.UserId;
            //objMenUserVO.MENUserLogin = objManageUser.UserName;
            //objMenUserVO.DepartmentName = objManageUser.DepartmentName;
            //objMenUserVO.UserStatus = objManageUser.UserStatus;
            //List<AppMessage> saveMessageList = UpdateUser(objMenUserVO);
            //if (saveMessageList != null && saveMessageList.Count > 0)
            //{
            //    if (messageList == null)
            //        messageList = new List<AppMessage>();
            //    foreach (AppMessage objAppMessage in saveMessageList)
            //    {
            //        messageList.Add(objAppMessage);
            //    }
            //}
            return messageList;
        }
        public List<AppMessage> SaveAssignRoleToUsers(ManageUsersRole objManageUsersRole)
        {
            List<AppMessage> messageList=null;
            SystemAdminBO.listSystemUsers.Clear();
            List<SystemUserVO> userList = systemAdminLookupLoader.GetSystemUsersLOV();
            if (objManageUsersRole.UserNameList != null && objManageUsersRole.UserNameList.Count > 0)
            {
                for (int index = 0; index < objManageUsersRole.UserNameList.Count; index++)
                {
                    Role objRole=null;
                    SystemUserVO objSystemUserVO=null;
                    if(userList!=null)
                        objSystemUserVO = (from item in userList
                                           where item.UserName.ToUpper().Equals(objManageUsersRole.UserNameList[index].ToUpper())
                                           select 
                                                  item ).FirstOrDefault();
                    if (objSystemUserVO != null)
                    {
                        if (objSystemUserVO.RoleList != null)
                            objRole = (from item in objSystemUserVO.RoleList where item.Name.ToUpper().Equals(objManageUsersRole.RoleName.ToUpper()) select item).FirstOrDefault();
                    if (objRole == null)
                    {
                        Role objNewRole = new Role() { Name = objManageUsersRole.RoleName,PersistFlag= PersistFlagEnum.Added };
                        SystemUserVO systemUserVO = new SystemUserVO();
                            systemUserVO.UserId = objSystemUserVO.UserId;
                            systemUserVO.UserName = objSystemUserVO.UserName;
                        systemUserVO.PersistFlag = PersistFlagEnum.UnModified;
                        systemUserVO.RoleList = new List<Role>();
                        systemUserVO.RoleList.Add(objNewRole);
                        SystemAdminBO.listSystemUsers.Add(systemUserVO);
                    }
                }
            }
            }
            if (objManageUsersRole.UnAssignedUserNameList != null && objManageUsersRole.UnAssignedUserNameList.Count > 0)
            {
                for (int index = 0; index < objManageUsersRole.UnAssignedUserNameList.Count; index++)
                {
                    Role objRole = null;
                    SystemUserVO objSystemUserVO = null;
                    if (userList != null)
                        objSystemUserVO = (from item in userList
                                           where item.UserName.ToUpper().Equals(objManageUsersRole.UnAssignedUserNameList[index].ToUpper())
                                           select
                                                  item).FirstOrDefault();
                    if (objSystemUserVO != null)
                    {
                        if (objSystemUserVO.RoleList != null)
                            objRole = (from item in objSystemUserVO.RoleList where item.Name.ToUpper().Equals(objManageUsersRole.RoleName.ToUpper()) select item).FirstOrDefault();
                    if (objRole != null)
                    {
                        Role objDeletedRole = new Role() { Name = objRole.Name, PersistFlag = PersistFlagEnum.Deleted };
                        SystemUserVO systemUserVO = new SystemUserVO();
                            systemUserVO.UserId = objSystemUserVO.UserId;
                            systemUserVO.UserName = objSystemUserVO.UserName;
                        systemUserVO.PersistFlag = PersistFlagEnum.UnModified;
                        systemUserVO.RoleList = new List<Role>();
                        systemUserVO.RoleList.Add(objDeletedRole);
                        SystemAdminBO.listSystemUsers.Add(systemUserVO);
                    }
                }
            }
            }
            //if (objManageUsersRole.UserList != null && objManageUsersRole.UserList.Count > 0)
            //{
            //    for (int index = 0; index < objManageUsersRole.UserList.Count;index++)
            //    {
            //        Role objRole=null;
            //        if(objManageUsersRole.UserList[index].RoleList!=null)
            //            objRole = (from item in objManageUsersRole.UserList[index].RoleList where item.Name.ToUpper().Equals(objManageUsersRole.RoleName.ToUpper()) select item).FirstOrDefault();
            //        if (objRole == null)
            //        {
            //            Role objNewRole = new Role() { Name = objManageUsersRole.RoleName,PersistFlag= PersistFlagEnum.Added };
            //            SystemUserVO systemUserVO = new SystemUserVO();
            //            systemUserVO.UserId = objManageUsersRole.UserList[index].UserId;
            //            systemUserVO.UserName = objManageUsersRole.UserList[index].UserName;
            //            systemUserVO.PersistFlag = PersistFlagEnum.UnModified;
            //            systemUserVO.RoleList = new List<Role>();
            //            systemUserVO.RoleList.Add(objNewRole);
            //            SystemAdminBO.listSystemUsers.Add(systemUserVO);
            //        }
            //    }
            //}

            //if (objManageUsersRole.UnAssignedUserList != null && objManageUsersRole.UnAssignedUserList.Count > 0)
            //{
            //    for (int index = 0; index < objManageUsersRole.UnAssignedUserList.Count; index++)
            //    {
            //        Role objRole = null;
            //        if (objManageUsersRole.UnAssignedUserList[index].RoleList != null)
            //            objRole = (from item in objManageUsersRole.UnAssignedUserList[index].RoleList where item.Name.ToUpper().Equals(objManageUsersRole.RoleName.ToUpper()) select item).FirstOrDefault();
            //        if (objRole != null)
            //        {
            //            Role objDeletedRole = new Role() { Name = objRole.Name, PersistFlag = PersistFlagEnum.Deleted };
            //            SystemUserVO systemUserVO = new SystemUserVO();
            //            systemUserVO.UserId = objManageUsersRole.UnAssignedUserList[index].UserId;
            //            systemUserVO.UserName = objManageUsersRole.UnAssignedUserList[index].UserName;
            //            systemUserVO.PersistFlag = PersistFlagEnum.UnModified;
            //            systemUserVO.RoleList = new List<Role>();
            //            systemUserVO.RoleList.Add(objDeletedRole);
            //            SystemAdminBO.listSystemUsers.Add(systemUserVO);
            //        }
            //    }
            //}
            MENUserVO menUserVO = new MENUserVO();
            messageList = UpdateUser(menUserVO);
            return messageList;
        }

        public List<AppMessage> SaveUser(ManageUser manageUser)
        {
            MENUserVO menUserVO = new MENUserVO();
            if (manageUser.IsNew)
                menUserVO.PersistFlag = PersistFlagEnum.Added;
            else
                menUserVO.PersistFlag = PersistFlagEnum.Modified;

            menUserVO.ManagerName = !String.IsNullOrEmpty(manageUser.ManagerName)?manageUser.ManagerName:String.Empty;
            menUserVO.DepartmentName = !String.IsNullOrEmpty(manageUser.DepartmentName) ? manageUser.DepartmentName : String.Empty;
            menUserVO.UserStatus = manageUser.UserStatus;

            SystemUserVO systemUserVO = new SystemUserVO();
            systemUserVO.UserId = manageUser.UserId;
            systemUserVO.UserName = manageUser.UserName;
            if (manageUser.IsNew)
                systemUserVO.PersistFlag = PersistFlagEnum.Added;
            else
                systemUserVO.PersistFlag = PersistFlagEnum.Modified;

            if (manageUser.IsNew)
            {
                if (manageUser.RoleList != null)
                {
                    for (int index = 0; index < manageUser.RoleList.Count; index++)
                    {
                        manageUser.RoleList[index].PersistFlag = PersistFlagEnum.Added;
                    }
                }
                    systemUserVO.RoleList = manageUser.RoleList;
            }
            else
            {
                if (manageUser.RoleList != null)
                {
                    systemUserVO.RoleList = new List<Role>();
                    if (manageUser.OldRoleList != null)
                    {
                        for (int k = 0; k < manageUser.OldRoleList.Count; k++)
                        {
                            if (manageUser.RoleList != null)
                            {
                                Role objRole = (from item in manageUser.RoleList where item.Name.Equals(manageUser.OldRoleList[k].Name) select item).FirstOrDefault();
                                if (objRole == null)
                                {
                                    manageUser.OldRoleList[k].PersistFlag = PersistFlagEnum.Deleted;
                                }
                            }
                            systemUserVO.RoleList.Add(manageUser.OldRoleList[k]);
                        }
                    }
                    for (int k = 0; k < manageUser.RoleList.Count; k++)
                    {
                        Role objRole = (from item in systemUserVO.RoleList where item.Name.Equals(manageUser.RoleList[k].Name) select item).FirstOrDefault();
                        if (objRole == null)
                        {
                            manageUser.RoleList[k].PersistFlag = PersistFlagEnum.Added;
                            systemUserVO.RoleList.Add(manageUser.RoleList[k]);
                        }
                    }
                }

                //////////////////////////// copy role from user /////////////////////////////
                if (!String.IsNullOrEmpty(manageUser.CopyRoleFromEditUserID))
                {
                    SystemUserVO systemUserReqWithRoles = new SystemUserVO();
                    List<SystemUserVO> listSystemUsers = systemAdminLookupLoader.GetSystemUsersLOV();
                    if (listSystemUsers != null)
                    {
                        foreach (SystemUserVO suVO in listSystemUsers)
                        {
                            if (suVO.UserId == manageUser.CopyRoleFromEditUserID)
                            {
                                systemUserReqWithRoles = suVO;
                                break;
                            }
                        }
                    }
                    if (systemUserReqWithRoles.RoleList != null)
                    {
                        for (int i = 0; i < systemUserReqWithRoles.RoleList.Count; i++)
                        {
                            Role objRole = null; 
                             if(systemUserVO.RoleList!=null)
                               objRole = (from item in systemUserVO.RoleList where item.Name.Equals(systemUserReqWithRoles.RoleList[i].Name) select item).FirstOrDefault();
                            if (objRole == null)
                            {
                                Role role = new Role();
                                role.Name = systemUserReqWithRoles.RoleList[i].Name;
                                role.PersistFlag = PersistFlagEnum.Added;
                                if (systemUserVO.RoleList == null)
                                    systemUserVO.RoleList = new  List<Role>();
                                systemUserVO.RoleList.Add(role);
                            }
                        }
                    }
                }
            }
            SystemAdminBO.listSystemUsers.Clear();
            SystemAdminBO.listSystemUsers.Add(systemUserVO);
            List<AppMessage> messageList =UpdateUser( menUserVO);
            return messageList;
        }

        private List<AppMessage> UpdateUser(MENUserVO menUserVO)
        {   
            List<SystemUserVO> listSystemUsers = SystemAdminBO.UpdateUsers(menUserVO);
            string errorMessage = string.Empty;
            // for tasks 
            AppMessage messageForRole, messageForUser;
            List<AppMessage> messageList = new List<AppMessage>();

            for (int i = 0; i < listSystemUsers.Count; i++)
            {
                messageForUser = new AppMessage();
                //messages for Roles
                for (int j = 0; j < listSystemUsers[i].RoleList.Count; j++)
                {
                    messageForRole = new AppMessage();

                    if (listSystemUsers[i].RoleList[j].SuccessFlag == false)
                    {
                        if (listSystemUsers[i].RoleList[j].PersistFlag == PersistFlagEnum.Added)
                        {
                            messageForRole.Message = "For User Name : " + listSystemUsers[i].UserName + ", " + "Role : " + listSystemUsers[i].RoleList[j].Name + "  Cannot insert the data."; //+listSystemUsers[i].RoleList[j].Messages; // Messages.Messages.InsertErrorMessage;
                            messageForRole.Type = MessageTypeEnum.Error;
                            messageList.Add(messageForRole);
                        }
                        if (listSystemUsers[i].RoleList[j].PersistFlag == PersistFlagEnum.Deleted)
                        {
                            messageForRole.Message = "For User Name : " + listSystemUsers[i].UserName + ", " + "Role : " + listSystemUsers[i].RoleList[j].Name + " Cannot remove the data."; //+ listSystemUsers[i].RoleList[j].Messages; // Messages.Messages.RemoveErrorMessage;
                            messageForRole.Type = MessageTypeEnum.Error;
                            messageList.Add(messageForRole);
                        }
                    }
                    else
                    {
                        if (listSystemUsers[i].RoleList[j].PersistFlag == PersistFlagEnum.Added)
                        {
                            messageForRole.Message = "For User Name : " + listSystemUsers[i].UserName + ", " + "Role : " + listSystemUsers[i].RoleList[j].Name + " Data insert successfully."; //+ listSystemUsers[i].RoleList[j].Messages; // Messages.Messages.InsertSuccessMessage;
                            messageForRole.Type = MessageTypeEnum.Information;
                            messageList.Add(messageForRole);
                        }
                        if (listSystemUsers[i].RoleList[j].PersistFlag == PersistFlagEnum.Deleted)
                        {
                            messageForRole.Message = "For User Name : " + listSystemUsers[i].UserName + ", " + "Role : " + listSystemUsers[i].RoleList[j].Name + " Data removed successfully."; //+ listSystemUsers[i].RoleList[j].Messages; // Messages.Messages.RemoveSuccessMessage;
                            messageForRole.Type = MessageTypeEnum.Information;
                            messageList.Add(messageForRole);
                        }
                    }

                }
                if (listSystemUsers[i].SuccessFlag == false)
                { 
                    if (listSystemUsers[i].PersistFlag == PersistFlagEnum.Added)
                    {
                        messageForUser.Message = "User Name : " + listSystemUsers[i].UserName + "  Cannot insert the data."; //+ listSystemUsers[i].Messages; // Messages.Messages.InsertErrorMessage;
                        messageForUser.Type = MessageTypeEnum.Error;
                        messageList.Add(messageForUser);
                    }
                    if (listSystemUsers[i].PersistFlag == PersistFlagEnum.Deleted)
                    {
                        messageForUser.Message = "User Name : " + listSystemUsers[i].UserName + " Cannot remove the data.";//+ listSystemUsers[i].Messages; // Messages.Messages.RemoveErrorMessage;
                        messageForUser.Type = MessageTypeEnum.Error;
                        messageList.Add(messageForUser);
                    }
                    if (listSystemUsers[i].PersistFlag == PersistFlagEnum.Modified)
                    {
                        messageForUser.Message = "User Name : " + listSystemUsers[i].UserName + " Cannot update the data."; //+ listSystemUsers[i].Messages; // Messages.Messages.UpdateErrorMessage;
                        messageForUser.Type = MessageTypeEnum.Error;
                        messageList.Add(messageForUser);
                    }
                }
                else
                {
                    string UserName = listSystemUsers[i].UserName;
                    int index1 = UserName.LastIndexOf("\\");
                    if (index1 != -1)
                    {
                        UserName=UserName.Substring(index1+1);
                    }
                    if (UserName == HttpContext.Current.User.Identity.Name)
                    {
                        MediaManager.SystemAdminService.SystemUserVO UserVO = null;
                        GetUsersLOVList();

                        if (this.UserList != null && this.UserList.Count > 0)
                        {
                            UserVO = (from item in this.UserList where item.UserId.ToUpper().Equals(UserName.ToUpper()) select item).FirstOrDefault();
                        }
                        List<string> userRole = new List<string>();
                        if (UserVO.RoleList != null && UserVO.RoleList.Count > 0)
                        {
                            userRole = (from r in UserVO.RoleList select r.Name.ToString()).ToList();
                        }
                        string[] rolesArr = userRole.ToArray();
                        HttpContext.Current.Cache.Remove(FormsAuthentication.FormsCookieName);
                        FormsAuthenticationTicket ticket = new FormsAuthenticationTicket(1, HttpContext.Current.User.Identity.Name, DateTime.Now, DateTime.Now.AddMinutes(3600), false, String.Join(";", rolesArr), FormsAuthentication.FormsCookiePath);
                        string hash = FormsAuthentication.Encrypt(ticket);
                        HttpCookie cookie = new HttpCookie(FormsAuthentication.FormsCookieName, hash);
                        if (ticket.IsPersistent)
                        {
                            cookie.Expires = ticket.Expiration;
                        }
                        HttpContext.Current.Response.Cookies.Add(cookie);
                    }
  
                    if (listSystemUsers[i].PersistFlag == PersistFlagEnum.Added)
                    {
                        messageForUser.Message = "User Name : " + listSystemUsers[i].UserName + " Data insert successfully."; //+ listSystemUsers[i].Messages; // Messages.Messages.InsertSuccessMessage;
                        messageForUser.Type = MessageTypeEnum.Information;
                        messageList.Add(messageForUser);
                    }
                    if (listSystemUsers[i].PersistFlag == PersistFlagEnum.Deleted)
                    {
                        messageForUser.Message = "User Name : " + listSystemUsers[i].UserName + " Data removed successfully."; //+ listSystemUsers[i].Messages; // Messages.Messages.RemoveSuccessMessage;
                        messageForUser.Type = MessageTypeEnum.Information;
                        messageList.Add(messageForUser);
                    }
                    if (listSystemUsers[i].PersistFlag == PersistFlagEnum.Modified)
                    {
                        messageForUser.Message = "User Name : " + listSystemUsers[i].UserName + " Data updated successfully."; //+ listSystemUsers[i].Messages; // Messages.Messages.UpdateSuccessMessage;
                        messageForUser.Type = MessageTypeEnum.Information;
                        messageList.Add(messageForUser);
                    }
                }


                
                
            }
            return messageList;
        }
        #endregion

        #region Encription
        
        /// <summary>
        /// Function is used to encrypt the password
        /// </summary>
        /// <param name="password"></param>
        /// <returns></returns>
        public static string Encryptdata(string password)
        {
            string strmsg = string.Empty;
            if (!String.IsNullOrEmpty(password))
            {
                byte[] encode = new byte[password.Length];
                encode = Encoding.UTF8.GetBytes(password);
                strmsg = Convert.ToBase64String(encode);
            }
            return strmsg;
        }
        /// <summary>
        /// Function is used to Decrypt the password
        /// </summary>
        /// <param name="password"></param>
        /// <returns></returns>
        public static string Decryptdata(string encryptpwd)
        {
            string decryptpwd = string.Empty;
            UTF8Encoding encodepwd = new UTF8Encoding();
            Decoder Decode = encodepwd.GetDecoder();
            if (!String.IsNullOrEmpty(encryptpwd))
            {
                byte[] todecode_byte = Convert.FromBase64String(encryptpwd);
                int charCount = Decode.GetCharCount(todecode_byte, 0, todecode_byte.Length);
                char[] decoded_char = new char[charCount];
                Decode.GetChars(todecode_byte, 0, todecode_byte.Length, decoded_char, 0);
                decryptpwd = new String(decoded_char);
            }
            return decryptpwd;
        }
        #endregion
        public SystemUserVO IsUserExist(string userName)
        {
            SystemUserVO objSystemUserVO=null;
            this.UserList = systemAdminLookupLoader.GetSystemUsersLOV();
            if (!String.IsNullOrEmpty(userName))
            {
                userName = userName.Replace("%", " ");
                userName = userName.Trim().ToUpper();
                objSystemUserVO = (from user in UserList
                                   where user.UserName.ToLower().Equals(userName.ToLower())
                            select user).FirstOrDefault();
            }
            return objSystemUserVO;
        }


    }

    public class MenUserDetail
    {
        public string UserNameDesc { get; set; }
        public string DepartmentName { get; set; }
        public string ManagerName { get; set; }
        public bool UserStatus { get; set; }
        public string SelectedUserActive { get; set; }
        public List<MENUserVO> MenUserVOList { get; set; }
        public MenUserDetail(List<MENUserVO> menUserVOList)
        {
            if (menUserVOList.Count > 0)
            {
                DepartmentName = menUserVOList[0].DepartmentName;
                ManagerName = menUserVOList[0].ManagerName;
                UserStatus = menUserVOList[0].UserStatus;
                if (UserStatus)
                    SelectedUserActive = "Active";
                else
                    SelectedUserActive = "Inactive";
            }
        }

    }
}