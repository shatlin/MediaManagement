using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MediaManager.AcquisitionLookupService;
using MediaManager.DealMemoService;
using System.ComponentModel;
using MediaManager.Areas.Acquisition.BO;
using MediaManager.Infrastructure.Lookups;
using System.Text.RegularExpressions;

namespace MediaManager.Areas.Acquisition.ViewModels
{

    public class IDValPair
    {
        public string ID { get; set; }
        public string Val { get; set; }

        public IDValPair(string ID, string Val)
        {
            this.ID = ID;
            this.Val = Val;
        }
    }

    public class DealMemoMaintenanceViewModel
    {
        DealMemoMaintenanceBO _presenter = new DealMemoMaintenanceBO();
        Lookups lookupgenerator = new Lookups();

        public string ContractNameCode = string.Empty;
        public List<string> Rights = new List<string>() { "Select", "E - Exclusive", "N - Non Exclusive" };
        private DealMemoVO admDMVo;
        public DealMemoVO DMVo4All = new DealMemoVO();
        DealMemoVO result = new DealMemoVO();

        #region Properties

        public string DMVo_DMNumber { get; set; }
        public string DMVo_Currency { get; set; }
        public string DMVo_ContractNo { get; set; }
        public string DMVo_MemoDate { get; set; }
        public string DMVo_LicenseNo { get; set; }
        public string DMVo_ContractEntity { get; set; }
        public string DMVo_MainLicensee { get; set; }
        public string DMVo_Status { get; set; }
        public string TypeComboSelection { get; set; }
        public string DMVo_AmortMethod { get; set; }
        public bool DMVO_Align { get; set; }
        public bool DMVO_Multiplex { get; set; }
        public string DMVo_ContractPrice { get; set; }
        public string DMVo_PriceperHour { get; set; }
        public string DMVo_MemoHoursRemaining { get; set; }
        public string DMVo_MemoPrice { get; set; }
        public string DMVo_Hours { get; set; }
        public string DMVo_LicensedHoursRemaining { get; set; }
        public string DMVO_SignQARequired { get; set; }

        public List<ProgrammeVO> BindingListProgrammeParticulars { get; set; }
        public List<HistoryVO> BindingListHistoryDetails { get; set; }
        public List<LanguageVO> BindingListLanguageDetails { get; set; }
        public List<TerritoryVO> BindingListTerritoryDetails { get; set; }
        public List<PaymentVO> BindingListPaymentDetails { get; set; }

        public bool userMadeChangeButNotSaved { get; set; }
        public bool boolTabwiseresult { get; set; }
        public bool IsProdYearChanged { get; set; }
        public bool isNonCatchUpLicensee { get; set; }
        public String regFlag { get; set; }
        public string ApplicationMessage { get; set; }
        public bool successflag { get; set; }
        public string LicensorDesc { get; set; }
        public string ContractEntityDesc { get; set; }
        public string MainLicenseeDesc { get; set; }
        public string AmortMethodDesc { get; set; }
        public AmortMethodLookupItem AmortMethod { get; set; }
        public List<MemTypeLookupItem> TypeCombo { get; set; }
        public AmortMethodLookupItem AmortMethodItem { get; set; }
        public ProgrammeVO programmeVO { get; set; }

        public List<SplitPaymentVO> splitPaymentVo { get; set; }
        public List<MemCurrencyLookupItem> currencyList { get; set; } //currency Lookup
        public List<MemConNameLookupItem> contractsList { get; set; } //contract Lookup
        public List<MemComNameLookupItem> licensorList { get; set; } //Licensor Lookup
        public List<ComNameLookupItem> contractEntityList { get; set; } //Contract Entity Lookup
        public List<MemLicenseeLookupItem> mainLicenseeList { get; set; } //MainLicensee Lookup
        public List<AmortMethodLookupItem> amortMethodList { get; set; } //Method Id Lookup
        public List<LanIDLookupItem> languageList { get; set; } //Language Lookup
        public List<PaymentCodeLookupItem> paymentCodeList { get; set; } //PaymentCode Lookup
        public List<TerritoryLookupItem> territoryList { get; set; } //Territory Lookup
        public List<RightsLookupItem> rightsList { get; set; } //Rights Lookup
        public List<TypeShowLookupItem> typeshowList { get; set; }//Type Show Lookup
        public List<EventLookupItem> EventTypeList { get; set; }//EventType Lookup
        public List<PB_ProgrammeCategoryLookupItem> ProgrammeCategoryList { get; set; }//ProgrammeCategory Lookup
        public List<BOCategoryLookupItem> BOCategoryList { get; set; }//BOCategory Lookup
        public List<MediaManager.ContractLicenseLookupService.LicShortLookupItem> LiceseeList { get; set; } //L'ee Lookup
        public List<CompetitorVO> ChannelServiceList { get; set; }//Channel Service Lookup
        public List<ChannelVO> ChannelList { get; set; }//Channel Lookup
        public List<MediaServicePlatformVO> PlatformRightsList { get; set; }//PlatformRights Lookup
        public List<SeriesVO> TitleList { get; set; }//Titles Lookup

        public DealMemoVO DMVo
        {
            get
            {
                return this.admDMVo;
            }
            set
            {
                admDMVo = value;

                if (admDMVo != null && admDMVo.PaymentDetails != null && admDMVo.PaymentDetails.Count > 0)
                {
                    splitPaymentVo = admDMVo.PaymentDetails[0].SplitPaymentDetails;
                }
                else
                {
                    splitPaymentVo = new List<SplitPaymentVO>();
                }
            }
        }

        List<ProgrammeVO> emptyVo = new List<ProgrammeVO>();
       
        #endregion

        public void getTypeCombo()
        {
            this.TypeCombo = _presenter.TypeCombo().Where<MemTypeLookupItem>(t => t.MecValue != "CHC" && t.MecValue != "CPD").ToList();
        }
        public void getNewDealMethodId()
        {
            this.AmortMethodItem = (from Amortmethod in lookupgenerator.amortMethodList()
                                    where Amortmethod.FsrValue1 == "D"
                                    select Amortmethod).FirstOrDefault();
            this.DMVo = new DealMemoVO();
            this.DMVo_AmortMethod = AmortMethodItem.FsrValue1;
            this.AmortMethodDesc = AmortMethodItem.FsrDesc1;

        }
        public void InitializeScreenForAdd()
        {

            this.BindingListProgrammeParticulars = new List<ProgrammeVO>();
            this.programmeVO = new ProgrammeVO();
            this.programmeVO.SportType_Genre = "-";
            this.programmeVO.SubGenre = "-";
            this.programmeVO.EventType = "-";
            this.programmeVO.Duration = "0000:00:00";
            this.programmeVO.strTotalPrice = "0.0000";

            LicenseeAllocationVO licenseeAllocationVO = new LicenseeAllocationVO();
            licenseeAllocationVO.RunsPerChannelData = new List<RunsPerChannelVO>();
            licenseeAllocationVO.RunsPerChannelData.Add(new RunsPerChannelVO { });

            this.programmeVO.LicenseeAllocationData = new List<LicenseeAllocationVO>();
            this.programmeVO.LicenseeAllocationData.Add(licenseeAllocationVO);

            CatchUpLicenseeAllocationVO catchUpLicenseeAllocationVO = new CatchUpLicenseeAllocationVO();
            catchUpLicenseeAllocationVO.MediaServicePlatformList = new List<MediaServicePlatformVO>();
            catchUpLicenseeAllocationVO.MediaServicePlatformList.Add(new MediaServicePlatformVO { });

            this.programmeVO.CatchUpLicenseeAllocationVOList = new List<CatchUpLicenseeAllocationVO>();
            this.programmeVO.CatchUpLicenseeAllocationVOList.Add(catchUpLicenseeAllocationVO);

            this.BindingListProgrammeParticulars.Add(this.programmeVO);
        }

        public void AddNewProgramDetail()
        {
            this.programmeVO = new ProgrammeVO();
            this.programmeVO.SportType_Genre = "-";
            this.programmeVO.SubGenre = "-";
            this.programmeVO.EventType = "-";
            this.programmeVO.Duration = "0000:00:00";
            this.programmeVO.strTotalPrice = "0.0000";
        }

        public void GetDealMemoSearchResult(string dmNumber)
        {
            this.successflag = false;
            DealMemoVO newDMVo = new DealMemoVO();
            newDMVo.DMNumber_Search = dmNumber;

            if (_presenter.GetDealMemoSearchResult(newDMVo) != null && _presenter.GetDealMemoSearchResult(newDMVo).Count > 0)
            {
                this.DMVo = _presenter.GetDealMemoSearchResult(newDMVo)[0];

                //Added These two function to get the memo price
                this.DMVo = _presenter.GetDealMemoDetails(this.DMVo);
                this.DMVo = _presenter.SearchDealMemoPaymentDetails(this.DMVo);
                //Edit if needed

                this.DMVo_DMNumber = this.DMVo.DMNumber.ToString();
                this.DMVo_Currency = this.DMVo.Currency;
                this.DMVo_ContractNo = this.DMVo.ContractNo.ToString();
                this.DMVo_MemoDate = this.DMVo.MemoDate.ToString("d");
                this.DMVo_LicenseNo = this.DMVo.LicenseNo;
                this.DMVo_ContractEntity = this.DMVo.ContractEntity;
                this.DMVo_MainLicensee = this.DMVo.MainLicensee;
                this.DMVo_Status = this.DMVo.Status;
                this.DMVo_AmortMethod = this.DMVo.AmortMethod;
                this.DMVO_Align = this.DMVo.Align;
                this.DMVO_Multiplex = this.DMVo.Multiplex;
                this.DMVo_ContractPrice = this.DMVo.ContractPrice.ToString("N4");
                this.DMVo_PriceperHour = this.DMVo.PriceperHour.ToString("N4");
                this.DMVo_MemoHoursRemaining = this.DMVo.MemoHoursRemaining.ToString("N2");
                this.DMVo_MemoPrice = this.DMVo.MemoPrice.ToString("N4");
                this.DMVo_MemoPrice = this.DMVo_MemoPrice.Replace(",", "");
                this.DMVo_Hours = this.DMVo.Hours.ToString();
                this.DMVo_LicensedHoursRemaining = this.DMVo.LicensedHoursRemaining.ToString("N2");
                this.LicensorDesc = (from LicensorList in lookupgenerator.licensorList(null)
                                     where LicensorList.ShortName == this.DMVo.LicenseNo
                                     select LicensorList.Name).FirstOrDefault();
                this.ContractEntityDesc = (from ContractEntity in lookupgenerator.contractEntityList(null)
                                           where ContractEntity.ShortName == this.DMVo.ContractEntity
                                           select ContractEntity.Name).FirstOrDefault();
                this.MainLicenseeDesc = (from MainLicensee in lookupgenerator.mainLicenseeList(null)
                                         where MainLicensee.ShortName == this.DMVo.MainLicensee
                                         select MainLicensee.Name).FirstOrDefault();
                this.AmortMethodDesc = (from Amortmethod in lookupgenerator.amortMethodList()
                                        where Amortmethod.FsrValue1 == this.DMVo.AmortMethod
                                        select Amortmethod.FsrDesc1).FirstOrDefault();
                getTypeCombo();
                this.TypeComboSelection = this.DMVo.Type;
                this.successflag = true;
            }
        }
        public void GetDealMemoProgrammeDetails(string dmNumber)
        {
            this.successflag = false;
            DealMemoVO newDMVo = new DealMemoVO();
            newDMVo.DMNumber_Search = dmNumber;
            if (_presenter.GetDealMemoSearchResult(newDMVo) != null && _presenter.GetDealMemoSearchResult(newDMVo).Count > 0)
            {
                this.DMVo = _presenter.GetDealMemoSearchResult(newDMVo)[0];
                this.DMVo.ProgrammeDetails = _presenter.SearchDealMemoProgrammeDetails(this.DMVo);
                if (this.DMVo != null)
                {
                    if (this.DMVo.ProgrammeDetails != null && this.DMVo.ProgrammeDetails.Count > 0)
                    {
                        this.BindingListProgrammeParticulars = this.DMVo.ProgrammeDetails;
                        SetProgramDetailsForScreen(this.BindingListProgrammeParticulars);
                    }
                }
                this.successflag = true;
            }
        }
        public void ChannelServiceLov(string FilterMsg)
        {
            this.ChannelServiceList = _presenter.ChannelServiceLov();
            //if (FilterMsg != null)
            //{
            //    this.ChannelServiceList.Where(filterData => filterData.DMNumber.ToString().StartsWith(FilterMsg)).ToList();
            //}
        }
        public void RunsPerChannelLov(int channelService, string fltMessage, bool channelROYFlag)
        {
            this.ChannelList = _presenter.RunsPerChannelLov(channelService);
            if (ChannelList != null)
            {
                //if (!string.IsNullOrEmpty(fltMessage))
                //{
                //    this.ChannelList = ChannelList.Where(filterData => filterData.ChannelID.StartsWith(fltMessage)).ToList();
                //}
                if (channelROYFlag == true)
                {
                    this.ChannelList = ChannelList.Where(filterData => filterData.ChannelROYFlag == true).ToList();
                }
            }
        }
        public void GetCatchUpPlatformRights(int dealNumber, int AllocationId)
        {
            this.PlatformRightsList = _presenter.GetCatchUpPlatformRights(dealNumber);
            PlatformRightsList = PlatformRightsList.Where<MediaServicePlatformVO>(plat => plat.Id == AllocationId).ToList(); ;
        }
        public void ShowTitleLOV(string flag, string hinttitle, string type, bool isRef)
        {
            bool isSer = flag == "Y" ? true : false;
            this.TitleList = _presenter.TitlesLookup(isSer, hinttitle, type);
            if (this.TitleList != null)
            {
                for (int i = 0; i < this.TitleList.Count; i++)
                {
                    if ((this.TitleList[i].Duration == "::") || string.IsNullOrEmpty(this.TitleList[i].Duration))
                    {
                        this.TitleList[i].Duration = "0000:00:00";
                    }
                    else
                    {
                        if (!string.IsNullOrEmpty(this.TitleList[i].Duration))
                        {
                            if (this.TitleList[i].Duration.Contains(":"))
                            {
                                string[] strHoursMins;
                                double doubleDuration = 0.0;
                                string strDuration = string.Empty;
                                strHoursMins = this.TitleList[i].Duration.Split("\\:".ToCharArray());
                                for (int k = 0; k < strHoursMins.Length; k++)
                                {
                                    strDuration = strDuration + strHoursMins[k];
                                }
                                if (!string.IsNullOrEmpty(strDuration))
                                {
                                    doubleDuration = Convert.ToDouble(strDuration);
                                    this.TitleList[i].Duration = doubleDuration.ToString("0000:00:00");
                                }
                            }
                        }
                    }
                }
            }
        }
       

        #region Common for all Tabs

        private DealMemoVO getDMVo(string dmNumber)
        {
            this.DMVo4All.DMNumber_Search = dmNumber;
            this.DMVo4All = _presenter.GetDealMemoSearchResult(DMVo4All)[0];
            return (DMVo4All);
        }

        public void SetProgramDetailsForScreen(List<ProgrammeVO> BindingListProgrammeParticulars)
        {
            if (BindingListProgrammeParticulars != null && BindingListProgrammeParticulars.Count>0)
            {
                for (int i = 0; i < BindingListProgrammeParticulars.Count; i++)
                {
                    BindingListProgrammeParticulars[i].strTotalPrice = BindingListProgrammeParticulars[i].TotalPrice > 0 ?
                        BindingListProgrammeParticulars[i].TotalPrice.ToString("N4") : "0.0000";
                    BindingListProgrammeParticulars[i].strTotalPrice = BindingListProgrammeParticulars[i].strTotalPrice.Replace(",", "");
                    for (int j = 0; j < BindingListProgrammeParticulars[i].LicenseeAllocationData.Count; j++)
                    {
                        BindingListProgrammeParticulars[i].LicenseeAllocationData[j].strAllocation = BindingListProgrammeParticulars[i].LicenseeAllocationData[j].Allocation > 0 ?
                            BindingListProgrammeParticulars[i].LicenseeAllocationData[j].Allocation.ToString("N4") : "0.0000";
                    }
                    if (BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList != null)
                    {
                        for (int j = 0; j < BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList.Count; j++)
                        {
                            BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].strAllocation = BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].Allocation > 0 ?
                                BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].Allocation.ToString("N4") : "0.0000";
                        }
                    }
                    if ((BindingListProgrammeParticulars[i].Duration == "::") || string.IsNullOrEmpty(BindingListProgrammeParticulars[i].Duration))
                    {
                        BindingListProgrammeParticulars[i].Duration = "0000:00:00";
                    }
                    else
                    {
                        if (!string.IsNullOrEmpty(BindingListProgrammeParticulars[i].Duration))
                        {
                            if (this.BindingListProgrammeParticulars[i].Duration.Contains(":"))
                            {
                                string[] strHoursMins;
                                double doubleDuration = 0.0;
                                string strDuration = string.Empty;
                                strHoursMins = BindingListProgrammeParticulars[i].Duration.Split("\\:".ToCharArray());
                                for (int k = 0; k < strHoursMins.Length; k++)
                                {
                                    strDuration = strDuration + strHoursMins[k];
                                }
                                if (!string.IsNullOrEmpty(strDuration))
                                {
                                    doubleDuration = Convert.ToDouble(strDuration);
                                    BindingListProgrammeParticulars[i].Duration = doubleDuration.ToString("0000:00:00");
                                }
                            }
                        }
                    }
                }
            }
      
        }
             
        public bool ValidateInputs(DealMemoMaintenanceViewModel model)
        {
            this.currencyList = lookupgenerator.currencyList();
            this.licensorList = lookupgenerator.licensorList(null);
            this.contractEntityList = lookupgenerator.contractEntityList(null);
            this.mainLicenseeList = lookupgenerator.mainLicenseeList(null);
            this.amortMethodList = lookupgenerator.amortMethodList();
            this.contractsList = lookupgenerator.contractsList(null);

            if (!string.IsNullOrEmpty(model.DMVo_Currency) && currencyList != null)
            {
                if (!currencyList.Exists(code => code.CurrencyCode == model.DMVo_Currency.ToUpper()))
                {
                    this.ApplicationMessage = "Invalid Currency Code";
                    return false;
                }
            }
            if (!string.IsNullOrEmpty(model.DMVo_LicenseNo) && licensorList != null)
            {
                if (!licensorList.Exists(code => code.ShortName == model.DMVo_LicenseNo.ToUpper()))
                {
                    this.ApplicationMessage = "Invalid Licensor Code";
                    return false;
                }

            }
            if (!string.IsNullOrEmpty(model.DMVo_ContractEntity) && contractEntityList != null)
            {
                if (!contractEntityList.Exists(code => code.ShortName == model.DMVo_ContractEntity.ToUpper()))
                {
                    this.ApplicationMessage = "Invalid Contract Entity Code";
                    return false;
                }
            }
            if (!string.IsNullOrEmpty(model.DMVo_MainLicensee) && mainLicenseeList != null)
            {
                if (!mainLicenseeList.Exists(code => code.ShortName == model.DMVo_MainLicensee.ToUpper()))
                {
                    this.ApplicationMessage = "Invalid Main Licensee Code";
                    return false;
                }
            }


            if (!string.IsNullOrEmpty(model.DMVo_AmortMethod) && amortMethodList != null)
            {
                if (!amortMethodList.Exists(code => code.FsrValue1 == model.DMVo_AmortMethod.ToUpper()))
                {
                    this.ApplicationMessage = "Invalid Method ID";
                    return false;
                }
            }

            if (!string.IsNullOrEmpty(model.DMVo_ContractNo) && contractsList != null)
            {
                if (!contractsList.Exists(code => code.ConShortName == model.DMVo_ContractNo.ToUpper()))
                {
                    this.ApplicationMessage = "Invalid Contract Code";
                    return false;
                }
            }
            return true;
        }
        public bool MainSectionValidation(DealMemoMaintenanceViewModel model)
        {
            this.ApplicationMessage = null;
            if (string.IsNullOrEmpty(model.DMVo.Currency))
            {
                this.ApplicationMessage = "Currency is required";
                return false;
            }
            else if (string.IsNullOrEmpty(model.DMVo.Type))
            {
                this.ApplicationMessage = "Type is required";
                return false;
            }
            else if (string.IsNullOrEmpty(model.DMVo.LicenseNo))
            {
                this.ApplicationMessage = "Licensor is required";
                return false;
            }
            else if (string.IsNullOrEmpty(model.DMVo.ContractEntity))
            {
                this.ApplicationMessage = "Contract Entity is required";
                return false;
            }
            else if (string.IsNullOrEmpty(model.DMVo.MainLicensee))
            {
                this.ApplicationMessage = "Main Licensee is required";
                return false;
            }
            else if (string.IsNullOrEmpty(model.DMVo.AmortMethod))
            {
                this.ApplicationMessage = "Method Id is required";
                return false;
            }
            else if (model.TypeComboSelection != null)
            {
                if (model.TypeComboSelection == "CPD")
                {
                    if (string.IsNullOrEmpty(model.DMVo_ContractPrice.ToString()))
                    {
                        this.ApplicationMessage = "Contract Price is required";
                        return false;
                    }
                    try
                    {
                        if (!string.IsNullOrEmpty(model.DMVo_ContractPrice))
                        {
                            double chkprice = Convert.ToDouble(model.DMVo_ContractPrice);
                        }
                    }
                    catch (Exception ex)
                    {
                        this.ApplicationMessage = "Invalid Contract Price";
                        return false;
                    }
                }
            }
            return true;
        }
        private bool ProgrammeTabValidation(DealMemoMaintenanceViewModel model)
        {
            this.ApplicationMessage = null;
            this.BindingListProgrammeParticulars = new List<ProgrammeVO>();
            long CompareDuration = 0;
            // validate programme detail
            if (model.DMVo != null)
            {
                if (model.DMVo.ProgrammeDetails != null)
                {
                    this.BindingListProgrammeParticulars = model.DMVo.ProgrammeDetails;
                }
            }
            if (this.BindingListProgrammeParticulars != null)
            {
                for (int i = 0; i < this.BindingListProgrammeParticulars.Count; i++)
                {
                    if (this.BindingListProgrammeParticulars[i].PersistFlag == PersistFlagEnum.Modified || this.BindingListProgrammeParticulars[i].PersistFlag == PersistFlagEnum.Added)
                    {
                        if (string.IsNullOrEmpty(this.BindingListProgrammeParticulars[i].Type))
                        {
                            this.ApplicationMessage = "In the Programme Particulars Grid - Type is required, Please correct";
                            return false;
                        }
                        if (string.IsNullOrEmpty(this.BindingListProgrammeParticulars[i].Title))
                        {
                            this.ApplicationMessage = "In the Programme Particulars Grid - Title is required, Please correct";
                            return false;
                        }
                        if (this.BindingListProgrammeParticulars[i].Title.ToString().Contains('%'))
                        {
                            this.ApplicationMessage = "In the Programme Particulars Grid - Entered titles may not contain the % sign.Use % sign for query purposes only,Please correct";
                            return false;
                        }

                        if (this.BindingListProgrammeParticulars[i].ReleaseYear == null && !this.BindingListProgrammeParticulars[i].IsSeries)
                        {
                            this.ApplicationMessage = "In the Programme Particulars Grid - Prod. Year is required, Please correct";
                            return false;
                        }
                        if (this.BindingListProgrammeParticulars[i].ReleaseYear < 1900 || this.BindingListProgrammeParticulars[i].ReleaseYear > 2199)
                        {
                            this.ApplicationMessage = "In the Programme Particulars Grid, for the Year , Duration must be in between 1900 to 2199, Please correct";
                            return false;
                        }
                        if (!string.IsNullOrEmpty(this.BindingListProgrammeParticulars[i].CategoryCode) &&
                            !string.IsNullOrEmpty(this.BindingListProgrammeParticulars[i].BOCategory) &&
                            this.BindingListProgrammeParticulars[i].CategoryCode.ToUpper() != "NA" &&
                            this.BindingListProgrammeParticulars[i].BOCategory.ToUpper() == "NA")
                        {
                            this.ApplicationMessage = "The BO Category for '" + this.BindingListProgrammeParticulars[i].Title + "' cannot be 'NA'.";
                            return false;
                        }

                        if (this.BindingListProgrammeParticulars[i].Type.Equals("FEA") &&
                            this.DMVo.Status != "BUDGETED" && this.DMVo.Status != "REGISTERED" &&
                            this.DMVo.Status != null)
                        {
                            if (string.IsNullOrEmpty(BindingListProgrammeParticulars[i].CategoryCode) && string.IsNullOrEmpty(BindingListProgrammeParticulars[i].BOCategory))
                            {
                                this.ApplicationMessage = "The programme category and BO Category is missing for '" + BindingListProgrammeParticulars[i].Title + "'.";
                                return false;
                            }
                            else if (string.IsNullOrEmpty(BindingListProgrammeParticulars[i].CategoryCode))
                            {
                                this.ApplicationMessage = "The programme category is missing for '" + BindingListProgrammeParticulars[i].Title + "'.";
                                return false;
                            }
                            else if (string.IsNullOrEmpty(BindingListProgrammeParticulars[i].BOCategory) &&
                                     !string.IsNullOrEmpty(BindingListProgrammeParticulars[i].CategoryCode) &&
                                     BindingListProgrammeParticulars[i].CategoryCode.ToUpper() != "NA")
                            {
                                this.ApplicationMessage = "The BO Category is missing for '" + BindingListProgrammeParticulars[i].Title + "'.";
                                return false;
                            }
                            if (string.IsNullOrEmpty(this.BindingListProgrammeParticulars[i].BORevenueUSD.ToString()) &&
                                !string.IsNullOrEmpty(BindingListProgrammeParticulars[i].CategoryCode) &&
                                BindingListProgrammeParticulars[i].CategoryCode.ToUpper() != "NA")
                            {
                                this.ApplicationMessage = "The BO Revenue (USD) cannot be empty for '" + BindingListProgrammeParticulars[i].Title + "'.";
                                return false;
                            }
                            else if ((this.BindingListProgrammeParticulars[i].BORevenueUSD.ToString() == "0.0" ||
                                (this.BindingListProgrammeParticulars[i].BORevenueUSD.ToString() == "0")) &&
                                !string.IsNullOrEmpty(BindingListProgrammeParticulars[i].CategoryCode) &&
                                BindingListProgrammeParticulars[i].CategoryCode.ToUpper() != "NA")
                            {
                                this.ApplicationMessage = "The BO Revenue (USD) cannot be zero for '" + BindingListProgrammeParticulars[i].Title + "'.";
                                return false;
                            }
                        }
                        if ((this.BindingListProgrammeParticulars[i].Type.Equals("TV") ||
                            this.BindingListProgrammeParticulars[i].Type.Equals("LIB")) &&
                            this.DMVo.Status != "BUDGETED" && this.DMVo.Status != "REGISTERED" && this.DMVo.Status != null)
                        {
                            if (string.IsNullOrEmpty(this.BindingListProgrammeParticulars[i].CategoryCode))
                            {
                                this.ApplicationMessage = "In the Programme Particulars Grid - Program Category is required for specified type, Please correct.";
                                return false;
                            }
                            if (string.IsNullOrEmpty(this.BindingListProgrammeParticulars[i].BORevenueUSD.ToString()) &&
                                !string.IsNullOrEmpty(BindingListProgrammeParticulars[i].CategoryCode) &&
                                 BindingListProgrammeParticulars[i].CategoryCode.ToUpper() != "NA")
                            {
                                this.ApplicationMessage = "The BO Revenue (USD) cannot be empty for '" + BindingListProgrammeParticulars[i].Title + "'.";
                                return false;
                            }
                        }

                        if (this.DMVo.Type == "FLF" && !string.IsNullOrEmpty(this.BindingListProgrammeParticulars[i].strTotalPrice))
                        {
                            if ((Convert.ToDouble(this.BindingListProgrammeParticulars[i].strTotalPrice) > 0 && Convert.ToDouble(this.BindingListProgrammeParticulars[i].strTotalPrice) < 1)
                                || (Convert.ToDouble(this.BindingListProgrammeParticulars[i].strTotalPrice) < 0))
                            {
                                this.ApplicationMessage = "ERROR :With only 1 episode,full value must be on first episode.";
                                return false;
                            }
                        }
                        if (!string.IsNullOrEmpty(this.BindingListProgrammeParticulars[i].Duration))
                        {
                            if (this.BindingListProgrammeParticulars[i].Duration.Contains(":"))
                            {
                                if (!this.BindingListProgrammeParticulars[i].IsSeries)
                                {
                                    Regex regexDuration = new Regex("([0][0][0-9][0-9]):([0-5][0-9]):([0-5][0-9])", RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.IgnorePatternWhitespace);
                                    if (!regexDuration.IsMatch(this.BindingListProgrammeParticulars[i].Duration))
                                    {
                                        this.ApplicationMessage = "In the Programme Particulars Grid, for the Title : " + this.BindingListProgrammeParticulars[i].Title + ", \nDuration must be in the format 0000:00:00 to 0099:59:59, Please correct.";
                                        return false;
                                    }
                                }
                                if (this.BindingListProgrammeParticulars[i].IsSeries)
                                {
                                    Regex regexDuration = new Regex("([0-9][0-9][0-9][0-9]):([0-5][0-9]):([0-5][0-9])", RegexOptions.Compiled | RegexOptions.IgnoreCase | RegexOptions.IgnorePatternWhitespace);
                                    if (!regexDuration.IsMatch(this.BindingListProgrammeParticulars[i].Duration))
                                    {
                                        this.ApplicationMessage = "In the Programme Particulars Grid, for the Title : " + this.BindingListProgrammeParticulars[i].Title + ", \nDuration must be in the format 0000:00:00 to 9999:59:59, Please correct.";
                                        return false;
                                    }
                                }
                            }
                        }
                        //Duration must be in the range 0000:00:00 to 9999:59:59
                        if (!string.IsNullOrEmpty(this.BindingListProgrammeParticulars[i].Duration) &&
                            this.BindingListProgrammeParticulars[i].Duration.Length != 10)
                        {
                            this.ApplicationMessage = "In the Programme Particulars Grid, for the Title : " + this.BindingListProgrammeParticulars[i].Title + ", \nDuration must be in the range 0000:00:00 to 0099:59:59, Please correct.";
                            return false;
                        }
                        if (IsProdYearChanged)
                        {
                            LOVLoader objLOVLoader = new LOVLoader();
                            List<SeriesVO> titleList = _presenter.TitlesLookup(false, this.BindingListProgrammeParticulars[i].Title + "%", this.BindingListProgrammeParticulars[i].Type);

                            if (titleList != null && this.BindingListProgrammeParticulars[i].Title != null)
                            {
                                if (titleList.Count(s => (s.WT_Text.Equals(this.BindingListProgrammeParticulars[i].Title)) &&
                                    (s.Production_Year == this.BindingListProgrammeParticulars[i].ReleaseYear) &&
                                    (s.DMGenRefNo != this.BindingListProgrammeParticulars[i].RefNo)) > 0)
                                {
                                    this.ApplicationMessage = "Same title with same production year already exists.";
                                    return false;
                                }
                            }
                        }

                        // Total Price is required (it can be zero)
                        if (string.IsNullOrEmpty(this.BindingListProgrammeParticulars[i].strTotalPrice))
                        {
                            this.BindingListProgrammeParticulars[i].strTotalPrice = ".0000";
                            if (this.BindingListProgrammeParticulars[i].PersistFlag != PersistFlagEnum.Added)
                                this.BindingListProgrammeParticulars[i].PersistFlag = PersistFlagEnum.Modified;
                            //Total Price cannot be less than 1 for FLF type 
                        }
                        if (model.TypeComboSelection == "CHC")
                        {
                            if (!string.IsNullOrEmpty(this.BindingListProgrammeParticulars[i].Duration))
                            {
                                if (this.BindingListProgrammeParticulars[i].Duration.Contains(":"))
                                {
                                    string[] strDurationInSec = this.BindingListProgrammeParticulars[i].Duration.ToString().Split(':');
                                    if (strDurationInSec != null)
                                    {
                                        if (strDurationInSec.Count() == 3)
                                        {
                                            CompareDuration += (Convert.ToInt64(strDurationInSec[0]) * 60 * 60) + (Convert.ToInt64(strDurationInSec[1]) * 60) + (Convert.ToInt64(strDurationInSec[2]));
                                        }
                                    }
                                }
                            }

                        }

                        if (!this.BindingListProgrammeParticulars[i].IsSeries && this.BindingListProgrammeParticulars[i].RefNo == 0)
                        {
                            if (!string.IsNullOrEmpty(this.BindingListProgrammeParticulars[i].Duration))
                            {
                                if (this.BindingListProgrammeParticulars[i].Duration.Contains(":"))
                                {
                                    string[] strDurationInSec = this.BindingListProgrammeParticulars[i].Duration.ToString().Split(':');
                                    if (strDurationInSec != null)
                                    {
                                        if (strDurationInSec.Count() == 3)
                                        {
                                            Int64 CheckDuration = (Convert.ToInt64(strDurationInSec[0]) * 60 * 60) + (Convert.ToInt64(strDurationInSec[1]) * 60) + (Convert.ToInt64(strDurationInSec[2]));
                                            if (CheckDuration < 60)
                                            {
                                                this.ApplicationMessage = "In the Programme Particulars Grid, for the Title : " + this.BindingListProgrammeParticulars[i].Title + ", " + "\n" + "Duration must be greater than or equal to one Minute, Please correct";
                                                return false;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                // validate licensee allocation
                for (int i = 0; i < this.BindingListProgrammeParticulars.Count; i++)
                {
                    if (this.BindingListProgrammeParticulars[i].LicenseeAllocationData != null)
                    {
                        for (int j = 0; j < this.BindingListProgrammeParticulars[i].LicenseeAllocationData.Count; j++)
                        {
                            if (this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].PersistFlag == PersistFlagEnum.Modified || this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].PersistFlag == PersistFlagEnum.Added)
                            {
                                // L'ee is required
                                if (string.IsNullOrEmpty(this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].Licesee))
                                {
                                    this.ApplicationMessage = "In the Licensee Allocation Grid, L'ee is required for the Programme Title : " + this.BindingListProgrammeParticulars[i].Title + ", Please correct";
                                    return false;
                                }
                                // Allocation is required
                                if (string.IsNullOrEmpty(this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].strAllocation) && model.TypeComboSelection != "CPD")
                                {
                                    this.ApplicationMessage = "In the Licensee Allocation Grid, Alloc is required for the L'ee : " + this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].Licesee + " of Title : " + this.BindingListProgrammeParticulars[i].Title + ",Please correct";
                                    return false;
                                }
                                // channel runs is not mandatory because it will be populated from the total runs of runs per channel grid
                                // Chan Serv is requried
                                if (string.IsNullOrEmpty(this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].ChannelService))
                                {
                                    this.ApplicationMessage = "In the Licensee Allocation Grid, Cha Serv is required for the L'ee : " + this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].Licesee + " of Title : " + this.BindingListProgrammeParticulars[i].Title + ", Please correct";
                                    return false;
                                }
                                if (model.DMVo_AmortMethod == "D")
                                {
                                    // Cost Runs is required
                                    if (this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].Cost_Runs < 0)
                                    {
                                        this.ApplicationMessage = "In the Licensee Allocation Grid, Cost Runs is required for the L'ee : " + this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].Licesee + " of Title : " + this.BindingListProgrammeParticulars[i].Title + ", Please correct";
                                        return false;
                                    }
                                    // Max Chs is required
                                    if (this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].Max_channel_Service <= 0)
                                    {
                                        this.ApplicationMessage = "In the Licensee Allocation Grid, MaxChs is required for the L'ee : " + this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].Licesee + " of Title : " + this.BindingListProgrammeParticulars[i].Title + ", Please correct";
                                        return false;
                                    }
                                    // Max Cha is required
                                    if (this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].Max_channel_Number <= 0)
                                    {
                                        this.ApplicationMessage = "In the Licensee Allocation Grid, MaxCha is required for the L'ee : " + this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].Licesee + " of Title : " + this.BindingListProgrammeParticulars[i].Title + ", Please correct";
                                        return false;
                                    }
                                    if (this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].strAllocation != string.Empty && Convert.ToDouble(this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].strAllocation) > 0)
                                    {
                                        if (this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].Cost_Runs == 0)
                                        {
                                            this.ApplicationMessage = "In the Licensee Allocation Grid, Cost Runs must be greater than Zero for the L'ee : " + this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].Licesee + " of Title : " + this.BindingListProgrammeParticulars[i].Title + ", Please correct";
                                            return false;
                                        }
                                    }
                                }
                                //TBA not slected - atleast one date should be selected
                                if (!this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].TBA)
                                {
                                    if ((string.IsNullOrEmpty(this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].StartDate)) ||
                                        (string.IsNullOrEmpty(this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].EndDate)))
                                    {
                                        this.ApplicationMessage = "In the Licensee Allocation Grid, for the L'ee : " + this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].Licesee + " of Title : " + this.BindingListProgrammeParticulars[i].Title + ",\n Start Date and End Date cannot be empty as TBA option is not selected,  Please correct";
                                        return false;
                                    }
                                }
                                if (this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].TBA)
                                {
                                    if ((!string.IsNullOrEmpty(this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].StartDate)) ||
                                        (!string.IsNullOrEmpty(this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].EndDate)))
                                    {
                                        this.ApplicationMessage = "In the Licensee Allocation Grid, for the L'ee : " + this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].Licesee + " of Title : " + this.BindingListProgrammeParticulars[i].Title + ",\n period is TBA,but you have specified all the dates,  Please correct";
                                        return false;
                                    }
                                }
                                if ((!string.IsNullOrEmpty(this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].StartDate)) &&
                                        (!string.IsNullOrEmpty(this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].EndDate)))
                                {
                                    if (DateTime.Parse(this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].EndDate) < DateTime.Parse(this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].StartDate))
                                    {
                                        this.ApplicationMessage = "In the Licensee Allocation Grid, for the L'ee : " + this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].Licesee + " of Title : " + this.BindingListProgrammeParticulars[i].Title + ", End Date should be greater than start date";
                                        return false;
                                    }
                                }
                            }
                        }
                        if (model.DMVo != null)
                        {
                            //Validation for max cha 
                            if (!this.IsMaxChaValid(model.DMVo))
                            {
                                return false;
                            }
                        }
                        
                    }

                    if (this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList != null)
                    {
                        for (int j = 0; j < this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList.Count; j++)
                        {
                            if (this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].PersistFlag == PersistFlagEnum.Modified ||
                                this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].PersistFlag == PersistFlagEnum.Added)
                            {
                                // L'ee is required
                                if (string.IsNullOrEmpty(this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].Licesee))
                                {
                                    this.ApplicationMessage = "In the Catch-up Licensee Allocation Grid, L'ee is required for the\n Programme Title : " +
                                    this.BindingListProgrammeParticulars[i].Title + ", Please correct";
                                    return false;
                                }
                                // Allocation is required
                                if (string.IsNullOrEmpty(this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].strAllocation) &&
                                   model.TypeComboSelection != "CPD")
                                {
                                    this.ApplicationMessage = "In the Catch-up Licensee Allocation Grid, Allocation is required for the\n L'ee : " +
                                    this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].Licesee + " of Title : " +
                                    this.BindingListProgrammeParticulars[i].Title + ",Please correct";
                                    return false;
                                }


                                if (model.DMVo_AmortMethod == "D")
                                {
                                    if (this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].MaxViewingPeriodDays <= 0)
                                    {
                                        this.ApplicationMessage = "In the Catch-up Licensee Allocation Grid, Max No. of Viewing Period is required for the\n L'ee : " +
                                        this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].Licesee + " of Title : " +
                                        this.BindingListProgrammeParticulars[i].Title + ", Please correct";
                                        return false;
                                    }

                                    if (this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].MaxViewingPeriod <= 0)
                                    {
                                        this.ApplicationMessage = "In the Catch-up Licensee Allocation Grid, Max Viewing Days is required for the\n L'ee : " +
                                        this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].Licesee + " of Title : " + this.BindingListProgrammeParticulars[i].Title + ", Please correct";
                                        return false;
                                    }

                                    if (this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].strAllocation != string.Empty &&
                                        Convert.ToDouble(this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].strAllocation) > 0)
                                    {
                                        if (this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].CostedViewingPeriod == 0 ||
                                            this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].CostedViewingPeriod == null)
                                        {
                                            this.ApplicationMessage = "In the Catch-up Licensee Allocation Grid, Costed Viewing Period must be \ngreater than Zero for the L'ee : " + this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].Licesee + " of Title : " + this.BindingListProgrammeParticulars[i].Title + ", Please correct";
                                            return false;
                                        }
                                    }
                                    else
                                    {
                                        if (this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].CostedViewingPeriod > 0)
                                        {
                                            this.ApplicationMessage = "In the Catch-up Licensee Allocation Grid, Costed Viewing Period must be \nZero for the L'ee : " +
                                            this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].Licesee + " of Title : " +
                                            this.BindingListProgrammeParticulars[i].Title + ", Please correct";
                                            return false;
                                        }
                                        else
                                        {
                                            if (this.DMVo != null && this.DMVo.Type == "ROY")
                                            {
                                                this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].CostedViewingPeriod = 0;
                                            }
                                        }
                                    }



                                    if (this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].MaxViewingPeriodDays.ToString() != string.Empty)
                                    {
                                        if (this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].MaxViewingPeriodDays.ToString().Length > 3)
                                        {
                                            this.ApplicationMessage = "Max No. of Viewing Period cannot be greater that 3 digits for the\n L'ee : " +
                                            this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].Licesee + " of Title : " +
                                            this.BindingListProgrammeParticulars[i].Title + ", Please correct";
                                            return false;
                                        }
                                    }

                                }
                                //TBA not slected - atleast one date should be selected
                                if (!this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].TBA)
                                {
                                    if ((string.IsNullOrEmpty(this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].StartDate)) ||
                                        (string.IsNullOrEmpty(this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].EndDate)))
                                    {
                                        this.ApplicationMessage = "In the Catch-up Licensee Allocation Grid, for the\n L'ee : " +
                                        this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].Licesee + " of Title : " +
                                        this.BindingListProgrammeParticulars[i].Title + ",\n Start Date and End Date cannot be empty as TBA option is not selected,  Please correct";
                                        return false;
                                    }
                                }
                                if (this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].TBA)
                                {
                                    if ((!string.IsNullOrEmpty(this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].StartDate)) ||
                                        (!string.IsNullOrEmpty(this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].EndDate)))
                                    {
                                        this.ApplicationMessage = "In the Catch-up Licensee Allocation Grid, for the\n L'ee : " +
                                        this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].Licesee + " of Title : " +
                                        this.BindingListProgrammeParticulars[i].Title + ",\n period is TBA,but you have specified all the dates,  Please correct";
                                        return false;
                                    }
                                }
                                if ((!string.IsNullOrEmpty(this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].StartDate)) &&
                                        (!string.IsNullOrEmpty(this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].EndDate)))
                                {
                                    if (DateTime.Parse(this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].EndDate) <
                                        DateTime.Parse(this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].StartDate))
                                    {
                                        this.ApplicationMessage = "In the Catch-up Licensee Allocation Grid, for the\n L'ee : " +
                                        this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].Licesee + " of Title : " +
                                        this.BindingListProgrammeParticulars[i].Title + ", End Date should be greater than start date";
                                        return false;
                                    }
                                }

                            }
                        }
                    }

                }
            }
            if (this.BindingListProgrammeParticulars != null)
            {
                // validate runs per channel
                for (int i = 0; i < this.BindingListProgrammeParticulars.Count; i++)
                {
                    if (this.BindingListProgrammeParticulars[i].LicenseeAllocationData != null)
                    {
                        for (int j = 0; j < this.BindingListProgrammeParticulars[i].LicenseeAllocationData.Count; j++)
                        {
                            if (this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].RunsPerChannelData != null)
                            {
                                for (int k = 0; k < this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].RunsPerChannelData.Count; k++)
                                {
                                    if (this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].RunsPerChannelData[k].PersistFlag == PersistFlagEnum.Modified || this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].RunsPerChannelData[k].PersistFlag == PersistFlagEnum.Added)
                                    {
                                        //Cha is required
                                        if (string.IsNullOrEmpty(this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].RunsPerChannelData[k].Channel))
                                        {
                                            this.ApplicationMessage = "In the Runs Per Channel Grid, Cha is required for the L'ee : " + this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].Licesee + ", Please correct";
                                            return false;
                                        }
                                        // Runs is required
                                        if (this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].RunsPerChannelData[k].Runs < 0)
                                        {
                                            this.ApplicationMessage = "In the Runs Per Channel Grid, Total Runs must be equal to (or) greater than zero for the Cha : " + this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].RunsPerChannelData[k].Channel + ", Please correct";
                                            return false;
                                        }

                                        if (this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].RunsPerChannelData.Sum(ChaRuns => ChaRuns.Runs) > this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].Max_channel_Service)
                                        {
                                            this.ApplicationMessage = "In the Runs Per Channel Grid,Sum of Total Runs must be equal to (or) less than MaxChs specified for the L'ee : " + this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].Licesee + ", Please correct";
                                            return false;
                                        }

                                        if (this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].RunsPerChannelData[k].Max_channel_Number > this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].Max_channel_Number)
                                        {
                                            this.ApplicationMessage = "In the Runs Per Channel Grid, for the Cha : " + this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].RunsPerChannelData[k].Channel + ",\n MaxCha is greater than the specified MaxCha for channel service, Please correct";
                                            return false;
                                        }
                                        if (this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].RunsPerChannelData[k].Runs > this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].RunsPerChannelData[k].Max_channel_Number)
                                        {
                                            this.ApplicationMessage = "In the Runs Per Channel Grid, for the Cha : " + this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].RunsPerChannelData[k].Channel + ",\n Total Runs is greater than the specified MaxCha, Please correct";
                                            return false;
                                        }
                                        // Check that Costed Runs does not exceed the Total Runs
                                        if (this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].RunsPerChannelData[k].CostingRuns > this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].RunsPerChannelData[k].Runs)
                                        {
                                            this.ApplicationMessage = "In the Runs Per Channel Grid, for the Cha : " + this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].RunsPerChannelData[k].Channel + ",\n Costed Runs is greater than the Total Runs, Please correct";
                                            return false;
                                        }
                                        // Costed run must be specified if cost is checked
                                        if (this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].RunsPerChannelData[k].Cost && (this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].RunsPerChannelData[k].CostingRuns == null || this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].RunsPerChannelData[k].CostingRuns <= 0))
                                        {
                                            List<string> costedProgramTypeList = new List<string>();
                                            costedProgramTypeList.Add("FEA");
                                            costedProgramTypeList.Add("LIB");
                                            costedProgramTypeList.Add("TV");
                                            List<string> types = (model.DMVo.CostedProgrammeTypes != null) ? model.DMVo.CostedProgrammeTypes : costedProgramTypeList;

                                            if (types.Contains(BindingListProgrammeParticulars[i].Type) && BindingListProgrammeParticulars[i].LicenseeAllocationData[j].IsBioscopeLicensee == "Y")
                                            {
                                                this.ApplicationMessage = "In the Runs Per Channel Grid, for the costed runs Cha : " + this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].RunsPerChannelData[k].Channel + ", Costed Runs is mandatory, Please correct";
                                                return false;
                                            }
                                        }
                                        // Validation for Service Costed Run cannot be less than channel Costed Runs
                                        if (this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].RunsPerChannelData[k].CostingRuns > this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].Cost_Runs)
                                        {
                                            this.ApplicationMessage = "In the Licensee Allocation Grid, for the L'ee : " + this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].Licesee + " of Title : " + this.BindingListProgrammeParticulars[i].Title + ",\n Cost Runs cannot be less than the Costed Runs specified in Runs per Channel Grid, Please correct";
                                            return false;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    if (this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList != null)
                    {
                        for (int j = 0; j < this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList.Count; j++)
                        {
                            if (this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].CostedViewingPeriod != null)
                            {
                                if (this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].CostedViewingPeriod >
                                   this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].MaxViewingPeriodDays)
                                {
                                    this.ApplicationMessage = "In the Catch-up Allocation Grid, Costed Viewing Period should be less than or equal to \nMax No. of Viewing Period for the L'ee : " +
                                    this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].Licesee + ", Please correct";
                                    return false;
                                }

                            }

                            if (this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList != null)
                            {
                                for (int k = 0; k < this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList.Count; k++)
                                {
                                    if (this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList[k].PersistFlag == PersistFlagEnum.Modified ||
                                        this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList[k].PersistFlag == PersistFlagEnum.Added)
                                    {

                                        if (string.IsNullOrEmpty(this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList[k].PlatformCode))
                                        {
                                            this.ApplicationMessage = "In the Platform Rights Grid, Platform is required for the\n L'ee : " +
                                            this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].Licesee + ", Please correct";
                                            return false;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            //if (model.TypeComboSelection == "CHC" && this.BindingListProgrammeParticulars != null)
            //{
            //    if (BindingListProgrammeParticulars.Count > 0)
            //    {
            //        double memRemPrice = 0;
            //        if (!string.IsNullOrEmpty(model.DMVo_Hours.ToString()))
            //        {
            //            if (CompareDuration > (Convert.ToInt64(model.DMVo_Hours) * 60 * 60))
            //            {
            //                MessageBoxResult res = MessageBox.Show("You have Exceeded the Number of Hours Allocated to This\n Contract.Do u still want to save the Deal?", "Alert", MessageBoxButton.OKCancel, MessageBoxImage.Information);
            //                if (res == MessageBoxResult.Cancel)
            //                {
            //                    return false;
            //                }
            //                if (res == MessageBoxResult.OK)
            //                {
            //                    memRemPrice = Convert.ToDouble((((Convert.ToInt64(texthrs.Text) * 60 * 60) - CompareDuration) / 60)) / 60;
            //                    textmemhrsremaining.Text = memRemPrice.ToString("N2");
            //                }
            //            }
            //            else
            //            {
            //                memRemPrice = Convert.ToDouble((((Convert.ToInt64(texthrs.Text) * 60 * 60) - CompareDuration) / 60)) / 60;
            //                textmemhrsremaining.Text = memRemPrice.ToString("N2");
            //            }
            //        }
            //    }
            //    else
            //    {
            //        textmemhrsremaining.Text = texthrs.Text;
            //    }
            //}
            return true;
        }
        public bool TabWiseSave(DealMemoMaintenanceViewModel model, int tabIndex)
        {
            bool saveSuccess = false;
            this.ApplicationMessage = null;
            try
            {
                if (model.DMVo_Status != "EXECUTED")
                {
                    saveSuccess = SaveDealMemo(model, tabIndex);
                }
            }
            catch (Exception ex)
            {
                saveSuccess = false;
                this.ApplicationMessage = "Some error Occured.Please contact the Administrator.";
            }
            return saveSuccess;
        }

        public bool SaveDealMemo(DealMemoMaintenanceViewModel model, int tabIndex)
        {
            bool saveSuccess = false;
            try
            {

                DealMemoVO resultVo = new DealMemoVO();

                this.ApplicationMessage = null;

                if (model.TypeComboSelection != null)
                {
                    if (model.TypeComboSelection == "CPD")
                    {
                        if (string.IsNullOrEmpty(model.DMVo_ContractPrice))
                        {
                            this.ApplicationMessage = "Contract Price is required";
                            return false;
                        }
                        try
                        {
                            if (!string.IsNullOrEmpty((model.DMVo_ContractPrice)))
                            {
                                model.DMVo.ContractPrice = model.DMVo_ContractPrice == string.Empty ? 0 : Convert.ToDouble(model.DMVo_ContractPrice);
                                model.DMVo_ContractPrice = Convert.ToDouble(model.DMVo_ContractPrice).ToString("N4");
                                model.DMVo_MemoPrice = Convert.ToDouble(model.DMVo_ContractPrice).ToString("N4");
                            }
                        }
                        catch (Exception ex)
                        {
                            this.ApplicationMessage = "Invalid Contract Price";
                            return false;
                        }
                    }
                }
                if (!string.IsNullOrEmpty(model.DMVo_MemoPrice))
                {
                    model.DMVo.MemoPrice = Convert.ToDouble(model.DMVo_MemoPrice);
                }
                else
                {
                    model.DMVo.MemoPrice = 0;
                }
                model.DMVo.PriceperHour = model.DMVo_PriceperHour == string.Empty ? 0 : Convert.ToDouble(model.DMVo_PriceperHour);
                model.DMVo.MemoHoursRemaining = model.DMVo_MemoHoursRemaining == string.Empty ? 0 : Convert.ToDouble(model.DMVo_MemoHoursRemaining);
                model.DMVo.LicensedHoursRemaining = model.DMVo_LicensedHoursRemaining == string.Empty ? 0 : Convert.ToDouble(model.DMVo_LicensedHoursRemaining);


                //-------------------------Save Programme Tab Information + Main Screen Information-----------------------------

                // main section validation
                if (!this.MainSectionValidation(model))
                {
                    return false;
                }
                //programme tab validation
                if (!this.ProgrammeTabValidation(model))
                {
                    return false;
                }
                //save
                if (model.DMVo != null)
                {
                    if (model.DMVo.ProgrammeDetails != null)
                    {
                        this.BindingListProgrammeParticulars = new List<ProgrammeVO>();
                        this.BindingListProgrammeParticulars = model.DMVo.ProgrammeDetails;
                    }
                }
                //convert the total price back to double
                for (int i = 0; i < this.BindingListProgrammeParticulars.Count; i++)
                {
                    this.BindingListProgrammeParticulars[i].TotalPrice = this.BindingListProgrammeParticulars[i].strTotalPrice != string.Empty ?
                        Convert.ToDouble(this.BindingListProgrammeParticulars[i].strTotalPrice) : 0.0;
                }
                //convert the allocation back to double
                for (int i = 0; i < this.BindingListProgrammeParticulars.Count; i++)
                {
                    if (this.BindingListProgrammeParticulars[i].PersistFlag == PersistFlagEnum.Deleted && this.BindingListProgrammeParticulars[i].LicenseeAllocationData == null)
                    {
                        this.BindingListProgrammeParticulars[i].LicenseeAllocationData = new List<LicenseeAllocationVO>();
                    }
                    if (this.BindingListProgrammeParticulars[i].LicenseeAllocationData != null)
                    {
                        for (int j = 0; j < this.BindingListProgrammeParticulars[i].LicenseeAllocationData.Count; j++)
                        {
                            if (this.BindingListProgrammeParticulars[i].PersistFlag == PersistFlagEnum.Deleted && this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].RunsPerChannelData == null)
                            {
                                this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].RunsPerChannelData = new List<RunsPerChannelVO>();
                            }
                            if (this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].PersistFlag == PersistFlagEnum.Deleted && this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].RunsPerChannelData == null)
                            {
                                this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].RunsPerChannelData = new List<RunsPerChannelVO>();
                            }
                            this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].Allocation =
                                this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].strAllocation != string.Empty ?
                                Convert.ToDouble(this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].strAllocation) : 0.0;
                            // hard code F as lic type
                            this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].LicenseType = "F";
                            if (!string.IsNullOrEmpty(this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].ChannelService))
                            {
                                this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].ChannelServiceNumber =
                                    (from ChannelServiceList in _presenter.ChannelServiceLov()
                                     where ChannelServiceList.ChannelServiceCode == this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].ChannelService
                                     select ChannelServiceList.ChannelServiceNumber).FirstOrDefault();
                            }
                        }
                    }
                }
                // for Catch-Up Licensee Allocation
                for (int i = 0; i < this.BindingListProgrammeParticulars.Count; i++)
                {
                    if (this.BindingListProgrammeParticulars[i].PersistFlag == PersistFlagEnum.Deleted && this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList == null)
                    {
                        this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList = new List<CatchUpLicenseeAllocationVO>();
                    }
                    if (this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList != null)
                    {
                        for (int j = 0; j < this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList.Count; j++)
                        {
                            if (this.BindingListProgrammeParticulars[i].PersistFlag == PersistFlagEnum.Deleted && this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList == null)
                            {
                                this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList = new List<MediaServicePlatformVO>();
                            }
                            if (this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].PersistFlag == PersistFlagEnum.Deleted && this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList == null)
                            {
                                this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList = new List<MediaServicePlatformVO>();
                            }
                            this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].Allocation =
                                this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].strAllocation != string.Empty ?
                                Convert.ToDouble(this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].strAllocation) : 0.0;
                            // hard code F as lic type
                            this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].LicenseType = "F";
                        }
                    }
                }
                if (this.BindingListProgrammeParticulars.Count(add => add.PersistFlag == PersistFlagEnum.Added) != model.DMVo.ProgrammeDetails.Count(add => add.PersistFlag == PersistFlagEnum.Added))
                {
                    model.DMVo.ProgrammeDetails.RemoveAll(add => add.PersistFlag == PersistFlagEnum.Added);
                    model.DMVo.ProgrammeDetails.AddRange(this.BindingListProgrammeParticulars.Where<ProgrammeVO>(add => add.PersistFlag == PersistFlagEnum.Added));
                }
                if (!string.IsNullOrEmpty(model.DMVo_MemoPrice))
                {
                    model.DMVo.MemoPrice = Convert.ToDouble(model.DMVo_MemoPrice);
                }
                if (!string.IsNullOrEmpty(model.DMVo_PriceperHour))
                {
                    model.DMVo.PriceperHour = Convert.ToDouble(model.DMVo_PriceperHour);
                }
                if (!string.IsNullOrEmpty(model.DMVo_MemoHoursRemaining))
                {
                    model.DMVo.MemoHoursRemaining = Convert.ToDouble(model.DMVo_MemoHoursRemaining);
                }

                for (int i = 0; i < this.BindingListProgrammeParticulars.Count; i++)
                {
                    if (this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList != null)
                    {
                        for (int j = 0; j < this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList.Count; j++)
                        {
                            if (this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList != null)
                            {
                                for (int k = 0; k < this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList.Count; k++)
                                {
                                    if (!this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList[k].IsSelected &&
                                        this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList[k].PersistFlag == PersistFlagEnum.UnModified)
                                        this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList[k].PersistFlag = PersistFlagEnum.Modified;
                                    else if (!this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList[k].IsSelected &&
                                        this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList[k].PersistFlag == PersistFlagEnum.Added)
                                    {
                                        this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList[k].PersistFlag = PersistFlagEnum.UnModified;
                                    }
                                    if (this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList[k].PersistFlag == PersistFlagEnum.Deleted)
                                    {
                                        this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList[k].IsSelected = false;
                                        this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList[k].PersistFlag = PersistFlagEnum.Modified;
                                    }
                                    if (!string.IsNullOrEmpty(this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList[k].PlatformCode))
                                    {
                                        this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList[k].MapId =
                                            (from PlateformRightsLst in _presenter.GetCatchUpPlatformRights(model.DMVo.DMNumber)
                                             where PlateformRightsLst.PlatformCode == this.BindingListProgrammeParticulars[i].CatchUpLicenseeAllocationVOList[j].MediaServicePlatformList[k].PlatformCode
                                             select PlateformRightsLst.MapId).FirstOrDefault();
                                    }
                                }
                            }
                        }
                    }
                }

                model.DMVo.LanguageDetails = new List<LanguageVO>();
                model.DMVo.TerritoryDetails = new List<TerritoryVO>();
                model.DMVo.ProtectionDetails = new List<CompetitorVO>();
                model.DMVo.MaterialDetails = new List<MaterialVO>();
                model.DMVo.PaymentDetails = new List<PaymentVO>();
                model.DMVo.RightsMediaList = new List<MediaServicePlatformVO>();
                model.DMVo.ProgrammeDetails = this.BindingListProgrammeParticulars;
                resultVo = _presenter.SaveDealMemoDetails(model.DMVo);

                //if no exception has occured at service or database
                if (resultVo != null)
                {
                    GetDealMemoSearchResult(resultVo.DMNumber.ToString());
                    if (this.successflag == true)
                    {
                        model.DMVo.ProgrammeDetails = _presenter.SearchDealMemoProgrammeDetails(model.DMVo);
                        if (model.DMVo.ProgrammeDetails.Count > 0)
                        {
                            model.BindingListProgrammeParticulars = model.DMVo.ProgrammeDetails;
                            SetProgramDetailsForScreen(this.BindingListProgrammeParticulars);

                        }
                        else
                        {
                            model.BindingListProgrammeParticulars = null;
                        }
                        model.DMVo.HistoryDetails = _presenter.GetHistoryDetails(model.DMVo);
                        if (model.DMVo.HistoryDetails.Count > 0)
                        {
                            model.BindingListHistoryDetails = model.DMVo.HistoryDetails;
                        }
                        model.DMVo = _presenter.SearchDealMemoLanguageDetails(model.DMVo);
                        if (resultVo.Messages != null)
                        {
                            this.DMVo = new DealMemoVO();
                            this.DMVo.Messages = resultVo.Messages;
                        }
                        this.ApplicationMessage = "Transaction completed successfully.";
                        saveSuccess = true;
                    }
                    else
                    {
                        if (resultVo.Messages != null)
                        {
                            this.DMVo = new DealMemoVO();
                            this.DMVo.Messages = resultVo.Messages;
                        }
                        this.ApplicationMessage = "InternalError :" + "Transaction could not be saved due to some Exception.";
                        saveSuccess = false;
                    }
                }
                else
                {
                    this.ApplicationMessage = "DBError :" + "Transaction could not be saved due to some Exception.";
                    saveSuccess = false;
                }
            }
            catch(Exception ex)
            {
                this.ApplicationMessage = "Internal error:" + ex.ToString();
                saveSuccess = false;
            }
            return saveSuccess;
        }


        #region ContextMenu

        public bool contextMenuCheck(string DMNumber, int SelectedProgId)
        {
            this.ApplicationMessage = string.Empty;
            DealMemoVO resultVO = new DealMemoVO();
            resultVO.DMNumber_Search = DMNumber;
            resultVO = _presenter.GetDealMemoSearchResult(resultVO)[0];
            resultVO = _presenter.SearchDealMemoDetails(resultVO);
            if (resultVO.ProgrammeDetails != null && resultVO.ProgrammeDetails.Count > 0)
            {
                foreach (ProgrammeVO programmeVO in resultVO.ProgrammeDetails)
                {
                    programmeVO.strTotalPrice = programmeVO.TotalPrice.ToString();
                    if (programmeVO.LicenseeAllocationData != null && programmeVO.LicenseeAllocationData.Count > 0)
                    {
                        foreach (LicenseeAllocationVO LicenseeVO in programmeVO.LicenseeAllocationData)
                        {
                            LicenseeVO.strAllocation = LicenseeVO.Allocation.ToString();
                        }
                    }
                    if (programmeVO.CatchUpLicenseeAllocationVOList != null && programmeVO.CatchUpLicenseeAllocationVOList.Count > 0)
                    {
                        foreach (CatchUpLicenseeAllocationVO CatchUpVOLicenseeVO in programmeVO.CatchUpLicenseeAllocationVOList)
                        {
                            CatchUpVOLicenseeVO.strAllocation = CatchUpVOLicenseeVO.Allocation.ToString();
                        }
                    }
                }
            }

            // Checks if Language and Territory Data is present or not.
            if (!DisplayWarningForTerritoryAndLanguages(resultVO))
            {
                return false;
            }

            // This function displays Allocations Warnings.          
            if (!DisplayWarningAllocations(resultVO, SelectedProgId))
            {
                return false;
            }
            if (resultVO.ProgrammeDetails != null)
            {
                if (resultVO.ProgrammeDetails.Count > 0)
                {
                    for (int i = 0; i < resultVO.ProgrammeDetails.Count; i++)
                    {
                        var PrgVOId = resultVO.ProgrammeDetails[i].Id;
                        if (!DisplayWarningAllocations(resultVO, PrgVOId))
                        {
                            return false;
                        }
                    }
                }
            }

            // Checks if total payment is less then Deal Memo price.
            if (!DisplayWarningPayments(resultVO))
            {
                return false;
            }

            resultVO = _presenter.CheckDealMemoSign(resultVO);
            //success
            if (resultVO != null)
            {
                if (!string.IsNullOrEmpty(resultVO.Check_Output) && resultVO.Check_Output!="null")
                {
                    this.ApplicationMessage = resultVO.Check_Output;
                    return true;
                }
                else
                {
                    if (resultVO.Messages != null)
                    {
                        this.DMVo = new DealMemoVO();
                        this.DMVo.Messages = resultVO.Messages;
                        this.ApplicationMessage = "Check Failed";
                        return false;
                    }
                    else
                    {
                        this.ApplicationMessage = "Check Failed";
                        return false;
                    }
                }
            }
            return true;
        }
        public bool contextMenuBudget(string DMNumber)
        {
            bool BudgetResult = false;
            this.ApplicationMessage = string.Empty;
            DealMemoVO resultVO = new DealMemoVO();
            resultVO.DMNumber_Search = DMNumber;
            resultVO = _presenter.GetDealMemoSearchResult(resultVO)[0];
            resultVO = _presenter.SearchDealMemoDetails(resultVO);
            try
            {
                if (!this.IsMaxChaValid(resultVO))
                {
                    return false;
                }
                if (resultVO.AmortMethod == "D")
                {
                    if (!IsCostedRunsValid(resultVO))
                        return false;
                }
                DealMemoVO returnedVo = new DealMemoVO();
                returnedVo = _presenter.ChangeDealMemoStatus(resultVO, resultVO.DMNumber, "BUDGET");
                if (returnedVo != null)
                {
                    //success
                    if (!string.IsNullOrEmpty(returnedVo.Check_Output) && returnedVo.Check_Output!="null")
                    {
                        this.DMVo = new DealMemoVO();
                        this.DMVo = returnedVo;
                        this.DMVo.HistoryDetails = _presenter.GetHistoryDetails(this.DMVo);
                        this.ApplicationMessage = returnedVo.Check_Output;
                        BudgetResult = true;
                    }
                    else
                    {
                        if (resultVO.Messages != null)
                        {
                            this.DMVo = new DealMemoVO();
                            this.DMVo.Messages = resultVO.Messages;
                            this.ApplicationMessage = "Changing status to BUDGETED failed";
                        }
                        else
                        {
                            this.ApplicationMessage = "Changing status to BUDGETED failed";
                        }
                    }
                    if (!string.IsNullOrEmpty(returnedVo.Status))
                    {
                        if (returnedVo.Status != "null")
                        {
                            this.DMVo_Status = returnedVo.Status;


                            //if (textStatus.Text == "BUDGETED")
                            //{
                            //    DisableProgrammeTabDealMemoGrids();
                            //    tabItemPayment.IsEnabled = false;
                            //    tabItemTerritory.IsEnabled = false;
                            //    // user can edit the deal memo and save
                            //    buttonEditDealMemo.IsEnabled = true;
                            //    buttonSave.IsEnabled = true;
                            //}
                        }
                    }
                }
                return BudgetResult;
            }
            catch 
            {
                return BudgetResult;
            }
        }
        public bool contextMenuUnBudget(string DMNumber)
        {
            bool UnBudgetResult = false;
            this.ApplicationMessage = string.Empty;
            DealMemoVO resultVO = new DealMemoVO();
            resultVO.DMNumber_Search = DMNumber;
            resultVO = _presenter.GetDealMemoSearchResult(resultVO)[0];
            DealMemoVO returnedVo = new DealMemoVO();
            try
            {
                //Clear out the previous message if present
                returnedVo = _presenter.ChangeDealMemoStatus(resultVO,resultVO.DMNumber, "UNBUDGET");
                if (returnedVo != null)
                {
                    if (!string.IsNullOrEmpty(returnedVo.Check_Output) && returnedVo.Check_Output!="null")
                    {
                        this.DMVo = new DealMemoVO();
                        this.DMVo = returnedVo;
                        this.DMVo.HistoryDetails = _presenter.GetHistoryDetails(this.DMVo);
                        this.ApplicationMessage = returnedVo.Check_Output;
                        UnBudgetResult = true;
                    }
                    else
                    {
                        if (resultVO.Messages != null)
                        {
                            this.DMVo = new DealMemoVO();
                            this.DMVo.Messages = resultVO.Messages;
                            this.ApplicationMessage = "UNBUDGET failed";
                        }
                        else
                        {
                            this.ApplicationMessage = "UNBUDGET failed";
                        }
                    }
                    if (!string.IsNullOrEmpty(returnedVo.Status))
                    {
                        if (returnedVo.Status != "null")
                        {
                            this.DMVo_Status =returnedVo.Status;
                        }
                    }
                }
                return UnBudgetResult;
            }
            catch 
            {
                return UnBudgetResult;
            }
        }
        public bool contextMenuSignBuyer(string DMNumber)
        {
            bool SignBuyerResult=false;
            this.ApplicationMessage = string.Empty;
            DealMemoVO resultVO = new DealMemoVO();
            resultVO.DMNumber_Search = DMNumber;
            resultVO = _presenter.GetDealMemoSearchResult(resultVO)[0];
            resultVO = _presenter.SearchDealMemoDetails(resultVO);
            if (resultVO.ProgrammeDetails != null && resultVO.ProgrammeDetails.Count > 0)
            {
                foreach (ProgrammeVO programmeVO in resultVO.ProgrammeDetails)
                {
                    programmeVO.strTotalPrice = programmeVO.TotalPrice.ToString();
                    if (programmeVO.LicenseeAllocationData != null && programmeVO.LicenseeAllocationData.Count > 0)
                    {
                        foreach (LicenseeAllocationVO LicenseeVO in programmeVO.LicenseeAllocationData)
                        {
                            LicenseeVO.strAllocation = LicenseeVO.Allocation.ToString();
                        }
                    }
                    if (programmeVO.CatchUpLicenseeAllocationVOList != null && programmeVO.CatchUpLicenseeAllocationVOList.Count > 0)
                    {
                        foreach (CatchUpLicenseeAllocationVO CatchUpVOLicenseeVO in programmeVO.CatchUpLicenseeAllocationVOList)
                        {
                            CatchUpVOLicenseeVO.strAllocation = CatchUpVOLicenseeVO.Allocation.ToString();
                        }
                    }
                }
            }
            try
            {

                // Checks if Language and Territory Data is present or not.
                if (!DisplayWarningForTerritoryAndLanguages(resultVO))
                {
                    return false;
                }

                // This function displays Allocations Warnings.          
                //if (!DisplayWarningAllocations())
                //{
                //    return false;
                //}
                if (resultVO.ProgrammeDetails != null)
                {
                    if (resultVO.ProgrammeDetails.Count > 0)
                    {
                        for (int i = 0; i < resultVO.ProgrammeDetails.Count; i++)
                        {
                            var PrgVOId = resultVO.ProgrammeDetails[i].Id;
                            if (!DisplayWarningAllocations(resultVO, PrgVOId))
                            {
                                return false;
                            }
                        }
                    }
                }
                // Checks if total payment is less then Deal Memo price.
                if (!DisplayWarningPayments(resultVO))
                {
                    return false;
                }

                //PB.CR: Sanjeevani_20121102 : Start : Validation for max cha 
                if (!this.IsMaxChaValid(resultVO))
                {
                    return false;
                }
             
                if (resultVO.AmortMethod == "D")
                {
                    if (!IsValidProgrammeType(resultVO))
                        return false;

                    if (!IsCostedRunsValid(resultVO))
                        return false;
                }

                DealMemoVO returnedVo = new DealMemoVO();
               returnedVo = _presenter.ChangeDealMemoStatus(resultVO,resultVO.DMNumber, "SIGNB");
                if (returnedVo != null)
                {
                    if (!string.IsNullOrEmpty(returnedVo.Check_Output) && returnedVo.Check_Output!="null")
                    {
                        if (returnedVo.Status.Equals("SIGNEDB"))
                        {
                            if (resultVO.SignQARequired == "YES")
                                //DisableProgrammeTabDealMemoGrids();
                                this.DMVO_SignQARequired = "YES";
                            else
                                this.DMVO_SignQARequired = "NO";
                            // EnableProgrammeTabDealMemoGrids();
                        }
                        this.DMVo = new DealMemoVO();
                        this.DMVo = returnedVo;
                        this.DMVo.HistoryDetails = _presenter.GetHistoryDetails(this.DMVo);
                        this.ApplicationMessage = returnedVo.Check_Output;
                        SignBuyerResult = true;
                    }
                    else 
                    {
                        if (returnedVo.Messages != null && returnedVo.Messages.Count>0)
                        {
                            this.DMVo = new DealMemoVO();
                            this.DMVo.Messages = returnedVo.Messages;
                            this.ApplicationMessage = "SIGN BUYER failed";
                        }
                        else
                        {
                            this.ApplicationMessage = "SIGN BUYER failed";
                        }
                    }
                }
                if (!string.IsNullOrEmpty(returnedVo.Status))
                {
                    if (returnedVo.Status != "null")
                    {
                        this.DMVo_Status = returnedVo.Status;
                       // textStatus.Text = this.DMVo.Status;
                    }
                }
                return SignBuyerResult;
            }
            catch 
            {
                return SignBuyerResult;
            }
        }
        public bool contextMenuUnSignBuyer(string DMNumber)
        {
            bool UnSignBuyerResult = false;
            this.ApplicationMessage = string.Empty;
            try
            {

                DealMemoVO returnedVo = new DealMemoVO();
               returnedVo = _presenter.ChangeDealMemoStatus(int.Parse(DMNumber), "UNSIGN");
                if (returnedVo != null)
                {
                    if (!string.IsNullOrEmpty(returnedVo.Check_Output) && returnedVo.Check_Output != "null")
                    {
                        this.DMVo = new DealMemoVO();
                        this.DMVo = returnedVo;
                        this.DMVo.HistoryDetails = _presenter.GetHistoryDetails(this.DMVo);
                        this.ApplicationMessage = returnedVo.Check_Output;
                        UnSignBuyerResult = true;
                        // if the previous status was signed buyer, current status will be signed registered
                        if (returnedVo.Status == "REGISTERED")
                        {
                            // user can edit the deal memo and save
                            // EnableProgrammeTabDealMemoGrids();
                        }
                    }
                    else
                    {
                        if (returnedVo.Messages != null && returnedVo.Messages.Count > 0)
                        {
                            this.DMVo = new DealMemoVO();
                            this.DMVo.Messages = returnedVo.Messages;
                            this.ApplicationMessage = "UNSIGN BUYER failed";
                        }
                        else
                        {
                            this.ApplicationMessage = "UNSIGN BUYER failed";
                        }
                    }
                    if (!string.IsNullOrEmpty(returnedVo.Status))
                    {
                        if (returnedVo.Status != "null")
                        {
                            this.DMVo_Status = returnedVo.Status;
                        }
                    }
                }
                return UnSignBuyerResult;
            }
            catch 
            {
                return UnSignBuyerResult;
            }
        }
        // This function displays Territories and Language Warnings if data for it is not present.
        private bool DisplayWarningForTerritoryAndLanguages(DealMemoVO resultVO)
        {
            bool valid = true;
            if (resultVO.ProgrammeDetails != null)
            {
                if (resultVO.ProgrammeDetails.Count == 0)
                {
                    this.ApplicationMessage = "Programme Information is required before Signing the Deal.";
                    valid = false;
                    return valid;
                }
                else if (resultVO.ProgrammeDetails.Exists(n => n.Title == null || n.Title == string.Empty))
                {
                    this.ApplicationMessage = "Programme Title is required before Signing the Deal.";
                    valid = false;
                    return valid;
                }
                else if (resultVO.ProgrammeDetails.Exists(n => n.Type == null || n.Type == string.Empty))
                {
                    this.ApplicationMessage = "Programme Type is required before Signing the Deal.";
                    valid = false;
                    return valid;
                }
            }

            if (resultVO.Status != "BUDGETED")
            {
                if (resultVO.LanguageDetails != null)
                {
                    if (resultVO.LanguageDetails.Count == 0 && resultVO.Type != "CPD" && resultVO.Type != "ROY")
                    {
                        this.ApplicationMessage = "Language Information is required before Signing the Deal.";
                        valid = false;
                        return valid;
                    }
                }
                if (resultVO.TerritoryDetails != null)
                {
                    if (resultVO.TerritoryDetails.Count == 0 && resultVO.Type != "CPD" && resultVO.Type != "ROY")
                    {
                        this.ApplicationMessage = "Territory Information is required before Signing the Deal.";
                        valid = false;
                        return valid;
                    }
                }
            }
            return valid;
        }
        // This function displays Allocations Warnings.
        private bool DisplayWarningAllocations(DealMemoVO resultVO, int SelectedProgId)
        {
            try
            {
                bool valid = true;
                bool validruns = true;
                this.BindingListProgrammeParticulars = resultVO.ProgrammeDetails;

                #region Check where DM Type is ROY
                if (this.BindingListProgrammeParticulars != null)
                {
                    if (resultVO.Type == "ROY")
                    {
                        foreach (ProgrammeVO programmeVO in this.BindingListProgrammeParticulars)
                        {
                            if (programmeVO.strTotalPrice == null)
                            {
                                programmeVO.strTotalPrice = "0.0000";
                            }
                            if (!string.IsNullOrEmpty(programmeVO.strTotalPrice) && programmeVO.LicenseeAllocationData != null)
                            {
                                if (programmeVO.LicenseeAllocationData.Count > 0 && !string.IsNullOrEmpty(programmeVO.strTotalPrice))
                                {
                                    if (programmeVO.LicenseeAllocationData.Exists(l => l.Allocation != Convert.ToDouble(programmeVO.strTotalPrice)))
                                    {
                                        this.ApplicationMessage = "WARNING : Price-per-subscriber inconsistent for " + programmeVO.Title;
                                        valid = false;
                                        return valid;
                                    }
                                }
                            }
                        }
                    }
                }

                #endregion

                #region Check where DM Type is FLF

                if (this.BindingListProgrammeParticulars != null)
                {

                    if (resultVO.Type == "FLF")
                    {
                        double totalAllocation = 0.0;
                        List<LicenseeAllocationVO> BindingListLicenseeAllocation = new List<LicenseeAllocationVO>();
                        BindingListLicenseeAllocation = (from ProgramVOList in this.BindingListProgrammeParticulars
                                                         where ProgramVOList.Id == SelectedProgId
                                                         select ProgramVOList.LicenseeAllocationData).FirstOrDefault();
                        if (BindingListLicenseeAllocation != null)
                        {
                            for (int i = 0; i < BindingListLicenseeAllocation.Count; i++)
                            {
                                if (BindingListLicenseeAllocation[i].strAllocation == null)
                                {
                                    BindingListLicenseeAllocation[i].strAllocation = "0.0000";
                                }
                                if (BindingListLicenseeAllocation[i].strAllocation != null)
                                {
                                    totalAllocation += Convert.ToDouble(BindingListLicenseeAllocation[i].strAllocation);
                                }
                            }
                        }
                        List<CatchUpLicenseeAllocationVO> BindingListCatchUpLicenseeAllocation = new List<CatchUpLicenseeAllocationVO>();
                        BindingListCatchUpLicenseeAllocation = (from ProgramVOList in this.BindingListProgrammeParticulars
                                                                where ProgramVOList.Id == SelectedProgId
                                                                select ProgramVOList.CatchUpLicenseeAllocationVOList).FirstOrDefault();
                        if (BindingListCatchUpLicenseeAllocation != null)
                        {
                            for (int i = 0; i < BindingListCatchUpLicenseeAllocation.Count; i++)
                            {
                                if (BindingListCatchUpLicenseeAllocation[i].strAllocation == null)
                                {
                                    BindingListCatchUpLicenseeAllocation[i].strAllocation = "0.0000";
                                }
                                if (BindingListCatchUpLicenseeAllocation[i].strAllocation != null)
                                {
                                    totalAllocation += Convert.ToDouble(BindingListCatchUpLicenseeAllocation[i].strAllocation);
                                }
                            }
                        }
                        ProgrammeVO proramme = (from ProgramVOList in this.BindingListProgrammeParticulars
                                                where ProgramVOList.Id == SelectedProgId
                                                select ProgramVOList).FirstOrDefault();
                        if (totalAllocation != Convert.ToDouble(proramme.strTotalPrice))
                        {
                            this.ApplicationMessage = "WARNING : Price-per-subscriber inconsistent for " + proramme.Title;
                            valid = false;
                            return valid;
                        }
                    }
                }
                
                #endregion

                #region Check where DM Type is CPD

                if (this.BindingListProgrammeParticulars != null)
                {
                    if (resultVO.Type == "CPD")
                    {
                        foreach (ProgrammeVO programmeVO in this.BindingListProgrammeParticulars)
                        {
                            if (programmeVO.LicenseeAllocationData == null || programmeVO.LicenseeAllocationData.Count == 0)
                            {
                                this.ApplicationMessage = "Warning : " + programmeVO.Title + " does not contain any License Allocations. ";
                                valid = false;
                                return valid;
                            }
                        }
                    }
                }
                #endregion


                if (this.BindingListProgrammeParticulars != null)
                {
                    if (resultVO.Type == "CPD")
                    {
                        foreach (ProgrammeVO programmeVO in this.BindingListProgrammeParticulars)
                        {
                            if (programmeVO.CatchUpLicenseeAllocationVOList == null || programmeVO.CatchUpLicenseeAllocationVOList.Count == 0)
                            {
                                this.ApplicationMessage = "Warning : " + programmeVO.Title + " does not contain any Catch-up License Allocations. ";
                                valid = false;
                                return valid;
                            }
                        }
                    }
                }

                if (!string.IsNullOrEmpty(this.ApplicationMessage))
                {
                    valid = false;
                }
                else
                {
                    validruns = DisplayWarningForRuns(resultVO, SelectedProgId);
                    if (validruns == false)
                        valid = validruns;
                }
                return valid;
            }
            catch
            {
                return false;
            }
        }
        // This function displays Runs Per Channel Warnings.
        private bool DisplayWarningForRuns(DealMemoVO resultVO, int SelectedProgId)
        {
            try
            {
                bool valid = true;
                this.BindingListProgrammeParticulars = resultVO.ProgrammeDetails;
                if (resultVO.AmortMethod=="D")
                {
                    ProgrammeVO program = new ProgrammeVO();
                    program = (from ProgramVOList in this.BindingListProgrammeParticulars
                               where ProgramVOList.Id == SelectedProgId
                               select ProgramVOList).FirstOrDefault();
                    if (program!= null)
                    {
                        if (program.strTotalPrice == null)
                        {
                            program.strTotalPrice = "0.0000";
                        }
                        if (!string.IsNullOrEmpty(program.strTotalPrice) && program.LicenseeAllocationData != null)
                        {
                            if (program.LicenseeAllocationData.Count > 0)
                            {
                                foreach (LicenseeAllocationVO licenseeAllocationVO in program.LicenseeAllocationData)
                                {
                                    if (licenseeAllocationVO.RunsPerChannelData != null)
                                    {
                                        if (licenseeAllocationVO.RunsPerChannelData.Count == 0)
                                        {
                                            this.ApplicationMessage = "ERROR : At least one channel must be specified for channel " + "\n" + "runs on programme " + program.Title + " for licensee " + licenseeAllocationVO.Licesee;
                                            valid = false;
                                            return valid;
                                        }
                                        else if (resultVO.AmortMethod == "D" && resultVO.Type == "ROY" && licenseeAllocationVO.RunsPerChannelData.Count(a => a.Cost == true) == 0)
                                        {
                                            if (licenseeAllocationVO.strAllocation != string.Empty && Convert.ToDouble(licenseeAllocationVO.strAllocation) > 0)
                                            {
                                                this.ApplicationMessage = "ERROR : At least one channel must be specified for costing on" + "\n" + " programme " + program.Title + " for licensee " + licenseeAllocationVO.Licesee;
                                                valid = false;
                                                break;
                                            }

                                            if (licenseeAllocationVO.strAllocation != string.Empty && Convert.ToDouble(licenseeAllocationVO.strAllocation) == 0 && licenseeAllocationVO.Cost_Runs > 0)
                                            {
                                                this.ApplicationMessage = "ERROR : At least one channel must be specified for costing on" + "\n" + " programme " + program.Title + " for licensee " + licenseeAllocationVO.Licesee;
                                                valid = false;
                                                return valid;
                                            }
                                        }
                                        else if (resultVO.AmortMethod == "D" && resultVO.Type == "FLF" && licenseeAllocationVO.RunsPerChannelData.Count(a => a.Cost == true) == 0)
                                        {
                                            if (licenseeAllocationVO.strAllocation != string.Empty && Convert.ToDouble(licenseeAllocationVO.strAllocation) > 0)
                                            {
                                                this.ApplicationMessage = "ERROR : At least one channel must be specified for costing on" + "\n" + " programme " + programmeVO.Title + " for licensee " + licenseeAllocationVO.Licesee;
                                                valid = false;
                                                return valid;
                                            }

                                            if (licenseeAllocationVO.strAllocation != string.Empty && Convert.ToDouble(licenseeAllocationVO.strAllocation) == 0 && licenseeAllocationVO.Cost_Runs > 0)
                                            {
                                                this.ApplicationMessage = "ERROR : At least one channel must be specified for costing on" + "\n" + " programme " + program.Title + " for licensee " + licenseeAllocationVO.Licesee;
                                                valid = false;
                                                return valid;
                                            }
                                        }
                                        else if (resultVO.AmortMethod == "D" && resultVO.Type == "FLF" && licenseeAllocationVO.RunsPerChannelData.Count(a => a.Cost == true) == 0)
                                        {
                                            if (licenseeAllocationVO.strAllocation != string.Empty && Convert.ToDouble(licenseeAllocationVO.strAllocation) > 0)
                                            {
                                                this.ApplicationMessage = "ERROR : At least one channel must be specified for costing on" + "\n" + " programme " + program.Title + " for licensee " + licenseeAllocationVO.Licesee;
                                                valid = false;
                                                return valid;
                                            }

                                            if (licenseeAllocationVO.strAllocation != string.Empty && Convert.ToDouble(licenseeAllocationVO.strAllocation) == 0 && licenseeAllocationVO.Cost_Runs > 0)
                                            {
                                                this.ApplicationMessage = "ERROR : At least one channel must be specified for costing on" + "\n" + " programme " + program.Title + " for licensee " + licenseeAllocationVO.Licesee;
                                                valid = false;
                                                return valid;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return valid;
            }
            catch 
            {
                return false;
            }
        }
        private bool IsMaxChaValid(DealMemoVO resultVO)
        {
            this.ApplicationMessage = String.Empty;
            List<ProgrammeVO> BindingListProgrammeParticulars = new List<ProgrammeVO>();
            BindingListProgrammeParticulars = resultVO.ProgrammeDetails;
            if (resultVO.AmortMethod.ToUpper() == "D")
            {
                string licensee = string.Empty;
                string programme = string.Empty;

                if (BindingListProgrammeParticulars != null && BindingListProgrammeParticulars.Count > 0)
                {
                    for (int i = 0; i < BindingListProgrammeParticulars.Count; i++)
                    {
                        if (BindingListProgrammeParticulars[i].LicenseeAllocationData != null && BindingListProgrammeParticulars[i].LicenseeAllocationData.Count > 0)
                        {
                            for (int j = 0; j < BindingListProgrammeParticulars[i].LicenseeAllocationData.Count; j++)
                            {
                                if (BindingListProgrammeParticulars[i].LicenseeAllocationData[j].Max_channel_Number == null
                                    && BindingListProgrammeParticulars[i].LicenseeAllocationData[j].RunsPerChannelData.Exists(c => c.Max_channel_Number == null))
                                {
                                    licensee = this.BindingListProgrammeParticulars[i].LicenseeAllocationData[j].Licesee;
                                    programme = this.BindingListProgrammeParticulars[i].Title;
                                    this.ApplicationMessage = "Max cha is required for licensee '" + licensee + "' of programme '" + programme + "' either at Licensee level or Channel Level.";
                                    return false;
                                }
                            }
                        }
                    }
                }
                if (this.ApplicationMessage!=String.Empty)
                {
                    return false;
                }
                else
                    return true;
            }
            else
                return true;

        }
        private bool IsValidProgrammeType(DealMemoVO resultVO)
        {
            this.ApplicationMessage = string.Empty;
            string programme = string.Empty;
            bool isProgCatNA = false;
            List<ProgrammeVO> BindingListProgrammeParticulars = new List<ProgrammeVO>();
            BindingListProgrammeParticulars = resultVO.ProgrammeDetails;
            try
            {
                for (int i = 0; i < BindingListProgrammeParticulars.Count; i++)
                {
                    //Project Bioscope: Added by Nilesh_20120524 for CR: 56106
                    if (!string.IsNullOrEmpty(BindingListProgrammeParticulars[i].CategoryCode) &&
                        BindingListProgrammeParticulars[i].CategoryCode.ToUpper() == "NA")
                    {
                        isProgCatNA = true;
                        break;
                    }
                    if (!string.IsNullOrEmpty(BindingListProgrammeParticulars[i].CategoryCode) &&
                        !string.IsNullOrEmpty(BindingListProgrammeParticulars[i].BOCategory) &&
                        BindingListProgrammeParticulars[i].CategoryCode.ToUpper() != "NA" &&
                        BindingListProgrammeParticulars[i].BOCategory.ToUpper() == "NA")
                    {
                        this.ApplicationMessage = "The BO Category for '" + BindingListProgrammeParticulars[i].Title + "' cannot be 'NA'.";
                        return false;
                    }
                    //Project Bioscope: Added by Nilesh_20120524 for CR: 56106: End

                    programme = BindingListProgrammeParticulars[i].Title;
                    //Project Bioscope: Modified by Nilesh_20120524 for CR: 56106
                    if (BindingListProgrammeParticulars[i].Type == "TV" || BindingListProgrammeParticulars[i].Type.Equals("LIB"))
                    {
                        if (string.IsNullOrEmpty(BindingListProgrammeParticulars[i].CategoryCode))
                        {
                            this.ApplicationMessage = "The programme category is missing for '" + programme + "'.";
                            return false;
                        }
                        if (string.IsNullOrEmpty(BindingListProgrammeParticulars[i].BORevenueUSD.ToString()) &&
                            !string.IsNullOrEmpty(BindingListProgrammeParticulars[i].CategoryCode) &&
                             BindingListProgrammeParticulars[i].CategoryCode.ToUpper() != "NA")
                        {
                            this.ApplicationMessage="The BO Revenue (USD) cannot be empty for '" + programme + "'.";
                            return false;
                        }
                    }
                    else if (BindingListProgrammeParticulars[i].Type.Equals("FEA"))
                    {
                        if (string.IsNullOrEmpty(BindingListProgrammeParticulars[i].CategoryCode) && string.IsNullOrEmpty(BindingListProgrammeParticulars[i].BOCategory))
                        {
                            this.ApplicationMessage = "The Programme Category and BO Category is missing for '" + programme + "'.";
                            return false;
                        }
                        else if (string.IsNullOrEmpty(BindingListProgrammeParticulars[i].CategoryCode))
                        {
                            this.ApplicationMessage = "The programme category is missing for '" + programme + "'.";
                            return false;
                        }
                        else if (string.IsNullOrEmpty(BindingListProgrammeParticulars[i].BOCategory) &&
                            !string.IsNullOrEmpty(BindingListProgrammeParticulars[i].CategoryCode) &&
                                 BindingListProgrammeParticulars[i].CategoryCode.ToUpper() != "NA")
                        {
                            this.ApplicationMessage = "The BO Category is missing for '" + programme + "'.";
                            return false;
                        }

                        if (string.IsNullOrEmpty(BindingListProgrammeParticulars[i].BORevenueUSD.ToString()) &&
                            !string.IsNullOrEmpty(BindingListProgrammeParticulars[i].CategoryCode) &&
                         BindingListProgrammeParticulars[i].CategoryCode.ToUpper() != "NA")
                        {
                            this.ApplicationMessage = "The BO Revenue (USD) cannot be empty for '" + programme + "'.";
                            return false;
                        }
                        else if ((BindingListProgrammeParticulars[i].BORevenueUSD.ToString() == "0.0" ||
                            (BindingListProgrammeParticulars[i].BORevenueUSD.ToString() == "0")) &&
                            !string.IsNullOrEmpty(BindingListProgrammeParticulars[i].CategoryCode) &&
                         BindingListProgrammeParticulars[i].CategoryCode.ToUpper() != "NA")
                        {
                            this.ApplicationMessage = "The BO Revenue (USD) cannot be zero for '" + programme + "'.";
                            return false;
                        }
                    }
                }
                if (isProgCatNA)
                    return true;
                if (this.ApplicationMessage!=string.Empty)
                {
                    return false;
                }
                else
                    return true;
            }
            catch (Exception ex)
            {
                return false;
            }


        }
        private bool IsCostedRunsValid(DealMemoVO resultVO)
        {
            this.ApplicationMessage = string.Empty;
            if (resultVO.AmortMethod.ToUpper() == "D")
            {
                int costed = 0;
                string licensee = string.Empty;
                string programme = string.Empty;
                List<ProgrammeVO> BindingListProgrammeParticulars = new List<ProgrammeVO>();
                BindingListProgrammeParticulars = resultVO.ProgrammeDetails;
                for (int i = 0; i < BindingListProgrammeParticulars.Count; i++)
                {
                    for (int j = 0; j < BindingListProgrammeParticulars[i].LicenseeAllocationData.Count; j++)
                    {
                        for (int k = 0; k < BindingListProgrammeParticulars[i].LicenseeAllocationData[j].RunsPerChannelData.Count; k++)
                        {
                            if (BindingListProgrammeParticulars[i].LicenseeAllocationData[j].RunsPerChannelData[k].CostingRuns != null
                                && !String.IsNullOrEmpty(BindingListProgrammeParticulars[i].LicenseeAllocationData[j].RunsPerChannelData[k].CostingRuns.ToString()))
                            {
                                costed += BindingListProgrammeParticulars[i].LicenseeAllocationData[j].RunsPerChannelData[k].CostingRuns.Value;
                            }
                        }
                        if (BindingListProgrammeParticulars[i].LicenseeAllocationData[j].Cost_Runs != costed)
                        {
                            if ((BindingListProgrammeParticulars[i].Type == "FEA" || BindingListProgrammeParticulars[i].Type == "LIB" || BindingListProgrammeParticulars[i].Type == "TV")
                                && BindingListProgrammeParticulars[i].LicenseeAllocationData[j].IsBioscopeLicensee.Equals("Y"))
                            {

                                licensee = BindingListProgrammeParticulars[i].LicenseeAllocationData[j].Licesee;
                                programme = BindingListProgrammeParticulars[i].Title;
                                this.ApplicationMessage = "The sum of costed runs on channels do not match with the cost runs of licensee '" + licensee + "' of programme '" + programme + "'.";
                                return false;
                            }

                        }
                        costed = 0;
                    }
                }
                if (this.ApplicationMessage!=string.Empty)
                {
                    return false;
                }
                else
                    return true;
            }
            else
                return true;

        }

        #region This function displays Payment warnings.
        private bool DisplayWarningPayments(DealMemoVO resultVO)
        {
            bool valid = true;
            string paymessage = string.Empty;
            double sumAmount = 0.0;
            List<PaymentVO> BindingListPayment=new List<PaymentVO>();
            BindingListPayment = resultVO.PaymentDetails;
            if (BindingListPayment != null)
            {
                for (int i = 0; i < BindingListPayment.Count; i++)
                {
                    sumAmount += BindingListPayment[i].PersistFlag == PersistFlagEnum.Deleted ? 0.0 : BindingListPayment[i].Amount;
                }
            }

            sumAmount = Convert.ToDouble(sumAmount.ToString("N4"));

            if (resultVO.PaymentDetails != null && !string.IsNullOrEmpty(resultVO.MemoPrice.ToString()))
            {
                // Added in Case of CPD - SS
                if (resultVO.Type != null)
                {
                    if (Convert.ToDouble(resultVO.MemoPrice.ToString()) > 0 && resultVO.Type == "CPD")
                    {
                        if (this.DMVo.PaymentDetails.Count == 0)
                        {
                            this.ApplicationMessage = "Payment Information is required before Signing the Deal.";
                            valid = false;
                            return valid;
                        }
                    }
                }
                // Added in case of ROY - MNet
                if (resultVO.Type != null)
                {
                    if (resultVO.PaymentDetails.Count == 0 && Convert.ToDouble(resultVO.MemoPrice.ToString()) != 0 && resultVO.Type != "ROY")
                    {

                        if (resultVO.Status.ToUpper() != "BUDGETED".ToUpper() && resultVO.Status.ToUpper() != "BEXECUTED".ToUpper())
                        {
                            this.ApplicationMessage="Payment Information is required before Signing the Deal.";
                            valid = false;
                            return valid;
                        }
                    }
                }
            }

            if (BindingListPayment != null)
            {
                if (resultVO.Type != "ROY")
                {
                    if (BindingListPayment.Count > 0 && !string.IsNullOrEmpty(resultVO.MemoPrice.ToString()))
                    {
                        if (resultVO.MemoPrice > sumAmount)
                        {
                            paymessage = " Payments are " + (resultVO.MemoPrice - sumAmount).ToString() + " " + resultVO.Currency + " less than Deal Memo value.";
                            valid = false;
                        }
                        else if (resultVO.MemoPrice < sumAmount)
                        {
                            paymessage = "The total scheduled payments cannot be more than the total deal price.";
                            valid = false;
                        }
                    }
                    if (!string.IsNullOrEmpty(paymessage))
                    {
                        this.ApplicationMessage = paymessage + "The Fee payments do not add up to the Flat Fee Costs.";
                        return valid;
                    }
                }
            }

            return valid;
        }

        #endregion

        #endregion ContextMenu


        #endregion

        # region Language Tab

        public List<IDValPair> SuppliedBy()
        {
            List<IDValPair> suppliedBy = new List<IDValPair>();
            suppliedBy.Add(new IDValPair("L", "Licensee"));
            suppliedBy.Add(new IDValPair("S", "Supplier"));
            return suppliedBy;
        }
        public List<IDValPair> SupplierUserCost()
        {
            List<IDValPair> supplierUserCost = new List<IDValPair>();
            supplierUserCost.Add(new IDValPair("C", "Cost"));
            supplierUserCost.Add(new IDValPair("H", "Half-Cost"));
            supplierUserCost.Add(new IDValPair("O", "Other"));
            return supplierUserCost;
        }

        private void GetLanguageData()
        {
            this.DMVo = new DealMemoVO();
            //LanguageVO languageVo = new LanguageVO();
            //languageVo.LanguageName = "";
            this.DMVo.LanguageDetails = new List<LanguageVO>();
            //this.DMVo.LanguageDetails.Add(languageVo);
        }
        public void GetLanguageData(string dmNumber)
        {
            if ((!string.IsNullOrEmpty(dmNumber)) && dmNumber != "0" && dmNumber != "null")
            {
                this.DMVo = getDMVo(dmNumber);
                this.DMVo = _presenter.SearchDealMemoLanguageDetails(this.DMVo);
            }
            else
                this.GetLanguageData();
        }
        public void GetDefaultLanguages(string dmNumber)
        {
            if ((!string.IsNullOrEmpty(dmNumber)) && dmNumber != "0" && dmNumber != "null")
            {
                this.DMVo = getDMVo(dmNumber);
                this.DMVo.LanguageDetails = _presenter.SearchDealMemoDefaultLanguageDetails(this.DMVo);
            }
            else
                this.GetLanguageData();
        }

        public DealMemoVO SaveLanguageDetails(List<LanguageVO> Languages, string dmNumber, DealMemoMaintenanceViewModel model)
        {
            this.DMVo = getDMVo(dmNumber);
            this.DMVo = _presenter.GetDealMemoDetails(DMVo);
            if (!string.IsNullOrEmpty(model.DMVo_Currency))
            {
                this.DMVo.Currency = model.DMVo_Currency.ToUpper().Trim();
            }
            if (!string.IsNullOrEmpty(model.DMVo_ContractNo))
            {
                this.DMVo.ContractNo = model.DMVo_ContractNo.ToUpper().Trim();
            }
            if (!string.IsNullOrEmpty(model.TypeComboSelection))
            {
                this.DMVo.Type = model.TypeComboSelection;
            }
            if (!string.IsNullOrEmpty(model.DMVo_LicenseNo))
            {
                this.DMVo.LicenseNo = model.DMVo_LicenseNo.ToUpper().Trim();
            }
            if (!string.IsNullOrEmpty(model.DMVo_ContractEntity))
            {
                this.DMVo.ContractEntity = model.DMVo_ContractEntity.ToUpper().Trim();
            }
            if (!string.IsNullOrEmpty(model.DMVo_MainLicensee))
            {
                this.DMVo.MainLicensee = model.DMVo_MainLicensee.ToUpper().Trim();
            }
            if (!string.IsNullOrEmpty(model.DMVo_AmortMethod))
            {
                this.DMVo.AmortMethod = model.DMVo_AmortMethod.ToUpper().Trim();
                this.DMVo.Align = model.DMVO_Align;
                this.DMVo.Multiplex = model.DMVO_Multiplex;
            }
            this.DMVo.ProgrammeDetails = emptyVo;
            this.DMVo.PersistFlag = PersistFlagEnum.Modified;
            if (Languages != null)
            {
                this.DMVo.LanguageDetails = Languages;
            }
            else
            {
                this.DMVo.LanguageDetails = new List<LanguageVO>();
            }
            this.DMVo.SelectedTab = DealMemoVO.DealMemoTab.Language;
            this.result = _presenter.SaveDealMemoDetails(this.DMVo);
            return this.result;
        }

       
        #endregion

        # region Territory Tab

        public void GetTerritoryData()
        {
            this.DMVo = new DealMemoVO();
            if (DMVo.TerritoryDetails == null)
            {
                //TerritoryVO territoryVo = new TerritoryVO();
                //territoryVo.TerritoryDescription = "";
                //territoryVo.RightsDescription = "";
                this.DMVo.TerritoryDetails = new List<TerritoryVO>();
                //this.DMVo.TerritoryDetails.Add(territoryVo);
            }
        }
        public void GetTerritoryData(string dmNumber)
        {
            if ((!string.IsNullOrEmpty(dmNumber)) && dmNumber != "0" && dmNumber != "null")
            {
                this.DMVo = getDMVo(dmNumber);
                this.DMVo = _presenter.SearchDealMemoTerritoryDetails(this.DMVo);
            }
            else
                this.GetTerritoryData();
        }
        public void GetDefaultTerritories(string dmNumber, string rightsCode)
        {
            if ((!string.IsNullOrEmpty(dmNumber)) && dmNumber != "0" && dmNumber != "null")
            {
                this.DMVo = getDMVo(dmNumber);
                this.DMVo.RightsCode = rightsCode;
                this.DMVo.TerritoryDetails = _presenter.SearchDealMemoDefaultTerritoryDetails(this.DMVo);
            }
            else
                this.GetTerritoryData();
        }
        internal DealMemoVO SaveTerritoryDetails(List<TerritoryVO> Territories, string dmNumber, DealMemoMaintenanceViewModel model)
        {
            this.DMVo = getDMVo(dmNumber);
            this.DMVo = _presenter.GetDealMemoDetails(DMVo);
            if (!string.IsNullOrEmpty(model.DMVo_Currency))
            {
                this.DMVo.Currency = model.DMVo_Currency.ToUpper().Trim();
            }
            if (!string.IsNullOrEmpty(model.DMVo_ContractNo))
            {
                this.DMVo.ContractNo = model.DMVo_ContractNo.ToUpper().Trim();
            }
            if (!string.IsNullOrEmpty(model.TypeComboSelection))
            {
                this.DMVo.Type = model.TypeComboSelection;
            }
            if (!string.IsNullOrEmpty(model.DMVo_LicenseNo))
            {
                this.DMVo.LicenseNo = model.DMVo_LicenseNo.ToUpper().Trim();
            }
            if (!string.IsNullOrEmpty(model.DMVo_ContractEntity))
            {
                this.DMVo.ContractEntity = model.DMVo_ContractEntity.ToUpper().Trim();
            }
            if (!string.IsNullOrEmpty(model.DMVo_MainLicensee))
            {
                this.DMVo.MainLicensee = model.DMVo_MainLicensee.ToUpper().Trim();
            }
            if (!string.IsNullOrEmpty(model.DMVo_AmortMethod))
            {
                this.DMVo.AmortMethod = model.DMVo_AmortMethod.ToUpper().Trim();
                this.DMVo.Align = model.DMVO_Align;
                this.DMVo.Multiplex = model.DMVO_Multiplex;
            }
            this.DMVo.PersistFlag = PersistFlagEnum.Modified;
            this.DMVo.ProgrammeDetails = emptyVo;
            if (Territories != null)
            {
                this.DMVo.TerritoryDetails = Territories;
            }
            else
            {
                this.DMVo.TerritoryDetails = new List<TerritoryVO>();
            }
            this.DMVo.SelectedTab = DealMemoVO.DealMemoTab.Territory;
            this.result = _presenter.SaveDealMemoDetails(this.DMVo);
            return this.result;
        }

        #endregion

        # region Payment Tab

        public void GetPaymentData()
        {
            this.DMVo = new DealMemoVO();

            if (DMVo.PaymentDetails == null)
            {
                PaymentVO paymentVo = new PaymentVO();
                paymentVo.PaymentCode = "";
                paymentVo.DueDateDMPayment = "";
                paymentVo.Comments = "";
                this.DMVo.PaymentDetails = new List<PaymentVO>();
                this.DMVo.PaymentDetails.Add(paymentVo);
            }
        }
        public void GetPaymentData(string dmNumber)
        {
            if ((!string.IsNullOrEmpty(dmNumber)) && dmNumber != "0" && dmNumber != "null")
            {
                this.DMVo = getDMVo(dmNumber);
                this.DMVo = _presenter.SearchDealMemoPaymentDetails(this.DMVo);
            }
            else
                this.GetPaymentData();
        }
        internal DealMemoVO SavePaymentDetails(List<PaymentVO> Payments, string dmNumber, DealMemoMaintenanceViewModel model)
        {
            this.DMVo = getDMVo(dmNumber);
            this.DMVo = _presenter.GetDealMemoDetails(DMVo);
            this.DMVo.Currency = model.DMVo.Currency;
            this.DMVo.Type = model.DMVo.Type;
            this.DMVo.LicenseNo = model.DMVo.LicenseNo;
            this.DMVo.ContractEntity = model.DMVo.ContractEntity;
            this.DMVo.MainLicensee = model.DMVo.MainLicensee;
            this.DMVo.AmortMethod = model.DMVo.AmortMethod;
            this.DMVo.ProgrammeDetails = emptyVo;
            this.DMVo.PersistFlag = PersistFlagEnum.Modified;
            if (Payments != null)
            {
                this.DMVo.PaymentDetails = Payments;
            }
            else
            {
                this.DMVo.PaymentDetails = new List<PaymentVO>();
            }
            this.DMVo.SelectedTab = DealMemoVO.DealMemoTab.Payment;
            this.result = _presenter.SaveDealMemoDetails(this.DMVo);
            return this.result;
        }

        #endregion

        # region History Tab

        public void GetHistoryData(string dmNumber)
        {
            if ((!string.IsNullOrEmpty(dmNumber)) && dmNumber != "0" && dmNumber != "null")
            {
                this.DMVo = getDMVo(dmNumber);
                this.DMVo.HistoryDetails = _presenter.GetHistoryDetails(this.DMVo);
            }
            else
            {
                this.DMVo = new DealMemoVO();
                HistoryVO historyVo = new HistoryVO();
                historyVo.EntryDate = DateTime.Now;
                this.DMVo.HistoryDetails = new List<HistoryVO>();
                this.DMVo.HistoryDetails.Add(historyVo);
            }
        }

        #endregion
    }

}
