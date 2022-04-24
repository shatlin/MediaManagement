using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using MediaManager.Areas.Media_Mgt.ViewModels;
using MediaManager.ProgrammeLibraryServices;
using MediaManager.Infrastructure.Lookups;
using MediaManager.Models;
using Newtonsoft.Json;
using System.Collections;
using System.Linq;
using MediaManager.Infrastructure.Authorization;
using MediaManager.Infrastructure.Attributes;


namespace MediaManager.Areas.Media_Mgt.Controllers
{
     [HandleErrorWithELMAHAttribute]
    public class ProgrammeMaintenanceController : Controller
    {
         
        ArrayList objAr = new ArrayList();
        //
        // GET: /Media_Mgt/ProgrammeMaintenance/
        ProgrammeMaintenanceViewModel Model = new ProgrammeMaintenanceViewModel();
        LookupServiceLookups Lookupgenerator = new LookupServiceLookups();
        Med_mngt_Lookups Med_Lookupgenerator = new Med_mngt_Lookups();
        Lookups Acq_Lookup = new Lookups();
        public ActionResult Index()
        {
            var Model = new ProgrammeMaintenanceViewModel();         
            return View(Model);

        }
        [CustomAuthorize(Roles = "GETPROGRAMDETAILS")]
        public ActionResult ProgrammeSearch()
        {
             Model.getcombo();           
            return View(Model);            
        }

        [CustomAuthorize(Roles = "ShowProgrammeMaintenance")]
        public ActionResult ProgrammeMaintenance(string refno)
        {
            if (refno != null)
            {
                Model.SearchProgrammeDetails(refno);
            }
            else
            {        
               Model.getComboformaintenance();
            }
            Session["griddata"] = Model.CastDetailList;
            return View(Model);
        }
        [CustomAuthorize(Roles = "ShowProgrammeMaintenance")]
        public ActionResult ProgrammeMaintenancePopup(string refno)
        {
            if (refno != null)
            {
                Model.SearchProgrammeDetails(refno);
            }
            else
            {
                Model.getComboformaintenance();
            }
            Session["griddata"] = Model.CastDetailList;
            return  PartialView(Model);
        }

        public string View1()
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            if (Session["griddata"] != null)
            {
                List<ProgrammeCastDetailGrid> t = (List<ProgrammeCastDetailGrid>)Session["griddata"];

                Session["griddata"] = null;

                return serializer.Serialize(t);
            }
            else
            {
                
                return serializer.Serialize("");
            }
           
        }
        
        public string GetCastROleLOVList(string cellvalueRole)
        {          
            if (cellvalueRole != null)
            {
                Model.RunCastRoleLOV(cellvalueRole.ToUpper().Trim());
            }
            else
            {
                Model.CastRoleLOVList = Lookupgenerator.GetCastRolesList();
            }
            JavaScriptSerializer Lookupserializer = new JavaScriptSerializer();
            return Lookupserializer.Serialize(Model.CastRoleLOVList);
        }
        public string GetCastAwardLOVList(string cellvalueRole)
        {
            if (cellvalueRole != null)
            {
                Model.RunCastAwardLOV(cellvalueRole.ToUpper().Trim());
            }
            else
            {
                Model.CastAwardLOVList = Lookupgenerator.GetCastAwardList();
            }
            JavaScriptSerializer Lookupserializer = new JavaScriptSerializer();            
            return Lookupserializer.Serialize(Model.CastAwardLOVList);
        }
        public string GetProgramme(ProgrammeMaintenanceViewModel PMVM)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            PMVM.SearchProgramme();           
            if (PMVM.ProgrammeSearchResultList.Count == 0)
            {
                List<ProgrammeSearchResult> emptySearchResult = new List<ProgrammeSearchResult>();
                emptySearchResult.Add(new ProgrammeSearchResult
                {
                    ProgrammeTitle = "",
                    WorkingTitle = "",
                    Distributor = "",
                    PrimaryGenre = "",
                    Type = "",
                    RefNo=0
                }

                                     );
               return serializer.Serialize(emptySearchResult);
            }
            return serializer.Serialize(PMVM.ProgrammeSearchResultList);
            
        }
      //  [HttpPost]
       //public JsonResult SaveProgramme(List<ProgrammeCastDetailGrid> cast)
        //{
        //    return Json("");
        //}      
       [HttpPost]
        public JsonResult SaveProgramme(ProgrammeMaintenanceViewModel cast)
        {
          
            if (HttpContext.Session["callContext"] == null)
            {
                //return RedirectToAction("Home/Account/Login");
               // model.ApplicationMessage = "Your session has expired.ReLogin is required.";
                return Json(new { Applicationmessage = "Your session has expired.ReLogin is required" });
            }
            else
            {
                cast.SaveProgramme(cast);
                Session["griddataRefresh"] = cast.CastDetailList;
                // return Json("");
                return Json(cast);
            }
        }
    }
}
