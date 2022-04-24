using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Http;
using System.Web.Routing;
using System.Web.Optimization;
using System.Diagnostics;
using MediaManager.Infrastructure.ExceptionHandling;
using NLog;
using StackExchange.Profiling;
using System.Web.Security;
using System.Security.Principal;
using System.Globalization;
using System.Threading;

namespace MediaManager
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication
    {
        private Logger logger;

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);


            //AuthConfig.RegisterAuth();

        }

        protected void Application_Error(object sender, EventArgs e)
        {
            Exception exception = Server.GetLastError();
            HttpException httpexception = exception as HttpException;
           
            //log 404 Error
            logger = LogManager.GetLogger("LogException");
            string user = HttpContext.Current.User.Identity.Name;
            //User,Controller, Action,User Exception Message ,Exception,Time
            logger.Error("{0},{1},{2},{3},{4},{5}", user, "", "",//exception.Message
                "Page Not Found", exception.GetType().Name, DateTime.Now);
            Debug.WriteLine(exception);

            Server.ClearError();
            var routeData = new RouteData();
            routeData.Values["Areas"] = "Areas";
            routeData.Values["Home"] = "Home";
            routeData.Values["Controllers"] = "Controllers";
            routeData.Values["controller"] = "Error";
            routeData.Values["action"] = "General";
            routeData.Values["exception"] = exception;
            Response.StatusCode = 500;
            Response.TrySkipIisCustomErrors = true;
            if (httpexception != null)
            {
                Response.StatusCode = httpexception.GetHttpCode();

                switch (Response.StatusCode)
                {
                    case 404:
                        routeData.Values["action"] = "Http404";
                        break;
                    case 500:
                        routeData.Values["action"] = "Http500";
                        break;
                }
            }

            IController errorsController = new MediaManager.Areas.Home.Controllers.ErrorController();
            var rc = new RequestContext(new HttpContextWrapper(Context), routeData);
            errorsController.Execute(rc);
        }

        protected void Application_BeginRequest()
        {

            CultureInfo newCulture;
            Thread.CurrentThread.CurrentCulture = new CultureInfo("en-US");

            newCulture = (CultureInfo)System.Threading.Thread.CurrentThread.CurrentCulture.Clone();

            newCulture.DateTimeFormat.ShortDatePattern = "dd-MMM-yyyy";
            newCulture.DateTimeFormat.LongDatePattern = "MMM-yyyy";
            newCulture.DateTimeFormat.ShortTimePattern = "HH:mm:ss";
            newCulture.DateTimeFormat.LongTimePattern = "HH:mm:ss";
            newCulture.DateTimeFormat.TimeSeparator = ":";
            newCulture.NumberFormat.CurrencyDecimalDigits = 4;
            newCulture.NumberFormat.CurrencyDecimalSeparator = ".";
            newCulture.NumberFormat.CurrencyGroupSeparator = ",";
            newCulture.NumberFormat.NumberDecimalDigits = 2;
            newCulture.NumberFormat.NegativeSign = "-";
            newCulture.NumberFormat.NumberGroupSeparator = ",";
            newCulture.NumberFormat.NumberDecimalSeparator = ".";
            System.Threading.Thread.CurrentThread.CurrentCulture = newCulture;

            //if (Request.IsLocal)
            //{
            //    MiniProfiler.Start();
            //}


          
      
        }
        protected void Application_EndRequest()
        {
         //   MiniProfiler.Stop();
        }

        protected void FormsAuthentication_OnAuthenticate(Object sender, FormsAuthenticationEventArgs e)
        {
            if (FormsAuthentication.CookiesSupported == true)
            {
                if (Request.Cookies[FormsAuthentication.FormsCookieName] != null)
                {
                    try
                    {
                        string username = FormsAuthentication.Decrypt(Request.Cookies[FormsAuthentication.FormsCookieName].Value).Name;
                        string[] roles = FormsAuthentication.Decrypt(Request.Cookies[FormsAuthentication.FormsCookieName].Value).UserData.Split(new char[] { ';' }); ;
                        e.User = new System.Security.Principal.GenericPrincipal(new System.Security.Principal.GenericIdentity(username, "Forms"), roles);
                    }
                    catch (Exception)
                    {
                        return;
                    }
                }
            }
        }
    }
}