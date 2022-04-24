using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using MediaManager.Infrastructure.Helpers;
using System.Web.Security;
using System.Security.Principal;
using MediaManager.Areas.Admin.ViewModels;

namespace MediaManager.Infrastructure.Authorization
{
    [AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, Inherited = true, AllowMultiple = true)]
    public class CustomAuthorizeAttribute : AuthorizeAttribute
    {
        MediaManager.SystemAdminService.Role objRole = null;
        List<MediaManager.SystemAdminService.TaskVO> tasksList = new List<SystemAdminService.TaskVO>();
        ManageUsersViewModel manageUsersViewModel = new ManageUsersViewModel();
        List<string> rolesList = new List<string>();

        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            string cookieName = FormsAuthentication.FormsCookieName;
            var authCookie = filterContext.HttpContext.Request.Cookies[cookieName];
            if (authCookie == null)
            {
                base.OnAuthorization(filterContext);
            }
            else
            {

                if (HttpContext.Current.Session["callContext"] == null)
                {
                   
                    filterContext.Result = new HttpUnauthorizedResult();
                    FormsAuthentication.SignOut();
                    return;
                }

                var authTicket = FormsAuthentication.Decrypt(authCookie.Value);

                if (!filterContext.HttpContext.User.Identity.IsAuthenticated ||
                    filterContext.HttpContext.Request.Cookies == null ||
                    filterContext.HttpContext.Request.Cookies[cookieName] == null
                )
                {
                    HandleUnauthorizedRequest(filterContext);
                    return;
                }
                string[] roles = authTicket.UserData.Split(';');
                this.tasksList = new List<SystemAdminService.TaskVO>();
                if (roles != null && roles.Length > 0)
                {
                    for (int i = 0; i < roles.Length; i++)
                    {
                        manageUsersViewModel.GetUserRoles(roles[i]);
                        if (manageUsersViewModel.RoleList != null)
                        {
                            objRole = (from role in manageUsersViewModel.RoleList
                                       where role.Name.ToLower().StartsWith(roles[i].ToLower())
                                       select role).FirstOrDefault();
                        }
                        if (objRole != null)
                        {
                            if (objRole.TasksList != null && objRole.TasksList.Count > 0)
                            {
                                foreach (MediaManager.SystemAdminService.TaskVO item in objRole.TasksList)
                                {
                                    this.tasksList.Add(item);
                                }
                            }
                        }
                    }
                    if (this.tasksList != null && this.tasksList.Count > 0)
                    {
                        rolesList = new List<string>();
                        rolesList = (from r in this.tasksList select r.Task.ToString()).ToList();
                    }
                }
                if (rolesList != null && rolesList.Count > 0)
                {
                    string[] rolesArr = rolesList.ToArray();
                    var userIdentity = new GenericIdentity(authTicket.Name);
                    var userPrincipal = new GenericPrincipal(userIdentity, rolesArr);

                    filterContext.HttpContext.User = userPrincipal;
                }
                base.OnAuthorization(filterContext);
            }
        }
        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
            if (filterContext.HttpContext.User.Identity.IsAuthenticated)
            {
                ViewResult result = new ViewResult
                {
                    ViewName = SharedPages.UnauthorizedPage,
                };
                filterContext.Result = result;
            }
            else
            {
                filterContext.Result = new HttpUnauthorizedResult();
            }
        }
    }
}