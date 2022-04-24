using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MediaManager.Infrastructure.Authorization;
using MediaManager.Models;
using MediaManager.Areas.Infrastructure.Report;
using MediaManager.ReportingService;
using MediaManager.Infrastructure.Helpers;
using MediaManager.Areas.Home.Controllers;
using MediaManager.Areas.Acquisition.ViewModels;
using MediaManager.Areas.Home.Models;
using MediaManager.Infrastructure.Attributes;
using MediaManager.Areas.Acquisition.Models;
using MediaManager.InfrastructureService;
using System.IO;

namespace MediaManager.Areas.Acquisition.Controllers
{
    [HandleErrorWithELMAHAttribute]
    public class ReportController : Controller
    {
        //
        // GET: /Acquisition/Report/

        public ActionResult Index()
        {
            return View();
        }

        #region Deals Not Signed
        public void PopulateList(ref DealsNotSignedModel dealsNotSigned)
        {
            MediaManager.AcquisitionLookupService.ChannelCompanyRptLookupItem channelCompanyRptLookupItem = new MediaManager.AcquisitionLookupService.ChannelCompanyRptLookupItem();
            channelCompanyRptLookupItem.ComShortname = "%";
            channelCompanyRptLookupItem.ComName = "All";
            List<MediaManager.AcquisitionLookupService.LookupItem> channelCompanyList = AcquisitionLookupManager.GetChannelCompanyRpt(MediaManager.AcquisitionLookupService.ModuleEnum.Acquisition, MediaManager.AcquisitionLookupService.LookupKeyEnum.ChannelCompanyRptLookup);
            channelCompanyList.Insert(0, channelCompanyRptLookupItem);
            MediaManager.BudgetingLookupService.ProgrammeCombinationTypesLookupItem programmeCombinationTypesLookupItem = new MediaManager.BudgetingLookupService.ProgrammeCombinationTypesLookupItem();
            programmeCombinationTypesLookupItem.ComboId = "%";
            programmeCombinationTypesLookupItem.Description = "All";

            List<MediaManager.BudgetingLookupService.LookupItem> budgetCodeList = BudgetingLookupManager.GetProgrammeCombinationTypes(MediaManager.BudgetingLookupService.ModuleEnum.Budgeting, MediaManager.BudgetingLookupService.LookupKeyEnum.BudgetCodeLookup);
            budgetCodeList.Insert(0, programmeCombinationTypesLookupItem);


            dealsNotSigned.ChannelCompanyList = channelCompanyList;//new SelectList(channelCompanyList, "ComShortname", "ComShortname");
            dealsNotSigned.BudgetCodeList = budgetCodeList;//new SelectList(budgetCodeList, "ComboID", "ComboID");

        }

        [CustomAuthorize(Roles = "ShowDealsNotSignedRpt")]
        public ActionResult DealsNotSigned()
        {
            DealsNotSignedModel dealsNotSigned=new DealsNotSignedModel();
            PopulateList(ref dealsNotSigned);
            //dealsNotSigned.ForDate = DateTime.Now;
            return View("DealsNotSigned", dealsNotSigned);
        }

        [HttpPost]
        [SetTempDataModelState]
        public ActionResult DealsNotSigned(DealsNotSignedModel dealsNotSigned, string btnGenerate, string btnExportToExcel)
        {

            //if (!ModelState.IsValid)
            //{
            //    PopulateList(ref dealsNotSigned);
            //    return View(dealsNotSigned);
            //}
            string companyName = null, budgetCode = null;
            if (dealsNotSigned.CompanyName != null)
            {
                string[] companyNameArray = dealsNotSigned.CompanyName.Split(':');
                companyName = companyNameArray[0];
            }

            if (dealsNotSigned.BudgetCode != null)
            {
                string[] budgetCodeArray = dealsNotSigned.BudgetCode.Split(':');
                budgetCode = budgetCodeArray[0];
            }

            if (!string.IsNullOrEmpty(btnGenerate))
            {
                List<ReportParameter> reportParameterList = new List<ReportParameter>();
                ReportParameter fromDateReportParameter = new ReportParameter();
                fromDateReportParameter.Name = "I_COMPANY";
                    fromDateReportParameter.Value = companyName;
                reportParameterList.Add(fromDateReportParameter);

                ReportParameter ToDateReportParameter = new ReportParameter();
                ToDateReportParameter.Name = "I_BUDGETCODE";
                ToDateReportParameter.Value = budgetCode;
                reportParameterList.Add(ToDateReportParameter);

                ReportParameter reportParameter = new ReportParameter();
                reportParameter.Name = "I_DATE";
                reportParameter.Value = dealsNotSigned.ForDate.ToString("MM/dd/yyyy");
                reportParameterList.Add(reportParameter);
                ViewData["ReportParameterList"] = reportParameterList;
                ViewData["ReportTitle"] = "Deals Not Signed";
                return RedirectToAction("GenrateReport", "Report", new { area = AreaConstants.Home, reportName = "NewADMDealsNotSignedRpt", moduleId = Convert.ToInt32(ModuleEnum.Acquisition) });
            }
            else if (!string.IsNullOrEmpty(btnExportToExcel))
            {
                ExportReportRequest req = new ExportReportRequest();
                req.ExportOption = ExportOptionEnum.EXCEL;
                req.ReportName = "NewADMDealsNotSignedRpt";
                req.SPName = "PKG_ADM_CM_DEAL_MEMO_REPORTS.prc_adm_cm_deal_not_signed";
                req.InputReportParams = new List<ReportSPParameter>();
                req.InputReportParams.Add(new ReportSPParameter() { Name = "I_COMPANY", DbType = DbTypeEnum.Varchar2, Value = companyName, ParamDirection = ParameterDirectionEnum.Input });
                req.InputReportParams.Add(new ReportSPParameter() { Name = "I_BUDGETCODE", DbType = DbTypeEnum.Varchar2, Value = budgetCode, ParamDirection = ParameterDirectionEnum.Input });
                req.InputReportParams.Add(new ReportSPParameter() { Name = "I_DATE", DbType = DbTypeEnum.Varchar2, Value = dealsNotSigned.ForDate.ToString("dd-MMM-yyyy"), ParamDirection = ParameterDirectionEnum.Input });
                req.InputReportParams.Add(new ReportSPParameter() { Name = "o_search", DbType = DbTypeEnum.RefCursor, ParamDirection = ParameterDirectionEnum.Output });

                //Call ExportReport
                ExportReportResponse response = ReportManager.GetExportReport(req);

                if (response.ExportedFIlePath != null)
                {
                    Stream readStream = ReportManager.GetExportedFileData(req.ReportName, response.ExportedFIlePath);
                    return File(readStream, "application/vnd.ms-excel", string.Format("{0}-{1:yyyyMMddHHmmss}.xls", req.ReportName, DateTime.Now));
                }
            }
            return RedirectToAction("DealsNotSigned");
        }
        #endregion

        #region Deals executed between two dates
        [CustomAuthorize(Roles = "ShowDealsBetnDatesRpt")]
        public ActionResult ADMDealBetnDatesRpt()
         {
             ADMDealBetnDatesRptModel ADMDealBetnDatesRptModel = new ADMDealBetnDatesRptModel();

             MediaManager.AcquisitionLookupService.ReportCurrencyLookupItem reportCurrencyLookupItem = new MediaManager.AcquisitionLookupService.ReportCurrencyLookupItem();
             reportCurrencyLookupItem.CurrCode = "%";
             reportCurrencyLookupItem.CurrName = "All";
             List<MediaManager.AcquisitionLookupService.LookupItem> reportCurrencyList = AcquisitionLookupManager.GetReportCurrency(MediaManager.AcquisitionLookupService.ModuleEnum.Acquisition, MediaManager.AcquisitionLookupService.LookupKeyEnum.ReportCurrencyLookup);
             reportCurrencyList.Insert(0, reportCurrencyLookupItem);
             ADMDealBetnDatesRptModel.ReportCurrencyList = new SelectList(reportCurrencyList, "CurrCode", "CurrCode");
             ADMDealBetnDatesRptModel.FromDate = DateTime.Now;
             ADMDealBetnDatesRptModel.ToDate = DateTime.Now;
             return View("ADMDealBetnDatesRpt", ADMDealBetnDatesRptModel);
         }
        
        [HttpPost]
        [SetTempDataModelState]
        public ActionResult ADMDealBetnDatesRpt(ADMDealBetnDatesRptModel ADMDealBetnDatesRptModel, string btnGenerate, string btnExportToExcel)
         {     
             if (!string.IsNullOrEmpty(btnGenerate))
             {
                 List<ReportParameter> reportParameterList = new List<ReportParameter>();
                 ReportParameter fromDateReportParameter = new ReportParameter();
                 fromDateReportParameter.Name = "I_FROMDATE";
                 fromDateReportParameter.Value = ADMDealBetnDatesRptModel.FromDate.ToString("MM/dd/yyyy");
                 reportParameterList.Add(fromDateReportParameter);

                 ReportParameter ToDateReportParameter = new ReportParameter();
                 ToDateReportParameter.Name = "I_TODATE";
                 ToDateReportParameter.Value = ADMDealBetnDatesRptModel.ToDate.ToString("MM/dd/yyyy");
                 reportParameterList.Add(ToDateReportParameter);

                 ReportParameter reportParameter = new ReportParameter();
                 reportParameter.Name = "I_CURRENCY";
                 reportParameter.Value = ADMDealBetnDatesRptModel.CurrCode;
                 reportParameterList.Add(reportParameter);

                 ViewData["ReportParameterList"] = reportParameterList;
                 ViewData["ReportTitle"] = "Deals Executed Between Two Dates";
                 return RedirectToAction("GenrateReport", "Report", new { area = AreaConstants.Home, reportName = "NewADMDealBetnDatesRpt", moduleId = Convert.ToInt32(ModuleEnum.Acquisition) });
             }
             else if (!string.IsNullOrEmpty(btnExportToExcel))
             {
                 ExportReportRequest req = new ExportReportRequest();
                 req.ExportOption = ExportOptionEnum.EXCEL;
                 req.SPName = "PKG_ADM_CM_DEAL_MEMO_REPORTS.PRC_ADM_CM_DEAL_IN_TWO_DATES";
                 req.ReportName = "NewADMDealBetnDatesRpt";
                 req.InputReportParams = new List<ReportSPParameter>();
                 req.InputReportParams.Add(new ReportSPParameter() { Name = "I_FROMDATE", DbType = DbTypeEnum.Varchar2, Value = ADMDealBetnDatesRptModel.FromDate.ToString("dd-MMM-yyyy"), ParamDirection = ParameterDirectionEnum.Input });
                 req.InputReportParams.Add(new ReportSPParameter() { Name = "I_TODATE", DbType = DbTypeEnum.Varchar2, Value = ADMDealBetnDatesRptModel.ToDate.ToString("dd-MMM-yyyy"), ParamDirection = ParameterDirectionEnum.Input });
                 req.InputReportParams.Add(new ReportSPParameter() { Name = "I_CURRENCY", DbType = DbTypeEnum.Varchar2, Value = Convert.ToString(ADMDealBetnDatesRptModel.CurrCode), ParamDirection = ParameterDirectionEnum.Input });
                 req.InputReportParams.Add(new ReportSPParameter() { Name = "O_Search", DbType = DbTypeEnum.RefCursor, ParamDirection = ParameterDirectionEnum.Output });

                 ExportReportResponse response = ReportManager.GetExportReport(req);
                 if (response.ExportedFIlePath != null)
                 {
                     Stream readStream = ReportManager.GetExportedFileData(req.ReportName, response.ExportedFIlePath);
                     return File(readStream, "application/vnd.ms-excel", string.Format("{0}-{1:yyyyMMddHHmmss}.xls", req.ReportName, DateTime.Now));
                 }
             }
             return RedirectToAction("ADMDealBetnDatesRpt");
         }       
        #endregion

    }
}

