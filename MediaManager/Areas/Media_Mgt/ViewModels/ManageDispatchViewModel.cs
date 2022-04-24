using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.ComponentModel.DataAnnotations;

namespace MediaManager.Areas.Media_Mgt.ViewModels
{
    public class ListIdValPairMngDispatch
    {
        public int _id;
        public string _value;

        public Int32 ID { get; set; }
        public String Value { get; set; }
    }

    public class MDTapeSearchResult
    {
        public string TapeTitle { get; set; }
        public string TapeNo { get; set; }
        public string MediaType { get; set; }
        public string Storage { get; set; }
        public string Library { get; set; }
        public string Status { get; set; }

        public MDTapeSearchResult(string TapeNo, string TapeTitle, string Storage, string MediaType, string Library, string Status)
        {
            this.TapeNo = TapeNo;
            this.TapeTitle = TapeTitle;
            this.MediaType = MediaType;
            this.Library = Library;
            this.Status = Status;
            this.Storage = Storage;
        }
    }

    public class MDTapeAddedResult
    {
        public string TapeTitle { get; set; }
        public string TapeNo { get; set; }
        public string MediaType { get; set; }
        public string Storage { get; set; }
        public string Library { get; set; }

        public MDTapeAddedResult(string TapeNo, string TapeTitle, string Storage, string MediaType, string Library)
        {
            this.TapeNo = TapeNo;
            this.TapeTitle = TapeTitle;
            this.MediaType = MediaType;
            this.Storage = Storage;
            this.Library = Library;           
        }
    }

    public class ManageDispatchViewModel
    {
        [Display(Name = " Program Title")]
        public string ProgramTitle;
        [Display(Name = "Tape Title")]
        public string TapeTitle;
        [Display(Name = "Media Type")]
        public SelectList MediaType;
        [Display(Name = "Tape No.")]
        public string TapeNo;
        [Display(Name = "Dispatch Status")]
        public SelectList DispatchStatus;
        [Display(Name = "Dispatch Details")]
        public string DispatchDetails;
        [Display(Name = "Return Status")]
        public SelectList ReturnStatus;
        [Display(Name = "Return Details")]
        public string ReturnDetails;

        [Required(ErrorMessage = "Item Type is required")]
        [Display(Name = "Item Type")]
        public string ItemType;
        [Display(Name = "Item Details")]
        public string ItemDetails;
       
        [Display(Name = "Title Status")]
        public SelectList TitleStatus;
        [Display(Name = "Distributor")]
        public SelectList Distributor;
        [Display(Name = "Item ID")]
        public int ItemID;        
        [DataType(DataType.Date)]
        [Display(Name = "Status Date")]
        public DateTime StatusDate;        
        [DataType(DataType.Date)]
        [Display(Name = "Dispatch From")]
        public DateTime DispatchFrom;
        [DataType(DataType.Date)]
        [Display(Name = " Dispatch To")]
        public DateTime DispatchTo;
        [Display(Name = " Dispatch No")]
        public int DispatchNo;
        [Display(Name = "Dispatch Date")]
        public DateTime DispatchDate;
        [Display(Name = "Receipt Date")]
        public string ReceiptDate;

        public List<MDTapeSearchResult> bulkDispatchTapeSearchResult { get; set; }
        public List<MDTapeAddedResult> bulkDispatchTapeAddedResult { get; set; }
        public List<MDTapeSearchResult> bulkReturnTapeSearchResult { get; set; }
        public List<MDTapeAddedResult> bulkReturnTapeAddedResult { get; set; }

        public ManageDispatchViewModel()
        {
           MediaType = new SelectList(GetMediaTypeList());
           DispatchStatus = new SelectList(GetDispatchStatus());
           ReturnStatus = new SelectList(GetReturnStatus());               
        }

        public List<string> GetMediaTypeList()
        {
            List<string> listMediaType = new List<string>();
            listMediaType.Add("--Select One--");
            listMediaType.Add("Tape");
            listMediaType.Add("File");
            listMediaType.Add("HDD");
            listMediaType.Add("PenDrive");
            return listMediaType;
        }

        //public List<List> GetTitleStatus()
        //{
        //    List<List> listTitleStatus = new List<List>();
        //    listTitleStatus.Add(new List { ID = 1, Value = "Accepted" });
        //    listTitleStatus.Add(new List { ID = 0, Value = "Rejected" });
        //    return listTitleStatus;
        //}

        //public List<List> GetDistributors()
        //{
        //    List<List> listDistributors = new List<List>();
        //    listDistributors.Add(new List { ID = 1, Value = "Distributor1" });
        //    listDistributors.Add(new List { ID = 2, Value = "Distributor2" });
        //    return listDistributors;
        //}

        public List<string> GetDispatchStatus()
        {
            List<string> listDispatchStatus = new List<string>();
            listDispatchStatus.Add("--Select One--");
            listDispatchStatus.Add("In Storage");
            listDispatchStatus.Add("Dispatched");
            listDispatchStatus.Add("Dispatched to SA");
            listDispatchStatus.Add("Dispatched to Supplier");            
            return listDispatchStatus;
        }

        public List<string> GetReturnStatus()
        {
            List<string> listReturnStatus = new List<string>();
            listReturnStatus.Add("--Select One--");
            listReturnStatus.Add("In Storage");
            return listReturnStatus;
        }

        public List<MDTapeSearchResult> SearchBulkDispatchProgramme(string ProgrammeSearchTitle)
        {           
            bulkDispatchTapeSearchResult = new List<MDTapeSearchResult>();
            bulkDispatchTapeSearchResult.Add(new MDTapeSearchResult("Tape No. 1", "Tape Name 1", "HDD", "Box1", "Kenya Library", "In Storage"));
            bulkDispatchTapeSearchResult.Add(new MDTapeSearchResult("Tape No. 2", "Tape Name 2", "Tape", "Box2", "Nigeria Library", "Dispatched"));
            bulkDispatchTapeSearchResult.Add(new MDTapeSearchResult("Tape No. 3", "Tape Name 3", "File", "Shelf1", "Kenya Library", "In Storage"));
            bulkDispatchTapeSearchResult.Add(new MDTapeSearchResult("Tape No. 4", "Tape Name 4", "PenDrive", "Shelf2", "Nigeria Library", "Dispatched to SA"));
            return bulkDispatchTapeSearchResult;
        }

        public List<MDTapeAddedResult> SearchBulkDispatchAddedProgramme(string ProgrammeSearchTitle)
        {
           bulkDispatchTapeAddedResult = new List<MDTapeAddedResult>();
           bulkDispatchTapeAddedResult.Add(new MDTapeAddedResult("Tape No. 1", "Tape Name 1", "Box1", "HDD", "Kenya Library"));
           bulkDispatchTapeAddedResult.Add(new MDTapeAddedResult("Tape No. 2", "Tape Name 2", "Box2", "Tape", "Nigeria Library"));
           bulkDispatchTapeAddedResult.Add(new MDTapeAddedResult("Tape No. 3", "Tape Name 3", "Shelf1", "File", "Kenya Library"));
           bulkDispatchTapeAddedResult.Add(new MDTapeAddedResult("Tape No. 4", "Tape Name 4", "Shelf2", "PenDrive", "Nigeria Library"));
           return bulkDispatchTapeAddedResult;
        }

        public List<MDTapeSearchResult> SearchBulkReturnProgramme(string ProgrammeSearchTitle)
        {
            bulkReturnTapeSearchResult = new List<MDTapeSearchResult>();
            bulkReturnTapeSearchResult.Add(new MDTapeSearchResult("Tape No. 1", "Tape Name 1", "HDD", "Box1", "Kenya Library", "In Storage"));
            bulkReturnTapeSearchResult.Add(new MDTapeSearchResult("Tape No. 2", "Tape Name 2", "Tape", "Box2", "Nigeria Library", "Dispatched"));
            bulkReturnTapeSearchResult.Add(new MDTapeSearchResult("Tape No. 3", "Tape Name 3", "File", "Shelf1", "Kenya Library", "In Storage"));
            bulkReturnTapeSearchResult.Add(new MDTapeSearchResult("Tape No. 4", "Tape Name 4", "PenDrive", "Shelf2", "Nigeria Library", "Dispatched to SA"));
            return bulkReturnTapeSearchResult;
        }

        public List<MDTapeAddedResult> SearchBulkReturnAddedProgramme(string ProgrammeSearchTitle)
        {
            bulkReturnTapeAddedResult = new List<MDTapeAddedResult>();
            bulkReturnTapeAddedResult.Add(new MDTapeAddedResult("Tape No. 1", "Tape Name 1", "Box1", "HDD", "Kenya Library"));
            bulkReturnTapeAddedResult.Add(new MDTapeAddedResult("Tape No. 2", "Tape Name 2", "Box2", "Tape", "Nigeria Library"));
            bulkReturnTapeAddedResult.Add(new MDTapeAddedResult("Tape No. 3", "Tape Name 3", "Shelf1", "File", "Kenya Library"));
            bulkReturnTapeAddedResult.Add(new MDTapeAddedResult("Tape No. 4", "Tape Name 4", "Shelf2", "PenDrive", "Nigeria Library"));
            return bulkReturnTapeAddedResult;
        }
    }
}