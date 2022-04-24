using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MediaManager.SchedulingOperationsServices;
using MediaManager.Areas.scheduling.ViewModels;
using MediaManager.Areas.scheduling.Models;
using MediaManager.Infrastructure.Attributes;
using MediaManager.Areas.Home.Models;
using MediaManager.Infrastructure.Helpers;
using MediaManager.InfrastructureService;
using MediaManager.Infrastructure.Lookups;
using MediaManager.LookupsServices;
using MediaManager.Infrastructure.Authorization;
using MediaManager.Models;
using MediaManager.ReportingService;
using MediaManager.Areas.Infrastructure.Report;
using System.IO;
using System.Web.Script.Serialization;

namespace MediaManager.Areas.scheduling.Controllers
{
    [HandleErrorWithELMAHAttribute]
    public class ReportController : Controller
    {
        //
        // GET: /scheduling/Report/

        public ActionResult Index()
        {
            return View();
        }

        #region Day by Day Report

        [CustomAuthorize(Roles = "ShowDayByDayRpt")]
        public ActionResult SSCPerDayRpt()
        {
            List<ChannelVO> channelList = SchedulingOperationsServicesManager.LoadChannelLookup();
            PerDayRptModel perDayRpt = new PerDayRptModel();
            perDayRpt.ChannelList = channelList; //new SelectList(channelList, "", "");

            return View("SSCPerDayRpt", perDayRpt);
        }

        [HttpPost]
        [SetTempDataModelState]
        public ActionResult SSCPerDayRpt(PerDayRptModel perDayRpt, string btnGenerate, string btnExportToExcel)
        {
            string reportName = string.Empty, genreInput = null;
            if (perDayRpt.Synopsis)
                reportName = "SSCPerDayRpt";
            else
                reportName = "SSC_MN_PerDayRpt_WithoutSysnopsys";
            if (!string.IsNullOrEmpty(btnGenerate))
            {
                List<ReportParameter> reportParameterList = new List<ReportParameter>();
                ReportParameter channelReportParameter = new ReportParameter();
                channelReportParameter.Name = "Channel";
                channelReportParameter.Value = perDayRpt.Channel;
                reportParameterList.Add(channelReportParameter);

                ReportParameter fromDateReportParameter = new ReportParameter();
                fromDateReportParameter.Name = "DateFrom";
                fromDateReportParameter.Value = perDayRpt.DateFrom.ToString("MM/dd/yyyy");
                reportParameterList.Add(fromDateReportParameter);

                ReportParameter toDateReportParameter = new ReportParameter();
                toDateReportParameter.Name = "DateTo";
                toDateReportParameter.Value = perDayRpt.DateTo.ToString("MM/dd/yyyy");
                reportParameterList.Add(toDateReportParameter);

                ReportParameter ratingTypeReportParameter = new ReportParameter();
                ratingTypeReportParameter.Name = "RatingType";
                ratingTypeReportParameter.Value = perDayRpt.RatingType;
                reportParameterList.Add(ratingTypeReportParameter);

                ReportParameter genreReportParameter = new ReportParameter();
                genreReportParameter.Name = "Genre";
                if (perDayRpt.GenreInput)
                    genreReportParameter.Value = "Yes";
                else
                    genreReportParameter.Value = "No";
                reportParameterList.Add(genreReportParameter);

                ViewData["ReportParameterList"] = reportParameterList;
                ViewData["ReportTitle"] = "Day By Day Report";
                return RedirectToAction("GenrateReport", "Report", new { area = AreaConstants.Home, reportName = reportName, moduleId = Convert.ToInt32(InfrastructureService.ModuleEnum.Scheduling) });
            }
            else if (!string.IsNullOrEmpty(btnExportToExcel))
            {
                //Set request for export report
                ExportReportRequest req = new ExportReportRequest();
                req.ExportOption = ExportOptionEnum.EXCEL;
                req.ReportName = reportName;
                req.SPName = "PKG_SSC_REPORTS.PRC_SSC_MN_DayByDayRpt_Exc";
                //Add input report SP parameters
                req.InputReportParams = new List<ReportSPParameter>();
                if (perDayRpt.GenreInput)
                    genreInput = "Y";
                else
                    genreInput = "N";
                req.InputReportParams.Add(new ReportSPParameter() { Name = "I_CHANNEL", DbType = DbTypeEnum.Varchar2, Value = perDayRpt.Channel, ParamDirection = ParameterDirectionEnum.Input });
                req.InputReportParams.Add(new ReportSPParameter() { Name = "I_DATE_FROM", DbType = DbTypeEnum.Varchar2, Value = perDayRpt.DateFrom.ToString("dd-MMM-yyyy"), ParamDirection = ParameterDirectionEnum.Input });
                req.InputReportParams.Add(new ReportSPParameter() { Name = "I_DATE_TO", DbType = DbTypeEnum.Varchar2, Value = perDayRpt.DateTo.ToString("dd-MMM-yyyy"), ParamDirection = ParameterDirectionEnum.Input });
                req.InputReportParams.Add(new ReportSPParameter() { Name = "I_GENRE_FLAG ", DbType = DbTypeEnum.Varchar2, Value = genreInput, ParamDirection = ParameterDirectionEnum.Input });
                req.InputReportParams.Add(new ReportSPParameter() { Name = "O_CUR_PERDAY", DbType = DbTypeEnum.RefCursor, ParamDirection = ParameterDirectionEnum.Output });

                //Call ExportReport
                ExportReportResponse response = ReportManager.GetExportReport(req);
                if (response.ExportedFIlePath != null)
                {
                    Stream readStream = ReportManager.GetExportedFileData(req.ReportName, response.ExportedFIlePath);
                    return File(readStream, "application/vnd.ms-excel", string.Format("{0}-{1:yyyyMMddHHmmss}.xls", req.ReportName, DateTime.Now));
                }
            }
            return RedirectToAction("SSCPerDayRpt");
        }
        #endregion

        #region Scheduling Changes Report

        [CustomAuthorize(Roles = "ShowSchdRpt")]
        public ActionResult ScheduleChangesRpt()
        {
            ChannelLookup channelLookup = LookupsManager.GetChannels(LookupsServices.ModuleEnum.Scheduling, LookupsServices.LookupKeyEnum.ChannelLookup);
            ChannelLookupItem channelLookupItem = new ChannelLookupItem() { ChannelName = "All", ChannelNumber = -1, ChannelShortName = "%" };
            channelLookup.LookupItemList.Insert(0, channelLookupItem);

            ScheduleChangesRptModel scheduleChangesRpt;
            //if (TempData["ScheduleChangesRpt"] != null)
            //    scheduleChangesRpt = (ScheduleChangesRptModel)TempData["ScheduleChangesRpt"];
            //else
                scheduleChangesRpt = new ScheduleChangesRptModel();
            scheduleChangesRpt.ChannelList = channelLookup.LookupItemList;
            return View("ScheduleChangesRpt", scheduleChangesRpt);
        }

        [HttpPost]
        [SetTempDataModelState]
        public ActionResult ScheduleChangesRpt(ScheduleChangesRptModel scheduleChangesRpt, string btnGenerate, string btnExportToExcel)
        {
            //if (!ModelState.IsValid)
            //{
            //    TempData["ScheduleChangesRpt"] = scheduleChangesRpt;
            //    return RedirectToAction("ScheduleChangesRpt");
            //}
            if (!string.IsNullOrEmpty(btnGenerate))
            {
                List<ReportParameter> reportParameterList = new List<ReportParameter>();
                ReportParameter channelReportParameter = new ReportParameter();
                channelReportParameter.Name = "Channel";
                channelReportParameter.Value = scheduleChangesRpt.Channel;
                reportParameterList.Add(channelReportParameter);

                ReportParameter fromDateReportParameter = new ReportParameter();
                fromDateReportParameter.Name = "ScheduleEntriesFrom";
                fromDateReportParameter.Value = scheduleChangesRpt.ScheduleEntriesFrom.ToString("MM/dd/yyyy");
                reportParameterList.Add(fromDateReportParameter);

                ReportParameter toDateReportParameter = new ReportParameter();
                toDateReportParameter.Name = "ScheduleEntriesTo";
                toDateReportParameter.Value = scheduleChangesRpt.ScheduleEntriesTo.ToString("MM/dd/yyyy");
                reportParameterList.Add(toDateReportParameter);

                ReportParameter ratingTypeReportParameter = new ReportParameter();
                ratingTypeReportParameter.Name = "ChangesMadeFrom";
                ratingTypeReportParameter.Value = scheduleChangesRpt.ChangesMadeFrom.ToString("MM/dd/yyyy");
                reportParameterList.Add(ratingTypeReportParameter);

                ReportParameter genreReportParameter = new ReportParameter();
                genreReportParameter.Name = "ChangesMadeTo";
                genreReportParameter.Value = scheduleChangesRpt.ChangesMadeTo.ToString("MM/dd/yyyy");
                reportParameterList.Add(genreReportParameter);

                ViewData["ReportParameterList"] = reportParameterList;
                ViewData["ReportTitle"] = "Scheduling Changes Report";
                return RedirectToAction("GenrateReport", "Report", new { area = AreaConstants.Home, reportName = "SSCSchdRpt", moduleId = Convert.ToInt32(InfrastructureService.ModuleEnum.Scheduling) });
             }
            else if (!string.IsNullOrEmpty(btnExportToExcel))
            {
                //Set request for export report
                ExportReportRequest req = new ExportReportRequest();

                req.ExportOption = ExportOptionEnum.EXCEL;
                req.ReportName = "SSCSchdRpt";
                req.SPName = "PKG_SSC_REPORTS.PRC_SSC_MN_SchChangesRpt";

                //Add input report SP parameters
                req.InputReportParams = new List<ReportSPParameter>();

                req.InputReportParams.Add(new ReportSPParameter() { Name = "Channel", DbType = DbTypeEnum.Varchar2, Value = scheduleChangesRpt.Channel, ParamDirection = ParameterDirectionEnum.Input });
                req.InputReportParams.Add(new ReportSPParameter() { Name = "ScheduleEntriesFrom", DbType = DbTypeEnum.Varchar2, Value = scheduleChangesRpt.ScheduleEntriesFrom.ToString("dd-MMM-yyyy"), ParamDirection = ParameterDirectionEnum.Input });
                req.InputReportParams.Add(new ReportSPParameter() { Name = "ScheduleEntriesTo", DbType = DbTypeEnum.Varchar2, Value = scheduleChangesRpt.ScheduleEntriesTo.ToString("dd-MMM-yyyy"), ParamDirection = ParameterDirectionEnum.Input });
                req.InputReportParams.Add(new ReportSPParameter() { Name = "ChangesMadeFrom", DbType = DbTypeEnum.Varchar2, Value = scheduleChangesRpt.ChangesMadeFrom.ToString("dd-MMM-yyyy"), ParamDirection = ParameterDirectionEnum.Input });
                req.InputReportParams.Add(new ReportSPParameter() { Name = "ChangesMadeTo", DbType = DbTypeEnum.Varchar2, Value = scheduleChangesRpt.ChangesMadeTo.ToString("dd-MMM-yyyy"), ParamDirection = ParameterDirectionEnum.Input });
                req.InputReportParams.Add(new ReportSPParameter() { Name = "O_CUR_SCHDLICTERRNORIGHTS", DbType = DbTypeEnum.RefCursor, ParamDirection = ParameterDirectionEnum.Output });


                //Call ExportReport
                ExportReportResponse response = ReportManager.GetExportReport(req);
                if (response.ExportedFIlePath != null)
                {
                    Stream readStream = ReportManager.GetExportedFileData(req.ReportName, response.ExportedFIlePath);
                    return File(readStream, "application/vnd.ms-excel", string.Format("{0}-{1:yyyyMMddHHmmss}.xls", req.ReportName, DateTime.Now));
                }

            }
            return RedirectToAction("ScheduleChangesRpt");
       }
        #endregion

        #region Catch Up - Day by Day Report

        [CustomAuthorize(Roles = "ShowCatchupDaybyDayRpt")]
        public ActionResult CatchUpDayByDayReport()
        {
            PerDayRptModel perDayRpt = new PerDayRptModel();
            return View("CatchUpDayByDayReport", perDayRpt);
        }

        [HttpPost]
        [SetTempDataModelState]
        public ActionResult CatchUpDayByDayReport(PerDayRptModel perDayRpt, string btnGenerate, string btnExportToExcel)
        {
            string reportName = string.Empty;
            reportName = "SSCCatchUpDaybyDayRpt";
            if (!string.IsNullOrEmpty(btnGenerate))
            {
                List<ReportParameter> reportParameterList = new List<ReportParameter>();
                ReportParameter mediaPlateformReportParameter = new ReportParameter();
                mediaPlateformReportParameter.Name = "I_MEDIA_PLATFORM";
                mediaPlateformReportParameter.Value = perDayRpt.MediaPlateform;
                reportParameterList.Add(mediaPlateformReportParameter);

                ReportParameter fromDateReportParameter = new ReportParameter();
                fromDateReportParameter.Name = "I_DATE_FROM";
                fromDateReportParameter.Value = perDayRpt.DateFrom.ToString("MM/dd/yyyy");
                reportParameterList.Add(fromDateReportParameter);

                ReportParameter toDateReportParameter = new ReportParameter();
                toDateReportParameter.Name = "I_DATE_TO";
                toDateReportParameter.Value = perDayRpt.DateTo.ToString("MM/dd/yyyy");
                reportParameterList.Add(toDateReportParameter);

                ReportParameter regionReportParameter = new ReportParameter();
                regionReportParameter.Name = "I_REGION";
                regionReportParameter.Value = perDayRpt.Region;
                reportParameterList.Add(regionReportParameter);

                ReportParameter genreReportParameter = new ReportParameter();
                genreReportParameter.Name = "I_GenreRadio";
                if (perDayRpt.GenreInput)
                    genreReportParameter.Value = "Yes";
                else
                    genreReportParameter.Value = "No";
                reportParameterList.Add(genreReportParameter);

                ReportParameter synopsisReportParameter = new ReportParameter();
                synopsisReportParameter.Name = "I_Synopsis";
                if (perDayRpt.Synopsis)
                    synopsisReportParameter.Value = "Yes";
                else
                    synopsisReportParameter.Value = "No";
                reportParameterList.Add(synopsisReportParameter);

                ViewData["ReportParameterList"] = reportParameterList;
                ViewData["ReportTitle"] = "Day By Day Report";
                return RedirectToAction("GenrateReport", "Report", new { area = AreaConstants.Home, reportName = reportName, moduleId = Convert.ToInt32(InfrastructureService.ModuleEnum.Budgeting) });
            }
            else if (!string.IsNullOrEmpty(btnExportToExcel))
            {
                //Set request for export report
                ExportReportRequest req = new ExportReportRequest();
                req.ExportOption = ExportOptionEnum.EXCEL;
                req.ReportName = reportName;
                req.SPName = "X_PKG_CP_DAY_BY_DAY_RPT.X_PRC_CP_DAY_BY_DAY_EXL";
                //Add input report SP parameters
                req.InputReportParams = new List<ReportSPParameter>();
                //if (perDayRpt.GenreInput)
                //    genreInput = "Y";
                //else
                //    genreInput = "N";
                req.InputReportParams.Add(new ReportSPParameter() { Name = "I_REGION", DbType = DbTypeEnum.Varchar2, Value = perDayRpt.Region, ParamDirection = ParameterDirectionEnum.Input });
                req.InputReportParams.Add(new ReportSPParameter() { Name = "I_MEDIA_PLATFORM", DbType = DbTypeEnum.Varchar2, Value = perDayRpt.MediaPlateform, ParamDirection = ParameterDirectionEnum.Input });
                req.InputReportParams.Add(new ReportSPParameter() { Name = "I_DATE_FROM", DbType = DbTypeEnum.Date, Value = Convert.ToDateTime(perDayRpt.DateFrom), ParamDirection = ParameterDirectionEnum.Input });
                req.InputReportParams.Add(new ReportSPParameter() { Name = "I_DATE_TO", DbType = DbTypeEnum.Date, Value = Convert.ToDateTime(perDayRpt.DateTo), ParamDirection = ParameterDirectionEnum.Input });
                //req.InputReportParams.Add(new ReportSPParameter() { Name = "I_RATING_TYPE", DbType = DbTypeEnum.Varchar2, Value = perDayRpt.RatingType, ParamDirection = ParameterDirectionEnum.Input });
                //req.InputReportParams.Add(new ReportSPParameter() { Name = "I_Synopsis", DbType = DbTypeEnum.Varchar2, Value = perDayRpt.Synopsis, ParamDirection = ParameterDirectionEnum.Input });
                //req.InputReportParams.Add(new ReportSPParameter() { Name = "I_GenreRadio", DbType = DbTypeEnum.Varchar2, Value = perDayRpt.GenreRadio, ParamDirection = ParameterDirectionEnum.Input });


                req.InputReportParams.Add(new ReportSPParameter() { Name = "O_CUR_PERDAY", DbType = DbTypeEnum.RefCursor, ParamDirection = ParameterDirectionEnum.Output });

                //Call ExportReport
                ExportReportResponse response = ReportManager.GetExportReport(req);
                if (response.ExportedFIlePath != null)
                {
                    Stream readStream = ReportManager.GetExportedFileData(req.ReportName, response.ExportedFIlePath);
                    return File(readStream, "application/vnd.ms-excel", string.Format("{0}-{1:yyyyMMddHHmmss}.xls", req.ReportName, DateTime.Now));
                }
            }
            return RedirectToAction("CatchUpDayByDayReport");
        }
        
        public string GetMediaPlatForms(string strFilter)
        {
            Lookups lookups = new Lookups();
            List<AcquisitionLookupService.PB_MediaPlatformLookupItem> pbMediaPlatformLookupItemList = lookups.MediaPlatFormList(strFilter);
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            return serializer.Serialize(pbMediaPlatformLookupItemList);
        }

        public string GetRegions(string strFilter)
        {
            Lookups lookups = new Lookups();
            List<AcquisitionLookupService.RegionLeeLookupItem> regionLeeLookupItemList = lookups.RegionList(strFilter);
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            return serializer.Serialize(regionLeeLookupItemList);
        }

        public string IsValidMediaPlatForm(string codeToValidate)
        {
            AcquisitionLookupService.PB_MediaPlatformLookupItem pbMediaPlatformLookupItem=null;
            Lookups lookups = new Lookups();
            List<AcquisitionLookupService.PB_MediaPlatformLookupItem> pbMediaPlatformLookupItemList = lookups.MediaPlatFormList(codeToValidate);

            if (pbMediaPlatformLookupItemList != null && pbMediaPlatformLookupItemList.Count > 0)
            {
                pbMediaPlatformLookupItem = (from item in pbMediaPlatformLookupItemList where item.MediaPlatformCode.ToUpper().Equals(codeToValidate.ToUpper()) select item).FirstOrDefault();
            }

            JavaScriptSerializer serializer = new JavaScriptSerializer();
            return serializer.Serialize(pbMediaPlatformLookupItem);
        }

        public string IsValidRegion(string codeToValidate)
        {
            AcquisitionLookupService.RegionLeeLookupItem regionLeeLookupItem = null;
            Lookups lookups = new Lookups();
            List<AcquisitionLookupService.RegionLeeLookupItem> regionLeeLookupItemList = lookups.RegionList(codeToValidate);

            if (regionLeeLookupItemList != null && regionLeeLookupItemList.Count > 0)
            {
                regionLeeLookupItem = (from item in regionLeeLookupItemList where item.RegionCode.ToUpper().Equals(codeToValidate.ToUpper()) select item).FirstOrDefault();
            }
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            return serializer.Serialize(regionLeeLookupItem);
        }
        #endregion
    }
}
