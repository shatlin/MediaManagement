using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MediaManager.Areas.Media_Mgt.ViewModels;

namespace MediaManager.Areas.Media_Mgt.Controllers
{
    public class ManageDispatchController : Controller
    {
        //
        // GET: /Media_Mgt/ManageDispatch/

        ManageDispatchViewModel manageDispatchViewModel = new ManageDispatchViewModel();

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult BulkDispatch()
        {
           return View(manageDispatchViewModel);
        }

        public ActionResult BulkReturn()
        {
            var Model = new ManageDispatchViewModel();            
            return View(Model);
        }

        [HttpPost]
        public JsonResult SearchBulkDispatchTapeDetail(string ProgrammeSearchTitle)
        {
            JsonResult jsonData = Json(false);
            manageDispatchViewModel.SearchBulkDispatchProgramme(ProgrammeSearchTitle);
            manageDispatchViewModel.SearchBulkDispatchAddedProgramme(ProgrammeSearchTitle);
            var data = new
            {
                objTapeResult = manageDispatchViewModel.bulkDispatchTapeSearchResult,
                objAddedTapeResult = manageDispatchViewModel.bulkDispatchTapeAddedResult
            };
            return jsonData = Json(data);
        }

        [HttpPost]
        public JsonResult SearchBulkReturnTapeDetail(string ProgrammeSearchTitle)
        {
            JsonResult jsonData = Json(false);
            manageDispatchViewModel.SearchBulkReturnProgramme(ProgrammeSearchTitle);
            manageDispatchViewModel.SearchBulkReturnAddedProgramme(ProgrammeSearchTitle);
            var data = new
            {
                objTapeResult = manageDispatchViewModel.bulkReturnTapeSearchResult,
                objAddedTapeResult = manageDispatchViewModel.bulkReturnTapeAddedResult
            };
            return jsonData = Json(data);
        }

    }
}
