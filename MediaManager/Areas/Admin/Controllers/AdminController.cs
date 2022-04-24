using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MediaManager.Areas.Media_Mgt.ViewModels;
using MediaManager.Areas.Admin.ViewModels;
using System.Web.Script.Serialization;
using MediaManager.SystemAdminService;
using MediaManager.Areas.Admin.BO;
using MediaManager.Areas.Admin.Models;
using Newtonsoft.Json.Linq;
using MediaManager.Infrastructure.Lookups;
using MediaManager.Infrastructure.Authorization;
using MediaManager.Infrastructure.Attributes;
using MediaManager.Models;
using System.DirectoryServices;

namespace MediaManager.Areas.Admin.Controllers
{
    [HandleErrorWithELMAHAttribute]
    public class AdminController : Controller
    {
        //
        // GET: /Admin/Admin/
        public static List<Role> roleList;
        public static List<TaskVO> taskVOlist = null;
        //ManageRole manageroleObject = null;
        ManageRoleViewModel manageroleObject = null;

        

        public ActionResult Index()
        {
            return View();
        }

        #region "Manage Users"
        public string SetUserCredential(string userName,String password)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            List<AppMessage> messageList = new List<AppMessage>();
            try
            {
                string ldapPath = "LDAP://nipns00adc2k3.fps.nihilent.com/DC=FPS,DC=NIHILENT,DC=com";
                DirectoryEntry de = new DirectoryEntry(ldapPath, userName, password);
                DirectorySearcher searcher = new DirectorySearcher(de);
                searcher.Filter = "(SAMAccountName=" + userName + ")";
                searcher.PropertiesToLoad.Add("mail");
                SearchResult col = searcher.FindOne();
                return serializer.Serialize(Json(new { userName = ManageUsersViewModel.Encryptdata(userName), password = ManageUsersViewModel.Encryptdata(password) }));
            }
            catch (Exception ex)
            {
                messageList.Add(new AppMessage() { Type = MessageTypeEnum.Error, Message = ex.Message });
                return serializer.Serialize(messageList);
            }
           
        }
        public static List<SystemUserVO> listSystemUsers;
        [CustomAuthorize(Roles = "ShowManageUsers")]
        public ActionResult ManageUsers()
        {
            return View();
        }
        public string GetSystemADUsersLOV(string userName,string secureUserName,string securePassword)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            List<AppMessage> messageList = new List<AppMessage>();
            try
            {
                ManageUsersViewModel manageUsersViewModel = new ManageUsersViewModel();
                manageUsersViewModel.GetADUsers(userName, secureUserName, securePassword);
                return serializer.Serialize(manageUsersViewModel.ADUsersList);
            }
            catch (Exception ex)
            {
                messageList.Add(new AppMessage() { Type = MessageTypeEnum.Error, Message = ex.Message });
                return serializer.Serialize(messageList);                
            }
        }

        public string GetMenUserDetails(string userName,bool isAdUser)
        {
            ManageUsersViewModel manageUsersViewModel = new ManageUsersViewModel();
            manageUsersViewModel.GetMenUserDetails(userName, isAdUser);
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            return serializer.Serialize(manageUsersViewModel.MenUserDetail);
        }

        public string GetSystemDepartments(string strFilter)
        {
            ManageUsersViewModel manageUsersViewModel = new ManageUsersViewModel();
            manageUsersViewModel.GetSystemDepartments(strFilter);
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            return serializer.Serialize(manageUsersViewModel.SystemDepartmentList);
        }

        public string GetSystemUsersLOV(string userName)
        {
            ManageUsersViewModel manageUsersViewModel = new ManageUsersViewModel();
            manageUsersViewModel.UserName = userName;
            manageUsersViewModel.GetUsersLOVList();
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            return serializer.Serialize(manageUsersViewModel.UserList);
        }


        public string GetSystemUserList(string userName)
        {
            ManageUsersViewModel manageUsersViewModel = new ManageUsersViewModel();
            manageUsersViewModel.UserName = userName;
            manageUsersViewModel.GetSystemUserList();
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            return serializer.Serialize(manageUsersViewModel.UserList);
        }

        public string GetUserRoles(string strFilter)
        {
            ManageUsersViewModel manageUsersViewModel = new ManageUsersViewModel();
            manageUsersViewModel.GetUserRoles(strFilter);
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            return serializer.Serialize(manageUsersViewModel.RoleList);
        }

        public string IsValidADSystemUser(string userId, string secureUserName, string securePassword)
        {
            SystemUserVO objSystemUserVO = null;
            ManageUsersViewModel manageUsersViewModel = new ManageUsersViewModel();
            manageUsersViewModel.GetADUsers(userId, secureUserName, securePassword);


            if (manageUsersViewModel.ADUsersList != null && manageUsersViewModel.ADUsersList.Count > 0)
            {
                userId = userId.Trim();
                objSystemUserVO = (from item in manageUsersViewModel.ADUsersList where item.UserId.ToUpper().Equals(userId.ToUpper()) select item).FirstOrDefault();
            }

            JavaScriptSerializer serializer = new JavaScriptSerializer();
            return serializer.Serialize(objSystemUserVO);
        }

        public string IsUserExist(string userName)
        {
            //bool isUserExist = false;
            SystemUserVO objSystemUserVO = null;
            //MenUserDetail menUserDetail = null;
            ManageUsersViewModel manageUsersViewModel = new ManageUsersViewModel();
            //manageUsersViewModel.UserName = userName;
            objSystemUserVO = manageUsersViewModel.IsUserExist(userName);

            //if (objSystemUserVO != null)
            //{
            //    manageUsersViewModel.GetMenUserDetails(objSystemUserVO.UserId, true);
            //    menUserDetail = manageUsersViewModel.MenUserDetail;
            //}
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            return serializer.Serialize(objSystemUserVO);
        }

        public string IsValidSystemUser(string userId)
        {
            SystemUserVO objSystemUserVO = null;
            ManageUsersViewModel manageUsersViewModel = new ManageUsersViewModel();
            manageUsersViewModel.GetUsersLOVList();


            if (manageUsersViewModel.UserList != null && manageUsersViewModel.UserList.Count > 0)
            {
                objSystemUserVO = (from item in manageUsersViewModel.UserList where item.UserId.ToUpper().Equals(userId.ToUpper()) select item).FirstOrDefault();
            }

            JavaScriptSerializer serializer = new JavaScriptSerializer();
            return serializer.Serialize(objSystemUserVO);
        }

        public string IsValidSystemDepartments(string strFilter)
        {
            SystemDepartmentsVO objSystemDepartmentsVO = null;
            ManageUsersViewModel manageUsersViewModel = new ManageUsersViewModel();
            manageUsersViewModel.GetSystemDepartments(strFilter);

            if (manageUsersViewModel.SystemDepartmentList != null)
            {
                objSystemDepartmentsVO = (from department in manageUsersViewModel.SystemDepartmentList
                                          where department.DepartmentId.ToLower().StartsWith(strFilter.ToLower())
                                          select department).FirstOrDefault();
            }

            JavaScriptSerializer serializer = new JavaScriptSerializer();
            return serializer.Serialize(objSystemDepartmentsVO);
        }

        public string IsValidRole(string strFilter)
        {
            Role objRole = null;
            ManageUsersViewModel manageUsersViewModel = new ManageUsersViewModel();
            manageUsersViewModel.GetUserRoles(strFilter);
            if (manageUsersViewModel.RoleList != null)
            {
                objRole = (from role in manageUsersViewModel.RoleList
                           where role.Name.ToLower().Equals(strFilter.ToLower())
                           select role).FirstOrDefault();
            }

            JavaScriptSerializer serializer = new JavaScriptSerializer();
            return serializer.Serialize(objRole);
        }        

        public string Save(ManageUser manageUser)
        {
            JavaScriptSerializer objSerializer = new JavaScriptSerializer();
            var jsonArray = new JArray();
            List<AppMessage> messageList = new List<AppMessage>();
            try
            {
                if (manageUser != null && manageUser.IsNew)
                {
                    ManageUsersViewModel manageUsersViewModel = new ManageUsersViewModel();
                    //manageUsersViewModel.UserName = userName;
                    SystemUserVO objSystemUserVO = manageUsersViewModel.IsUserExist(manageUser.UserName);
                    if (objSystemUserVO != null)
                    {
                        manageUsersViewModel.GetMenUserDetails(manageUser.UserName, false);
                        string SelectedUserActive=manageUsersViewModel.MenUserDetail!=null? manageUsersViewModel.MenUserDetail.SelectedUserActive:string.Empty;
                        string message = string.Format("User : {0} already exist in system.User Status: {1}", manageUser.UserName, SelectedUserActive);
                        messageList.Add(new AppMessage() { Type = MessageTypeEnum.Information, Message = message });
                        return objSerializer.Serialize(messageList);
                    }
                }
                ManageUsersViewModel objManageUsersViewModel = new ManageUsersViewModel();
                messageList = objManageUsersViewModel.SaveUser(manageUser);
                return objSerializer.Serialize(messageList);
            }
            catch (Exception ex)
            {
                messageList.Add(new AppMessage() { Type = MessageTypeEnum.Error, Message = ex.Message });
                return objSerializer.Serialize(messageList);
            }
        }
        [HttpPost]
        public string AssignRoleToUsers(ManageUsersRole manageUsersRole)
        {
            JavaScriptSerializer objSerializer = new JavaScriptSerializer();
            var jsonArray = new JArray();
            List<AppMessage> messageList = new List<AppMessage>();
            try
            {
                //ManageUsersRole manageUsersRole = new ManageUsersRole()
                //{
                //    RoleName = roleName,
                //    UnAssignedUserList = unAssignedUserList,
                //    UserList = userList
                //};
                ManageUsersViewModel objManageUsersViewModel = new ManageUsersViewModel();
                messageList = objManageUsersViewModel.SaveAssignRoleToUsers(manageUsersRole);
                return objSerializer.Serialize(messageList);
            }
            catch (Exception ex)
            {
                messageList.Add(new AppMessage() { Type = MessageTypeEnum.Error, Message = ex.Message });
                return objSerializer.Serialize(messageList);
            }
        }
        
        public string GetRegions(string userId)
        {
            JavaScriptSerializer objSerializer = new JavaScriptSerializer();
            List<AppMessage> messageList = new List<AppMessage>();
            try
            {
                List<MENUserVO> regionList = null;
                SystemAdminLookupLoader objSystemAdminLookupLoader = new SystemAdminLookupLoader();
                regionList = objSystemAdminLookupLoader.GetRegions(userId);
                return objSerializer.Serialize(regionList);
            }
            catch (Exception ex)
            {
                messageList.Add(new AppMessage() { Type = MessageTypeEnum.Error, Message = ex.Message });
                return objSerializer.Serialize(messageList);
            }
        }

        public string GetUserRegions(string userId)
        {
            JavaScriptSerializer objSerializer = new JavaScriptSerializer();
            List<AppMessage> messageList = new List<AppMessage>();
            try
            {
                List<MENUserVO> regionList = null;
                SystemAdminLookupLoader objSystemAdminLookupLoader = new SystemAdminLookupLoader();
                regionList = objSystemAdminLookupLoader.GetRegionsDetails(userId);
                return objSerializer.Serialize(regionList);
            }
            catch (Exception ex)
            {
                messageList.Add(new AppMessage() { Type = MessageTypeEnum.Error, Message = ex.Message });
                return objSerializer.Serialize(messageList);
            }
        }

        public string SaveUserRegions(ManageUser objManageUser)
        {
            JavaScriptSerializer objSerializer = new JavaScriptSerializer();
            List<AppMessage> messageList = new List<AppMessage>();
            try
            {
                ManageUsersViewModel objManageUsersViewModel = new ManageUsersViewModel();
                messageList = objManageUsersViewModel.SaveUserRegions(objManageUser);
                return objSerializer.Serialize(messageList);
            }
            catch (Exception ex)
            {
                messageList.Add(new AppMessage() { Type = MessageTypeEnum.Error, Message = ex.Message });
                return objSerializer.Serialize(messageList);
            }
        }

        public string GetRolesForUser(string userId)
        {
            SystemUserVO objSystemUserVO = null;
            ManageUsersViewModel manageUsersViewModel = new ManageUsersViewModel();
            //manageUsersViewModel.UserName = userId;
            manageUsersViewModel.GetUsersLOVList();


            if (manageUsersViewModel.UserList != null && manageUsersViewModel.UserList.Count > 0)
            {
                objSystemUserVO = (from item in manageUsersViewModel.UserList where item.UserId.ToUpper().Equals(userId.ToUpper()) select item).FirstOrDefault();
            }

            JavaScriptSerializer serializer = new JavaScriptSerializer();
            return serializer.Serialize(objSystemUserVO);
        }

        #endregion

        #region "Manage Roles"
        [CustomAuthorize(Roles = "ShowManageRoles")]
        public ActionResult ManageRoles()
        {
            return View();
        }
        /// <summary>s
        /// Return Data for First screen slick grid.
        /// </summary>
        /// <returns></returns>
        public string ManageDatarole()
        {
            #region : ManageRole grid Data
            manageroleObject = new ManageRoleViewModel();
            Session["rolelist"] = manageroleObject.manageRoleList = manageroleObject.SerachAdminRole();
            Role objRole = new Role();

            //Session["rolelist"] = manageroleObject.manageRoleList;
            for (int i = 0; i < manageroleObject.manageRoleList.Count; i++)
            {
                manageroleObject.manageRoleList[i].PersistFlag = PersistFlagEnum.UnModified;
                manageroleObject.manageRoleList[i].TasksList.RemoveRange(0, manageroleObject.manageRoleList[i].TasksList.Count);

            }
            System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            return serializer.Serialize(manageroleObject.manageRoleList);
            #endregion
        }
        /// <summary>
        /// Method used to get task as per the role and same used to get all the task details
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public string GetValue(string id)
        {
            #region : Serach task for role
            TaskVO taskVOObject = new TaskVO();
            Role roleObject = new Role();
            manageroleObject = new ManageRoleViewModel();
            manageroleObject.manageRoleList = (List<Role>)Session["rolelist"];
            taskVOlist = manageroleObject.SearchAdmintask();
            roleObject.RoleID = Guid.Parse(id);
            for (int i = 0; i < manageroleObject.manageRoleList.Count; i++)
            {
                if (id == manageroleObject.manageRoleList[i].RoleID.ToString())
                {
                    manageroleObject.taskRolelist = manageroleObject.manageRoleList[i].TasksList;
                }
            }

            Session["TaskList"] = taskVOlist;
            Session["TaskRolelist"] = manageroleObject.taskRolelist;

            JavaScriptSerializer serializer = new JavaScriptSerializer();
            return serializer.Serialize(taskVOlist);
            #endregion
        }
      
        public string GetAllTasks()
        {
            JavaScriptSerializer objSerializer = new JavaScriptSerializer();
            List<AppMessage> messageList = new List<AppMessage>();
            try
            {
                TaskVO taskVOObject = new TaskVO();
                manageroleObject = new ManageRoleViewModel();
                taskVOlist = manageroleObject.SearchAdmintask();
                return objSerializer.Serialize(taskVOlist);
            }
            catch (Exception ex)
            {
                messageList.Add(new AppMessage() { Type = MessageTypeEnum.Error, Message = ex.Message });
                return objSerializer.Serialize(messageList);                
            }
        }

        public string GetRoleTasks(string roleId)
        {
            JavaScriptSerializer objSerializer = new JavaScriptSerializer();
            List<AppMessage> messageList = new List<AppMessage>();
            Role objRole = null;
            List<TaskVO> tasksList = null;
            try
            {
                ManageUsersViewModel manageUsersViewModel = new ManageUsersViewModel();
                manageUsersViewModel.GetUserRoles(roleId);
                if (manageUsersViewModel.RoleList != null)
                {
                    if (!string.IsNullOrEmpty(roleId))
                        roleId = roleId.Trim();
                    objRole = (from role in manageUsersViewModel.RoleList
                               where role.Name.ToLower().Equals(roleId.ToLower())
                               select role).FirstOrDefault();
                }
                if (objRole != null)
                   tasksList= objRole.TasksList ;  
                return objSerializer.Serialize(tasksList);
            }
            catch (Exception ex)
            {
                messageList.Add(new AppMessage() { Type = MessageTypeEnum.Error, Message = ex.Message });
                return objSerializer.Serialize(messageList);
            }
        }

        [HttpPost]
        public string SaveRoleDesc(List<Role> objRoleList)
        {
            ManageRoleViewModel ManageRoleViewModel = new ManageRoleViewModel();
            List<AppMessage> messageList = new List<AppMessage>();
            JavaScriptSerializer objSerializer = new JavaScriptSerializer();
            try
            {
                messageList = ManageRoleViewModel.SaveRoles(objRoleList);
                return objSerializer.Serialize(messageList);
            }
            catch (Exception ex)
            {
                messageList.Add(new AppMessage() { Type = MessageTypeEnum.Error, Message = ex.Message });
                return objSerializer.Serialize(messageList);                    
            }
        }
        #endregion
    }
}
