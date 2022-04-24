using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MediaManager.Infrastructure.Attributes
{

    public class SetTempDataModelStateAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            base.OnActionExecuted(filterContext);
            filterContext.Controller.TempData["ReportParameterList"] =
               filterContext.Controller.ViewData["ReportParameterList"];

            filterContext.Controller.TempData["ReportTitle"] =
               filterContext.Controller.ViewData["ReportTitle"];
        }
    }

    public class RestoreModelStateFromTempDataAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            base.OnActionExecuting(filterContext);
            if (filterContext.Controller.TempData.ContainsKey("ReportParameterList"))
            {
                filterContext.Controller.ViewData["ReportParameterList"] =
                    filterContext.Controller.TempData["ReportParameterList"];
            }
            if (filterContext.Controller.TempData.ContainsKey("ReportTitle"))
            {
                filterContext.Controller.ViewData["ReportTitle"] =
                    filterContext.Controller.TempData["ReportTitle"];
            }
        }
    }
}