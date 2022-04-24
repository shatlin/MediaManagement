using System;
using System.Web;
using System.Web.Mvc;
using NLog;
namespace MediaManager.Infrastructure.ExceptionHandling
{
    public class HandleAndLogErrorAttribute : HandleErrorAttribute
    {
        //public override void OnException(ExceptionContext filterContext)
        //{
        //    // Log the filterContext.Exception details
        //    base.OnException(filterContext);
        //    filterContext.HttpContext.Response.StatusCode = 500;

        //    filterContext.HttpContext.Response.TrySkipIisCustomErrors = true; 
        //}

      
        private static Logger logger;
        private string exception;

        public HandleAndLogErrorAttribute()
        {
            logger = LogManager.GetLogger("LogException");

        }

        public override void OnException(ExceptionContext filterContext)
        {
            if (filterContext.ExceptionHandled || !filterContext.HttpContext.IsCustomErrorEnabled)
            {
                //string user = HttpContext.Current.User.Identity.Name;
                string user = "Demo User";
                //User,Controller, Action,User Exception Message ,Exception,Time
                logger.Error("{0},{1},{2},{3},{4},{5}", user, filterContext.RouteData.Values["controller"], filterContext.RouteData.Values["action"], 
                    filterContext.Exception.Message, filterContext.Exception.GetType().Name, DateTime.Now);
                return;
            }
            #region comments

            //if (new HttpException(null, filterContext.Exception).GetHttpCode() != 500)
            //{
            //    return;
            //}

            //if (!ExceptionType.IsInstanceOfType(filterContext.Exception))
            //{
            //    return;
            //}

            //// if the request is AJAX return JSON else view.
            //if (filterContext.HttpContext.Request.Headers["X-Requested-With"] == "XMLHttpRequest")
            //{
            //    filterContext.Result = new JsonResult
            //    {
            //        JsonRequestBehavior = JsonRequestBehavior.AllowGet,
            //        Data = new
            //        {
            //            error = true,
            //            message = filterContext.Exception.Message
            //        }
            //    };
            //}
            //else
            //{
            //    var controllerName = (string)filterContext.RouteData.Values["controller"];
            //    var actionName = (string)filterContext.RouteData.Values["action"];
            //    var model = new HandleErrorInfo(filterContext.Exception, controllerName, actionName);

            //    filterContext.Result = new ViewResult
            //    {
            //        ViewName = View,
            //        MasterName = Master,
            //        ViewData = new ViewDataDictionary<HandleErrorInfo>(model),
            //        TempData = filterContext.Controller.TempData
            //    };
            //}

            //// log the error using log4net.
            ////_logger.Error(filterContext.Exception.Message, filterContext.Exception);

            //filterContext.ExceptionHandled = true;
            //filterContext.HttpContext.Response.Clear();

            #endregion

            filterContext.HttpContext.Response.StatusCode = 500;

            filterContext.HttpContext.Response.TrySkipIisCustomErrors = true;

        }
    }
}