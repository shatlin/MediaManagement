using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
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
using MediaManager.Areas.Media_Mgt.Models;

namespace MediaManager.Areas.Media_Mgt.Controllers
{
    public class ReportController : Controller
    {
        //
        // GET: /Media_Mgt/Report/


        //[HttpPost]
        //public ActionResult MediaManagerMaterialStsRpt(AfrMatStatusRptModel afrMatStatusRptModel)
        //{
        //    //AfrMatStatusRptModel afrMatStatusRptModel = new AfrMatStatusRptModel();
        //    return View(afrMatStatusRptModel);
        //}

        #region MediaManager Material Status Report

        public ActionResult MediaManagerMaterialStsRpt()
        {
            AfrMatStatusRptModel afrMatStatusRptModel = new AfrMatStatusRptModel();
            return View();
        }
        public string  GetSupplierlList()
        {
            AfrMatStatusRptModel afrMatStatusRptModelLOV = new AfrMatStatusRptModel();
           // List<GetGenDistributorLookupItem> DistributorsLOV = new List<GetGenDistributorLookupItem>();
           afrMatStatusRptModelLOV.getsupplier();
            JavaScriptSerializer Lookupserializer = new JavaScriptSerializer();
            return Lookupserializer.Serialize(afrMatStatusRptModelLOV.DistributorsLOVList);
           
        }
        [HttpPost]
        [SetTempDataModelState]
        public ActionResult MediaManagerMaterialStsRpt(AfrMatStatusRptModel afrMatStatusRptModel, string btnGenerate, string btnExportToExcel)
        {
            string reportName = string.Empty;
            reportName = "SSCAfrMaterialStatusReport";

            if (!string.IsNullOrEmpty(btnGenerate))
            {
                List<ReportParameter> reportParameterList = new List<ReportParameter>();
                ReportParameter ProgTitleReportParameter = new ReportParameter();
                ProgTitleReportParameter.Name = "I_PROG_TITLE";
                if (afrMatStatusRptModel.ProgTitle == "%")
                {
                    afrMatStatusRptModel.ProgTitle = null;
                }
                ProgTitleReportParameter.Value = afrMatStatusRptModel.ProgTitle!=null? afrMatStatusRptModel.ProgTitle.ToUpper():afrMatStatusRptModel.ProgTitle;
                reportParameterList.Add(ProgTitleReportParameter);

                ReportParameter SupplieridReportParameter = new ReportParameter();
                SupplieridReportParameter.Name = "I_SUPP_ID";
                if (afrMatStatusRptModel.SupplierIDForGen == "%")
                {
                    afrMatStatusRptModel.SupplierIDForGen = null;
                }
                SupplieridReportParameter.Value = afrMatStatusRptModel.SupplierIDForGen;
                reportParameterList.Add(SupplieridReportParameter);

                ReportParameter RefNoReportParameter = new ReportParameter();
                RefNoReportParameter.Name = "I_REF_NO";
                if (afrMatStatusRptModel.RefNo == "%")
                {
                    afrMatStatusRptModel.RefNo = null;
                }
                RefNoReportParameter.Value = afrMatStatusRptModel.RefNo;
                reportParameterList.Add(RefNoReportParameter);

                ReportParameter MatearialIdReportParameter = new ReportParameter();
                MatearialIdReportParameter.Name = "I_MATERIAL_ID";
                if (afrMatStatusRptModel.MaterialId == "%")
                {
                    afrMatStatusRptModel.MaterialId = null;
                }
                MatearialIdReportParameter.Value = afrMatStatusRptModel.MaterialId;
                reportParameterList.Add(MatearialIdReportParameter);

                ReportParameter MaterialNameReportParameter = new ReportParameter();
                MaterialNameReportParameter.Name = "I_MAT_NAME";
                if (afrMatStatusRptModel.MaterialName == "%")
                {
                    afrMatStatusRptModel.MaterialName = null;
                }
                MaterialNameReportParameter.Value = afrMatStatusRptModel.MaterialName != null ? afrMatStatusRptModel.MaterialName.ToUpper() : afrMatStatusRptModel.MaterialName;
                reportParameterList.Add(MaterialNameReportParameter);

                ReportParameter ReceiptNoReportParameter = new ReportParameter();
                ReceiptNoReportParameter.Name = "I_RCT_NO";
                if (afrMatStatusRptModel.ReceiptNo == "%")
                {
                    afrMatStatusRptModel.ReceiptNo = null;
                }
                ReceiptNoReportParameter.Value = afrMatStatusRptModel.ReceiptNo;
                reportParameterList.Add(ReceiptNoReportParameter);

                ReportParameter DispatchNoeReportParameter = new ReportParameter();
                DispatchNoeReportParameter.Name = "I_DISPATCH_NO";
                if (afrMatStatusRptModel.DispatchNo == "%")
                {
                    afrMatStatusRptModel.DispatchNo = null;
                }
                DispatchNoeReportParameter.Value = afrMatStatusRptModel.DispatchNo;
                reportParameterList.Add(DispatchNoeReportParameter);

                ViewData["ReportParameterList"] = reportParameterList;
                ViewData["ReportTitle"] = "MediaManager Material Status Report";
                return RedirectToAction("GenrateReport", "Report", new { area = AreaConstants.Home, reportName = reportName, moduleId = Convert.ToInt32(InfrastructureService.ModuleEnum.Scheduling) });
            }
            else if (!string.IsNullOrEmpty(btnExportToExcel))
            {
                //Set request for export report
                ExportReportRequest req = new ExportReportRequest();
                req.ExportOption = ExportOptionEnum.EXCEL;
                req.ReportName = reportName;
                req.SPName = "X_PKG_DSP_MN_AFR_MAT_STS_RPT.prc_get_mat_status_exl";
                //Add input report SP parameters
                req.InputReportParams = new List<ReportSPParameter>();
                req.InputReportParams.Add(new ReportSPParameter() { Name = "I_PROG_TITLE", DbType = DbTypeEnum.Varchar2, Value = afrMatStatusRptModel.ProgTitle!=null? afrMatStatusRptModel.ProgTitle.ToUpper():afrMatStatusRptModel.ProgTitle, ParamDirection = ParameterDirectionEnum.Input });
                req.InputReportParams.Add(new ReportSPParameter() { Name = "I_SUPP_ID", DbType = DbTypeEnum.Varchar2, Value = afrMatStatusRptModel.SupplierId, ParamDirection = ParameterDirectionEnum.Input });
                req.InputReportParams.Add(new ReportSPParameter() { Name = "I_REF_NO", DbType = DbTypeEnum.Varchar2, Value = afrMatStatusRptModel.RefNo, ParamDirection = ParameterDirectionEnum.Input });
                req.InputReportParams.Add(new ReportSPParameter() { Name = "I_MATERIAL_ID ", DbType = DbTypeEnum.Varchar2, Value = afrMatStatusRptModel.MaterialId, ParamDirection = ParameterDirectionEnum.Input });
                req.InputReportParams.Add(new ReportSPParameter() { Name = "I_MAT_NAME ", DbType = DbTypeEnum.Varchar2, Value = afrMatStatusRptModel.MaterialName != null ? afrMatStatusRptModel.MaterialName.ToUpper() : afrMatStatusRptModel.MaterialName, ParamDirection = ParameterDirectionEnum.Input });
                req.InputReportParams.Add(new ReportSPParameter() { Name = "I_RCT_NO ", DbType = DbTypeEnum.Varchar2, Value = afrMatStatusRptModel.ReceiptNo, ParamDirection = ParameterDirectionEnum.Input });
                req.InputReportParams.Add(new ReportSPParameter() { Name = "I_DISPATCH_NO ", DbType = DbTypeEnum.Varchar2, Value = afrMatStatusRptModel.DispatchNo, ParamDirection = ParameterDirectionEnum.Input });
                req.InputReportParams.Add(new ReportSPParameter() { Name = "O_CUR_PERDAY", DbType = DbTypeEnum.RefCursor, ParamDirection = ParameterDirectionEnum.Output });

                //Call ExportReport
                ExportReportResponse response = ReportManager.GetExportReport(req);
                if (response.ExportedFIlePath != null)
                {
                    Stream readStream = ReportManager.GetExportedFileData(req.ReportName, response.ExportedFIlePath);
                    return File(readStream, "application/vnd.ms-excel", string.Format("{0}-{1:yyyyMMddHHmmss}.xls", req.ReportName, DateTime.Now));
                }
            }
            return RedirectToAction("MediaManagerMaterialStsRpt");
        }
        #endregion
    }
}
