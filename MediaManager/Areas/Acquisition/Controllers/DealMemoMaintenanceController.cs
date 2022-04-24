using System;
using System.Linq;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using StackExchange.Profiling;
using MediaManager.Areas.Acquisition.ViewModels;
using MediaManager.DealMemoService;
using MediaManager.Infrastructure.Logging;
using MediaManager.Infrastructure.Authorization;
using MediaManager.Models;
using Newtonsoft.Json;
using MediaManager.Infrastructure.Lookups;
using MediaManager.Infrastructure.Attributes;
using MediaManager.Infrastructure.Helpers;
using MediaManager.Infrastructure.Roles;
using MediaManager.Areas.Acquisition.BO;
using System.Text.RegularExpressions;

namespace MediaManager.Areas.Acquisition.Controllers
{
    [HandleErrorWithELMAHAttribute]
    public class DealMemoMaintenanceController : Controller
    {
        protected override JsonResult Json(object data, string contentType, System.Text.Encoding contentEncoding, JsonRequestBehavior behavior)
        {
            return new JsonResult()
            {
                Data = data,
                ContentType = contentType,
                ContentEncoding = contentEncoding,
                JsonRequestBehavior = behavior,
                MaxJsonLength = Int32.MaxValue
            };
        }
        public ActionResult Index()
        {
            return View();
        }

        #region DealMemoSearchScreen
        [CustomAuthorize(Roles = "ShowDealMemoSearch")]
        public ActionResult DealMemoSearch()
        {
            DealMemo model = new DealMemo();
            //  model.AmortMethodLOVList = model.getAmortMethodLOVList();
            return View(model);
        }
        public string GetDealMemo(DealMemo DMVM)
        {

            DMVM.SearchDealMemo();
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            if (DMVM.searchresults.Count == 0)
            {
                List<Searchresults> emptySearchResult = new List<Searchresults>();
                emptySearchResult.Add(new Searchresults
                {
                    DMNumber = null,
                    ContractNo = null,
                    LicenseNo = null,
                    ContractEntity = null,
                    MainLicensee = null,
                    AmortMethod = null,
                    MemoDate = null,
                    Type = null,
                    Currency = null,
                    Status = null,
                    SignQARequired = null
                }
                                     );
                return serializer.Serialize(emptySearchResult);
            }
            return serializer.Serialize(DMVM.searchresults);

        }

        #endregion DealMemoSearchScreen

        #region DealMemoMaintenanceScreen

        Lookups Lookupgenerator = new Lookups();
        ContractLicenseeLookups contractLicenseeLookupGenerator = new ContractLicenseeLookups();
        DealMemoMaintenanceViewModel model = new DealMemoMaintenanceViewModel();
        DealMemoMaintenanceBO _presenter = new DealMemoMaintenanceBO();
        JavaScriptSerializer Lookupserializer = new JavaScriptSerializer();

         [CustomAuthorize(Roles = "ShowDealMemoMaintenance")]
        public ActionResult DealMemoMaintenance(string DMNumber)
        {
            var profiler = MiniProfiler.Current;
            model = new DealMemoMaintenanceViewModel();
            using (profiler.Step("ScreenerController ManageTitles"))
            {
                //MediaManagerLogger.StartPerformanceLogging();
                if (DMNumber != null)
                {
                    model.GetDealMemoSearchResult(DMNumber);
                }
                else
                {
                    model.DMVo_MemoDate = DateTime.Today.ToString("d");
                    model.DMVo_Hours = "0";
                    model.getTypeCombo();
                    model.getNewDealMethodId();
                }
                //MediaManagerLogger.StopPerformanceLogging("Screener-ManageTitles", "ManageTitles page of Screener Controller");
                return View(model);
            }
        }
       
        [HttpPost]
        public JsonResult SaveDealMemo(List<ProgrammeVO> ProgramVO, DealMemoMaintenanceViewModel model)
        {
            if ((HttpContext.Session["callContext"] == null) || (HttpContext.Session["callContext"] != null &&
                 ((MediaManager.Infrastructure.WCFIntegration.CallContext)HttpContext.Session["callContext"]).MENUserId == null))
            {
                model.ApplicationMessage = "Your session has expired.ReLogin is required.";
                return Json(new { Applicationmessage = model.ApplicationMessage });
            }
            if (!model.ValidateInputs(model))
            {
                return Json(new { Applicationmessage = model.ApplicationMessage });
            }

            //if (!model.userMadeChangeButNotSaved)
            //{
            //    model.ApplicationMessage = "No changes to save";
            //    return Json(new { Applicationmessage = model.ApplicationMessage });
            //}
            if (model.TypeComboSelection != null)
            {
                if (model.TypeComboSelection != "CHC" && model.TypeComboSelection != "CPD" && model.TypeComboSelection != "FLF" && model.TypeComboSelection != "ROY")
                {
                    model.ApplicationMessage = "Action NEW cannot be done when deal memo is in status";
                    return Json(new { Applicationmessage = model.ApplicationMessage });
                }
            }
            model.DMVo = new DealMemoVO();
            if (!string.IsNullOrEmpty(model.DMVo_DMNumber))
            {
                DealMemoVO newDMVo = new DealMemoVO();
                newDMVo.DMNumber_Search = model.DMVo_DMNumber.Trim();
                model.DMVo = _presenter.GetDealMemoSearchResult(newDMVo)[0];
                model.DMVo = _presenter.GetDealMemoDetails(model.DMVo);
                model.DMVo.PersistFlag = PersistFlagEnum.Modified;
                model.DMVo.SelectedTab = DealMemoVO.DealMemoTab.Programme;

           }
           if (!string.IsNullOrEmpty(model.DMVo_MemoDate))
           {
               model.DMVo.MemoDate = Convert.ToDateTime(model.DMVo_MemoDate);//model.DMVo_MemoDate;
           }
           if (!string.IsNullOrEmpty(model.DMVo_Currency))
           {
               model.DMVo.Currency = model.DMVo_Currency.ToUpper().Trim();
           }
           if (!string.IsNullOrEmpty(model.DMVo_ContractNo))
           {
               model.DMVo.ContractNo = model.DMVo_ContractNo.ToUpper().Trim();
           }
           if (!string.IsNullOrEmpty(model.TypeComboSelection))
           {
               model.DMVo.Type = model.TypeComboSelection;
           }
           if (!string.IsNullOrEmpty(model.DMVo_LicenseNo))
           {
               model.DMVo.LicenseNo = model.DMVo_LicenseNo.ToUpper().Trim();
           }
           if (!string.IsNullOrEmpty(model.DMVo_ContractEntity))
           {
               model.DMVo.ContractEntity = model.DMVo_ContractEntity.ToUpper().Trim();
           }
           if (!string.IsNullOrEmpty(model.DMVo_MainLicensee))
           {
               model.DMVo.MainLicensee = model.DMVo_MainLicensee.ToUpper().Trim();
           }
           if (!string.IsNullOrEmpty(model.DMVo_AmortMethod))
           {
               model.DMVo.AmortMethod = model.DMVo_AmortMethod.ToUpper().Trim();
               model.DMVo.Align = model.DMVO_Align;
               model.DMVo.Multiplex = model.DMVO_Multiplex;
           }
           if (!(ProgramVO == null))
           {
               model.DMVo.ProgrammeDetails = ProgramVO;
           }
           else
           {
               model.DMVo.ProgrammeDetails = new List<ProgrammeVO>();
           }
           int currentlySelectedIndex = 0;
           model.boolTabwiseresult = model.TabWiseSave(model,currentlySelectedIndex);
           if (model.boolTabwiseresult == true)
           {
               return Json(new { Applicationmessage = model.ApplicationMessage, successflag = model.boolTabwiseresult, DealMemoValues = model, messages=model.DMVo.Messages });
           }
           else
           {
               return Json(new { Applicationmessage = model.ApplicationMessage, successflag = model.boolTabwiseresult, messages = model.DMVo.Messages });
           }
        }

        #region ContextMenu

        [HttpPost]
        public JsonResult contextMenuCheck_Click(string DMNumber, int SelectedProgId)
        {
            bool checkResult = model.contextMenuCheck(DMNumber, SelectedProgId);
            string x = model.ApplicationMessage;
            if (checkResult == true)
            {
                return Json(new { Applicationmessage = model.ApplicationMessage, successflag = checkResult });
            }
            else
            {
                if (model.DMVo != null)
                {
                    return Json(new { Applicationmessage = model.ApplicationMessage, successflag = checkResult, messages = model.DMVo.Messages });
                }
                else
                {
                    return Json(new { Applicationmessage = model.ApplicationMessage, successflag = checkResult });
                }
            }
        }
        [HttpPost]
        public JsonResult contextMenuBudget_Click(string DMNumber)
        {
            bool checkResult = model.contextMenuBudget(DMNumber);
            string x = model.ApplicationMessage;
            if (checkResult == true)
            {
                return Json(new { Applicationmessage = model.ApplicationMessage, successflag = checkResult, status = model.DMVo_Status, HistoryDetails = model.DMVo.HistoryDetails });
            }
            else
            {
                if (model.DMVo != null)
                {
                    return Json(new { Applicationmessage = model.ApplicationMessage, successflag = checkResult, messages = model.DMVo.Messages });
                }
                else
                {
                    return Json(new { Applicationmessage = model.ApplicationMessage, successflag = checkResult });
                }
            }
        }
        [HttpPost]
        public JsonResult contextMenuUnBudget_Click(string DMNumber)
        {
            bool checkResult = model.contextMenuUnBudget(DMNumber);
            string x = model.ApplicationMessage;
            if (checkResult == true)
            {
                return Json(new { Applicationmessage = model.ApplicationMessage, successflag = checkResult, status = model.DMVo_Status, HistoryDetails = model.DMVo.HistoryDetails });
            }
            else
            {
                if (model.DMVo != null)
                {
                    return Json(new { Applicationmessage = model.ApplicationMessage, successflag = checkResult, messages = model.DMVo.Messages });
                }
                else
                {
                    return Json(new { Applicationmessage = model.ApplicationMessage, successflag = checkResult });
                }
            }
        }
        [HttpPost]
        public JsonResult contextMenuSignBuyer_Click(string DMNumber)
        {
            bool checkResult = model.contextMenuSignBuyer(DMNumber);
            string x = model.ApplicationMessage;
            if (checkResult == true)
            {
                return Json(new { Applicationmessage = model.ApplicationMessage, successflag = checkResult, status = model.DMVo_Status, HistoryDetails = model.DMVo.HistoryDetails });
            }
            else
            {
                if (model.DMVo != null)
                {
                    return Json(new { Applicationmessage = model.ApplicationMessage, successflag = checkResult, messages = model.DMVo.Messages });
                }
                else
                {
                    return Json(new { Applicationmessage = model.ApplicationMessage, successflag = checkResult });
                }
            }
        }
        [HttpPost]
        public JsonResult contextMenuUnSignBuyer_Click(string DMNumber)
        {
            bool checkResult = model.contextMenuUnSignBuyer(DMNumber);
            string x = model.ApplicationMessage;
            if (checkResult == true)
            {
                return Json(new { Applicationmessage = model.ApplicationMessage, successflag = checkResult, status = model.DMVo_Status, HistoryDetails = model.DMVo.HistoryDetails });
            }
            else
            {
                if (model.DMVo != null)
                {
                    return Json(new { Applicationmessage = model.ApplicationMessage, successflag = checkResult, messages = model.DMVo.Messages });
                }
                else
                {
                    return Json(new { Applicationmessage = model.ApplicationMessage, successflag = checkResult });
                }
            }
        }
       
        #endregion ContextMenu

        #region Programme Tab

        [HttpPost]
        public JsonResult GetProgrammeParticulars(string ModelDMNumber)
        {
            if ((!string.IsNullOrEmpty(ModelDMNumber)) && ModelDMNumber != "0" && ModelDMNumber != "null")
            {
                model.GetDealMemoProgrammeDetails(ModelDMNumber);
            }
            return Json(new { ProgramDetails = model.BindingListProgrammeParticulars });
        }

        public string AddNewProgramme()
        {
            model.AddNewProgramDetail();
            Lookupserializer = new JavaScriptSerializer();
            return Lookupserializer.Serialize(model.programmeVO);
        }
        
        public string AddNewLicenseeDetail()
        {
            LicenseeAllocationVO licenseeAllocationVO = new LicenseeAllocationVO();
            Lookupserializer = new JavaScriptSerializer();
            return Lookupserializer.Serialize(licenseeAllocationVO);
        }

      
        public string AddNewCatchLicenseeDetail()
        {
            CatchUpLicenseeAllocationVO catchUpLicenseeAllocationVO = new CatchUpLicenseeAllocationVO();
            Lookupserializer = new JavaScriptSerializer();
            return Lookupserializer.Serialize(catchUpLicenseeAllocationVO);
        }

       
        public string AddNewRunsPerChannelDetail()
        {
            RunsPerChannelVO runsPerChannelVo = new RunsPerChannelVO();
            Lookupserializer = new JavaScriptSerializer();
            return Lookupserializer.Serialize(runsPerChannelVo);
        }

        public string AddNewMediaPlateformRightsDetail()
        {
            MediaServicePlatformVO mediaServicePlatformVo = new MediaServicePlatformVO();
            Lookupserializer = new JavaScriptSerializer();
            return Lookupserializer.Serialize(mediaServicePlatformVo);
        }

        #endregion Programme Tab

        #region  Language Tab

        public JsonResult SuppliedBy()
        {
            var jsonData = Json(false);
            var supplied = model.SuppliedBy();
            jsonData = Json(supplied, JsonRequestBehavior.AllowGet);
            return jsonData;
        }
        public JsonResult SupplierUserCost()
        {
            var jsonData = Json(false);
            var supplierCost = model.SupplierUserCost();
            jsonData = Json(supplierCost, JsonRequestBehavior.AllowGet);
            return jsonData;
        }
        public string GetLanguageLOVList()
        {
            Lookupserializer = new JavaScriptSerializer();
            model.languageList = Lookupgenerator.languageList();
            return Lookupserializer.Serialize(model.languageList);
        }
        public string DefaultLanguage(string dmNumber)
        {
            model.GetDefaultLanguages(dmNumber);
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            return serializer.Serialize(model.DMVo.LanguageDetails);
        }
        public string GetLanguage(string dmNumber)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            model.GetLanguageData(dmNumber);
            return serializer.Serialize(model.DMVo.LanguageDetails);
        }
        [HttpPost]
        public JsonResult SaveLanguages(List<LanguageVO> Languages, string DMVo_DMNumber, DealMemoMaintenanceViewModel model)
        {
            if ((HttpContext.Session["callContext"] == null) || (HttpContext.Session["callContext"] != null &&
                 ((MediaManager.Infrastructure.WCFIntegration.CallContext)HttpContext.Session["callContext"]).MENUserId == null))
            {
                model.ApplicationMessage = "Your session has expired.ReLogin is required.";
                return Json(new { Messages = model.ApplicationMessage });
            }
              DealMemoVO resultVO= model.SaveLanguageDetails(Languages, DMVo_DMNumber, model);
              model.GetLanguageData(DMVo_DMNumber);
              if (resultVO.Messages != null)
               {
                   return Json(new { Messages = resultVO.Messages, Languages = model.DMVo.LanguageDetails });
               }
               else
                  return Json(new { Languages = model.DMVo.LanguageDetails });
            
        }

        #endregion

        #region  Territory Tab

        public string GetTerritoryLOVList()
        {
            Lookupserializer = new JavaScriptSerializer();
            model.territoryList = Lookupgenerator.territoryList();
            return Lookupserializer.Serialize(model.territoryList);
        }
        public string GetRightsLOVList()
        {
            Lookupserializer = new JavaScriptSerializer();
            model.rightsList = Lookupgenerator.rightsList();
            return Lookupserializer.Serialize(model.rightsList);
        }
        public string DefaultTerritory(string dmNumber, string rightsCode)
        {
            model.GetDefaultTerritories(dmNumber, rightsCode);
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            return serializer.Serialize(model.DMVo.TerritoryDetails);
        }
        public string GetTerritory(string dmNumber)
        {
            model.GetTerritoryData(dmNumber);
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            return serializer.Serialize(model.DMVo.TerritoryDetails);
        }
        [HttpPost]
        public JsonResult SaveTerritories(List<TerritoryVO> Territories, string DMVo_DMNumber,DealMemoMaintenanceViewModel model)
        {
            if ((HttpContext.Session["callContext"] == null) || (HttpContext.Session["callContext"] != null &&
                 ((MediaManager.Infrastructure.WCFIntegration.CallContext)HttpContext.Session["callContext"]).MENUserId == null))
            {
                model.ApplicationMessage = "Your session has expired.ReLogin is required.";
                return Json(new { Messages = model.ApplicationMessage });
            }

            DealMemoVO resultVO = model.SaveTerritoryDetails(Territories, DMVo_DMNumber, model);
            model.GetTerritoryData(DMVo_DMNumber);
            if (resultVO.Messages != null)
            {
                return Json(new { Messages = resultVO.Messages, Territorries = model.DMVo.TerritoryDetails });
            }
            else
                return Json(new { Territorries = model.DMVo.TerritoryDetails });
        }

        #endregion

        #region  Payment Tab

        public string GetPaymentCodeLOVList()
        {
            Lookupserializer = new JavaScriptSerializer();
            model.paymentCodeList = Lookupgenerator.paymentCodeList();
            return Lookupserializer.Serialize(model.paymentCodeList);
        }
        [HttpPost]
        public JsonResult SavePayments(List<PaymentVO> Payments, string DMVo_DMNumber, string Currency, DealMemoMaintenanceViewModel model)
        {
            if ((HttpContext.Session["callContext"] == null) || (HttpContext.Session["callContext"] != null &&
                 ((MediaManager.Infrastructure.WCFIntegration.CallContext)HttpContext.Session["callContext"]).MENUserId == null))
            {
                model.ApplicationMessage = "Your session has expired.ReLogin is required.";
                return Json(new { Messages = model.ApplicationMessage });
            }

            DealMemoVO resultVO = model.SavePaymentDetails(Payments, DMVo_DMNumber, model);
            model.GetPaymentData(DMVo_DMNumber);

            if (resultVO.Messages != null)
            {
                return Json(new { Messages = resultVO.Messages, Payments = model.DMVo.PaymentDetails });
            }
            else
                return Json(new { Payments = model.DMVo.PaymentDetails });         
        }
        public string GetPayment(string dmNumber)
        {
            model.GetPaymentData(dmNumber);
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            return serializer.Serialize(model.DMVo.PaymentDetails);
        }

        #endregion

        #region  History Tab

        public string GetHistory(string dmNumber)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            model.GetHistoryData(dmNumber);
            return serializer.Serialize(model.DMVo.HistoryDetails);
        }

        #endregion

        #endregion DealMemoMaintenanceScreen

        #region DealMemoLookups + Programme Tab

        
        public string GetCurrencyLOVList()
        {
            model.currencyList = Lookupgenerator.currencyList();
            Lookupserializer = new JavaScriptSerializer();
            return Lookupserializer.Serialize(model.currencyList);
        }
        public string GetLicensorLOVList(string LicensorHint)
        {
            model.licensorList = Lookupgenerator.licensorList(LicensorHint.ToUpper());
            Lookupserializer = new JavaScriptSerializer();
            return Lookupserializer.Serialize(model.licensorList);
        }
        public string GetChannelServiceList(string hintChannelService)
        {
            if ((!string.IsNullOrEmpty(hintChannelService)) && hintChannelService != "null")
            {
                model.ChannelServiceLov(hintChannelService.ToUpper());
            }
            else
            {
                model.ChannelServiceLov(null);
            }
            Lookupserializer = new JavaScriptSerializer();
            return Lookupserializer.Serialize(model.ChannelServiceList);
        }
        public string GetChannelList(string ChannelService, string hintChannel, string Type)
        {
            if ((!string.IsNullOrEmpty(hintChannel)) && hintChannel != "null")
            {
                model.ChannelServiceLov(hintChannel.ToUpper());
            }
            else
            {
                model.ChannelServiceLov(null);
            }
            if ((!string.IsNullOrEmpty(ChannelService)) && ChannelService != "null")
            {
                bool channelROYFlag = Type.Equals("ROY") ? true : false;
                int channelServiceNumber = (from ChannelServiceLov in model.ChannelServiceList
                                            where ChannelServiceLov.ChannelServiceCode == ChannelService.ToUpper()
                                            select ChannelServiceLov.ChannelServiceNumber).FirstOrDefault();
                model.RunsPerChannelLov(channelServiceNumber, hintChannel, channelROYFlag);
            }
            Lookupserializer = new JavaScriptSerializer();
            return Lookupserializer.Serialize(model.ChannelList);

        }
        public string GetContractEntityLOVList(string ContractEntityLOVHint)
        {
            model.contractEntityList = Lookupgenerator.contractEntityList(ContractEntityLOVHint.ToUpper());
            Lookupserializer = new JavaScriptSerializer();
            return Lookupserializer.Serialize(model.contractEntityList);
        }
        public string GetMainLicenseeLOVList(string MainLicenseeLOVHint)
        {
            model.mainLicenseeList = Lookupgenerator.mainLicenseeList(MainLicenseeLOVHint.ToUpper());
            Lookupserializer = new JavaScriptSerializer();
            return Lookupserializer.Serialize(model.mainLicenseeList);
        }
        public string getContractLOVList(string ContractLOVHint)
        {
            model.contractsList = Lookupgenerator.contractsList(ContractLOVHint.ToUpper());
            Lookupserializer = new JavaScriptSerializer();
            return Lookupserializer.Serialize(model.contractsList);
        }
        public string GetAmortMethodLOVList()
        {
            model.amortMethodList = Lookupgenerator.amortMethodList();
            Lookupserializer = new JavaScriptSerializer();
            return Lookupserializer.Serialize(model.amortMethodList);
        }
        public string GetTypeShowLOVList()
        {
            model.typeshowList = Lookupgenerator.typeshowList();
            Lookupserializer = new JavaScriptSerializer();
            return Lookupserializer.Serialize(model.typeshowList);
        }

        public string GetTitleLOVList(string TypeHint, string TitleHint)
        {
            string attributeSeriesOrGeneral = (from TypeList in Lookupgenerator.typeshowList()
                                               where TypeList.CodeValue == TypeHint.ToUpper()
                                               select TypeList.Attribute).FirstOrDefault();
            if ((!string.IsNullOrEmpty(TitleHint)) && TitleHint != "null")
            {
                model.ShowTitleLOV(attributeSeriesOrGeneral, TitleHint + "%", TypeHint, false);
            }
            else
                model.ShowTitleLOV(attributeSeriesOrGeneral, "A%", TypeHint, false);
            Lookupserializer = new JavaScriptSerializer();
            return Lookupserializer.Serialize(model.TitleList);
            //return Json(new
            //{
            //    Titles = model.TitleList,
            //    IsSeries = attributeSeriesOrGeneral
            //});
        }

        public string GetEventTypeLOVList(string EventTypeHint)
        {
            if ((!string.IsNullOrEmpty(EventTypeHint)) && EventTypeHint != "null")
            {
                model.EventTypeList = Lookupgenerator.EventTypeList(EventTypeHint.ToUpper());
            }
            else
            {
                model.EventTypeList = Lookupgenerator.EventTypeList(null);
            }
            Lookupserializer = new JavaScriptSerializer();
            return Lookupserializer.Serialize(model.EventTypeList);
        }
        public string GetProgramCategoryLOVList()
        {
            model.ProgrammeCategoryList = Lookupgenerator.ProgramCategoryList();
            Lookupserializer = new JavaScriptSerializer();
            return Lookupserializer.Serialize(model.ProgrammeCategoryList);
        }
        public string GetBOCategoryLOVList(string BOCategoryHint)
        {
            if ((!string.IsNullOrEmpty(BOCategoryHint)) && BOCategoryHint != "null")
            {
                model.BOCategoryList = Lookupgenerator.BOCategoryList(BOCategoryHint.ToUpper());
            }
            else
            {
                model.BOCategoryList = Lookupgenerator.BOCategoryList(null);
            }
            Lookupserializer = new JavaScriptSerializer();
            return Lookupserializer.Serialize(model.BOCategoryList);
        }
        public string GetLicenseeLOVList(string hintLicensee, string LeeType)
        {
            Lookupserializer = new JavaScriptSerializer();
            if ((!string.IsNullOrEmpty(hintLicensee)) && hintLicensee != "null")
            {
                model.LiceseeList = contractLicenseeLookupGenerator.LicenseeList(hintLicensee, LeeType);
            }
            else
                model.LiceseeList = contractLicenseeLookupGenerator.LicenseeList(null, LeeType);

            return Lookupserializer.Serialize(model.LiceseeList);
        }
        public string GetCatchUpPlatformRights(string DMNumber, int allocationId)
        {
            Lookupserializer = new JavaScriptSerializer();
            if ((!string.IsNullOrEmpty(DMNumber)) && DMNumber != "null")
            {
                model.GetCatchUpPlatformRights(int.Parse(DMNumber), allocationId);
            }
            else
            {
                model.GetCatchUpPlatformRights(0, allocationId);
            }
            return Lookupserializer.Serialize(model.PlatformRightsList);
        }

        public string GetLicensorDesc(string LicenseHint)
        {
            Lookupserializer = new JavaScriptSerializer();
            if (LicenseHint != null)
            {
                model.LicensorDesc = (from LicensorList in Lookupgenerator.licensorList(null)
                                      where LicensorList.ShortName == LicenseHint.ToUpper()
                                      select LicensorList.Name).FirstOrDefault();
            }
            return Lookupserializer.Serialize(model.LicensorDesc);
        }
        public string GetContractEntityDesc(string ContractEntityHint)
        {
            Lookupserializer = new JavaScriptSerializer();
            if (ContractEntityHint != null)
            {
                model.LicensorDesc = (from ContractEntity in Lookupgenerator.contractEntityList(null)
                                      where ContractEntity.ShortName == ContractEntityHint.ToUpper()
                                      select ContractEntity.Name).FirstOrDefault();
            }
            return Lookupserializer.Serialize(model.LicensorDesc);
        }
        public string GetMainLicenseeDesc(string MainLicenseeHint)
        {
            Lookupserializer = new JavaScriptSerializer();
            if (MainLicenseeHint != null)
            {
                model.MainLicenseeDesc = (from MainLicensee in Lookupgenerator.mainLicenseeList(null)
                                          where MainLicensee.ShortName == MainLicenseeHint.ToUpper()
                                          select MainLicensee.Name).FirstOrDefault();
            }
            return Lookupserializer.Serialize(model.MainLicenseeDesc);
        }
        public string GetAmortMethodDesc(string AmortMethodHint)
        {
            Lookupserializer = new JavaScriptSerializer();
            if (AmortMethodHint != null)
            {
                model.AmortMethod = (from Amortmethod in Lookupgenerator.amortMethodList()
                                         where Amortmethod.FsrValue1 == AmortMethodHint.ToUpper()
                                         select Amortmethod).FirstOrDefault();
            }
            return Lookupserializer.Serialize(model.AmortMethod);
        }

        [HttpPost]
        public JsonResult ValidateProgramDuration(string Duration)
        {
            var validationResult = false;
            try
            {
                Lookupserializer = new JavaScriptSerializer();
                string doubleValue = Convert.ToString(Duration);
                if (!doubleValue.Contains(":"))
                {
                    Duration = Convert.ToDouble(Duration).ToString("0000:00:00");
                }
                if (Duration.Contains(":"))
                {
                    Regex regexDuration = new Regex("([0][0][0-9][0-9]):([0-5][0-9]):([0-5][0-9])", RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.IgnorePatternWhitespace);
                    if (regexDuration.IsMatch(Duration))
                    {
                        validationResult = true;
                    }
                }
                return Json(new { successflag = validationResult, DurationValue = Duration });
            }
            catch
            {
                return Json(new { successflag = validationResult });
            }
        }


        [HttpPost]
        public JsonResult CalculateLicenseeTime(string startDateValue, string EndDateValue)
        {
            Lookupserializer = new JavaScriptSerializer();
            var validationResult = false;
            model.ApplicationMessage = null;
            if (DateTime.Parse(EndDateValue) < DateTime.Parse(startDateValue))
            {
                model.ApplicationMessage = "End Date should be greater than start date";
                return Json(new { successflag = validationResult, ApplicationMessage=model.ApplicationMessage });
            }
            else
            {
                validationResult = true;
                DateTime startDate = Convert.ToDateTime(DateTime.Parse(startDateValue));
                DateTime endDate = Convert.ToDateTime(EndDateValue);
                TimeSpan ts = endDate.Subtract(startDate);

                int compMonth = (endDate.Month + endDate.Year * 12) - (startDate.Month + startDate.Year * 12);
                int months = ((endDate.Month - startDate.Month) + (12 * (endDate.Year - startDate.Year)));
                return Json(new { successflag = validationResult, No_Days = ts.Days, No_Months = months });
            }
        }
        #endregion DealMemoLookups + Programme Tab
    }
}
