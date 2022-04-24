using System;
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
using MediaManager.AcquisitionLookupService;


namespace MediaManager.Areas.Acquisition.Controllers
{
    [HandleErrorWithELMAHAttribute]
    public class DealMemoUserMaintenanceController : Controller
    {
        //
        // GET: /Acquisition/DealMemoUserMaintenance/
        #region : Objets Declarations
        DealMemoUserMaintenanceViewModel viewModelObject = null;
        UserVO userVoobject = null;
        AcquisitionLOVLoader objLoader = null;
        ActiveUserLookup objActiveuserlookup = null;
        List<UserVO> ChangeUserList = null;
        #endregion

        #region : Views
        public ActionResult Index()
        {
            return View();
        }
        [CustomAuthorize(Roles = "ShowDealMemoUserMaintenance")]
        public ActionResult DealMemoUserMaintenance()
        {
            return View();
        }
        #endregion

        #region : Methods

        #region : Search All Details
        public string GetDealMemoUserDetails(string mindpackUsername, string repCompanyname, string repLicense)
        {
            var jsonData = Json(false);
            viewModelObject = new DealMemoUserMaintenanceViewModel();
            List<DealMemoService.AppMessage> messageList = new List<DealMemoService.AppMessage>();
            userVoobject = new UserVO();
            List<UserVO> objUserList=new List<UserVO>();
            try
            {
                userVoobject.UserName = mindpackUsername;
                userVoobject.RepCompanyName = repCompanyname;
                userVoobject.RepLicensee = repLicense;
                if (HttpContext.Session["callContext"] == null)
                {
                    messageList.Add(new DealMemoService.AppMessage() { Type = DealMemoService.MessageTypeEnum.Information, Message = "Your session has expired.ReLogin is required." });
                    return messageList.ToString();
                    //return Json(new { UserList = objUserList, AppMessages = messageList }, JsonRequestBehavior.AllowGet);
                }
                viewModelObject.DealMemoSearchUserDetails = viewModelObject.SearchDealMemoUserDetails(userVoobject);
                objUserList = viewModelObject.DealMemoSearchUserDetails;
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                return serializer.Serialize(objUserList);
            }
            catch (Exception ex)
            {
                messageList.Add(new DealMemoService.AppMessage() { Type = DealMemoService.MessageTypeEnum.Error, Message = ex.Message });
                return messageList.ToString();
            }
        }
        #endregion
        
        #region : User name Look Up

        public JsonResult GetActiveUserDetails(string filterValue)   //string userName
        {
            var jsonData = Json(false);
            List<DealMemoService.AppMessage> messageList = new List<DealMemoService.AppMessage>();
            try
            {
                viewModelObject = new DealMemoUserMaintenanceViewModel();
                List<ActiveUserLookupItem> activeUserLookupList = viewModelObject.GetActiveUserDetails(filterValue);
                jsonData = Json(new { ActiveUserLookupList = activeUserLookupList,AppMessages = messageList }, JsonRequestBehavior.AllowGet );
            }
            catch (Exception ex)
            {
                messageList.Add(new DealMemoService.AppMessage() { Type = DealMemoService.MessageTypeEnum.Error, Message = ex.Message });
                jsonData = Json(new { ActiveUserLookupList = new List<ActiveUserLookupItem>(), AppMessages = messageList }, JsonRequestBehavior.AllowGet); 
                //Json(new MediaManager.InfrastructureService.AppMessage() { Type = MediaManager.InfrastructureService.MessageTypeEnum.Error, Message = ex.Message }, JsonRequestBehavior.AllowGet);
                //return jsonData;                
            }
            return jsonData;  
        }
        #endregion

        #region : Licensee Details Look Up
        public JsonResult GetLicenseeDetails(string filterValue)
        {
            var jsonData = Json(false);
            List<DealMemoService.AppMessage> messageList = new List<DealMemoService.AppMessage>();
            try
            {
                viewModelObject = new DealMemoUserMaintenanceViewModel();
                List<LookupsServices.LicenseeLookupItem> licenseeLookupItemList = viewModelObject.GetLicenseeDetails(filterValue);
                jsonData = Json(new { LicenseeLookupItemList = licenseeLookupItemList, AppMessages = messageList }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                messageList.Add(new DealMemoService.AppMessage() { Type = DealMemoService.MessageTypeEnum.Error, Message = ex.Message });
                jsonData = Json(new 
                                { LicenseeLookupItemList = new List<LookupsServices.LicenseeLookupItem>(), AppMessages = messageList }, 
                                JsonRequestBehavior.AllowGet); 
                                //Json(new MediaManager.InfrastructureService.AppMessage() { Type = MediaManager.InfrastructureService.MessageTypeEnum.Error, Message = ex.Message }, JsonRequestBehavior.AllowGet);
                                //return jsonData;                
            }
            return jsonData;  
        }
        #endregion

        #region : Company Details Look Up
        public JsonResult GetCompanyDetails(string filterValue)
        {
            var jsonData = Json(false);
            List<DealMemoService.AppMessage> messageList = new List<DealMemoService.AppMessage>();
            try
            {
                viewModelObject = new DealMemoUserMaintenanceViewModel();
                List<UserCompDetailLookupItem> userCompLookupList = viewModelObject.GetCompanyDetails(filterValue);
                jsonData = Json(new { UserCompLookupList = userCompLookupList, AppMessages = messageList }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                messageList.Add(new DealMemoService.AppMessage() { Type = DealMemoService.MessageTypeEnum.Error, Message = ex.Message });
                jsonData = Json(new { UserCompLookupList=new List<UserCompDetailLookupItem>(), AppMessages = messageList}, JsonRequestBehavior.AllowGet); 
                //Json(new MediaManager.InfrastructureService.AppMessage() { Type = MediaManager.InfrastructureService.MessageTypeEnum.Error, Message = ex.Message }, JsonRequestBehavior.AllowGet);
                //return jsonData;                
            }
            return jsonData;  
        }
        #endregion

        #region : Adding records

        [HttpPost]
        public JsonResult Save(List<UserVO> objUserList)
        {
            var jsonData = Json(false);
            List<DealMemoService.AppMessage> messageList = new List<DealMemoService.AppMessage>();
            try
            {
                viewModelObject = new DealMemoUserMaintenanceViewModel();
                if (HttpContext.Session["callContext"] == null)
                {
                    messageList.Add(new DealMemoService.AppMessage() { Type = DealMemoService.MessageTypeEnum.Information, Message = "Your session has expired.ReLogin is required." });
                    return Json(new { UserList = objUserList, AppMessages = messageList }, JsonRequestBehavior.AllowGet);
                }
                objUserList= viewModelObject.Save(objUserList);
                if (viewModelObject.CustomOracleMessage != null)
                {
                    messageList = viewModelObject.CustomOracleMessage;
                }
                else
                {
                    messageList.Add(new DealMemoService.AppMessage() { Type = DealMemoService.MessageTypeEnum.Information, Message = "Transaction completed successfully." });
                }
               jsonData = Json(new { UserList=objUserList, AppMessages = messageList }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                messageList.Add(new DealMemoService.AppMessage() { Type = DealMemoService.MessageTypeEnum.Error, Message = ex.Message });
                jsonData = Json(new { AppMessages = messageList }, JsonRequestBehavior.AllowGet);
                //return jsonData;                
            }
            return jsonData;   
        }
        #endregion

        #endregion
    }
}
