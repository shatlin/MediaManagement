using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MediaManager.Areas.Media_Mgt.ViewModels;
using MediaManager.MediaManagementLookupServices;
using MediaManager.Infrastructure.Lookups;
using System.Web.Script.Serialization;

namespace MediaManager.Areas.Media_Mgt.Controllers
{
    public class TapeMaintenanceController : Controller
    {
        //
        // GET: /Media_Mgt/TapeMaintenance/

        TapeMaintenanceViewModel tapeMaintenanceViewModel = new TapeMaintenanceViewModel();
        Med_mngt_Lookups med_mngt_Lookups;

        public ActionResult TapeMaintenance()
        {            
            med_mngt_Lookups = new Med_mngt_Lookups();            
            tapeMaintenanceViewModel.ActionList = med_mngt_Lookups.GetActionList();
            tapeMaintenanceViewModel.TapeTypeList = med_mngt_Lookups.GetTapTypeList(); 
            tapeMaintenanceViewModel.CategoryList = med_mngt_Lookups.GetTapeCategoryList();
            tapeMaintenanceViewModel.LibraryList = med_mngt_Lookups.GetLibraryList();
            tapeMaintenanceViewModel.CourierCompanyList = med_mngt_Lookups.GetCourierCompany();
            return View(tapeMaintenanceViewModel);           
        }

        public ActionResult CreateNewTape()
        {
            med_mngt_Lookups = new Med_mngt_Lookups();           
            tapeMaintenanceViewModel.TapeTypeList = med_mngt_Lookups.GetTapTypeList();            
            tapeMaintenanceViewModel.LibraryList = med_mngt_Lookups.GetLibraryList();           
            return View(tapeMaintenanceViewModel);    
        }       

        [HttpPost]
        public JsonResult SearchProgrammeByTitle(string ProgrammeSearchTitle)
        {
            JsonResult jsonData = Json(false);
            tapeMaintenanceViewModel.SearchProgrammeByTitle(ProgrammeSearchTitle);
            tapeMaintenanceViewModel.LoadAddedProgramme(ProgrammeSearchTitle);
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            var data = new
            {
                objProgramme = tapeMaintenanceViewModel.ProgrammeSearchResult,
                objAddedProgramme = tapeMaintenanceViewModel.AddedProgramme
            };
            return jsonData = Json(data);
        }

        public JsonResult AddProgrammeToTape(int ProgrammeId)
        {
            return null;
        }

        public string LoadAddedProgramme(string ProgrammeSearchTitle)
        {
            tapeMaintenanceViewModel.LoadAddedProgramme(ProgrammeSearchTitle);
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            return serializer.Serialize(tapeMaintenanceViewModel.AddedProgramme);
        }
        
        public string SearchTapeDetail(string TapeTitle, string TapeNo, string ProgrammeSearchTitle, string TapeType)
        {
            tapeMaintenanceViewModel.SearchTapeDetail(TapeTitle , TapeNo ,  ProgrammeSearchTitle ,  TapeType);
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            return serializer.Serialize(tapeMaintenanceViewModel.TapeSearchResult);
        }

        public string SearchSegments(string ProgrammeSearchTitle)
        {
            tapeMaintenanceViewModel.SearchProgrammeByTitle(ProgrammeSearchTitle);
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            return serializer.Serialize(tapeMaintenanceViewModel.ProgrammeSearchResult);
        }
              
    }
}
