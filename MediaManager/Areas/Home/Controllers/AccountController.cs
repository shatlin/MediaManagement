using System;
using System.Collections.Generic;
using System.Configuration;
using System.DirectoryServices;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using StackExchange.Profiling;
using MediaManager.Filters;
using MediaManager.Infrastructure.Attributes;
using MediaManager.Infrastructure.Helpers;
using MediaManager.Infrastructure.WCFIntegration;
using MediaManager.Models;
using System.Text;
using System.Security.Cryptography;
using MediaManager.Areas.Admin.ViewModels;
using MediaManager.Infrastructure.Authorization;
using MediaManager.SystemAdminService;

namespace MediaManager.Areas.Home.Controllers
{
    [InitializeSimpleMembership]
    [HandleErrorWithELMAH]
    public class AccountController : Controller
    {
        string UserLogin { get; set; }
        string Domain { get; set; }
        string DomainForRole { get; set; }
        string Password { get; set; }
        string LdapPath = "LDAP://nipns00adc2k3.fps.nihilent.com/DC=FPS,DC=NIHILENT,DC=com";


       [CustomAuthorize]
        public ActionResult Index()
        {
          
                return View();
           
        }


        //
        // GET: /Account/Login

        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            var profiler = MiniProfiler.Current;
            using (profiler.Step("AccountController Login"))
            {
                ViewBag.ReturnUrl = returnUrl;
                return View();
            }
        }

        //
        // POST: /Account/Login
        List<string> userRole = new List<string>();
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult Login(LoginModel model)
        {
            Domain = Environment.UserDomainName + ConfigurationManager.AppSettings["FullyQualifiedName"];
            var profiler = MiniProfiler.Current;
            using (profiler.Step("AccountController Login"))
            {
                if (ModelState.IsValid)
                {
                    if (SetCredentials(model))
                    {
                        try
                        {
                            if (GetEmailIdFromAD(LdapPath, UserLogin, Password))
                            {
                                CallContext.GetCurrent().ADUserId = string.Format("{0}\\{1}", DomainForRole, UserLogin);
                                MediaManager.InfrastructureService.MENUserVO menUserVODetails;
                                List<MediaManager.InfrastructureService.Role> RoleList = MediaManager.Infrastructure.Roles.Roles.GetRolesForUser(CallContext.GetCurrent().ADUserId, out menUserVODetails);

                                if (RoleList != null && RoleList.Count > 0)
                                {
                                    userRole = new List<string>();
                                    userRole = (from r in RoleList select r.Name.ToString()).ToList();

                                    string[] rolesArr = userRole.ToArray();
                                    if (rolesArr != null && rolesArr.Length > 0)
                                    {
                                        FormsAuthenticationTicket ticket = new FormsAuthenticationTicket(1, model.UserName, DateTime.Now, DateTime.Now.AddMinutes(1440), false, String.Join(";", rolesArr), FormsAuthentication.FormsCookiePath);
                                        string hash = FormsAuthentication.Encrypt(ticket);
                                        HttpCookie cookie = new HttpCookie(FormsAuthentication.FormsCookieName, hash);
                                        if (ticket.IsPersistent)
                                        {
                                            cookie.Expires = ticket.Expiration;
                                        }

                                        SetCallContext(menUserVODetails);

                                        Response.Cookies.Add(cookie);
                                        return RedirectToAction(ActionConstants.Index, ControllerConstants.Account, new { area = AreaConstants.Home });
                                    }
                                    else
                                    {
                                        ModelState.AddModelError("", "No Role has been assigned to User.");
                                        return View(model);
                                    }
                                }
                            }
                        }

                        catch(Exception ex)
                        {
                            ModelState.AddModelError("", ex.Message.ToString());
                            return View(model);
                        }
                    }

                }
                // If we got this far, something failed, redisplay form
                ModelState.AddModelError("", "The user name or password provided is incorrect.");
                return View(model);
            }
        }

        //
        // POST: /Account/LogOff

        [HttpPost]
        [ValidateAntiForgeryToken]
        [CustomAuthorize]
        public ActionResult LogOff()
        {
            //WebSecurity.Logout();
            FormsAuthentication.SignOut();
            HttpContext.Cache.Remove(FormsAuthentication.FormsCookieName);
            return RedirectToAction(ActionConstants.Login,
                                    ControllerConstants.Account,
                                    new { area = AreaConstants.Home });
        }

        #region UserAuthentication

        /// <summary>
        /// Sets the domain and login information from the textboxes and from enviornment
        /// </summary>
        /// <returns>Bool</returns>
        private bool SetCredentials(LoginModel model)
        {
            bool result = false;

            

            if (!(model.UserName.Contains("\\") || model.UserName.Contains("/")))
            {
              //  DomainForRole = Environment.UserDomainName;
                DomainForRole = "fps";
                Domain = Environment.UserDomainName + ConfigurationManager.AppSettings["FullyQualifiedName"];
                UserLogin = model.UserName.Trim();
                result = true;
            }
            else
            {
                string[] temp = model.UserName.Trim().Split("\\/".ToCharArray());
                if (temp.Length == 2)
                {
                    DomainForRole = temp[0];
                    Domain = temp[0] + ConfigurationManager.AppSettings["FullyQualifiedName"];
                    UserLogin = temp[1];
                    result = true;
                }
                else
                {
                    //MessageBox.Show(MessageStore.GetMessage(6, 606), MessageStore.GetMessage(6, 607), MessageBoxButtons.OKCancel, MessageBoxIcon.Error, MessageBoxDefaultButton.Button1);
                    //ClearControls();

                }
            }
            Password = model.Password.Trim();
            return result;
        }

        /// <summary>
        /// Verifies whether the user is in AD or not
        /// </summary>
        /// <param name="strLDAPPAth">LDAP path</param>
        /// <param name="strUserName">User Name as entered</param>
        /// <param name="strPassword">Password as entered</param>
        /// <returns></returns>
    
        private bool GetEmailIdFromAD(string strLDAPPAth, string strUserName, string strPassword)
        {
            try
            {
                DirectoryEntry de = new DirectoryEntry(strLDAPPAth, strUserName, strPassword);
                DirectorySearcher searcher = new DirectorySearcher(de);
                searcher.Filter = "(SAMAccountName=" + strUserName + ")";
                searcher.PropertiesToLoad.Add("mail");
                string strEmailAddress;
                SearchResult col = searcher.FindOne();
                if (col.Properties.Contains("mail"))
                {
                    strEmailAddress = col.Properties["mail"][0].ToString();
                    CallContext.GetCurrent().EmailId = strEmailAddress;
                }
                else
                {
                    strEmailAddress = null;
                }

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }

        }
        #endregion UserAuthentication




        private void SetCallContext(MediaManager.InfrastructureService.MENUserVO menUserDetails)
        {
            //CallContext.GetCurrent().MachineName = Environment.MachineName;
            CallContext.GetCurrent().WindowsUserName = menUserDetails.MENUserId; //Environment.UserName;
            CallContext.GetCurrent().DomainName = "fps"; //Environment.UserDomainName;
            CallContext.GetCurrent().ClientAppInstanceType = "MNet";

            CallContext.GetCurrent().MENUserId = menUserDetails.MENUserId;
            CallContext.GetCurrent().MENUserLogin = menUserDetails.MENUserLogin;
            
        }
        
    }
}
