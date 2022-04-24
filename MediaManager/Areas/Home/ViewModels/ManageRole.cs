using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MediaManager.SystemAdminService;
using System.Web.Mvc.Html;

namespace MediaManager.Areas.Home.ViewModels
{
    public class ManageRole
    {
        public string RoleId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string taskDescription { get; set; }
        public string taskName { get; set; }
        public string PersistFlag { get; set; }
        public string strMessage { get; set; }

        public enum PersistFlagEnum : int
        {

            [System.Runtime.Serialization.EnumMemberAttribute()]
            Added = 0,

            [System.Runtime.Serialization.EnumMemberAttribute()]
            Modified = 1,

            [System.Runtime.Serialization.EnumMemberAttribute()]
            Deleted = 2,

            [System.Runtime.Serialization.EnumMemberAttribute()]
            UnModified = 3,
        }




        #region : Variable and object declartions
        SystemAdminClient proxy = null;
        GetRoleResponse response = null;
        TaskVO taskObject = null;
        GetTaskResponse taskResponse = null;
        TaskControlVO taskControlObject = null;
        #endregion
        #region : List Object & properties
        
        #region : List for all Roles
        public List<Role> manageRoleList { get; set; }
        #endregion

        #region : List for All tasks
        public List<TaskVO> taskRolelist { get; set; }
        #endregion

        public static List<Role> roleList { get; set; }
        public static List<Role> roleWithTask = null;
        public List<TaskControlVO> TaskControlroleList { get; set; }
        
        #endregion
        /// <summary>
        /// It will return list of Roles.
        /// </summary>
        /// <returns></returns>
        #region : Serach Admin role
        public List<Role> SerachAdminRole()
        {
            response = new GetRoleResponse();
            try
            {
                proxy = new SystemAdminClient();
                proxy.Open();
                response = proxy.GetRoles();
                manageRoleList = response.RoleList;
            }
            catch
            {
            }
            finally
            {
                proxy.Close();
            }
            return response.RoleList;
        }
        #endregion
        /// <summary>
        /// Get the all task list.
        /// </summary>
        /// <returns></returns>
        #region : serach Role task
        public List<TaskVO> SearchAdmintask()
        {
            taskObject = new TaskVO();
            taskResponse = new GetTaskResponse();
            try
            {
                proxy = new SystemAdminClient();
                proxy.Open();
                taskResponse = proxy.GetTasks();
            }
            catch
            {

            }
            finally
            {
                proxy.Close();
            }
            return taskResponse.TaskList;
        }
        #endregion


        public List<Role> AddUpdateRole(List<Role> roleListData)
        {
            GetRoleRequest objRoleRequest = new GetRoleRequest();
            proxy = new SystemAdminClient();
            GetRoleResponse objReponse = new GetRoleResponse();
            try
            {
                proxy.Open();
                objRoleRequest.RoleList = roleListData;
                objReponse = proxy.UpdateRoles(objRoleRequest);
                if (objReponse.Messages != null)
                {
                    for (int i = 0; i < objReponse.Messages.Count; i++)
                    {
                        if (!string.IsNullOrEmpty(response.Messages[i].Message))
                        {
                            strMessage = response.Messages[i].Message;
                        }
                    }
                }
            }
            catch
            {

            }
            finally
            {
                proxy.Close();
            }
            return objReponse.RoleList;

        }

        #region : Get task for Role
        public List<Role> GetTaskForRole()
        {
            roleList = SerachAdminRole();
            taskRolelist = SearchAdmintask();
            response=new GetRoleResponse();
            for (int i = 0; i < roleList.Count; i++)
            {
                
            }
            return roleWithTask;
        }
        #endregion

        #region : Get control task for role

        public List<TaskControlVO> GetTaskcontrolRole(int id)
        {
            proxy = new SystemAdminClient();
            GetTaskControlResponse response = new GetTaskControlResponse();
            GetTaskControlRequest request = new GetTaskControlRequest();
            taskControlObject.Id = id;
            try
            {
                taskControlObject = new TaskControlVO();
                proxy.Open();
                request.TaskControlVOList.Add(taskControlObject);
                response = proxy.GetTaskControls(request);
            }
            catch
            {

            }
            finally
            {
                proxy.Close();
            }
            return response.TaskControlVOList;
        }
        #endregion

        //public List<Role> AddAdminRole()
        //{
        //    objRole = new Role();
        //    objRole.Name = this.RoleName;
        //    objRole.Description = this.Description;
        //    GetRoleResponse response = new GetRoleResponse();
        //    try
        //    {
        //        proxy = new SystemAdminClient();
        //        proxy.Open();
        //        GetRoleRequest request = new GetRoleRequest();
        //        request.RoleList.Add(objRole);
        //        response = proxy.UpdateRoles(request);
        //    }
        //    catch
        //    {

        //    }
        //    finally
        //    {
        //        proxy.Close();
        //    }
        //    return response.RoleList;
        //}
    }
    
}