using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MediaManager.SystemAdminService;
using System.Web.Mvc.Html;


namespace MediaManager.Areas.Admin.ViewModels
{
    public class ManageRoleViewModel
    {
        public string RoleId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string taskDescription { get; set; }
        public string taskName { get; set; }
        public string PersistFlag { get; set; }
        public string strMessage { get; set; }

        //public enum PersistFlagEnum : int
        //{

        //    [System.Runtime.Serialization.EnumMemberAttribute()]
        //    Added = 0,

        //    [System.Runtime.Serialization.EnumMemberAttribute()]
        //    Modified = 1,

        //    [System.Runtime.Serialization.EnumMemberAttribute()]
        //    Deleted = 2,

        //    [System.Runtime.Serialization.EnumMemberAttribute()]
        //    UnModified = 3,
        //}
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

        public List<AppMessage> SaveRoles(List<Role> rolelist)
        {
            List<Role> ChangeTaskRolelist = new List<Role>();
            
            List<AppMessage> appMessageList = new List<AppMessage>();
            for (int i = 0; i < rolelist.Count; i++)
            {
                Role role = new Role();
                role.PersistFlag = PersistFlagEnum.UnModified;
                role.TasksList = new List<TaskVO>();
                if (rolelist[i].PersistFlag == PersistFlagEnum.Added)
                {
                    role.RoleID = rolelist[i].RoleID;
                    role.Name = rolelist[i].Name;
                    role.Description = rolelist[i].Description;
                    role.PersistFlag = PersistFlagEnum.Added;
                }
                if (rolelist[i].PersistFlag == PersistFlagEnum.Modified)
                {
                    role.RoleID = rolelist[i].RoleID;
                    role.Name = rolelist[i].Name;
                    role.Description = rolelist[i].Description;
                    role.PersistFlag = PersistFlagEnum.Modified;
                }
                if (rolelist[i].TasksList != null)
                {
                    List<TaskVO> taskList = SearchAdmintask();
                    TaskVO objTaskVO = null;
                    for (int j = 0; j < rolelist[i].TasksList.Count; j++)
                    {
                        if (rolelist[i].TasksList[j].PersistFlag == PersistFlagEnum.Added || rolelist[i].TasksList[j].PersistFlag == PersistFlagEnum.Deleted)
                        {
                            if (taskList != null)
                                objTaskVO = (from task in taskList where task.Id.Equals(rolelist[i].TasksList[j].Id) select task).FirstOrDefault();
                            if (objTaskVO != null)
                            {
                                role.RoleID = rolelist[i].RoleID;
                                role.Name = rolelist[i].Name;
                                role.Description = rolelist[i].Description;
                                objTaskVO.PersistFlag = rolelist[i].TasksList[j].PersistFlag;
                                role.TasksList.Add(objTaskVO);
                            }
                        }
                    }
                }
                ChangeTaskRolelist.Add(role);
            }
            appMessageList = UpdateRole(ChangeTaskRolelist);
            return appMessageList;
        }

        private bool CheckDuplicate( List<Role> changeTaskRolelist)
        {
            bool isRoleExist = false;
            List<Role> oldRolelist = SerachAdminRole();
            if (changeTaskRolelist != null && oldRolelist!=null)
            {
                foreach (Role role in changeTaskRolelist)
                {
                    if (role.PersistFlag == PersistFlagEnum.Added)
                    {
                        Role oldRole = (from item in oldRolelist where item.Name.ToUpper().Equals(role.Name.ToUpper()) select item).FirstOrDefault();
                        if (oldRole != null)
                        {
                            isRoleExist = true;
                            break;
                        }
                    }
                }
            }

            return isRoleExist;
        }


        private List<AppMessage> UpdateRole(List<Role> changeTaskRolelist)
        {
            AppMessage messageForTask, messageForRole;
            List<AppMessage> messageList = new List<AppMessage>();

            if (!CheckDuplicate(changeTaskRolelist))
            {
                List<Role> updatedRoleList = AddUpdateRole(changeTaskRolelist);
                if (updatedRoleList != null)
                {
                    for (int i = 0; i < updatedRoleList.Count; i++)
                    {
                        messageForRole = new AppMessage();
                        if (updatedRoleList[i].SuccessFlag == false)
                        {
                            if (updatedRoleList[i].PersistFlag == PersistFlagEnum.Added)
                            {
                                messageForRole.Message = "Role Name : " + updatedRoleList[i].Name + " Cannot insert the data."; //+Messages.Messages.InsertErrorMessage;
                                messageForRole.Type = MessageTypeEnum.Error;
                                messageList.Add(messageForRole);
                            }
                            if (updatedRoleList[i].PersistFlag == PersistFlagEnum.Deleted)
                            {
                                // if (string.IsNullOrEmpty(strDeleteMessage))
                                messageForRole.Message = "Role Name : " + updatedRoleList[i].Name + " Cannot remove the data."; //+ Messages.Messages.RemoveErrorMessage;
                                //else
                                //    messageForRole.Message = "Role Name : " + roleList[i].Name + " " + strDeleteMessage;

                                messageForRole.Type = MessageTypeEnum.Error;
                                messageList.Add(messageForRole);

                            }
                            if (updatedRoleList[i].PersistFlag == PersistFlagEnum.Modified)
                            {
                                messageForRole.Message = "Role Name : " + updatedRoleList[i].Name + " Cannot update the data."; //+Messages.Messages.UpdateErrorMessage;
                                messageForRole.Type = MessageTypeEnum.Error;
                                messageList.Add(messageForRole);
                            }


                        }
                        else
                        {
                            if (updatedRoleList[i].PersistFlag == PersistFlagEnum.Added)
                            {
                                messageForRole.Message = "Role Name : " + updatedRoleList[i].Name + " Data insert successfully."; //+Messages.Messages.InsertSuccessMessage;
                                messageForRole.Type = MessageTypeEnum.Information;
                                messageList.Add(messageForRole);
                            }
                            if (updatedRoleList[i].PersistFlag == PersistFlagEnum.Deleted)
                            {
                                messageForRole.Message = "Role Name : " + updatedRoleList[i].Name + " Data removed successfully."; //+Messages.Messages.RemoveSuccessMessage;
                                messageForRole.Type = MessageTypeEnum.Information;
                                messageList.Add(messageForRole);
                            }
                            if (updatedRoleList[i].PersistFlag == PersistFlagEnum.Modified)
                            {
                                messageForRole.Message = "Role Name : " + updatedRoleList[i].Name + " Data updated successfully."; //+Messages.Messages.UpdateSuccessMessage;
                                messageForRole.Type = MessageTypeEnum.Information;
                                messageList.Add(messageForRole);
                            }
                        }

                        updatedRoleList[i].PersistFlag = PersistFlagEnum.UnModified;
                        //messages for Roles
                        for (int j = 0; j < updatedRoleList[i].TasksList.Count; j++)
                        {
                            messageForTask = new AppMessage();

                            if (updatedRoleList[i].TasksList[j].SuccessFlag == false)
                            {
                                if (updatedRoleList[i].TasksList[j].PersistFlag == PersistFlagEnum.Added)
                                {
                                    messageForTask.Message = "For Role Name : " + updatedRoleList[i].Name + ", " + "Task : " + updatedRoleList[i].TasksList[j].Description + " Cannot insert the data."; //+Messages.Messages.InsertErrorMessage;
                                    messageForTask.Type = MessageTypeEnum.Error;
                                    messageList.Add(messageForTask);
                                }
                                if (updatedRoleList[i].TasksList[j].PersistFlag == PersistFlagEnum.Deleted)
                                {
                                    messageForTask.Message = "For Role Name : " + updatedRoleList[i].Name + ", " + "Task : " + updatedRoleList[i].TasksList[j].Description + " Cannot remove the data."; // + Messages.Messages.RemoveErrorMessage;
                                    messageForTask.Type = MessageTypeEnum.Error;
                                    messageList.Add(messageForTask);
                                }
                            }
                            else
                            {
                                if (updatedRoleList[i].TasksList[j].PersistFlag == PersistFlagEnum.Added)
                                {
                                    messageForTask.Message = "For Role Name : " + updatedRoleList[i].Name + ", " + "Task : " + updatedRoleList[i].TasksList[j].Description + " Data insert successfully."; //+Messages.Messages.InsertSuccessMessage;
                                    messageForTask.Type = MessageTypeEnum.Information;
                                    messageList.Add(messageForTask);
                                }
                                if (updatedRoleList[i].TasksList[j].PersistFlag == PersistFlagEnum.Deleted)
                                {
                                    messageForTask.Message = "For Role Name : " + updatedRoleList[i].Name + ", " + "Task : " + updatedRoleList[i].TasksList[j].Description + " Data removed successfully."; //+Messages.Messages.RemoveSuccessMessage;
                                    messageForTask.Type = MessageTypeEnum.Information;
                                    messageList.Add(messageForTask);
                                }
                            }

                        }
                    }
                }
            }
            else
            {
                messageForRole = new AppMessage();
                messageForRole.Message = "Role Name should be unique.";
                messageForRole.Type = MessageTypeEnum.Information;
                messageList.Add(messageForRole);
            }
            return messageList;
        }

       
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
            catch(Exception ex)
            {
                
            }
            finally
            {
                if (proxy.State == System.ServiceModel.CommunicationState.Faulted)
                    proxy.Abort();
                else
                    proxy.Close();
            }
            return objReponse.RoleList;

        }
        #region : Get task for Role
        public List<Role> GetTaskForRole()
        {
            roleList = SerachAdminRole();
            taskRolelist = SearchAdmintask();
            response = new GetRoleResponse();
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
    }
}