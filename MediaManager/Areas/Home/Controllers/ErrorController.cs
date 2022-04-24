using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using StackExchange.Profiling;
using MediaManager.Models;
using MediaManager.Infrastructure.Helpers;

namespace MediaManager.Areas.Home.Controllers
{
    public class ErrorController : Controller
    {
        public ActionResult General(Exception exception)

        {
             var profiler = MiniProfiler.Current;
             using (profiler.Step("General Error"))
             {
                 return View(SharedPages.ErrorPage, new ErrorModel() { ErrorTitle = "An error occurred while processing your request.", ExceptionDetail = exception });
            
             }
        }

        public ActionResult Http404()
        {
              var profiler = MiniProfiler.Current;
              using (profiler.Step("Page Not Found"))
              {
                  return View(SharedPages.ErrorPage, new ErrorModel() { ErrorTitle = "Requested Page could not be found." });
              }
        }

        public ActionResult Http500(Exception exception)
        {
            var profiler = MiniProfiler.Current;
            using (profiler.Step("Page Not Found"))
            {
                string message = exception.InnerException != null ? exception.InnerException.Message : exception.Message;
                return View(SharedPages.UnhandledError, new ErrorModel() { ErrorTitle = "An error occurred while processing your request.", ExceptionDetail = new Exception(message) });
            }
        }
    }
}
