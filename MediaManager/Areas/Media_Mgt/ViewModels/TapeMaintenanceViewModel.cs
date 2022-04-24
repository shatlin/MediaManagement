using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MediaManager.ProgrammeLibraryServices;
using System.ComponentModel.DataAnnotations;
using MediaManager.LookupsServices;
using MediaManager.Infrastructure.Helpers;
using MediaManager.Infrastructure.Lookups;
using MediaManager.MediaManagementLookupServices;

namespace MediaManager.Areas.Media_Mgt.ViewModels
{
    public class ListIdValForTapMain
    {
        public string _id;
        public string _value;

        public String ID { get; set; }
        public String Value { get; set; }
    }

    public class TMTapeSearchResult
    {        
        public string TapeTitle { get; set; }
        public string TapeNo { get; set; }
        public string Type { get; set; }
        public string  TapType { get; set; }
        public string Library { get; set; }        

        public TMTapeSearchResult(string TapeNo, string TapeTitle, string TapType, string Type, string Library)
        {
            this.TapType = TapType;
            this.TapeTitle = TapeTitle;
            this.TapeNo = TapeNo;
            this.Type = Type;
            this.Library = Library;
        }
    }

    public class TMProgrammeSearchResult
    {
        public int TMProductionNumber { get; set; }
        public string TMProgrammeWorkingTitle { get; set; }
        public string TMProgrammeTitle { get; set; }

        public TMProgrammeSearchResult(int ProductionNumber, string ProgrammeTitle, string ProgrammeWorkingTitle)
        {
            this.TMProductionNumber = ProductionNumber;
            this.TMProgrammeTitle = ProgrammeTitle;
            this.TMProgrammeWorkingTitle = ProgrammeWorkingTitle;
        }
    }

    public class TMAddedProgramme
    {
        public int TMProductionNumber { get; set; }
        public string TMProgrammeWorkingTitle { get; set; }
        public string TMProgrammeTitle { get; set; }

        public TMAddedProgramme(int ProductionNumber, string ProgrammeTitle, string ProgrammeWorkingTitle)
        {
            this.TMProductionNumber = ProductionNumber;
            this.TMProgrammeTitle = ProgrammeTitle;
            this.TMProgrammeWorkingTitle = ProgrammeWorkingTitle;
        }
    }    

    public class TMSegments
    {
        public string AudioChannel1 { get; set; }

        public string AudioChannel2 { get; set; }

        public string AudioChannel3 { get; set; }

        public string AudioChannel4 { get; set; }

        public string Duration { get; set; }

        public string SegmentTitle { get; set; }

        public string Seq { get; set; }

        public string Som { get; set; }

        public TMSegments(string SegmentTitle, string Seq, string Som, string Duration, string AudioChannel1, string AudioChannel2, string AudioChannel3, string AudioChannel4)
        {
            this.SegmentTitle = SegmentTitle;
            this.Seq = Seq;
            this.Som = Som;
            this.Duration = Duration; 
            this.AudioChannel1 = AudioChannel1;
            this.AudioChannel2 = AudioChannel2;
            this.AudioChannel3 = AudioChannel3;
            this.AudioChannel4 = AudioChannel4;            
        }
    }
    
    public class TapeMaintenanceViewModel
    {
        [Display(Name = "Production Number")]
        public string TMProductionNumber;        
        [Display(Name = "Programme Title")]
        public string ProgrammeSearchTitle;
        [Display(Name = "Tape Title")]
        public string TapeTitle;
        [Display(Name = "Media Type")]
        public SelectList MediaType;
        [Display(Name = "Tape No.")]
        public string TapeNo;        
        [Display(Name = "Type/Storage")]
        public SelectList Storage;          
        [Display(Name = "F")]
        public string F;
        [Display(Name = "Media Format")]
        public SelectList MediaFormat;
        [Display(Name = "Subtitle")]
        public string Subtitle;
        [Display(Name = "UMID")]
        public string UMID;        
        [Display(Name = "Action")]
        public SelectList Action;
        [Display(Name = "TapType")]
        public SelectList TapType;        
        [Display(Name = "Category")]
        public SelectList Category;
        [Display(Name = "Media Library")]
        public SelectList MediaLibrary;
        
        [Display(Name = "Length")]
        public string Length;
        [Display(Name = "Aspect Ratio")]
        public SelectList AspectRatio;
        [Display(Name = "Comments")]
        public string Comments;
        [Display(Name = "Registration1")]
        public string Registration1;
        [Display(Name = "Registration2")]
        public string Registration2;
        [Display(Name = "Registration3")]
        public string Registration3;
        [Display(Name = "Registration4")]
        public string Registration4;
        [Display(Name = "CourierCompany")]
        public SelectList CourierCompany;
        [Display(Name = "AirwaysBillNo")]
        public string AirwaysBillNo;
        [Display(Name = "DeliveryNotes")]
        public string DeliveryNotes;
        [Display(Name = "CourierInfoComments")]
        public string CourierInfoComments;

        public List<MediaManager.MediaManagementLookupServices.ActionLookupItem> ActionList { get; set; }
        public List<MediaManager.MediaManagementLookupServices.TapeTypeLookupItem> TapeTypeList { get; set; }
        public List<MediaManager.MediaManagementLookupServices.LibraryLookUpItem> LibraryList { get; set; }
        public List<MediaManager.MediaManagementLookupServices.TapeCategoryLookupsItem> CategoryList { get; set; }
        public List<MediaManager.LookupsServices.CourierCompanyLookupItem> CourierCompanyList { get; set; }        
        public List<TMProgrammeSearchResult> ProgrammeSearchResult { get; set; }
        public List<TMAddedProgramme> AddedProgramme { get; set; }         
        public List<TMTapeSearchResult> TapeSearchResult { get; set; }        
        public List<TMSegments> Segments { get; set; }
         
        public TapeMaintenanceViewModel()
        {
            MediaType = new SelectList(GetMediaTypeList());
            MediaFormat = new SelectList(GetMediaFormat());
            AspectRatio = new SelectList(GetAspectRatio(), "ID", "Value");
            MediaLibrary = new SelectList(GetLibraryList());
            Storage = new SelectList(GetStorgaeList());
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

        public List<string> GetLibraryList()
        {
            List<string> listMediaType = new List<string>();
            listMediaType.Add("--Select One--");
            listMediaType.Add("Kenya Library");
            listMediaType.Add("Nigeria Library");           
            return listMediaType;
        }

        public List<string> GetStorgaeList()
        {
            List<string> listMediaType = new List<string>();
            listMediaType.Add("--Select One--");
            listMediaType.Add("Box1");
            listMediaType.Add("Box2");
            listMediaType.Add("Shelf1");
            listMediaType.Add("Shelf2");
            return listMediaType;
        }   

        public List<string> GetMediaFormat()
        {
            List<string> listMediaFormat = new List<string>();
            listMediaFormat.Add("HD");
            listMediaFormat.Add("SD");
            return listMediaFormat;
        }

        public List<ListIdValForTapMain> GetAspectRatio()
        {
            List<ListIdValForTapMain> listAspectRatio = new List<ListIdValForTapMain>();
            listAspectRatio.Add(new ListIdValForTapMain { ID = "C", Value = "14:9 (Compromised WideScreen)" });
            listAspectRatio.Add(new ListIdValForTapMain { ID = "W", Value = "16:9 (Widescreen)" });
            listAspectRatio.Add(new ListIdValForTapMain { ID = "N", Value = "4:3 (Normal Playout)" });
            return listAspectRatio;
        }

        ProgrammeVO programmeVO = new ProgrammeVO();
        public List<TMProgrammeSearchResult> SearchProgrammeByTitle(string ProgrammeSearchTitle)
        {
            //ProgrammeLibraryClient proxy = null;
            //SearchProgramByTitleRequest request = new SearchProgramByTitleRequest();
            //SearchProgramByTitleResponse response = new SearchProgramByTitleResponse();
            //try
            //{
            //    proxy = new ProgrammeLibraryClient();
            //    proxy.Open();
            //    programmeVO.ProgrammeTitle = ProgrammeSearchTitle;
            //    request.ProgrammeByTitleVO = programmeVO;
            //    response = proxy.SearchProgramTitle(request);
            //    ProgrammeSearchResult = new List<TMProgrammeSearchResult>();
            //    foreach (ProgrammeVO ProgrammeVO in response.ProgrammeByTitleList)
            //    {
            //        ProgrammeSearchResult.Add(new TMProgrammeSearchResult(ProgrammeVO.ProductionNumber, ProgrammeVO.ProgrammeTitle.ToString()));
            //    }
            //}
            //finally
            //{
            //    proxy.Close();
            //}
            ProgrammeSearchResult = new List<TMProgrammeSearchResult>();
            ProgrammeSearchResult.Add(new TMProgrammeSearchResult(1, "Programme Title 1" , "Programme Working Title1"));            
            ProgrammeSearchResult.Add(new TMProgrammeSearchResult(4, "Programme Title 4", "Programme Working Title4"));
            ProgrammeSearchResult.Add(new TMProgrammeSearchResult(5, "Programme Title 5", "Programme Working Title5"));
             ProgrammeSearchResult.Add(new TMProgrammeSearchResult(6, "Programme Title 6", "Programme Working Title6"));
            return ProgrammeSearchResult; 
        }

        public List<TMAddedProgramme> LoadAddedProgramme(string ProgrammeSearchTitle)
        {
            //ProgrammeLibraryClient proxy = null;
            //SearchProgramByTitleRequest request = new SearchProgramByTitleRequest();
            //SearchProgramByTitleResponse response = new SearchProgramByTitleResponse();
            //try
            //{
            //    proxy = new ProgrammeLibraryClient();
            //    proxy.Open();
            //    programmeVO.ProgrammeTitle = ProgrammeSearchTitle;
            //    request.ProgrammeByTitleVO = programmeVO;
            //    response = proxy.SearchProgramTitle(request);
            //    ProgrammeSearchResult = new List<TMProgrammeSearchResult>();
            //    foreach (ProgrammeVO ProgrammeVO in response.ProgrammeByTitleList)
            //    {
            //        ProgrammeSearchResult.Add(new TMProgrammeSearchResult(ProgrammeVO.ProductionNumber, ProgrammeVO.ProgrammeTitle.ToString()));
            //    }
            //}
            //finally
            //{
            //    proxy.Close();
            //}
            AddedProgramme = new List<TMAddedProgramme>();
            AddedProgramme.Add(new TMAddedProgramme(2, "Programme Title 2", "Programme Working Title2"));
            AddedProgramme.Add(new TMAddedProgramme(3, "Programme Title 3", "Programme Working Title3"));
            AddedProgramme.Add(new TMAddedProgramme(7, "Programme Title 7", "Programme Working Title7"));
            AddedProgramme.Add(new TMAddedProgramme(8, "Programme Title 8", "Programme Working Title8"));
            return AddedProgramme; 
        } 
      

        public List<TMTapeSearchResult> SearchTapeDetail( string TapeTitle , string TapeNo , string ProgrammeSearchTitle , string TapeType)
        {           
            TapeSearchResult = new List<TMTapeSearchResult>();
            TapeSearchResult.Add(new TMTapeSearchResult("TP101", "Tap1", "Tape", "B",  "BBF"));
            TapeSearchResult.Add(new TMTapeSearchResult("TP102", "Tap2", "File", "CD",  "BBL"));
            TapeSearchResult.Add(new TMTapeSearchResult("TP103", "Tap3", "File", "FRM",  "BBP"));
            TapeSearchResult.Add(new TMTapeSearchResult("TP104", "Tap4", "File", "B",  "BBF"));
            TapeSearchResult.Add(new TMTapeSearchResult("TP105", "Tap5", "Tape", "TXT",  "BBP"));
            TapeSearchResult.Add(new TMTapeSearchResult("TP106", "Tap6", "Tape", "ET",  "BBL"));            
            return TapeSearchResult;
        }      
        
        
        public List<TMSegments> SearchSegments(string ProgrammeSearchTitle)
        {
            //MediaManager.media  proxy = null;
            //search SearchProgramByTitleRequest request = new SearchProgramByTitleRequest();
            //SearchProgramByTitleResponse response = new SearchProgramByTitleResponse();
            //try
            //{
            //    proxy = new ProgrammeLibraryClient();
            //    proxy.Open();
            //    programmeVO.ProgrammeTitle = ProgrammeSearchTitle;
            //    request.ProgrammeByTitleVO = programmeVO;
            //    response = proxy.SearchProgramTitle(request);
            //    ProgrammeSearchResult = new List<TMProgrammeSearchResult>();
            //    foreach (ProgrammeVO ProgrammeVO in response.ProgrammeByTitleList)
            //    {
            //        ProgrammeSearchResult.Add(new TMProgrammeSearchResult(ProgrammeVO.ProductionNumber, ProgrammeVO.ProgrammeTitle.ToString(), ProgrammeVO.ProgrammeWorkingTitle, ProgrammeVO.ProgrammeStudio, ProgrammeVO.ProgrammeRefNo));
            //    }
            //}
            //finally
            //{
            //    proxy.Close();
            //}    
            return null;
        }
    }
}