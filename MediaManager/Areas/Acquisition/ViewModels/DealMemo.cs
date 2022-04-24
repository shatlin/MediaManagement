using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MediaManager.DealMemoService;
using System.ComponentModel.DataAnnotations;
using MediaManager.AcquisitionLookupService;
using MediaManager.Infrastructure.Lookups;

namespace MediaManager.Areas.Acquisition.ViewModels
{
    public class Searchresults
    {
        public string DMNumber { get; set; }
        public string ContractNo { get; set; }
        public string LicenseNo { get; set; }
        public string ContractEntity { get; set; }
        public string MainLicensee { get; set; }
        public string AmortMethod { get; set; }
        public string MemoDate { get; set; }
        public string Type { get; set; }
        public string Currency { get; set; }
        public string Status { get; set; }
        public string SignQARequired { get; set; }

        public Searchresults()
        {
        }
        public Searchresults(string DMNumber, string ContractNo, string LicenseNo, string ContractEntity, string MainLicensee,string AmortMethod,string MemoDate,string Type,string Currency,string Status,string SignQARequired)
        {
            this.DMNumber = DMNumber;
            this.ContractNo = ContractNo; 
            this.LicenseNo = LicenseNo;
            this.ContractEntity = ContractEntity;
            this.MainLicensee = MainLicensee;
            this.AmortMethod = AmortMethod;
            this.MemoDate = MemoDate;
            this.Type = Type;
            this.Currency = Currency;
            this.Status = Status;
            this.SignQARequired = SignQARequired;
        }

    }

    public class DealMemo
    {

        [Display(Name = "Deal Memo")]
        public string DMNumber_Search { get; set; }
        public string ContractNo { get; set; }     
        public string AmortMethod { get; set; }      
        public string Status { get; set; }   
        
        public DateTime? FromDate { get; set; }
        
        public DateTime? ToDate { get; set; }
        public List<Searchresults> searchresults;
        //public List<Tuple<string,string>>();
        public List<string> OPStatus = new List<string>() { "All", "REGISTERED","SIGNEDB","SIGNEDPD","EXECUTED","BUDGETED","BEXECUTED","CANCELLED","Sign(QA) Accepted","Sign(QA) Rejected" };
       // public List<string> OPStatusVal = new List<string>() { "All", "REGISTERED", "SIGNEDB", "SIGNEDPD", "EXECUTED", "BUDGETED", "BEXECUTED", "CANCELLED", "QAPASSED", "QAFAILED" };
        public List<AmortMethodLookupItem> AmortMethodLOVList { get; set; }
        AmortMethodLookup amortmethodlookup;
        AcquisitionLOVLoader AcquisitionLOVLoader = new AcquisitionLOVLoader();
        public List<Searchresults> SearchDealMemo()
        {
            DealMemoClient proxy = null;
            DealMemoVO dealmemoVO = new DealMemoVO();



            dealmemoVO.DMNumber_Search = this.DMNumber_Search;
            dealmemoVO.ContractNo = this.ContractNo;
            dealmemoVO.AmortMethod = this.AmortMethod;
            if (Status == "All")
            {
                dealmemoVO.Status = string.Empty;
            }
            //else
            //{
            //    dealmemoVO.Status = this.Status;
            //}
           else if(Status == "Sign(QA) Accepted") 
            {
                dealmemoVO.Status = "QAPASSED";
            }
            else if (Status == "Sign(QA) Rejected")
            {
                dealmemoVO.Status = "QAFAILED";
            }
           else
            {
                dealmemoVO.Status = this.Status;
            }

            dealmemoVO.FromDate = Convert.ToDateTime(this.FromDate);
            dealmemoVO.ToDate = Convert.ToDateTime(this.ToDate);
           

            SearchDealMemoResponse response = new SearchDealMemoResponse();
            try
            {
                proxy = new DealMemoClient();
                proxy.Open();
                SearchDealMemoRequest request = new SearchDealMemoRequest();
                request.DealMemo =dealmemoVO;
                response = proxy.SearchDealMemo(request);

                searchresults = new List<Searchresults>();

                foreach (DealMemoVO DMVO in response.DealMemoList)
                {
                    searchresults.Add(new Searchresults(DMVO.DMNumber.ToString(),DMVO.ContractNo,DMVO.LicenseNo,DMVO.ContractEntity,DMVO.MainLicensee,DMVO.AmortMethod,DMVO.MemoDate.ToString("dd-MMM-yy"),DMVO.Type,DMVO.Currency,DMVO.Status,DMVO.SignQARequired));

                }

            }
            finally
            {
                proxy.Close();
            }



            return this.searchresults;
        }
        public List<AmortMethodLookupItem> getAmortMethodLOVList()
        {
            amortmethodlookup = new AmortMethodLookup();
            List<AmortMethodLookupItem> AmortMethodLOVList = new List<AmortMethodLookupItem>();
            amortmethodlookup = AcquisitionLOVLoader.GetAmortMethodLov();
            foreach (AmortMethodLookupItem lookupitem in amortmethodlookup.LookupItemList)
            {
                AmortMethodLOVList.Add(lookupitem);
            }
            return AmortMethodLOVList;
        }
    }

 

    //public class DealMemo
    //{
    //    public List<DealMemoVO> SearchDealMemo(DealMemoVO searchDealMemo)
    //    {
    //        DealMemoClient proxy = null;
    //        SearchDealMemoResponse response = new SearchDealMemoResponse();
    //        try
    //        {
    //            proxy = new DealMemoClient();
    //            proxy.Open();
    //            SearchDealMemoRequest request = new SearchDealMemoRequest();
    //            request.DealMemo = searchDealMemo;
    //            response = proxy.SearchDealMemo(request);
    //        }
    //        catch 
    //        {
    //        }
    //        finally
    //        {
    //            proxy.Close();
    //        }
    //        return response.DealMemoList;
    //    }
    //}
}
