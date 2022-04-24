using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MediaManager.Areas.Media_Mgt.ViewModels;
using System.Web.Script.Serialization;

namespace MediaManager.Areas.Media_Mgt.Controllers
{
    public class MediaLibraryController : Controller
    {
        //
        // GET: /Media_Mgt/MediaLibrary/

        MediaLibraryViewModel mediaLibraryViewModel = new MediaLibraryViewModel();

        public ActionResult CreateLibrary()
        {
            return View(mediaLibraryViewModel);
        }

        public string LoadLibraries(string LibraryTitle, string Country, string LibraryType, string Type)
        {
            mediaLibraryViewModel.SearchLibraryDetail(LibraryTitle, Country, LibraryType, Type);
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            return serializer.Serialize(mediaLibraryViewModel.Libraries);
        }

        public JsonResult SaveLibraryDetail(List<MediaLibraryViewModel> mediaLibraryViewModel)
        {
            JsonResult jsonData = Json(false);
            var Message = "Insert";

            var LibraryDetail = new
            {
                Message = Message
            };
            jsonData = Json(LibraryDetail);
            return jsonData;
        }

        /// <summary>
        /// Get Country List
        /// </summary>
        /// <returns>JsonResult</returns>
        public JsonResult GetCountryList()
        {
            var jsonData = Json(false);
            var listCountry = mediaLibraryViewModel.GetCountryList();
            jsonData = Json(listCountry, JsonRequestBehavior.AllowGet);
            return jsonData;
        }

        /// <summary>
        /// Get Library List
        /// </summary>
        /// <returns></returns>
        public JsonResult GetLibraryList()
        {
            var jsonData = Json(false);
            var listLibrary = mediaLibraryViewModel.GetLibraryList();
            jsonData = Json(listLibrary, JsonRequestBehavior.AllowGet);
            return jsonData;
        }

        /// <summary>
        /// Get Storage List
        /// </summary>
        /// <returns></returns>
        public JsonResult GetStorageList()
        {
            var jsonData = Json(false);
            var listStorage = mediaLibraryViewModel.GetStorageList();
            jsonData = Json(listStorage, JsonRequestBehavior.AllowGet);
            return jsonData;
        }

    }
}
