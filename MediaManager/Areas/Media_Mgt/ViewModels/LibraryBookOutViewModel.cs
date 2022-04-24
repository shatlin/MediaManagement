using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MediaManager.Areas.Media_Mgt.Common;
using MediaManager.MediaManagerLibraryService;
using System.Web.Mvc;
using MediaManager.Infrastructure.Helpers;
using MediaManager.LookupsServices;
using MediaManager.Infrastructure.Lookups;

namespace MediaManager.Areas.Media_Mgt.ViewModels
{
    public class LibraryBookOutVO : BaseVO
    {
        public int BookoutId { get; set; }
        public string SuppplierID { get; set; }
        public string MaterialID { get; set; }
        public string MaterialName { get; set; }
        public string MaterialType { get; set; }
        public string MaterialTypeID { get; set; }
        public int ReceiptNo { get; set; }
        public string LibraryID { get; set; }
        public string LibraryName { get; set; }
        public string StatusID { get; set; }
        public string Status { get; set; }
        public int? DispatchNo { get; set; }
        public string GivenTo { get; set; }
        public string CourierDetails { get; set; }
        public string RecInRSABy { get; set; }
        public string CreatedBy { get; set; }
        public string Date { get; set; }
        public string Comments { get; set; }

        public LibraryBookOutVO()
        {

        }

        public LibraryBookOutVO(int BookoutId, string SuppplierID, string MaterialID, string MaterialName, string MaterialType,
                             int ReceiptNo, string LibraryName, string Status, int DispatchNo,
                             string GivenTo, string CourierDetails, string RecInRSABy, string CreatedDate, string Comments)
        {
            this.BookoutId = BookoutId;
            this.SuppplierID = SuppplierID;
            this.MaterialID = MaterialID;
            this.MaterialName = MaterialName;
            this.MaterialType = MaterialType;
            this.ReceiptNo = ReceiptNo;
            this.LibraryName = LibraryName;
            this.Status = Status;
            this.DispatchNo = DispatchNo;
            this.GivenTo = GivenTo;
            this.CourierDetails = CourierDetails;
            this.RecInRSABy = RecInRSABy;
            this.Date = Date;
            this.Comments = Comments;
        }

    }

    public class LibraryBookingHistory
    {
        public string MaterialID { get; set; }
        public string MaterialName { get; set; }
        public string MaterialType { get; set; }

        public string LibraryName { get; set; }
        public string Status { get; set; }
        public string ByUser { get; set; }
        public string ToUser { get; set; }
        public string CreatedDate { get; set; }

        public LibraryBookingHistory()
        {

        }

        public LibraryBookingHistory(string MaterialID, string MaterialName, string MaterialType, string LibraryName, string Status,
                                        string ByUser, string ToUser, string CreatedDate)
        {
            this.MaterialID = MaterialID;
            this.MaterialName = MaterialName;
            this.MaterialType = MaterialType;
            this.LibraryName = LibraryName;
            this.Status = Status;
            this.ByUser = ByUser;
            this.ToUser = ToUser;
            this.CreatedDate = CreatedDate;
        }
    }

    public class LibraryBookOutViewModel
    {
        public string MaterialID;
        public string MaterialName;
        public string DispatchNo;
        public string ReceiptNo;
        public string Supplier;
        public List<LibraryBookOutVO> listBookOutDetail { get; set; }
        public List<LibraryBookingHistory> bookingHistory { get; set; }
        public List<GetGenDistributorLookupItem> DistributorsLOVList { get; set; }
        LookupServiceLookups Lookupgenerator = new LookupServiceLookups();
        public LibraryBookOutViewModel()
        {

        }
        public List<LibraryBookOutVO> SearchLibraryBookOutDetail(string MaterialID, string MaterialName, int? ReceiptNo, string Supplier, int? DispatchNo)
        {

            List<LibraryBookOutVO> LibraryBookOutVOList = new List<LibraryBookOutVO>();
            LibraryMaintainenceClient proxy = null;
            LibraryBookOutVO libraryBookOutVO;
            SearchBookOutResponse response = new SearchBookOutResponse();
            try
            {
                proxy = ServiceInvoker.OpenLibraryMaintainenceProxy();
                SearchBookOutRequest request = new SearchBookOutRequest();
                request.BookOutVO = new BookOutVO();
                if (request.BookOutVO != null)
                {
                    request.BookOutVO.MaterialId = MaterialID;
                    request.BookOutVO.MaterialName = MaterialName;
                    request.BookOutVO.ReceiptNo = ReceiptNo.ToString();
                    request.BookOutVO.SupplierId = Supplier;
                    request.BookOutVO.DispatchNo = DispatchNo.ToString();
                    response = proxy.SearchBookOutDetails(request);
                }
                foreach (BookOutVO BookOutVO in response.BookOutSearchList)
                {
                    libraryBookOutVO = new LibraryBookOutVO();
                    libraryBookOutVO.BookoutId = BookOutVO.BookoutId;
                    libraryBookOutVO.SuppplierID = BookOutVO.SupplierId;
                    libraryBookOutVO.MaterialID = BookOutVO.MaterialId;
                    libraryBookOutVO.MaterialName = BookOutVO.MaterialName;
                    libraryBookOutVO.MaterialType = BookOutVO.MaterialType;
                    libraryBookOutVO.ReceiptNo = Convert.ToInt32(BookOutVO.ReceiptNo);
                    libraryBookOutVO.LibraryName = BookOutVO.LibraryName;
                    libraryBookOutVO.Status = BookOutVO.Status;
                    if (BookOutVO.DispatchNo != "")
                    {
                        libraryBookOutVO.DispatchNo = Convert.ToInt32(BookOutVO.DispatchNo);
                    }
                    else
                    {
                        libraryBookOutVO.DispatchNo = null;
                    }
                    libraryBookOutVO.GivenTo = BookOutVO.GivenTo;
                    libraryBookOutVO.CourierDetails = BookOutVO.CourierDetails;
                    libraryBookOutVO.RecInRSABy = BookOutVO.RecInRSABy;
                    libraryBookOutVO.Date = BookOutVO.Date.ToShortDateString();
                    libraryBookOutVO.Comments = BookOutVO.Comments;
                    libraryBookOutVO.UpdateCount = BookOutVO.UpdateCount;
                    LibraryBookOutVOList.Add(libraryBookOutVO);
                }
            }
            catch (Exception)
            {
                return null;
            }
            finally
            {
                ServiceInvoker.CloseLibraryMaintainenceProxy(proxy);
            }
            return LibraryBookOutVOList;
        }
        public List<LibraryBookingHistory> SearchLibraryBookOutHistoryDetail(string MaterialID)
        {
            List<LibraryBookingHistory> LibraryBookHistoryList = new List<LibraryBookingHistory>();
            LibraryMaintainenceClient proxy = null;
            LibraryBookingHistory libraryBookHistory;
            SearchBookInOutResponse response = new SearchBookInOutResponse();
            try
            {
                proxy = ServiceInvoker.OpenLibraryMaintainenceProxy();
                SearchBookInOutRequest request = new SearchBookInOutRequest();
                request.BookInOutVO = new BookOutVO();
                if (request.BookInOutVO != null)
                {
                    request.BookInOutVO.MaterialId = MaterialID;
                    response = proxy.SearchBookInOutHistoryDetails(request);
                }
                foreach (BookOutVO BookOutHistoryVO in response.BookInOutSearchList)
                {
                    libraryBookHistory = new LibraryBookingHistory();
                    libraryBookHistory.MaterialID = BookOutHistoryVO.MaterialId;
                    libraryBookHistory.MaterialName = BookOutHistoryVO.MaterialName;
                    libraryBookHistory.MaterialType = BookOutHistoryVO.MaterialType;
                    libraryBookHistory.LibraryName = BookOutHistoryVO.LibraryName;
                    libraryBookHistory.Status = BookOutHistoryVO.Status;
                    libraryBookHistory.ByUser = BookOutHistoryVO.ByUser;
                    libraryBookHistory.ToUser = BookOutHistoryVO.ToUser;
                    libraryBookHistory.CreatedDate = BookOutHistoryVO.CapturedDate.ToString(); 
                    LibraryBookHistoryList.Add(libraryBookHistory);
                }
            }
            catch (Exception)
            {
                return null;
            }
            finally
            {
                ServiceInvoker.CloseLibraryMaintainenceProxy(proxy);
            }
            return LibraryBookHistoryList;
        }
        public List<BookOutVO> SaveLibraryBookOutDetail(List<BookOutVO> listLibrary)
        {
            LibraryMaintainenceClient proxy = null;
            SaveBookOutResponse response = new SaveBookOutResponse();
            try
            {
                proxy = new LibraryMaintainenceClient();
                proxy.Open();
                SaveBookOutRequest request = new SaveBookOutRequest();
                request.bookOutVOList = new List<BookOutVO>();
                if (request.bookOutVOList != null)
                {

                    //foreach (LibraryVO libraryVO in listLibrary)
                    //{
                    //    int i = 0;
                    //    request.LibraryVO.LibraryID = libraryVO.LibraryID;
                    //    request.LibraryVO.LibraryName = libraryVO.LibraryName;
                    //    request.LibraryVO.LocationID = libraryVO.LocationID;
                    //    request.LibraryVO.PersistFlag = PersistFlagEnum.Added;

                    //}
                    request.bookOutVOList = listLibrary.ToList();
                    response = proxy.SaveBookOutDetails(request);
                }
                //libraryList = new List<LibraryBookOutVO>();
                //foreach (LibraryVO libraryVO in response.LibrarySearchList)
                //{
                //    libraryList.Add(new SearchLibraryDetail(libraryVO.LibraryID, libraryVO.LibraryName, libraryVO.Location, libraryVO.LocationID, libraryVO.DateCreated, libraryVO.PersistFlag));
                //}
            }
            finally
            {
                proxy.Close();
            }
            return response.BookOutVOList;
        }
        public void getcombo()
        {
            this.DistributorsLOVList = Lookupgenerator.GetDistributorList();

        }
    }

}