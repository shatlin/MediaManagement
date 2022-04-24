using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MediaManager.ProgrammeLibraryServices;
using MediaManager.LookupsServices;
using System.ComponentModel.DataAnnotations;
using MediaManager.Infrastructure.Lookups;
using MediaManager.Infrastructure.Roles;
using MediaManager.Infrastructure.Helpers;

namespace MediaManager.Areas.Media_Mgt.ViewModels
{
    //Class for Programme Serach.

    #region ProgrammeSearch
    public class ProgrammeSearchResult
    {
        [Display(Name = "Programme Title")]
        public string ProgrammeTitle { get; set; }
        [Display(Name = "Working Title")]
        public string WorkingTitle { get; set; }
        [Display(Name = "Distributor")]
        public string Distributor { get; set; }
        [Display(Name = "Primary Genre")]
        public string PrimaryGenre { get; set; }
        [Display(Name = "Type")]
        public string Type { get; set; }
        [Display(Name = "Ref No")]
        public int RefNo { get; set; }

        public ProgrammeSearchResult(string ProgrammeTitle, string WorkingTitle, string Distributor, string PrimaryGenre, string Type, int Refno)
        {
            this.ProgrammeTitle = ProgrammeTitle;
            this.WorkingTitle = WorkingTitle;
            this.Distributor = Distributor;
            this.PrimaryGenre = PrimaryGenre;
            this.Type = Type;
            this.RefNo = Refno;
        }
        public ProgrammeSearchResult()
        {
        }
    }
    #endregion

    //Class for Programme Maintenance.

    #region ProgrammeMaintenance
    
    [Serializable]
   public class  ProgrammeCastDetailGrid
   {
        public long Id { get; set; }
        public string ProgramCastRole { get; set; }
        public string ProgramCastName { get; set; }
        public string ProgramCastOrder { get; set; }
        public string ProgramCastAward { get; set; }
        public string ProgramCastDescription { get; set; }       
        public string gridstatus { get; set; }
   }

    public class ProgrammeSynopsis
    {
        public string SynID { get; set; }
        
        public string SynDetails { get; set; }
        
    }

    public class ProgrammeMaintenanceViewModel
    {
       
        #region Declarations
        [Required]
        [Display(Name = "Programme Title")]       
        public string  ProgrammeTitle { get; set; }

        [Display(Name = "Distributor")]
        public string Distributor { get; set; }


        [Display(Name = "Cat Complete")]
        public bool CatComplete { get; set; }

        [Required]
        [Display(Name = "Working Title")]
        public string WorkingTitle { get; set; }


        [Display(Name = "Target Group")]
        public string TargetGroup { get; set; }

        [Display(Name = "Archive")]
        public bool Archive { get; set; }

        [Display(Name = "Production House")]
        public string ProductionHouse { get; set; }


        [Display(Name = "Primary Genre")]
        public string PrimaryGenre { get; set; }

        [Display(Name = "Secondary Genre")]
        public string SecondaryGenre { get; set; }

        [Display(Name = "TX Digitized")]
        public bool TXDigitized { get; set; }

        [Display(Name = "Domestic Age Restriction")]
        public string DomesticAgeRestriction { get; set; }

        [Display(Name = "MediaManager Age Restriction")]
        public string MediaManagerAgeRestriction { get; set; }

        [Display(Name = "Tertiary Genre")]
        public string TertiaryGenre { get; set; }

        [Display(Name = "NPA Copy")]
        public bool NPACopy { get; set; }

        [Required]
        [Range(1900, 2199, ErrorMessage = "Please insert Production Year in between 1900 to 2199.")]
        [Display(Name = "Production Year")]
        public int ProductionYear { get; set; }

        [Display(Name = "Quality Grade")]
        public string QualityGrade { get; set; }

        
        [Display(Name = "Episodes")]
        public int? Episodes { get; set; }

        [Display(Name = "Wide Screen")]
        public bool WideScreen { get; set; }

        [Display(Name = "Nationality")]
        public string Nationality { get; set; }

        [Required]
        [Display(Name = "Type")]
        public string Type { get; set; }
        
        [Display(Name = "Ref No")]
        public int? RefNo { get; set; }

        [Display(Name = "Colour Code")]
        public string ColourCode { get; set; }

        [Display(Name = "Spoken Language")]
        public string SpokenLanguage { get; set; }

        [Display(Name = "DurationC")]
        public string DurationC { get; set; }

        [Display(Name = "Series")]
        private string Series { get; set; }

        [Display(Name = "MaterialID")]
        public string MaterialID { get; set; }

        public List<ProgrammeSearchResult> ProgrammeSearchResultList;
        

        /* for program maintenance*/

        [Display(Name = "Sub Title")]
        public string SubTitle { get; set; }

        [Display(Name = "Parent")]
        public int? Parent { get; set; }

        [Display(Name = "Music Title")]
        public string MusicTitle { get; set; }

        [Display(Name = "Poem Title")]
        public string PoemTitle { get; set; }

        [Display(Name = "Web Title")]
        public string WebTitle { get; set; }



        [Display(Name = "Duration")]
        public string Duration { get; set; }

        public string DurationS { get; set; }
        //[Display(Name = "")]
        public List<string> DurationOptions = new List<string>() { "--Select Option--","Approximate", "Exact", "Trasmission"};     

        [Display(Name = "Awards")]           
        public int? Awards { get; set; }


        [Display(Name = "User Code")]
        public string UserCode { get; set; }

        [Display(Name = "Programme Category")]
        public string ProgrammeCategory { get; set; }

        [Display(Name = "Mood")]
        public string Mood { get; set; }

        [Display(Name = "Link For Poster Act")]
        public string LinkForPosterAct { get; set; }

        //[Display(Name = "Synopsis")]
        public string SynopsisDetails { get; set; }
        public string SynopsisId { get; set; }
        public List<string> SynopsisOptions = new List<string>() { "--Select Option--", "Full Synopsis", "Local Synopsis", "Short Synopsis", "Web Synopsis", "Mobile Synopsis", "EPG Synopsis" };
        public List<ProgrammeSynopsis> synopsisList { get; set; }
      
        List<ProgrammeVO> ProgramList;
        public List<ProgrammeCastDetailGrid> CastDetailList { get; set; }
        public int successResult = 0;
      
         #endregion

        public ProgrammeMaintenanceViewModel()
        {      
           
        }

        #region GetLookupMethods      

        public List<GetGenDistributorLookupItem> DistributorsLOVList { get; set; }
        public List<GetGenColorLookupItem> ColorLOVList { get; set; }
        public List<GetSpokenLangLookupItem> SpokenLangLOVList { get; set; }
        public List<GetGenNationalityLookupItem> NationalityLOVList { get; set; }
        public List<GetGenQualityLookupItem> QualityLOVList { get; set; }
        public List<ProgrammeTypeLookupItem> TypeLOVList { get; set; }
        public List<GetGenTargetGroupLookupItem> TargetGroupLOVList { get; set; }
        public List<GetGenRatingMPAALookupItem> AgeRestricationLOVList { get; set; }
        public List<StudioCodeLookupItem> ProductionHouseLOVList { get; set; }
        public List<ProgrammeCategoryLookupItem> PrimaryGenreLOVList { get; set; }
        public List<SubGenreLookupItem> SecondaryGenreLOVList { get; set; }
        public List<MediaManagementLookupServices.TertiaryGenreLookupItem> TertiaryGenreLOVList { get; set; }
        public List<MoodLookupItem> MoodLOVList { get; set; }
        public List<GetGenCodeLookupItem> UserCodeLOVList { get; set; }
        public List<AcquisitionLookupService.PB_ProgrammeCategoryLookupItem> ProgrammeCategoryLOVList { get; set; }
        public List<CastAwardLookupItem> CastAwardLOVList { get; set; }
        public List<CastAwardLookupItem> RunCastAwardLOVList { get; set; }
        public List<CastRoleLookUpItem> CastRoleLOVList { get; set; }
        public List<CastRoleLookUpItem> RunCastRoleLOVList { get; set; }
        LookupServiceLookups Lookupgenerator = new LookupServiceLookups();
        Med_mngt_Lookups Med_Lookupgenerator = new Med_mngt_Lookups();
        Lookups Acq_Lookup = new Lookups();
        public List<GetGenDistributorLookupItem> DistributorsValueList { get; set; }
        public List<GetGenColorLookupItem> ColorValueList { get; set; }
        public List<GetSpokenLangLookupItem> SpokenLangValueList { get; set; }
        public List<StudioCodeLookupItem> ProductionHouseValueList { get; set; }
        public List<ProgrammeCategoryLookupItem> PrimaryGenreValueList { get; set; }
        public List<SubGenreLookupItem> SecondaryGenreValueList { get; set; }
        public List<MediaManagementLookupServices.TertiaryGenreLookupItem> TertiaryGenreValueList { get; set; }
        public List<GetGenCodeLookupItem> UserCodeValueList { get; set; }

        public void RunCastRoleLOV(string input)
        {
           this.RunCastRoleLOVList =  Lookupgenerator.GetCastRolesList();
           this.CastRoleLOVList=this.RunCastRoleLOVList.Where(filterData => filterData.CastRoleCode.StartsWith(input)).ToList();            
        }

        public void RunCastAwardLOV(string input)
        {
            this.RunCastAwardLOVList = Lookupgenerator.GetCastAwardList();
            this.CastAwardLOVList = this.RunCastAwardLOVList.Where(filterData => filterData.CastAwardCode.StartsWith(input)).ToList();
        }
        public void getcombo()
        {
            this.TypeLOVList = Lookupgenerator.GetTypeList();
            this.NationalityLOVList = Lookupgenerator.GetNationalityList();
            this.QualityLOVList = Lookupgenerator.GetQualityList();
            this.TypeLOVList = Lookupgenerator.GetTypeList();
            this.TargetGroupLOVList = Lookupgenerator.GetTertiaryGroupList();
            this.AgeRestricationLOVList = Lookupgenerator.GetAgeRestricationList();                   
            this.MoodLOVList = Lookupgenerator.GetMoodList();         
            this.ProgrammeCategoryLOVList = Acq_Lookup.ProgramCategoryList();
            this.DistributorsLOVList = Lookupgenerator.GetDistributorList();
            this.SpokenLangLOVList = Lookupgenerator.GetSpokenLangList();
            this.ProductionHouseLOVList = Lookupgenerator.GetProductionHouseList();
            this.PrimaryGenreLOVList = Lookupgenerator.GetPriGenreList();
            this.PrimaryGenreLOVList = PrimaryGenreLOVList.OrderBy(x => x.ProgrammeCategoryValue).ToList();
            this.SecondaryGenreLOVList = Lookupgenerator.GetSecGenreList();
            this.TertiaryGenreLOVList = Med_Lookupgenerator.GetTerGenreList();
            this.UserCodeLOVList = Lookupgenerator.GetUserCodeList();
            this.ColorLOVList = Lookupgenerator.GetColorList();       
        }
        public void getComboformaintenance()
        {
            this.TypeLOVList = Lookupgenerator.GetTypeList();
            this.NationalityLOVList = Lookupgenerator.GetNationalityList();
            this.QualityLOVList = Lookupgenerator.GetQualityList();
            this.TypeLOVList = Lookupgenerator.GetTypeList();
            this.TargetGroupLOVList = Lookupgenerator.GetTertiaryGroupList();
            this.AgeRestricationLOVList = Lookupgenerator.GetAgeRestricationList();
            this.MoodLOVList = Lookupgenerator.GetMoodList();
            this.ProgrammeCategoryLOVList = Acq_Lookup.ProgramCategoryList();
            this.DistributorsLOVList = Lookupgenerator.GetDistributorList();
            this.SpokenLangLOVList = Lookupgenerator.GetSpokenLangList();
            this.ProductionHouseLOVList = Lookupgenerator.GetProductionHouseList();
            this.PrimaryGenreLOVList = Lookupgenerator.GetPriGenreList();
            this.PrimaryGenreLOVList = PrimaryGenreLOVList.OrderBy(x => x.ProgrammeCategoryDescription).ToList();
            this.TertiaryGenreLOVList = Med_Lookupgenerator.GetTerGenreList();
            this.UserCodeLOVList = Lookupgenerator.GetUserCodeList();
            this.ColorLOVList = Lookupgenerator.GetColorList();           
            this.SecondaryGenreLOVList = Lookupgenerator.GetSecGenreList();
            this.SecondaryGenreLOVList = SecondaryGenreLOVList.OrderBy(x => x.SubGenreCodeDescription).ToList();

        }
        #endregion

        ProgrammeVO programmeVO = new ProgrammeVO();
        //Manisha : Method to search the programme.

            public List<ProgrammeSearchResult> SearchProgramme()
            {
                ProgrammeLibraryClient proxy = null;
                SetValuesToScreen();
                SearchProgramResponse response = new SearchProgramResponse();               
                try
                {
                    proxy = ServiceInvoker.OpenProgrammeLibraryProxy();                   
                    SearchProramRequest request = new SearchProramRequest();
                    request.ProgrammSearchVO = programmeVO;
                    response = proxy.SearchProgramQuery(request);

                    ProgrammeSearchResultList = new List<ProgrammeSearchResult>();

                    foreach (ProgrammeVO PMVO in response.ProgramSearchList)
                    {
                        ProgrammeSearchResultList.Add(new ProgrammeSearchResult(PMVO.ProgrammeTitle, PMVO.ProgrammeWorkingTitle, PMVO.ProgramSuppName, PMVO.ProgrammeCategory, PMVO.ProgramType,PMVO.ProgrammeRefNo));

                    }
                }
                finally
                {
                    ServiceInvoker.CloseProgrammeLibraryProxy(proxy);
                }
               return this.ProgrammeSearchResultList;
            }

            public void SearchProgrammeDetails(string refno)
            {
                CastAwardLookup awardLookup = new CastAwardLookup();
                ProgrammeVO prgVo = new ProgrammeVO();
                ProgrammeLibraryClient proxy = null;
                GetProgramDetailsResponse response = new GetProgramDetailsResponse();
                // SetValuesToScreen();
                programmeVO.ProgrammeRefNo = Convert.ToInt32(refno);                
                try
                {
                    proxy = ServiceInvoker.OpenProgrammeLibraryProxy();        
                    GetProgramDetailsRequest request = new GetProgramDetailsRequest();
                    request.GetProgramDetailsVO = programmeVO;
                    response = proxy.GetProgramDetailsQuery(request);
                    
                }
                finally
                {
                    ServiceInvoker.CloseProgrammeLibraryProxy(proxy);
                }
               
              CastAwardLOVList = Lookupgenerator.GetCastAwardList();
                foreach (ProgrammeVO item in response.GetProgramDetailsList)
                {                    
                    this.ProgrammeTitle = item.ProgrammeTitle;
                    this.WorkingTitle = item.ProgrammeWorkingTitle;
                    this.MusicTitle = item.ProgrammeMusicTitle;
                    this.PoemTitle = item.ProgrammePoemTitle;
                    this.SubTitle = item.ProgrammeSubTitle;
                    this.WebTitle = item.ProgrammeWebTitle;
                    this.LinkForPosterAct = item.LnkPosterArt;
                    this.RefNo = item.ProgrammeRefNo;
                    this.ProductionYear = item.ProgrammeReleaseYear;
                    this.Parent = item.ProgrammeParentRefno;
                    this.Episodes = item.ProgrammeEPINumber;
                    this.Awards = item.ProgrammeAward;
                    this.DurationC = item.ProgrammeDurationC;


                    if (item.ProgramType == null) this.Type = "Select";
                    else this.Type = item.ProgramType;
                    if (item.ProgramRatingINT == null) this.MediaManagerAgeRestriction = "Select";
                    else this.MediaManagerAgeRestriction = item.ProgramRatingINT;
                    if (item.ProgrameRatingMPAA == null) this.DomesticAgeRestriction = "Select";
                    else this.DomesticAgeRestriction = item.ProgrameRatingMPAA;
                    if (item.ProgrammeCategory == null) this.PrimaryGenre = "Select";
                    else this.PrimaryGenre = item.ProgrammeCategory;
                    if (item.ProgrammeStudio == null) this.ProductionHouse = "Select";
                    else this.ProductionHouse = item.ProgrammeStudio;
                    if (item.ProgramSubGenre == null) this.SecondaryGenre = "Select";
                    else this.SecondaryGenre = item.ProgramSubGenre;
                    if (item.TertiaryGenre == null) this.TertiaryGenre = "Select";
                    else this.TertiaryGenre = item.TertiaryGenre;
                    if (item.ProgrammeTargetGroup == null) this.TargetGroup = "Select";
                    else this.TargetGroup = item.ProgrammeTargetGroup;
                    if (item.ProgramNationality != null)
                        this.Nationality = item.ProgramNationality;

                    this.Nationality = item.ProgramNationality;
                    if (item.ProgramSuppName == null) this.Distributor = "Select";
                    else this.Distributor = item.ProgramSuppName;
                    if (item.ProgrammeColor == null) this.ColourCode = "Select";
                    else this.ColourCode = item.ProgrammeColor;
                    if (item.ProgrammeCode == null) this.UserCode = "Select";
                    else this.UserCode = item.ProgrammeCode;
                    if (item.ProgrammeQuality == null) this.QualityGrade = "Select";
                    else this.QualityGrade = item.ProgrammeQuality;
                    if (item.ProgrameSpokenLang == null) this.SpokenLanguage = "Select";
                    else this.SpokenLanguage = item.ProgrameSpokenLang;
                    if (item.PrgCategoryDM == null) this.ProgrammeCategory = "Select";
                    else this.ProgrammeCategory = item.PrgCategoryDM;
                    if (item.Mood == null) this.Mood = "Select";
                    else this.Mood = item.Mood;
           
                    if (item.ProgrammeCatComplete == "1") this.CatComplete = true; else this.CatComplete = false;
                    if (item.ProgrammeWideScreen == "1") this.WideScreen = true; else this.WideScreen = false;
                    if (item.ProgrammeTXDigitized == "1") this.TXDigitized = true; else this.TXDigitized = false;
                    if (item.ProgrammeArchive == "1") this.Archive = true; else this.Archive = false;
                    if (item.ProgrammeNFACOpy == "1") this.NPACopy = true; else this.NPACopy = false;
                    if (item.ProgrammeDurationS == "A")
                        this.DurationS = "Approximate";
                    else if (item.ProgrammeDurationS == "E")
                        this.DurationS = "Exact";
                    else if (item.ProgrammeDurationS == "T")
                        this.DurationS = "Trasmission";
                    else this.DurationS = "Select";
                    ProgrammeCastDetailGrid myitem;
                    this.CastDetailList = new List<ProgrammeCastDetailGrid>();
                    if (item.CastDetailList != null)
                    {                        
                        if (CastAwardLOVList != null)
                        {
                            for (int i = 0; i < item.CastDetailList.Count; i++)
                            {
                                for (int j = 0; j < CastAwardLOVList.Count; j++)
                                {
                                    if (item.CastDetailList[i].ProgrammeCastAward == ((CastAwardLookupItem)CastAwardLOVList[j]).CastAwardCode)
                                    {
                                        item.CastDetailList[i].ProgramCastDescription = ((CastAwardLookupItem)CastAwardLOVList[j]).CastAwardDesc;
                                    }
                                }

                            }
                        }
                        foreach (ProgramCastVO castitem in item.CastDetailList)
                        {
                            
                                myitem = new ProgrammeCastDetailGrid();
                                myitem.Id = castitem.ProgramCastUniqueId;
                                myitem.ProgramCastRole = castitem.ProgrammeCastRole;
                                myitem.ProgramCastName = castitem.ProgrammeCastName;
                                myitem.ProgramCastOrder = castitem.ProgramCastOrder.ToString();
                                myitem.ProgramCastAward = castitem.ProgrammeCastAward;
                                myitem.ProgramCastDescription = castitem.ProgramCastDescription;
                                myitem.gridstatus = null;
                                this.CastDetailList.Add(myitem);
                            }
                    }
                    //else
                    //    {
                    //        myitem = new ProgrammeCastDetailGrid();
                    //        myitem.Id = 0;
                    //        myitem.ProgramCastRole = string.Empty;
                    //        myitem.ProgramCastName = string.Empty;
                    //        myitem.ProgramCastOrder = string.Empty;
                    //        myitem.ProgramCastAward = string.Empty;
                    //        myitem.ProgramCastDescription = string.Empty;
                    //        myitem.gridstatus =null;
                    //        this.CastDetailList.Add(myitem);
                    //    }
                    
                        if (item.SynopsisDetails != null)
                        {

                            synopsisList = new List<ProgrammeSynopsis>();
                            ProgrammeSynopsis synopsisListitem;
                            for (int i = 0; i < 6; i++)
                            {
                                synopsisListitem = new ProgrammeSynopsis();
                                synopsisList.Add(synopsisListitem);
                            }                          
                            if (item.SynopsisDetails.SynopsisID_Local > 0)
                            {
                               
                                synopsisList[1].SynID = "Local Synopsis";
                                this.SynopsisId = "Local Synopsis";
                                synopsisList[1].SynDetails = item.SynopsisDetails.SynopsisDetails_Local;
                                
                            }
                          if (item.SynopsisDetails.SynopsisID_Full > 0)
                            {
                                
                                synopsisList[0].SynID = "Full Synopsis";
                                this.SynopsisId = "Full Synopsis";
                                synopsisList[0].SynDetails = item.SynopsisDetails.SynopsisDetails_Full;

                            }
                             if (item.SynopsisDetails.SynopsisID_Web > 0)
                            {
                                synopsisList[0].SynID = "Web Synopsis";
                                this.SynopsisId = "Web Synopsis";
                                synopsisList[3].SynDetails = item.SynopsisDetails.SynopsisDetails_web;
                            }
                             if (item.SynopsisDetails.SynopsisID_Mobile > 0)
                            {
                                synopsisList[0].SynID = "Mobile Synopsis";
                                this.SynopsisId = "Mobile Synopsis";
                                synopsisList[4].SynDetails = item.SynopsisDetails.SynopsisDetails_Mobile;
                            }
                            if (item.SynopsisDetails.SynopsisID_EPG > 0)
                            {
                                
                                synopsisList[0].SynID = "EPG Synopsis";
                                this.SynopsisId = "EPG Synopsis";
                                synopsisList[5].SynDetails = item.SynopsisDetails.SynopsisDetails_EPG;
                            }
                           if (item.ProgrameComment != null)
                            {
                               
                                synopsisList[0].SynID = "Short Synopsis";
                                this.SynopsisId = "Short Synopsis";
                                synopsisList[2].SynDetails = item.ProgrameComment;
                            }
                          
                        }
                    }
                getComboformaintenance();
                //return response.GetProgramDetailsList;
                }
            
        //Manisha : Method to save programme.
           // public  List<ProgrammeVO> SaveProgramme(ProgrammeMaintenanceViewModel pvm)
                 public  void SaveProgramme(ProgrammeMaintenanceViewModel pvm)
            {
                ProgrammeLibraryClient proxy = null;
                List<ProgrammeVO> ProgrammeVOList= new List<ProgrammeVO>();
                ProgrammeVO programmeVO = new ProgrammeVO();
                SynopsisDetailsVO synopsisDetailsVO = new SynopsisDetailsVO();
                LocalProgrammeVO localProgrammeVO = new LocalProgrammeVO();
                ProgramLibraryDetailsVO programLibraryDetailsVO = new ProgramLibraryDetailsVO();
                ProgramPromotionDetailsVO programPromotionDetailsVO = new ProgramPromotionDetailsVO();
                ProgramCastVO programCastVO = new ProgramCastVO();
                ProgramLiveInfoVO programLiveInfoVO = new ProgramLiveInfoVO();
                programmeVO.LocalProgramList = new List<LocalProgrammeVO>();
                programmeVO.ProgramLibrarayDetailsList = new List<ProgramLibraryDetailsVO>();
                programmeVO.ProgramPromotionDetailsList = new List<ProgramPromotionDetailsVO>();
                programmeVO.ProgramSynopsisDetailsList = new List<SynopsisDetailsVO>();
                ProgrammeMaintenanceViewModel senddata = new ProgrammeMaintenanceViewModel();
                ProgramCastVO t;
                programmeVO.CastDetailList = new List<ProgramCastVO>();

                if (pvm.CastDetailList != null)
                {
                   
                     foreach (ProgrammeCastDetailGrid item in pvm.CastDetailList)
                     {
                         t = new ProgramCastVO();
                         t.ProgrammeCastRole = item.ProgramCastRole;
                         t.ProgrammeCastName = item.ProgramCastName;
                         t.ProgramCastOrder = Convert.ToInt32(item.ProgramCastOrder);
                         t.ProgrammeCastAward = item.ProgramCastAward;
                         t.ProgramCastDescription = item.ProgramCastDescription;
                         t.ProgramCastUniqueId = item.Id;
                        
                             if(item.Id > 0 )
                             {
                                 if (item.gridstatus=="Remove")
                                 {
                                     t.PersistFlag = PersistFlagEnum.Deleted;
                                 }
                                 else
                                 t.PersistFlag = PersistFlagEnum.Modified;
                             }
                             else
                             {

                                 t.PersistFlag = PersistFlagEnum.Added;
                             }
                        

                         programmeVO.CastDetailList.Add(t);
                     }
                }
                else {
                    programmeVO.CastDetailList = new List<ProgramCastVO>();
                }
                programmeVO.ProgramFileDetailsList = null;
                programmeVO.ProgramLiveDetailsList = null;
                programmeVO.LicesnseDetailsList = null;
                programLiveInfoVO.LiveDate = null;
                programLiveInfoVO.LiveLocation = string.Empty;
                programLiveInfoVO.LiveTime = null;
                programLiveInfoVO.LiveTimeString = null;
                programLiveInfoVO.LiveVenue = string.Empty;
                programmeVO.ProgramLIveInfo = programLiveInfoVO;
                programmeVO.IsProgramSelected = false;
               
                programmeVO.ProgrammeTitle = pvm.ProgrammeTitle.ToUpper().Trim();               
                programmeVO.ProgrammeWorkingTitle = pvm.WorkingTitle.ToUpper().Trim();
                if (pvm.SubTitle == null)              
                    programmeVO.ProgrammeSubTitle = string.Empty;
                else   
                    programmeVO.ProgrammeSubTitle = pvm.SubTitle.Trim();
                if (pvm.MusicTitle == null)
                    programmeVO.ProgrammeMusicTitle = string.Empty;
                else 
                programmeVO.ProgrammeMusicTitle = pvm.MusicTitle.Trim();
                if (pvm.PoemTitle == null)
                    programmeVO.ProgrammePoemTitle = string.Empty;
                else 
                programmeVO.ProgrammePoemTitle = pvm.PoemTitle.Trim();
                if (pvm.WebTitle == null)
                    programmeVO.ProgrammeWebTitle = string.Empty;
                else 
                programmeVO.ProgrammeWebTitle = pvm.WebTitle.Trim();
                programmeVO.ProgrammeReleaseYear = pvm.ProductionYear;
                programmeVO.ProgrammeEPINumber =Convert.ToInt32(pvm.Episodes);
                programmeVO.ProgrammeParentRefno = Convert.ToInt32(pvm.Parent);
                programmeVO.ProgrammeRefNo = Convert.ToInt32(pvm.RefNo);
                programmeVO.ProgrammeAward = Convert.ToInt32(pvm.Awards);
               
                programmeVO.ProgramNationality = pvm.Nationality;
                
                programmeVO.ProgrammeDurationC = pvm.DurationC;
                if (pvm.DurationS == "Approximate")
                { programmeVO.ProgrammeDurationS = "A"; }
                else if (pvm.DurationS == "Exact")
                { programmeVO.ProgrammeDurationS = "E"; }
                else if (pvm.DurationS == "Trasmission")
                { programmeVO.ProgrammeDurationS = "T"; }
                else { programmeVO.ProgrammeDurationS = "-"; }
                programmeVO.ProgrammeAward = Convert.ToInt32(pvm.Awards);
                if (pvm.TargetGroup == "Select")
                    programmeVO.ProgrammeTargetGroup = null;
                else 
                programmeVO.ProgrammeTargetGroup = pvm.TargetGroup;
                if (pvm.LinkForPosterAct != null)
                    programmeVO.LnkPosterArt = pvm.LinkForPosterAct.Trim();
                else programmeVO.LnkPosterArt = null;
                if (pvm.Type == "Select")
                    programmeVO.ProgramType = null;  
                else       
                programmeVO.ProgramType = pvm.Type.Trim();
                if (pvm.Distributor == "Select")
                    programmeVO.ProgramSuppName = null;
                else
                    programmeVO.ProgramSuppName = pvm.Distributor;
                if (pvm.ProductionHouse == "Select")
                    programmeVO.ProgrammeStudio = null;
                else
                    programmeVO.ProgrammeStudio = pvm.ProductionHouse;
                if (pvm.PrimaryGenre == "Select")
                    programmeVO.ProgrammeCategory = null;
                else
                    programmeVO.ProgrammeCategory = pvm.PrimaryGenre;
                if (pvm.SecondaryGenre == "Select")
                    programmeVO.ProgramSubGenre = null;
                else
                    programmeVO.ProgramSubGenre = pvm.SecondaryGenre;
                if (pvm.TertiaryGenre == "Select")
                    programmeVO.TertiaryGenre = null;
                else
                    programmeVO.TertiaryGenre = pvm.TertiaryGenre;
                if (pvm.QualityGrade == "Select")
                    programmeVO.ProgrammeQuality = null;
                else
                    programmeVO.ProgrammeQuality = pvm.QualityGrade;
                if (pvm.Mood == "Select")
                    programmeVO.Mood = null;
                else
                    programmeVO.Mood = pvm.Mood;
                if (pvm.ColourCode == "Select")
                    programmeVO.ProgrammeColor = null;
                else
                    programmeVO.ProgrammeColor = pvm.ColourCode;
                if (pvm.UserCode == "Select")
                    programmeVO.ProgrammeCode = null;
                else
                    programmeVO.ProgrammeCode = pvm.UserCode;
                if (pvm.ProgrammeCategory == "Select")
                    programmeVO.PrgCategoryDM = null;
                else
                    programmeVO.PrgCategoryDM = pvm.ProgrammeCategory;
                if (pvm.SpokenLanguage ==  "0")
                    programmeVO.ProgrameSpokenLang = null;
                else
                    programmeVO.ProgrameSpokenLang = pvm.SpokenLanguage;
                if (pvm.DomesticAgeRestriction == "Select")
                    programmeVO.ProgrameRatingMPAA = null;
                else
                    programmeVO.ProgrameRatingMPAA = pvm.DomesticAgeRestriction;
                if (pvm.MediaManagerAgeRestriction == "Select")
                    programmeVO.ProgramRatingINT = null;
                else
                    programmeVO.ProgramRatingINT = pvm.MediaManagerAgeRestriction;             
                if (pvm.WideScreen == false)
                    programmeVO.ProgrammeWideScreen = "0";
                else
                programmeVO.ProgrammeWideScreen ="1" ;
                if (pvm.CatComplete == false)
                    programmeVO.ProgrammeCatComplete = "0";
                else
                    programmeVO.ProgrammeCatComplete = "1";
                if (pvm.Archive == false)
                    programmeVO.ProgrammeArchive = "0";
                else
                    programmeVO.ProgrammeArchive = "1";
                if (pvm.NPACopy == false)
                    programmeVO.ProgrammeNFACOpy = "0";
                else
                    programmeVO.ProgrammeNFACOpy = "1";
                if (pvm.TXDigitized == false)
                    programmeVO.ProgrammeTXDigitized = "0";
                else
                    programmeVO.ProgrammeTXDigitized = "1";
                foreach (ProgrammeSynopsis item in pvm.synopsisList)
                {
                   
                    if (item.SynID == "Local Synopsis")
                    {
                            synopsisDetailsVO.SynopsisID_Local = 1;
                            synopsisDetailsVO.SynopsisDetails_Local = item.SynDetails;
                    }
                    else if (item.SynID == "Full Synopsis")
                    {
                        synopsisDetailsVO.SynopsisID_Full = 2;
                        synopsisDetailsVO.SynopsisDetails_Full = item.SynDetails;
                    }
                    else if (item.SynID == "Web Synopsis")
                    {
                        synopsisDetailsVO.SynopsisID_Web = 3;
                        synopsisDetailsVO.SynopsisDetails_web = item.SynDetails;
                    }
                    else if (item.SynID == "Mobile Synopsis")
                    {
                        synopsisDetailsVO.SynopsisID_Mobile = 4;
                        synopsisDetailsVO.SynopsisDetails_Mobile = item.SynDetails;
                    }
                    else if (item.SynID == "EPG Synopsis")
                    {
                        synopsisDetailsVO.SynopsisID_EPG = 5;
                        synopsisDetailsVO.SynopsisDetails_EPG = item.SynDetails;
                    }
                    else if (item.SynID == "Short Synopsis")
                    {
                        programmeVO.ProgrameComment = item.SynDetails;
                    }                            
                } 
                synopsisDetailsVO.SynopsisDetails = string.Empty;
                synopsisDetailsVO.SynopsisID = 0;
                programmeVO.SynopsisDetails = synopsisDetailsVO;           
                programmeVO.ProgramCopyRestriction = string.Empty;
                programmeVO.ProgramTXWarning = string.Empty;
                programmeVO.ProgrammeAbstract = string.Empty;
                programmeVO.RatingAr = string.Empty;
                programmeVO.RatingCrtiicSource = string.Empty;
                programmeVO.BOCategory = string.Empty;
                programmeVO.FinalGrade = string.Empty;
                if (pvm.RefNo != null)
                {
                    programmeVO.PersistFlag = PersistFlagEnum.Modified;
                }
                else
                {
                    programmeVO.PersistFlag = PersistFlagEnum.Added;
                }
                
                ProgrammeVOList.Add(programmeVO);
                SaveProgramResponse saveProgramResponse = new SaveProgramResponse();
                try
                {
                    proxy = ServiceInvoker.OpenProgrammeLibraryProxy();        
                    SaveProgramRequest request = new SaveProgramRequest();
                    request.ProgramDetailsVOList = ProgrammeVOList;
                    saveProgramResponse = proxy.SaveProgramQuery(request);

                    if (saveProgramResponse.Messages != null && saveProgramResponse.Messages.Count > 0)
                    {
                        //this.CustomOracleMessage = new List<AppMessage>();
                        //this.CustomOracleMessage = saveProgramResponse.Messages;
                    }
                }
                catch(Exception )
                {
                   
                  
 
                }
                finally
                {
                    ServiceInvoker.CloseProgrammeLibraryProxy(proxy);
                }
                if (saveProgramResponse != null)
                {
                    foreach (ProgrammeVO item in saveProgramResponse.SaveProgramList)
                    {                    
                        SearchProgrammeDetails(item.ProgrammeRefNo.ToString());
                    }
                }
                //return saveProgramResponse.SaveProgramList;
            }


    //Manisha : Set the values to screen for Programme Search.
          
            public void SetValuesToScreen()
            {
                if (ProgrammeTitle ==  null)
                     programmeVO.ProgrammeTitle = string.Empty;
                else
                programmeVO.ProgrammeTitle = this.ProgrammeTitle.ToUpper();
                if(WorkingTitle == null)
                    programmeVO.ProgrammeWorkingTitle = string.Empty;
                else
                programmeVO.ProgrammeWorkingTitle = this.WorkingTitle.ToUpper();
                if (ProductionHouse != "select")
                {
                    programmeVO.ProgrammeStudio = this.ProductionHouse;
                }
                else
                {
                    programmeVO.ProgrammeStudio = string.Empty;
                }
                if(PrimaryGenre != "Select")
                {
                    programmeVO.ProgrammeCategory =this.PrimaryGenre.Trim();
                }
                else
                {
                    programmeVO.ProgrammeCategory = string.Empty;
                }
                if (MediaManagerAgeRestriction != "Select")
                {
                    programmeVO.ProgramRatingINT = this.MediaManagerAgeRestriction.Trim();

                }
                else
                {
                    programmeVO.ProgramRatingINT = string.Empty;
                }
                if (DomesticAgeRestriction != "Select" )
                {
                    programmeVO.ProgrameRatingMPAA = this.DomesticAgeRestriction.Trim();
                    
                }
                else
                {
                    programmeVO.ProgrameRatingMPAA = string.Empty;
                }
                if (SecondaryGenre != "Select")
                {
                    programmeVO.ProgramSubGenre = this.SecondaryGenre.Trim();
                }
                else
                {
                    programmeVO.ProgramSubGenre = string.Empty;
                }
                if (QualityGrade != "Select")
                {
                    programmeVO.ProgrammeQuality = this.QualityGrade.Trim();
                }
                else
                {
                    programmeVO.ProgrammeQuality = string.Empty;
                }
                if (ColourCode != "Select")
                {
                    programmeVO.ProgrammeColor = this.ColourCode.Trim();
                }
                else
                {
                    programmeVO.ProgrammeColor = string.Empty;
                }

                programmeVO.ProgrammeSeries = string.Empty;
                if (SpokenLanguage != "Select")
                {
                    programmeVO.ProgrameSpokenLang = this.SpokenLanguage.Trim();
                }
                else
                {
                    programmeVO.ProgrameSpokenLang = string.Empty;
                }
                if (RefNo > 0)
                    programmeVO.ProgrammeRefNo =Convert.ToInt32(this.RefNo);
                else
                programmeVO.ProgrammeRefNo = 0;

                if (Type != "Select")
                {
                    programmeVO.ProgramType =this.Type.Trim();
                }
                else
                {
                    programmeVO.ProgramType = string.Empty; 
                }
                if (Nationality != "Select")
                {
                    programmeVO.ProgramNationality = this.Nationality.Trim();
                }
                else
                {
                    programmeVO.ProgramNationality = string.Empty;
                }

                if (Episodes > 0)
                    programmeVO.ProgrammeEPINumber = Convert.ToInt32(this.Episodes);
                else
                programmeVO.ProgrammeEPINumber = 0;

                if (TargetGroup != "Select")
                    programmeVO.ProgrammeTargetGroup = this.TargetGroup.Trim();              
                else            
                    programmeVO.ProgrammeTargetGroup = string.Empty;
                if (WideScreen == false)
                    programmeVO.ProgrammeWideScreen = string.Empty;
                else
                    programmeVO.ProgrammeWideScreen = "1";  
          
                if (CatComplete == false)
                    programmeVO.ProgrammeCatComplete = string.Empty;                
                else
                    programmeVO.ProgrammeCatComplete = "1";
                if (Archive == false)
                    programmeVO.ProgrammeArchive =string.Empty;
                else
                    programmeVO.ProgrammeArchive = "1";
                if (NPACopy == false)
                    programmeVO.ProgrammeNFACOpy = string.Empty;
                else
                    programmeVO.ProgrammeNFACOpy = "1";
                if (TXDigitized == false)
                    programmeVO.ProgrammeTXDigitized = string.Empty;
                else
                    programmeVO.ProgrammeTXDigitized = "1";
                if (Distributor != "Select")
                {
                    programmeVO.ProgramSuppName =this.Distributor;
                }
                else
                {
                programmeVO.ProgramSuppName = string.Empty;
                }
                programmeVO.ProgrammeDurationC = string.Empty;
                if (ProductionYear > 0)
                    programmeVO.ProgrammeReleaseYear = this.ProductionYear;
                else
                programmeVO.ProgrammeReleaseYear = 0;
                if (TertiaryGenre != "Select")
                {
                    programmeVO.TertiaryGenre = this.TertiaryGenre.Trim();
                }
                else
                {
                    programmeVO.TertiaryGenre = string.Empty;
                }
            }
         
    }
       #endregion
}
