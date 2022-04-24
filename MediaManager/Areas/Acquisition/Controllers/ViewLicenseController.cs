using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MediaManager.Areas.Acquisition.ViewModels;
using System.Web.Script.Serialization;
using MediaManager.ProgrammeLibraryServices;
using MediaManager.Infrastructure.Attributes;
using MediaManager.Infrastructure.Authorization;

namespace MediaManager.Areas.Acquisition.Controllers
{
     [HandleErrorWithELMAHAttribute]
    public class ViewLicenseController : Controller
    {
       static int iCurrentRecord = 0;
       ViewLicenseModel objLicModel, objViewLicModel = null;
       List<ProgramLicenseReviewVO> prgLicReviewVOList = null;
       

        // GET: /Acquisition/ViewLicense/
        [CustomAuthorize(Roles = "ShowLicenseReview")]
        public ActionResult Index()
        {
            return View();
        }

       [CustomAuthorize(Roles = "ShowLicenseReview")]
        public ActionResult ViewLicenseDetails()
        {
            return View();
        }



        [CustomAuthorize(Roles = "ShowLicenseReview")]
        [HttpPost]
        public JsonResult GetData(string RefNo)
        {
           // string refno =(string) Session["ProgramRefNo"]; 
            if (RefNo != null)
            {
           
            objLicModel = new ViewLicenseModel();
            int ReferenceNo = Convert.ToInt32(RefNo);
            prgLicReviewVOList = objLicModel.OnLoadCall(ReferenceNo);
            }
            return Json(new { First = prgLicReviewVOList });

        }




    }
}
