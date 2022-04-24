using System.Web;
using System.Web.Mvc;
using MediaManager.Infrastructure.ExceptionHandling;

namespace MediaManager
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            // filters.Add(new HandleErrorAttribute());   //This turns on error handling for every controller in your app.It will only handle error : 500  
            filters.Add(new HandleAndLogErrorAttribute());
        }
    }

    //public class HandleAndLogErrorAttribute :  HandleErrorAttribute
    //{
    //    public override void OnException(ExceptionContext filterContext)
    //    {
    //        // Log the filterContext.Exception details
    //        base.OnException(filterContext);
    //    }
    //}
}