using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MediaManager.Areas.Media_Mgt.ViewModels;
using System.Web.Script.Serialization;
using MediaManager.MediaManagerLibraryService;
using MediaManager.Areas.Media_Mgt.Common;
using MediaManager.Areas.Media_Mgt.Models;
using MediaManager.Infrastructure.Attributes;
using MediaManager.Infrastructure.WCFIntegration;
using MediaManager.Infrastructure.Helpers;
using MediaManager.Infrastructure.Authorization;
using System.Web.Security;

namespace MediaManager.Areas.Media_Mgt.Controllers
{
    [HandleErrorWithELMAHAttribute]
    public class LibraryController : Controller
    {
        public LibraryController()
        {
            //if (HttpContext.Session["callContext"] == null)
            //{                
            //    //model.ApplicationMessage = "Your session has expired.ReLogin is required.";
            //    //return Json(new { Applicationmessage = model.ApplicationMessage });
            //}
        }        

        #region Library Maintenance

        // GET: /Media_Mgt/MediaLibrary/

        LibraryViewModel libraryViewModel = new LibraryViewModel();
        LibraryUsers libraryUsrs = new LibraryUsers();

        [CustomAuthorize(Roles = "MediaManagerLibraryMaintenance")]
        public ActionResult LibraryMaintenance()
        {
            return View(libraryViewModel);
        }

        public JsonResult GetLibrary()
        {   
            var jsonData = Json(false);
            List<AppMessage> messageList = new List<AppMessage>();
            try
            {
                jsonData = Json(new
                {
                    result = libraryViewModel.GetLibrary(),
                    AppMessages = messageList
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                messageList.Add(new AppMessage() { Type = MessageTypeEnum.Error, Message = ex.Message });
                jsonData = Json(new
                {
                    result = new List<IDValPair>(),
                    AppMessages = messageList
                }, JsonRequestBehavior.AllowGet);
            }
            return jsonData;
        }

        public JsonResult SearchLibraryDetail(string LibraryID, string LibraryName, string Location)
        {            
            var jsonData = Json(false);
            List<AppMessage> messageList = new List<AppMessage>();
            try
            {
                jsonData = Json(new
                {
                    result = libraryViewModel.SearchLibraryDetail(LibraryID, LibraryName, Location),
                    AppMessages = messageList
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                messageList.Add(new AppMessage() { Type = MessageTypeEnum.Error, Message = ex.Message });
                jsonData = Json(new
                {
                    result = new List<IDValPair>(),
                    AppMessages = messageList
                }, JsonRequestBehavior.AllowGet);
            }
            return jsonData;
        }

        public JsonResult GetStorageTypeListForValidation()
        {

            var jsonData = Json(false);
            List<AppMessage> messageList = new List<AppMessage>();
            try
            {

                jsonData = Json(new
                {
                    lookupList = libraryViewModel.GetFidCodeList("STORE"),
                    AppMessages = messageList
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                messageList.Add(new AppMessage() { Type = MessageTypeEnum.Error, Message = ex.Message });
                jsonData = Json(new
                {
                    lookupList = new List<IDValPair>(),
                    AppMessages = messageList
                }, JsonRequestBehavior.AllowGet);
            }
            return jsonData;
        }
        
        public JsonResult SearchLibraryStorageDetail(string LibraryID)
        {
            //var jsonData = Json(false);
            //List<AppMessage> messageList = new List<AppMessage>();
            //try
            //{
            //    List<LibraryVO> LibraryDetail = libraryViewModel.SearchLibraryStorageDetail(LibraryID);
            //    jsonData = Json(new
            //    {
            //        LibraryDetail = LibraryDetail,
            //        AppMessages = messageList
            //    }, JsonRequestBehavior.AllowGet);
            //}
            //catch (Exception ex)
            //{
            //    messageList.Add(new AppMessage() { Type = MessageTypeEnum.Error, Message = ex.Message });
            //    jsonData = Json(new
            //    {
            //        LibraryDetail = "",
            //        AppMessages = messageList
            //    }, JsonRequestBehavior.AllowGet);
            //}
            //return jsonData;

            var jsonData = Json(false);
            List<LibraryVO> LibraryDetail = libraryViewModel.SearchLibraryStorageDetail(LibraryID);
            jsonData = Json(LibraryDetail, JsonRequestBehavior.AllowGet);
            return jsonData;
        }

        public JsonResult SearchLibraryUserDetail(string LibraryID)
        {
            var jsonData = Json(false);

            LibraryUsers lbUsers = new LibraryUsers();

            List<LibraryUsers> LibUserList = lbUsers.SearchLibraryUserDetail(LibraryID);
            jsonData = Json(LibUserList, JsonRequestBehavior.AllowGet);
            return jsonData;
        }

        public JsonResult SearchMenUsers()
        {
            var jsonData = Json(false);

            LibraryUsers lbUsers = new LibraryUsers();

            List<LibraryUsers> LibUserList = lbUsers.SearchMenUsers();
            jsonData = Json(LibUserList, JsonRequestBehavior.AllowGet);
            return jsonData;
        }
        
        public JsonResult GetLocationList()
        {
            var jsonData = Json(false);
            List<Common.IDValPair> locationList = libraryViewModel.GetFidCodeList("LOC");
            jsonData = Json(locationList, JsonRequestBehavior.AllowGet);
            return jsonData;
        }
        
        public JsonResult GetLocationListValidation()
        {
            var jsonData = Json(false);
            List<AppMessage> messageList = new List<AppMessage>();
            try
            {

                jsonData = Json(new
                {
                    lookupList = libraryViewModel.GetFidCodeList("LOC"),
                    AppMessages = messageList
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                messageList.Add(new AppMessage() { Type = MessageTypeEnum.Error, Message = ex.Message });
                jsonData = Json(new
                {
                    lookupList = new List<IDValPair>(),
                    AppMessages = messageList
                }, JsonRequestBehavior.AllowGet);
            }
            return jsonData;



        }
        
        public JsonResult GetMaxStorage(string LibraryID, string StorageTypeID)
        {
            var jsonData = Json(false);
            var list = libraryViewModel.GetMaxStorage(LibraryID, StorageTypeID);
            jsonData = Json(list, JsonRequestBehavior.AllowGet);
            return jsonData;
        }

        public JsonResult GetStorageTypeList()
        {
            var jsonData = Json(false);
            List<Common.IDValPair> locationList = libraryViewModel.GetFidCodeList("STORE");
            jsonData = Json(locationList, JsonRequestBehavior.AllowGet);
            return jsonData;
        }

        public JsonResult GetStorageList(string StorageTypeID)
        {
            var jsonData = Json(false);
            List<Common.IDValPair> locationList = libraryViewModel.GetFidCodeList("STORE");
            jsonData = Json(locationList, JsonRequestBehavior.AllowGet);
            return jsonData;
        }

        public JsonResult GetMaterialType()
        {
            var jsonData = Json(false);
            Common.Common common = new Common.Common();
            List<Common.IDValPair> list = common.GetMaterialType();
            jsonData = Json(list, JsonRequestBehavior.AllowGet);
            return jsonData;
        }

        public JsonResult GetAcceptRejectStatus()
        {
            var jsonData = Json(false);
            Common.Common common = new Common.Common();
            List<Common.IDValPair> list = common.GetAcceptRejectStatus();
            jsonData = Json(list, JsonRequestBehavior.AllowGet);
            return jsonData;
        }

        public JsonResult GetBookingStatus()
        {
            var jsonData = Json(false);
            Common.Common common = new Common.Common();
            List<Common.IDValPair> list = common.GetBookingStatus();
            jsonData = Json(list, JsonRequestBehavior.AllowGet);
            return jsonData;
        }

        public JsonResult GetLibraryList()
        {
            var jsonData = Json(false);
            Common.Common common = new Common.Common();
            List<Common.IDValPair> list = common.GetLibraryList();
            jsonData = Json(list, JsonRequestBehavior.AllowGet);
            return jsonData;
        }

        public JsonResult GetSupplierType()
        {
            var jsonData = Json(false);
            Common.Common common = new Common.Common();
            List<Common.IDValPair> list = common.GetSupplierType();
            jsonData = Json(list, JsonRequestBehavior.AllowGet);
            return jsonData;
        }

        public JsonResult SaveLibraryDetail(List<LibraryVO> listLibraryVO)
        { 
            JsonResult jsonData = Json(false);
            var list = libraryViewModel.SaveLibraryDetail(listLibraryVO);
            var LibraryDetail = new
            {
                LibraryList = list,
                Message = new AppMessage() { Type = MessageTypeEnum.Information, Message = "Data Saved sucessfully!" }
            };
            jsonData = Json(LibraryDetail);
            return jsonData;
        }

        public JsonResult SaveLibraryStorageDetail(List<LibraryVO> listLibraryVO)
        {
            JsonResult jsonData = Json(false);
            var list = libraryViewModel.SaveLibraryStorageDetail(listLibraryVO);
            var LibraryDetail = new
            {
                LibraryList = list,
                Message = new AppMessage() { Type = MessageTypeEnum.Information, Message = "Data Saved sucessfully!" }
            };
            jsonData = Json(LibraryDetail);
            return jsonData;
        }

        public JsonResult SaveLibraryUserDetail(List<LibraryUsers> LibUsers)
        {
            JsonResult jsonData = Json(false);
            LibraryUsers libUsr = new LibraryUsers();
            //    LibraryVO libUsr = new LibraryVO();
            if (LibUsers != null)
            {
                try
                {
                    var savedData = libraryUsrs.SaveLibraryUserDetail(LibUsers);
                    var LibraryUserList = new
                    {
                        data = savedData,
                        Message = new AppMessage() { Type = MessageTypeEnum.Information, Message = "Data Saved sucessfully!" }
                    };
                    jsonData = Json(LibraryUserList);
                }
                catch (Exception ex)
                {

                }
            }
            return jsonData;

        }

        ///// <summary>
        ///// Get Library List
        ///// </summary>
        ///// <returns></returns>
        //public JsonResult GetTypeList()
        //{
        //    var jsonData = Json(false);
        //    var listLibrary = libraryViewModel.GetTypeList();
        //    jsonData = Json(listLibrary, JsonRequestBehavior.AllowGet);
        //    return jsonData;
        //}

        ///// <summary>
        ///// Get Storage List
        ///// </summary>
        ///// <returns></returns>
        //public JsonResult GetStorageList(string TypeID)
        //{
        //    var jsonData = Json(false);
        //    var listStorage = libraryViewModel.GetStorageTypeList(TypeID);
        //    jsonData = Json(listStorage, JsonRequestBehavior.AllowGet);
        //    return jsonData;
        //}
        #endregion

        #region Book In

        LibraryBookInViewModel libraryBookInViewModel = new LibraryBookInViewModel();

        [CustomAuthorize(Roles = "MediaManagerLibraryBookIn")]
        public ActionResult LibraryBookIn()
        {
            libraryBookInViewModel.getcombo();
            return View(libraryBookInViewModel);
        }

        public ActionResult ReturnOfMaterial()
        {
            return View();
        }

        public ActionResult ReceiptofMaterial()
        {
            return View();
        }

        public JsonResult SearchLibraryBookInDetail(DateTime? FromDate, string MaterialID, string MaterialName, string ReceiptNo, string Supplier, DateTime ToDate)
        {
            var jsonData = Json(false);
            if (FromDate.ToString() == Convert.ToDateTime("01-Jan-9999 00:00:00").ToString())
            {
                FromDate = null;
            }
            List<MediaManagerLibraryService.AppMessage> messageList = new List<MediaManagerLibraryService.AppMessage>();
            try
            {
                if (libraryBookInViewModel != null)
                {
                    libraryBookInViewModel.MaterialID = MaterialID;
                    libraryBookInViewModel.MaterialName = MaterialName;
                    libraryBookInViewModel.ReceiptNo = ReceiptNo;
                    libraryBookInViewModel.Supplier = Supplier;
                    libraryBookInViewModel.FromDate = FromDate;
                    libraryBookInViewModel.ToDate = ToDate;
                    List<BookInVO> list = libraryBookInViewModel.SearchLibraryBookInDetail(libraryBookInViewModel);

                    if (ToDate != null && FromDate == null)
                        list = (from item in list where Convert.ToDateTime(item.CreatedDate) <= ToDate select item).ToList();
                    else if (ToDate != null && FromDate != null)
                        list = (from item in list where Convert.ToDateTime(item.CreatedDate) <= ToDate && Convert.ToDateTime(item.CreatedDate) >= FromDate select item).ToList();
                    else if (ToDate == null && FromDate != null)
                        list = (from item in list where Convert.ToDateTime(item.CreatedDate) >= FromDate select item).ToList();


                    jsonData = Json(new
                    {
                        bookinList = list,
                        AppMessages = messageList
                    }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                messageList.Add(new MediaManagerLibraryService.AppMessage() { Type = MediaManagerLibraryService.MessageTypeEnum.Error, Message = ex.Message });
                jsonData = Json(new
                {
                    AppMessages = messageList
                }, JsonRequestBehavior.AllowGet);
            }
            return jsonData;
            //var jsonData = Json(false);
            //if (FromDate.ToString() == Convert.ToDateTime("01/01/9999").ToString())
            //{
            //    FromDate = null;
            //}
            ////LibraryDetail libraryDetail = new LibraryDetail();
            //libraryBookInViewModel.listLibraryDetail = new List<LibraryBookInVO>();
            //libraryBookInViewModel.listLibraryDetail.Add(new LibraryBookInVO("TXN", "TXN-HDD-00001-KENLIB", "Movie", "HDD", "HDD", "Supplier", "TX", 10001, "KENLIB", "Kenya Library", "BKIN", "Book In", "USRABC","BOX1", "A", "Accepted", Convert.ToDateTime(DateTime.Now.ToShortDateString()), "Comment will goes here"));
            //libraryBookInViewModel.listLibraryDetail.Add(new LibraryBookInVO("SUPP", "SUPP-TAP-00002-NIGLIB", "Movie", "TAPE", "TAP", "Supplier", "SUPP", 10002, "NIGLIB", "Nigeria Library", "BKIN", "Book In", "USRXYZ", "BOX1", "R", "Rejected", Convert.ToDateTime(DateTime.Now.ToShortDateString()), "Comment will goes here"));
            //libraryBookInViewModel.listLibraryDetail.Add(new LibraryBookInVO("SUPP", "SUPP-HDD-00003-KENLIB", "Movie", "HDD", "HDD", "Supplier", "SUPP", 10003, "KENLIB", "Kenya Library", "BKIN", "Book In", "USRFGD", "BOX1", "A", "Accepted", Convert.ToDateTime(DateTime.Now.ToShortDateString()), "Comment will goes here"));
            //libraryBookInViewModel.listLibraryDetail.Add(new LibraryBookInVO("MNET", "MNET-TAP-00004-NIGLIB", "Movie", "TAPE", "TAP", "Supplier", "MNET", 10004, "NIGLIB", "Nigeria Library", "BKIN", "Book In", "USRDRC", "BOX1", "R", "Rejected", Convert.ToDateTime(DateTime.Now.ToShortDateString()), "Comment will goes here"));
            //if (MaterialID != "")
            //{
            //    libraryBookInViewModel.listLibraryDetail = libraryBookInViewModel.listLibraryDetail.Where(e => e.MaterialID == MaterialID).ToList();
            //}
            //else if (ReceiptNo != null)
            //{
            //    libraryBookInViewModel.listLibraryDetail = libraryBookInViewModel.listLibraryDetail.Where(e => e.ReceiptNo == ReceiptNo).ToList();
            //}
            //else if (SupplierID != "")
            //{
            //    libraryBookInViewModel.listLibraryDetail = libraryBookInViewModel.listLibraryDetail.Where(e => e.SuppplierID == SupplierID).ToList();
            //}
            //else if (MaterialName != "")
            //{
            //    libraryBookInViewModel.listLibraryDetail = libraryBookInViewModel.listLibraryDetail.Where(e => e.MaterialName.ToLower().Contains(MaterialName.ToLower())).ToList();
            //    if (FromDate != null && ToDate != null)
            //    {
            //        libraryBookInViewModel.listLibraryDetail = libraryBookInViewModel.listLibraryDetail.Where(
            //                                                   e => e.MaterialName.ToLower().Contains(MaterialName.ToLower()) &&
            //                                                   e.CreatedDate >= FromDate && e.CreatedDate < ToDate).ToList();
            //    }
            //}
            //else
            //{
            //    if (FromDate != null && ToDate != null)
            //    {
            //        libraryBookInViewModel.listLibraryDetail = libraryBookInViewModel.listLibraryDetail.Where(
            //                                                   e => e.MaterialName.ToLower().Contains(MaterialName.ToLower()) &&
            //                                                   e.CreatedDate >= FromDate && e.CreatedDate < ToDate).ToList();
            //    }
            //}
            //jsonData = Json(libraryBookInViewModel.listLibraryDetail, JsonRequestBehavior.AllowGet);
            //return jsonData;
        }

        //public JsonResult SaveLibraryBookinDetail(System.Collections.Generic.List<BookInVO> BookInVO)
        //{
        //    JsonResult jsonData = Json(false);
        //    var list = libraryBookInViewModel.SaveBookInDetail(BookInVO);
        //    var LibraryDetail = new
        //    {
        //        LibraryList = list,
        //        Message = new AppMessage() { Type = MessageTypeEnum.Information, Message = "Data Saved sucessfully!" }
        //    };
        //    jsonData = Json(LibraryDetail);
        //    return jsonData;
        //}

        //public JsonResult LoadProgramDetail(string MaterialID)
        //{
        //    var jsonData = Json(false);

        //    if (MaterialID != "")
        //    {
        //        libraryBookInViewModel.listProgramVO = new List<ProgramVO>();
        //        libraryBookInViewModel.listProgramVO.Add(new ProgramVO("TXN-HDD-00001-KENLIB", "Program1", "Working Program1", "Distributor1", "FREEFILL", "FIL", false));
        //        libraryBookInViewModel.listProgramVO.Add(new ProgramVO("TXN-HDD-00001-KENLIB", "Program2", "Working Program2", "Distributor2", "FREEFILL", "FIL", false));
        //        libraryBookInViewModel.listProgramVO.Add(new ProgramVO("TXN-HDD-00001-KENLIB", "Program3", "Working Program3", "Distributor1", "FREEFILL", "FIL", true));
        //        libraryBookInViewModel.listProgramVO.Add(new ProgramVO("TXN-HDD-00001-KENLIB", "Program4", "Working Program4", "Distributor2", "FREEFILL", "FIL", true));
        //        libraryBookInViewModel.listProgramVO.Add(new ProgramVO("SUPP-TAP-00002-NIGLIB", "Program1", "Working Program1", "Distributor1", "FREEFILL", "FIL", false));
        //        libraryBookInViewModel.listProgramVO.Add(new ProgramVO("SUPP-TAP-00002-NIGLIB", "Program2", "Working Program2", "Distributor2", "FREEFILL", "FIL", false));
        //        libraryBookInViewModel.listProgramVO.Add(new ProgramVO("MNET-TAP-00004-NIGLIB", "Program3", "Working Program3", "Distributor1", "FREEFILL", "FIL", true));
        //        libraryBookInViewModel.listProgramVO.Add(new ProgramVO("MNET-TAP-00004-NIGLIB", "Program4", "Working Program4", "Distributor2", "FREEFILL", "FIL", true));

        //        var RemovedProgram = libraryBookInViewModel.listProgramVO.Where(e => e.MaterialID == MaterialID && e.IsDeleted == true).ToList();
        //        var AddedProgram = libraryBookInViewModel.listProgramVO.Where(e => e.MaterialID == MaterialID && e.IsDeleted == false).ToList();

        //        var ProogramResult = new
        //        {
        //            RemovedProgram = RemovedProgram,
        //            AddedProgram = AddedProgram
        //        };
        //        jsonData = Json(ProogramResult, JsonRequestBehavior.AllowGet);

        //    } return jsonData;
        //}

        /// <summary>
        /// Load programme detail by material ID
        /// </summary>
        /// <param name="MaterialID"></param>
        /// <returns></returns>
        public JsonResult LoadProgramDetail(string MaterialID)
        {
            var jsonData = Json(false);

            if (MaterialID != "")
            {
                var result = libraryBookInViewModel.LoadProgramDetail(MaterialID);
                jsonData = Json(result, JsonRequestBehavior.AllowGet);
            } return jsonData;
        }

        public JsonResult SaveLibraryBookInDetail(List<BookInVO> listBookInVO)
        {
            JsonResult jsonData = Json(false);
            LibraryBookInVO libraryBookInVO = new LibraryBookInVO();
            if (listBookInVO != null)
            {
                try
                {
                    var savedData = libraryBookInViewModel.SaveBookInDetail(listBookInVO);
                    var LibraryDetail = new
                    {
                        data = savedData,
                        Message = new AppMessage() { Type = MessageTypeEnum.Information, Message = "Data Saved sucessfully!" }
                    };
                    jsonData = Json(LibraryDetail);
                }
                catch (Exception ex)
                {

                }
            }
            return jsonData;
        }

        public JsonResult SaveProgramDetail(List<BookInVO> ProgrammeVO)
        {
            JsonResult jsonData = Json(false);
            LibraryBookInVO libraryBookInVO = new LibraryBookInVO();
            if (ProgrammeVO != null)
            {
                try
                {
                    var savedData = libraryBookInViewModel.SaveProgrammeDetail(ProgrammeVO);
                    var LibraryDetail = new
                    {
                        data = savedData,
                        Message = new AppMessage() { Type = MessageTypeEnum.Information, Message = "Data Saved sucessfully!" }
                    };
                    jsonData = Json(LibraryDetail);
                }
                catch (Exception ex)
                {

                }
            }
            return jsonData;
        }

        public JsonResult GetSupplierLookup()
        {
            var jsonData = Json(false);
            var locationList = libraryBookInViewModel.GetSupplierList();
            jsonData = Json(locationList, JsonRequestBehavior.AllowGet);
            return jsonData;
        }

        public JsonResult GetSupplierListLookup(string strFilter)
        {
            var jsonData = Json(false);
            List<LookupsServices.GetGenDistributorLookupItem> distributorsLOVList = libraryBookInViewModel.GetSupplierList();
            if (!String.IsNullOrEmpty(strFilter) && distributorsLOVList !=null)
            {
                strFilter = strFilter.Replace("%", " ");
                strFilter = strFilter.Trim().ToUpper();

                distributorsLOVList = (from item in distributorsLOVList
                                       where item.ComName.ToLower().StartsWith(strFilter.ToLower())
                                        select item).ToList();
            }
            jsonData = Json(distributorsLOVList, JsonRequestBehavior.AllowGet);
            return jsonData;
        }
        public JsonResult GetMaterialTypeLookup()
        {
            var jsonData = Json(false);
            List<Common.IDValPair> locationList = libraryViewModel.GetFidCodeList("MAT");
            jsonData = Json(locationList, JsonRequestBehavior.AllowGet);
            return jsonData;
        }

        public JsonResult GetSupplierCopyTypeLookup()
        {
            var jsonData = Json(false);
            List<Common.IDValPair> locationList = libraryViewModel.GetFidCodeList("SUPP_TX_MNET");
            jsonData = Json(locationList, JsonRequestBehavior.AllowGet);
            return jsonData;
        }

        public JsonResult GetLibraryNameLookup()
        {
            var jsonData = Json(false);
            var result = libraryViewModel.GetLibrary();
            jsonData = Json(result, JsonRequestBehavior.AllowGet);
            return jsonData;
        }

        public JsonResult GetStorageLookup(string LibraryID)
        {
            var jsonData = Json(false);
            List<LibraryVO> LibraryDetail = libraryViewModel.SearchLibraryStorageDetail(LibraryID);
            jsonData = Json(LibraryDetail, JsonRequestBehavior.AllowGet);
            return jsonData;
        }

        public JsonResult GetStorageLists()
        {
            Common.Common common = new Common.Common();

            var jsonData = Json(false);
            List<AppMessage> messageList = new List<AppMessage>();
            try
            {

                jsonData = Json(new
                {
                    lookupList = common.GetStorageList(),
                    AppMessages = messageList
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                messageList.Add(new AppMessage() { Type = MessageTypeEnum.Error, Message = ex.Message });
                jsonData = Json(new
                {
                    lookupList = new List<IDValPair>(),
                    AppMessages = messageList
                }, JsonRequestBehavior.AllowGet);
            }
            return jsonData;
        }


        public JsonResult GetStatusNameLookup()
        {
            var jsonData = Json(false);
            List<Common.IDValPair> locationList = libraryViewModel.GetFidCodeList("BOOKSTATUS");
            jsonData = Json(locationList, JsonRequestBehavior.AllowGet);
            return jsonData;
        }
        public JsonResult GetStatusNameLookupforBookout()
        {
            var jsonData = Json(false);
            List<Common.IDValPair> locationList = libraryViewModel.GetFidCodeList("BOOKSTATUS");
            locationList.RemoveAt(0);

            jsonData = Json(locationList, JsonRequestBehavior.AllowGet);
            return jsonData;
        }

        public JsonResult GetAcceptRejectStatusLookup()
        {
            var jsonData = Json(false);
            List<Common.IDValPair> locationList = libraryViewModel.GetFidCodeList("ACC_REJ_STATUS");
            jsonData = Json(locationList, JsonRequestBehavior.AllowGet);
            return jsonData;
        }

        public JsonResult GetSupplierList()
        {


            var jsonData = Json(false);
            List<AppMessage> messageList = new List<AppMessage>();
            try
            {

                jsonData = Json(new
                {
                    lookupList = libraryBookInViewModel.GetSupplierList(),
                    AppMessages = messageList
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                messageList.Add(new AppMessage() { Type = MessageTypeEnum.Error, Message = ex.Message });
                jsonData = Json(new
                {
                    lookupList = new List<IDValPair>(),
                    AppMessages = messageList
                }, JsonRequestBehavior.AllowGet);
            }
            return jsonData;

        }

        public JsonResult GetSupplierCopyTypeList()
        {


            var jsonData = Json(false);
            List<AppMessage> messageList = new List<AppMessage>();
            try
            {

                jsonData = Json(new
                {
                    lookupList = libraryBookInViewModel.GetSupplierType(),
                    AppMessages = messageList
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                messageList.Add(new AppMessage() { Type = MessageTypeEnum.Error, Message = ex.Message });
                jsonData = Json(new
                {
                    lookupList = new List<IDValPair>(),
                    AppMessages = messageList
                }, JsonRequestBehavior.AllowGet);
            }
            return jsonData;

        }

        //public JsonResult GetLibraryNameLookup()
        //{
        //    var jsonData = Json(false);

        //    var lookupList = libraryBookInViewModel.GetLibraryList();
        //    jsonData = Json(lookupList, JsonRequestBehavior.AllowGet);

        //    return jsonData;
        //}

        public JsonResult GetLibraryNameList()
        {


            Common.Common common = new Common.Common();

            var jsonData = Json(false);
            List<AppMessage> messageList = new List<AppMessage>();
            try
            {

                jsonData = Json(new
                {
                    lookupList = common.GetLibraryList(),
                    AppMessages = messageList
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                messageList.Add(new AppMessage() { Type = MessageTypeEnum.Error, Message = ex.Message });
                jsonData = Json(new
                {
                    lookupList = new List<IDValPair>(),
                    AppMessages = messageList
                }, JsonRequestBehavior.AllowGet);
            }
            return jsonData;
        }





        public JsonResult GetStatusNameList()
        {



            Common.Common common = new Common.Common();

            var jsonData = Json(false);
            List<AppMessage> messageList = new List<AppMessage>();
            try
            {

                jsonData = Json(new
                {
                    lookupList = common.GetBookingStatus(),
                    AppMessages = messageList
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                messageList.Add(new AppMessage() { Type = MessageTypeEnum.Error, Message = ex.Message });
                jsonData = Json(new
                {
                    lookupList = new List<IDValPair>(),
                    AppMessages = messageList
                }, JsonRequestBehavior.AllowGet);
            }
            return jsonData;


        }

        public JsonResult GetStatusNameListValidation()
        {



            Common.Common common = new Common.Common();

            var jsonData = Json(false);
            List<AppMessage> messageList = new List<AppMessage>();

            try
            {

                jsonData = Json(new
                {
                    lookupList = common.GetBookingStatus(),
                    AppMessages = messageList
                }, JsonRequestBehavior.AllowGet);


            }
            catch (Exception ex)
            {
                messageList.Add(new AppMessage() { Type = MessageTypeEnum.Error, Message = ex.Message });
                jsonData = Json(new
                {
                    lookupList = new List<IDValPair>(),
                    AppMessages = messageList
                }, JsonRequestBehavior.AllowGet);
            }
            return jsonData;


        }
        public JsonResult GetStorageList()
        {



            Common.Common common = new Common.Common();

            var jsonData = Json(false);
            List<AppMessage> messageList = new List<AppMessage>();
            try
            {

                jsonData = Json(new
                {
                    lookupList = common.GetStorageList(),
                    AppMessages = messageList
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                messageList.Add(new AppMessage() { Type = MessageTypeEnum.Error, Message = ex.Message });
                jsonData = Json(new
                {
                    lookupList = new List<IDValPair>(),
                    AppMessages = messageList
                }, JsonRequestBehavior.AllowGet);
            }
            return jsonData;
        }

        /// <summary>
        /// Get programme detail
        /// </summary>
        /// <param name="PMVM"></param>
        /// <returns></returns>
        public string GetProgramme(ProgrammeMaintenanceViewModel PMVM)
        {
            List<BookInVO> listMaterialProgramDetail = new List<BookInVO>();
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
                    RefNo = 0
                }
                                     );
                return serializer.Serialize(emptySearchResult);
            }
            if (PMVM.MaterialID != null || PMVM.MaterialID != "")
            {
                listMaterialProgramDetail = libraryBookInViewModel.LoadProgramDetail(PMVM.MaterialID);
            }
            var ProgrammeSearchResultList = PMVM.ProgrammeSearchResultList;

            try
            {
                for (int i = 0; i < listMaterialProgramDetail.Count; i++)
                {
                    for (int j = 0; j < ProgrammeSearchResultList.Count; j++)
                    {
                        if (ProgrammeSearchResultList[j].RefNo == listMaterialProgramDetail[i].GenRefNo)
                        {
                            ProgrammeSearchResultList.RemoveAt(j);
                            //listMaterialProgramDetail.Remove(listMaterialProgramDetail[j]);
                            break;
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }

            //foreach (ProgrammeSearchResult programmeSearchResult in ProgrammeSearchResultList)
            //{
            //    foreach (var programmeSearchVO in listMaterialProgramDetail)
            //    {
            //        if (programmeSearchResult.RefNo == programmeSearchVO.GenRefNo)
            //        {
            //           ProgrammeSearchResultList.Remove(programmeSearchResult);
            //        }
            //    }
            //}
            return serializer.Serialize(PMVM.ProgrammeSearchResultList);
        }


        #endregion

        #region BookOut

        LibraryBookOutViewModel libraryBookOutViewModel = new LibraryBookOutViewModel();
        List<LibraryBookOutVO> listLibraryBookOut = new List<LibraryBookOutVO>();

        [CustomAuthorize(Roles = "MediaManagerLibraryBookOut")] 
        public ActionResult LibraryBookOut()
        {
            libraryBookOutViewModel.getcombo();
            return View(libraryBookOutViewModel);
        }

        //Method to search bookOut details.

        public JsonResult SearchLibraryBookOutDetail(string MaterialID, string MaterialName, int? ReceiptNo, string Supplier, int? DispatchNo)
        {
            var jsonData = Json(false);
            var result = libraryBookOutViewModel.SearchLibraryBookOutDetail(MaterialID, MaterialName, ReceiptNo, Supplier, DispatchNo);
            jsonData = Json(result, JsonRequestBehavior.AllowGet);
            return jsonData;
        }

        //Method to search History details of selected material.

        public JsonResult SearchBookingHistory(string MaterialID)
        {
            var jsonData = Json(false);
            //List<LibraryBookingHistory> LibraryBookHistoryList = new List<LibraryBookingHistory>();
            //List<LibraryBookingHistory> result = new List<LibraryBookingHistory>();
            ////LibraryBookHistoryList = libraryBookOutViewModel.SearchLibraryBookOutHistoryDetail(MaterialID);
            //if (LibraryBookHistoryList != null && LibraryBookHistoryList.Count > 0)
            //{
            //    foreach (LibraryBookingHistory bookingHistory in LibraryBookHistoryList)
            //    {
            //        if ((!string.IsNullOrEmpty(bookingHistory.Status)))
            //        {
            //            result.Add(bookingHistory);
            //        }
            //    }
            //}
            var result = libraryBookOutViewModel.SearchLibraryBookOutHistoryDetail(MaterialID);
            jsonData = Json(result, JsonRequestBehavior.AllowGet);
            return jsonData;
        }

        //Method to save Bookout details.

        public JsonResult SaveLibraryBookOutDetail(List<BookOutVO> BookOutVO)
        {
            JsonResult jsonData = Json(false);
            var list = libraryBookOutViewModel.SaveLibraryBookOutDetail(BookOutVO);
            var LibraryDetail = new
            {
                LibraryList = list,
                // Message = new AppMessage() { Type = MessageTypeEnum.Information, Message = "Data Saved sucessfully!" }
            };
            jsonData = Json(LibraryDetail);
            return jsonData;

        }
        #endregion

        #region Traffic To Supplier Communication

        [CustomAuthorize(Roles = "MediaManagerLibraryTraffics")] 
        public ActionResult TrafficToSupplierCommunication()
        {
            SupplierCommunication objSupplierCommunication = new SupplierCommunication();
            return View(objSupplierCommunication);
        }

        public JsonResult GetMaterialTyepList()
        {
            var jsonData = Json(false);
            List<AppMessage> messageList = new List<AppMessage>();
            try
            {
                TrafficToSupplierCommViewModel objTrafficToSupplierCommViewModel = new TrafficToSupplierCommViewModel();
                //jsonData = Json(objTrafficToSupplierCommViewModel.GetMaterialTyepList(), JsonRequestBehavior.AllowGet);
                jsonData = Json(new
                {
                    MaterialTyepList = objTrafficToSupplierCommViewModel.GetMaterialTyepList(),
                    AppMessages = messageList
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                messageList.Add(new AppMessage() { Type = MessageTypeEnum.Error, Message = ex.Message });
                jsonData = Json(new
                {
                    MaterialTyepList = new List<IDValPair>(),
                    AppMessages = messageList
                }, JsonRequestBehavior.AllowGet);
            }
            return jsonData;
        }

        public JsonResult GetModeOfCommunicationList()
        {
            var jsonData = Json(false);
            List<AppMessage> messageList = new List<AppMessage>();
            try
            {
                TrafficToSupplierCommViewModel objTrafficToSupplierCommViewModel = new TrafficToSupplierCommViewModel();
                // jsonData = Json(objTrafficToSupplierCommViewModel.GetModeOfCommunicationList(), JsonRequestBehavior.AllowGet);
                jsonData = Json(new
                {
                    ModeOfCommunicationList = objTrafficToSupplierCommViewModel.GetModeOfCommunicationList(),
                    AppMessages = messageList
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                messageList.Add(new AppMessage() { Type = MessageTypeEnum.Error, Message = ex.Message });
                jsonData = Json(new
                {
                    ModeOfCommunicationList = new List<IDValPair>(),
                    AppMessages = messageList
                }, JsonRequestBehavior.AllowGet);
            }
            return jsonData;
        }

        public JsonResult GetSearchList(string supplierName, string materialID, string materialName)
        {
            var jsonData = Json(false);
            List<AppMessage> messageList = new List<AppMessage>();
            try
            {
                TrafficToSupplierCommViewModel objTrafficToSupplierCommViewModel = new TrafficToSupplierCommViewModel();
                //jsonData = Json(objTrafficToSupplierCommViewModel.GetSearchList(supplierName, materialID, materialName), JsonRequestBehavior.AllowGet); 
                jsonData = Json(new
                {
                    SearchList = objTrafficToSupplierCommViewModel.GetSearchList(supplierName, materialID, materialName),
                    AppMessages = messageList
                }, JsonRequestBehavior.AllowGet);
                // return jsonData;
            }
            catch (Exception ex)
            {
                messageList.Add(new AppMessage() { Type = MessageTypeEnum.Error, Message = ex.Message });
                jsonData = Json(new
                {
                    SearchList="",
                    AppMessages = messageList
                }, JsonRequestBehavior.AllowGet);
            }
            return jsonData;
        }

        public JsonResult GetMaterialList()
        {
            var jsonData = Json(false);
            List<AppMessage> messageList = new List<AppMessage>();
            try
            {
                TrafficToSupplierCommViewModel objTrafficToSupplierCommViewModel = new TrafficToSupplierCommViewModel();
                jsonData = Json(new
                {
                    MaterialList = objTrafficToSupplierCommViewModel.GetMaterialList(),
                    AppMessages = messageList
                }, JsonRequestBehavior.AllowGet);
                //jsonData = Json(objTrafficToSupplierCommViewModel.GetMaterialList(), JsonRequestBehavior.AllowGet);
                // return jsonData;
            }
            catch (Exception ex)
            {
                messageList.Add(new AppMessage() { Type = MessageTypeEnum.Error, Message = ex.Message });
                jsonData = Json(new
                {
                    MaterialList = new List<IDValPair>(),
                    AppMessages = messageList
                }, JsonRequestBehavior.AllowGet);
            }
            return jsonData;
        }

        public JsonResult GetMaterialListLOV(string strFilter)
        {
            var jsonData = Json(false);
            List<AppMessage> messageList = new List<AppMessage>();
            List<MaterialVO> materialList=null;
            try
            {
                TrafficToSupplierCommViewModel objTrafficToSupplierCommViewModel = new TrafficToSupplierCommViewModel();
                materialList = objTrafficToSupplierCommViewModel.GetMaterialList();
                if (!String.IsNullOrEmpty(strFilter) && materialList!=null)
                {
                    strFilter = strFilter.Replace("%", " ");
                    strFilter = strFilter.Trim().ToUpper();

                    materialList = (from item in materialList
                                where item.MaterialId.ToLower().StartsWith(strFilter.ToLower())
                                select item).ToList();
                }
                jsonData = Json(new
                {
                    MaterialList = materialList,
                    AppMessages = messageList
                }, JsonRequestBehavior.AllowGet);
                //jsonData = Json(objTrafficToSupplierCommViewModel.GetMaterialList(), JsonRequestBehavior.AllowGet);
                // return jsonData;
            }
            catch (Exception ex)
            {
                messageList.Add(new AppMessage() { Type = MessageTypeEnum.Error, Message = ex.Message });
                jsonData = Json(new
                {
                    MaterialList = new List<IDValPair>(),
                    AppMessages = messageList
                }, JsonRequestBehavior.AllowGet);
            }
            return jsonData;
        }

        public JsonResult SaveSupplierCommunication(List<SupplierCommunication> supplierCommunicationList)
        {
            var jsonData = Json(false);
            List<MediaManagerLibraryService.AppMessage> messageList = new List<MediaManagerLibraryService.AppMessage>();
            try
            {
                TrafficToSupplierCommViewModel objTrafficToSupplierCommViewModel = new TrafficToSupplierCommViewModel();
                messageList = objTrafficToSupplierCommViewModel.Save(ref supplierCommunicationList);

                jsonData = Json(new
                {
                    SupplierCommunicationList = supplierCommunicationList,
                    AppMessages = messageList
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                messageList.Add(new MediaManagerLibraryService.AppMessage() { Type = MediaManagerLibraryService.MessageTypeEnum.Error, Message = ex.Message });
                jsonData = Json(new
                {
                    AppMessages = messageList
                }, JsonRequestBehavior.AllowGet);
            }
            return jsonData;
        }

        #endregion
    }



}
