using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.Reporting.WebForms;
using MediaManager.ReportingService;
using MediaManager.Areas.Infrastructure.Report;
using System.Web.Security;
using MediaManager.Areas.Home.Models;
using System.Web.Script.Serialization;
using System.Windows.Forms;
using System.IO;
using System.Net;
using MediaManager.Infrastructure.Attributes;
using MediaManager.Infrastructure.Authorization;
using MediaManager.Models;

namespace MediaManager.Areas.Home.Controllers
{
    public class ReportController : Controller
    {
        //
        // GET: /Home/Report/

        public ActionResult Index()
        {
            return View();
        }

        [RestoreModelStateFromTempData]
        public ActionResult GenrateReport(string reportName, Int32 moduleId)
        {
            List<MediaManager.Areas.Home.Models.ReportParameter> reportParameterList = (List<MediaManager.Areas.Home.Models.ReportParameter>)ViewData["ReportParameterList"];
            ReportsVO reportsVO = new ReportsVO() { ReportName = reportName, ModuleId = moduleId };
            reportsVO = ReportManager.GetReportServerData(reportsVO);
            ReportPrerequisiteDataModel reportPrerequisiteData = new ReportPrerequisiteDataModel();
            reportPrerequisiteData.ReportPath = reportsVO.ReportPath;
            reportPrerequisiteData.ReportServerUrl = reportsVO.ReportServerUrl;
            reportPrerequisiteData.NetworkDomain = reportsVO.NetworkDomain;
            reportPrerequisiteData.NetworkUserName = reportsVO.NetworkUserName;
            reportPrerequisiteData.NetworkPassword = reportsVO.NetworkPassword;
            reportPrerequisiteData.ReportParameterList = reportParameterList;

            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            string reportPrerequisiteDataString = javaScriptSerializer.Serialize(reportPrerequisiteData);
            ViewBag.ReportprerequisiteDataString = reportPrerequisiteDataString;
            if (ViewData["ReportTitle"] != null)
                ViewBag.Title = ViewData["ReportTitle"];
           else
                ViewBag.Title = "Report";

            return View();
        }



    }

}
