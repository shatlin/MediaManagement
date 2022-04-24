using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MediaManager.SystemAdminService;

namespace MediaManager.Areas.Admin.BO
{
    public class SystemAdminBO
    {
        public static List<SystemUserVO> listSystemUsers=new List<SystemUserVO>();
       public List<AppMessage> customOracleMessage = new List<AppMessage>();

        public static List<MENUserVO> GetMenUserDetails(string UserId)
       {
           if (HttpContext.Current.Session["callContext"] == null)
           {
               throw new Exception("Your session has expired.ReLogin is required.");
           }
            SystemAdminClient proxy = new SystemAdminClient();
            List<MENUserVO> menUserList;

            try
            {

                GetSystemUserRequest request = new GetSystemUserRequest();
                request.MenUserVO = new MENUserVO();
                request.MenUserVO.MENUserId = UserId;
                proxy.Open();
                GetSystemUsersResponse response = proxy.GetMenUserDetails(request);
                menUserList = response.MenUserList;

            }

            finally
            {
                proxy.Close();
            }

            return menUserList;
        }
        
        public List<MENUserVO> SaveUserRegions(List<MENUserVO> regionList, string userId)
        {
            if (HttpContext.Current.Session["callContext"] == null)
            {
                throw new Exception("Your session has expired.ReLogin is required.");
            }
            SystemAdminClient proxy = new SystemAdminClient();
            try
            {

                GetRegionsRequest request = new GetRegionsRequest();
                request.RegionList = regionList;
                request.UserData = new MENUserVO();
                request.UserData.MENUserId = userId;
                proxy.Open();
                GetRegionsResponse response = proxy.SaveUserRegions(request);
                regionList = response.RegionList;
                if (response.Messages != null && response.Messages.Count > 0)
                {
                    customOracleMessage = new List<AppMessage>();
                    customOracleMessage = response.Messages;
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

        public static List<SystemUserVO> UpdateUsers(MENUserVO menUserVO)
        {
            if (HttpContext.Current.Session["callContext"] == null)
            {
                throw new Exception("Your session has expired.ReLogin is required.");
            }
            SystemAdminClient proxy = new SystemAdminClient();

            GetSystemUserRequest request = new GetSystemUserRequest();
            GetSystemUsersResponse response = new GetSystemUsersResponse();

            try
            {
                proxy.Open();
                request.SystemUserList = FillSystemUserChangesList();
                request.MenUserVO = menUserVO;
                response = proxy.UpdateUsers(request);
            }
            finally
            {
                if (proxy.State == System.ServiceModel.CommunicationState.Faulted)
                    proxy.Abort();
                else
                    proxy.Close();
            }


            return response.SystemUserList;
        }

        public static List<SystemUserVO> FillSystemUserChangesList()
        {
            List<SystemUserVO> systemUserChangeRoleList = new List<SystemUserVO>();
            SystemUserVO user;
            for (int i = 0; i < listSystemUsers.Count; i++)
            {
                user = new SystemUserVO();
                user.PersistFlag = PersistFlagEnum.UnModified;
                user.RoleList = new List<Role>();


                //Add the roles
                if (listSystemUsers[i].PersistFlag == PersistFlagEnum.Added)
                {
                    user.UserId = listSystemUsers[i].UserName.Replace(Environment.UserDomainName + "\\", "");
                    user.UserName = listSystemUsers[i].UserName;
                    user.PersistFlag = PersistFlagEnum.Added;

                }
                //deleted
                if (listSystemUsers[i].PersistFlag == PersistFlagEnum.Deleted)
                {
                    user.UserId = listSystemUsers[i].UserId;
                    user.UserName = listSystemUsers[i].UserName;
                    user.PersistFlag = PersistFlagEnum.Deleted;

                }
                //updated
                if (listSystemUsers[i].PersistFlag == PersistFlagEnum.Modified)
                {
                    user.UserId = listSystemUsers[i].UserId;
                    user.UserName = listSystemUsers[i].UserName;
                    user.PersistFlag = PersistFlagEnum.Modified;

                }

                //Roles changes to the appropriate User
                if (listSystemUsers[i].RoleList != null)
                {
                    for (int j = 0; j < listSystemUsers[i].RoleList.Count; j++)
                    {

                        //if (listsystemUsers[i].RoleList[j].PersistFlag == PersistFlagEnum.Added || listsystemUsers[i].RoleList[j].PersistFlag == PersistFlagEnum.Deleted)
                        if (listSystemUsers[i].RoleList[j].PersistFlag != PersistFlagEnum.UnModified)
                        {
                            user.UserId = listSystemUsers[i].UserId;
                            user.UserName = listSystemUsers[i].UserName;
                            user.RoleList.Add(listSystemUsers[i].RoleList[j]);
                        }
                    }
                }
                systemUserChangeRoleList.Add(user);
            }

            return systemUserChangeRoleList;
        }


    }
}