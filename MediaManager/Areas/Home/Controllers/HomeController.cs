using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using StackExchange.Profiling;
using MediaManager.Areas.Home.ViewModels;
using MediaManager.Infrastructure.Attributes;
using MediaManager.Infrastructure.Helpers;
using MediaManager.Infrastructure.Logging;
using MediaManager.Infrastructure.Roles;
using MediaManager.Models;
using MediaManager.Infrastructure.Authorization;


namespace MediaManager.Areas.Home.Controllers
{
    [HandleErrorWithELMAH]
    public class HomeController : Controller
    {
       [CustomAuthorize]
        public ActionResult Index()
        {
            var profiler = MiniProfiler.Current;
            using (profiler.Step("HomeController Index"))
            {
                //MediaManagerLogger.StartPerformanceLogging();
                ViewBag.Message = "";
             
                if (Request != null)
                {
                    if (Request.IsAuthenticated)
                    {
                        return RedirectToAction(ActionConstants.Index,
                                                  ControllerConstants.Account,
                                                  new { area = AreaConstants.Home });
                    }
                }
                //MediaManagerLogger.StopPerformanceLogging("Home-Index", "Default page of Home Controller");
                return RedirectToAction(ActionConstants.Login, 
                                        ControllerConstants.Account, 
                                        new { area = AreaConstants.Home });
            }

        }

        [AllowAnonymous]
        [AcceptVerbs(HttpVerbs.Get)]
        public ActionResult _SetMainMenuStrip(App_MenuModel model)
        {
            var profiler = MiniProfiler.Current;
            using (profiler.Step("HomeController _SetMainMenuStrip"))
            {
                //MediaManagerLogger.StartPerformanceLogging();
                if (Request.IsAuthenticated)
                {
                    model.Menu = MediaManager.Infrastructure.Menu.MenuManager.GetMenu();
                    //MediaManagerLogger.StopPerformanceLogging("Layout-Main Menu", "Menu of Home Controller");
                    return PartialView("_SetMainMenuStrip", model);
                }
                else
                {
                    //MediaManagerLogger.StopPerformanceLogging("Layout-Main Menu", "Menu of Home Controller");
                    return PartialView("_SetMainMenuStrip", model);
                }
            }
            
        }

        [AllowAnonymous]
        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult _SetMainMenuStrip(App_MenuModel model,string error)
        {
            var profiler = MiniProfiler.Current;
            using (profiler.Step("HomeController _SetMainMenuStrip"))
            {
                //MediaManagerLogger.StartPerformanceLogging();
                if (Request.IsAuthenticated)
                {
                    model.Menu = MediaManager.Infrastructure.Menu.MenuManager.GetMenu();
                    //MediaManagerLogger.StopPerformanceLogging("Layout-Main Menu", "Menu of Home Controller");
                    return PartialView("_SetMainMenuStrip", model);
                }
                else
                {
                    //MediaManagerLogger.StopPerformanceLogging("Layout-Main Menu", "Menu of Home Controller");
                    return PartialView("_SetMainMenuStrip", model);
                }
            }

        }

        public ActionResult MyException()
        {
            var profiler = MiniProfiler.Current;
            using (profiler.Step("HomeController MyException"))
            {
                try
                {
                    ViewBag.Message = "";
                    throw new Exception("My new Exception");
                    return View();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public ActionResult TitleList()
        {
            TitleListViewModel titleListViewModel = new TitleListViewModel();
            List<Title> TitleList = titleListViewModel.GetTitles();

            return View("TitleList");
        }
    }
}
