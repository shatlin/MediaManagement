using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MediaManager.AcquisitionLookupService;

namespace MediaManager.Infrastructure.Lookups
{
    public class Lookups
    {
        AcquisitionLOVLoader AcquisitionLOVLoader = new AcquisitionLOVLoader();
        LOVLoader LookupsLOVLoader = new LOVLoader();
        Med_mngtLOVLoader Med_mngtLOVLoader = new Med_mngtLOVLoader();
       
        public static TLookUpItem LookItemConvertor<TLookUpItem>(LookupItem li) where TLookUpItem : LookupItem
        {
            return (TLookUpItem)li;
        }
        public static TLookUpItem LookItemConvertor<TLookUpItem>(MediaManager.LookupsServices.LookupItem li) where TLookUpItem : MediaManager.LookupsServices.LookupItem
        {
            return (TLookUpItem)li;
        }
        public static TLookUpItem LookItemConvertor<TLookUpItem>(MediaManager.MediaManagementLookupServices.LookupItem li) where TLookUpItem : MediaManager.MediaManagementLookupServices.LookupItem
        {
            return (TLookUpItem)li;
        }

        public List<MemCurrencyLookupItem> currencyList()
        {
            MemCurrencyLookup CurrencyNameLookup = AcquisitionLOVLoader.GetCurrencyLov();
            Converter<LookupItem, MemCurrencyLookupItem> CurrencyNameLookupItemConverter = new Converter<LookupItem, MemCurrencyLookupItem>(LookItemConvertor<MemCurrencyLookupItem>);
            List<MemCurrencyLookupItem> CurrencyNameList = new List<MemCurrencyLookupItem>();
            CurrencyNameList = CurrencyNameLookup.LookupItemList.ConvertAll<MemCurrencyLookupItem>(CurrencyNameLookupItemConverter);
            return CurrencyNameList;
        }
        public List<MemConNameLookupItem> contractsList(string ContractNameCode)
        {
            try
            {
                MemConNameLookup ContractNameLookup = AcquisitionLOVLoader.GetContractLov();
                Converter<LookupItem, MemConNameLookupItem> ContractNameLookupItemConverter = new Converter<LookupItem, MemConNameLookupItem>(LookItemConvertor<MemConNameLookupItem>);
                List<MemConNameLookupItem> ContractNameList = new List<MemConNameLookupItem>();
                ContractNameList = ContractNameLookup.LookupItemList.ConvertAll<MemConNameLookupItem>(ContractNameLookupItemConverter);
                if (!string.IsNullOrEmpty(ContractNameCode))
                {
                    ContractNameList = (from contractNamel in ContractNameList
                                        where contractNamel.ConShortName.StartsWith(ContractNameCode)
                                        select contractNamel).ToList();
                    ContractNameCode = string.Empty;
                    return ContractNameList;
                }
                else
                {
                    return ContractNameList;
                }
            }
            catch
            {
                return null;
            }
        }
        public List<MemComNameLookupItem> licensorList(string hintLicensor)
        {
            try
            {
                MemComNameLookup licensor = AcquisitionLOVLoader.GetLicensorLov();
                Converter<LookupItem, MemComNameLookupItem> licensorConvertor = new Converter<LookupItem, MemComNameLookupItem>(LookItemConvertor<MemComNameLookupItem>);
                List<MemComNameLookupItem> licensorList = new List<MemComNameLookupItem>();
                licensorList = licensor.LookupItemList.ConvertAll<MemComNameLookupItem>(licensorConvertor);
                // if hint is provided
                if (!string.IsNullOrEmpty(hintLicensor))
                {
                    licensorList = (from lic in licensorList
                                    where lic.ShortName.StartsWith(hintLicensor)
                                    select lic).ToList();
                    hintLicensor = string.Empty;
                    return licensorList;
                }
                else
                {
                    return licensorList;
                }
            }
            catch
            {
                return null;
            }
        }
        public List<ComNameLookupItem> contractEntityList(string hintContractEntity)
        {
            try
            {
                ComNameLookup contractEntity = AcquisitionLOVLoader.GetContractEntityLov();
                Converter<LookupItem, ComNameLookupItem> ceConvertor = new Converter<LookupItem, ComNameLookupItem>(LookItemConvertor<ComNameLookupItem>);
                List<ComNameLookupItem> ceList = new List<ComNameLookupItem>();
                ceList = contractEntity.LookupItemList.ConvertAll<ComNameLookupItem>(ceConvertor);
                // if hint is provided
                if (!string.IsNullOrEmpty(hintContractEntity))
                {
                    ceList = (from ce in ceList
                              where ce.ShortName.StartsWith(hintContractEntity)
                              select ce).ToList();
                    hintContractEntity = string.Empty;
                    return ceList;
                }
                else
                {
                    return ceList;
                }
            }
            catch
            {
                return null;
            }
        }
        public List<MemLicenseeLookupItem> mainLicenseeList(string hintMainLicensee)//, string regFlag, bool isNonCatchUpLicensee)
        {
            try
            {
                MemLicenseeLookup mainLicense = AcquisitionLOVLoader.GetMainLicenseLov();
                Converter<LookupItem, MemLicenseeLookupItem> mlConvertor = new Converter<LookupItem, MemLicenseeLookupItem>(LookItemConvertor<MemLicenseeLookupItem>);
                List<MemLicenseeLookupItem> mlList = new List<MemLicenseeLookupItem>();
                mlList = mainLicense.LookupItemList.ConvertAll<MemLicenseeLookupItem>(mlConvertor);
                mlList = (from ml in mlList
                          where ml.MediaServiceCode != "CATCHUP"
                          select ml).ToList();
                if (!string.IsNullOrEmpty(hintMainLicensee) && hintMainLicensee!="")
                {
                    mlList = (from ml in mlList
                              where ml.ShortName.StartsWith(hintMainLicensee)
                              select ml).ToList();
                }
                return mlList;
                //Dev1: Catch-up R1:Start:[CACQ 11]_[]
                //if (!String.IsNullOrEmpty(regFlag) && regFlag.Length > 0)
                //{
                //    var lrid = from id in mlList where id.ShortName == regFlag select id.LicenseeRegionID;
                //    if (lrid.ToList().Count > 0)
                //    {
                //        int idNo = Convert.ToInt32(lrid.ToList()[0]);
                //        var rLst = from id in mlList where id.LicenseeRegionID == idNo && id.MediaServiceCode != "CATCHUP" select id;
                //        mlList = rLst.ToList<MemLicenseeLookupItem>();
                //    }
                //}

                //if (isNonCatchUpLicensee)
                //{
                //    mlList = (from ml in mlList
                //              where ml.MediaServiceCode != "CATCHUP"
                //              select ml).ToList();
                //}
                ////catchup_END
                //// if hint is provided
                //if (!string.IsNullOrEmpty(hintMainLicensee))
                //{
                //    mlList = (from ml in mlList
                //              where ml.ShortName.StartsWith(hintMainLicensee)
                //              select ml).ToList();
                //    hintMainLicensee = string.Empty;
                //    return mlList;
                //}
                //else
                //{
                //    return mlList;
                //}
            }
            catch
            {
                return null;
            }
        }
        public List<AmortMethodLookupItem> amortMethodList()
        {
            AmortMethodLookup amortMethod = AcquisitionLOVLoader.GetAmortMethodLov();
            Converter<LookupItem, AmortMethodLookupItem> AmortMethodLookupItemConverter = new Converter<LookupItem, AmortMethodLookupItem>(LookItemConvertor<AmortMethodLookupItem>);
            List<AmortMethodLookupItem> AmortMethodList = new List<AmortMethodLookupItem>();
            AmortMethodList = amortMethod.LookupItemList.ConvertAll<AmortMethodLookupItem>(AmortMethodLookupItemConverter);
            return AmortMethodList;
        }
        public List<TypeShowLookupItem> typeshowList()
        {
            TypeShowLookup typeShowLookUp = AcquisitionLOVLoader.GetTypeShowLov();
            Converter<LookupItem, TypeShowLookupItem> TypeShowLookupItemConverter = new Converter<LookupItem, TypeShowLookupItem>(LookItemConvertor<TypeShowLookupItem>);
            List<TypeShowLookupItem> TypeshowList = new List<TypeShowLookupItem>();
            TypeshowList = typeShowLookUp.LookupItemList.ConvertAll<TypeShowLookupItem>(TypeShowLookupItemConverter);
            return TypeshowList;
        }
        public List<PB_ProgrammeCategoryLookupItem> ProgramCategoryList()
        {
            PB_ProgrammeCategoryLookup ProgramCategory = AcquisitionLOVLoader.GetPB_ProgrammeCategoryLookup();
            Converter<LookupItem, PB_ProgrammeCategoryLookupItem> ProgramCategoryLookupItemConverter = new Converter<LookupItem, PB_ProgrammeCategoryLookupItem>(LookItemConvertor<PB_ProgrammeCategoryLookupItem>);
            List<PB_ProgrammeCategoryLookupItem> ProgramCategoryList = new List<PB_ProgrammeCategoryLookupItem>();
            ProgramCategoryList = ProgramCategory.LookupItemList.ConvertAll<PB_ProgrammeCategoryLookupItem>(ProgramCategoryLookupItemConverter);
            return ProgramCategoryList;
        }
        public List<EventLookupItem> EventTypeList(string FilterMsg)
        {
            EventLookup eventLookup = AcquisitionLOVLoader.GetEventLOV();
            Converter<LookupItem, EventLookupItem> eventFilterConvertor = new Converter<LookupItem, EventLookupItem>(LookItemConvertor<EventLookupItem>);
            List<EventLookupItem> eventFilterList = eventLookup.LookupItemList.ConvertAll<EventLookupItem>(eventFilterConvertor);
            if (!string.IsNullOrEmpty(FilterMsg))
            {
                eventFilterList = eventFilterList.Where(filterData => filterData.CodeValue.StartsWith(FilterMsg)).ToList();
                return eventFilterList;
            }
            else
            {
                return eventFilterList;
            }
        }
        public List<BOCategoryLookupItem> BOCategoryList(string hintBOCategory)
        {
            BOCategoryLookup boCategoryLookup = AcquisitionLOVLoader.GetBOCategoryLookup();
            Converter<LookupItem, BOCategoryLookupItem> boCategoryLookupconvertor = new Converter<LookupItem, BOCategoryLookupItem>(LookItemConvertor<BOCategoryLookupItem>);
            List<BOCategoryLookupItem> boCategoryLookupItemList = boCategoryLookup.LookupItemList.ConvertAll<BOCategoryLookupItem>(boCategoryLookupconvertor);

            if (!string.IsNullOrEmpty(hintBOCategory))
            {
                boCategoryLookupItemList = boCategoryLookupItemList.Where(filterData => filterData.BOCategoryCode.ToUpper().StartsWith(hintBOCategory.ToUpper())).ToList();
                return boCategoryLookupItemList;
            }
            else
            {
                return boCategoryLookupItemList;
            }
        }
    
        public List<DMSubGenreLookupItem> SubGenreList(string FilterMsg)
        {
            DMSubGenreLookup dmSubGenreLookup = AcquisitionLOVLoader.GetSubGenreLOV();

            Converter<LookupItem, DMSubGenreLookupItem> dmSubGenreFilterConvertor = new Converter<LookupItem, DMSubGenreLookupItem>(LookItemConvertor<DMSubGenreLookupItem>);
            List<DMSubGenreLookupItem> dmSubGenreFilterList = dmSubGenreLookup.LookupItemList.ConvertAll<DMSubGenreLookupItem>(dmSubGenreFilterConvertor);
            if (!string.IsNullOrEmpty(FilterMsg))
            {
                dmSubGenreFilterList = dmSubGenreFilterList.Where(filterData => filterData.CodeValue.StartsWith(FilterMsg)).ToList();
                return dmSubGenreFilterList;
            }
            else
            {
                return dmSubGenreFilterList;
            }
        }
        public List<MediaManager.MediaManagementLookupServices.TertiaryGenreLookupItem> TertiaryGenreList(string FilterMsg)
        {
            MediaManager.MediaManagementLookupServices.TertiaryGenreLookup tertiaryGenreLookup = Med_mngtLOVLoader.GetTertiaryGenreLookup();
            Converter<MediaManager.MediaManagementLookupServices.LookupItem, MediaManager.MediaManagementLookupServices.TertiaryGenreLookupItem> tertiaryGenreLookupConvertor = new Converter<MediaManager.MediaManagementLookupServices.LookupItem, MediaManager.MediaManagementLookupServices.TertiaryGenreLookupItem>(LookItemConvertor<MediaManager.MediaManagementLookupServices.TertiaryGenreLookupItem>);
            List<MediaManager.MediaManagementLookupServices.TertiaryGenreLookupItem> tertiaryGenreLookpItemList = tertiaryGenreLookup.LookupItemList.ConvertAll<MediaManager.MediaManagementLookupServices.TertiaryGenreLookupItem>(tertiaryGenreLookupConvertor);

            if (!string.IsNullOrEmpty(FilterMsg))
            {
                tertiaryGenreLookpItemList = tertiaryGenreLookpItemList.Where(filterData => filterData.TertiaryGenreCode.ToUpper().StartsWith(FilterMsg.ToUpper())).ToList();
                return tertiaryGenreLookpItemList;
            }
            else
            {
                return tertiaryGenreLookpItemList;
            }
        }
        public List<MediaManager.LookupsServices.SportTypeLookupItem> PrimaryGenreList(string hintEnt)
        {
            MediaManager.LookupsServices.SportTypeLookup sportTypeLookup = LookupsLOVLoader.GetCatgLOV();
            Converter<MediaManager.LookupsServices.LookupItem, MediaManager.LookupsServices.SportTypeLookupItem> categoryConvertor = new Converter<MediaManager.LookupsServices.LookupItem, MediaManager.LookupsServices.SportTypeLookupItem>(LookItemConvertor<MediaManager.LookupsServices.SportTypeLookupItem>);
            List<MediaManager.LookupsServices.SportTypeLookupItem> listCategory = new List<MediaManager.LookupsServices.SportTypeLookupItem>();
            listCategory = sportTypeLookup.LookupItemList.ConvertAll<MediaManager.LookupsServices.SportTypeLookupItem>(categoryConvertor);
            if (!string.IsNullOrEmpty(hintEnt))
            {
                listCategory = (from contrct in listCategory
                                where contrct.SportTypeValue.StartsWith(hintEnt)
                                select contrct).ToList();
                return listCategory;
            }
            else
            {
                return listCategory;
            }

        }


        public List<LanIDLookupItem> languageList()
        {
            LanIDLookup lanID = AcquisitionLOVLoader.GetLanID();
            Converter<LookupItem, LanIDLookupItem> languageConverter = new Converter<LookupItem, LanIDLookupItem>(LookItemConvertor<LanIDLookupItem>);
            List<LanIDLookupItem> languageList = new List<LanIDLookupItem>();
            languageList = lanID.LookupItemList.ConvertAll<LanIDLookupItem>(languageConverter);
            return languageList;
        }

        public List<TerritoryLookupItem> territoryList()
        {
            TerritoryLookup lanID = AcquisitionLOVLoader.GetTerritoryLOV();
            Converter<LookupItem, TerritoryLookupItem> territoryConverter = new Converter<LookupItem, TerritoryLookupItem>(LookItemConvertor<TerritoryLookupItem>);
            List<TerritoryLookupItem> territoryList = new List<TerritoryLookupItem>();
            territoryList = lanID.LookupItemList.ConvertAll<TerritoryLookupItem>(territoryConverter);
            return territoryList;
        }

        public List<RightsLookupItem> rightsList()
        {
            RightsLookup lanID = AcquisitionLOVLoader.GetRightsLOV();
            Converter<LookupItem, RightsLookupItem> rightsConverter = new Converter<LookupItem, RightsLookupItem>(LookItemConvertor<RightsLookupItem>);
            List<RightsLookupItem> rightsList = new List<RightsLookupItem>();
            rightsList = lanID.LookupItemList.ConvertAll<RightsLookupItem>(rightsConverter);
            return rightsList;
        }

        public List<PaymentCodeLookupItem> paymentCodeList()
        {
            PaymentCodeLookup PaymentCode = AcquisitionLOVLoader.GetPaymentCodeLOV();
            Converter<LookupItem, PaymentCodeLookupItem> paymentCodeConverter = new Converter<LookupItem, PaymentCodeLookupItem>(LookItemConvertor<PaymentCodeLookupItem>);
            List<PaymentCodeLookupItem> paymentCodeList = new List<PaymentCodeLookupItem>();
            paymentCodeList = PaymentCode.LookupItemList.ConvertAll<PaymentCodeLookupItem>(paymentCodeConverter);
            return paymentCodeList;
        }

        public List<PB_MediaPlatformLookupItem> MediaPlatFormList(string strFilter)
        {
            PB_MediaPlatformLookup pbMediaPlatformLookup = AcquisitionLOVLoader.GetPBMediaPlatformLookup();
            Converter<LookupItem, PB_MediaPlatformLookupItem> pb_MediaPlatformLookupconvertor = new Converter<LookupItem, PB_MediaPlatformLookupItem>(LookItemConvertor<PB_MediaPlatformLookupItem>);
            List<PB_MediaPlatformLookupItem> pbMediaPlatformLookupItemList = pbMediaPlatformLookup.LookupItemList.ConvertAll<PB_MediaPlatformLookupItem>(pb_MediaPlatformLookupconvertor);

            if (!string.IsNullOrEmpty(strFilter))
            {
                strFilter = strFilter.Replace("%", " ");
                strFilter = strFilter.Trim().ToUpper();
                pbMediaPlatformLookupItemList = pbMediaPlatformLookupItemList.Where(filterData => filterData.MediaPlatformCode.ToUpper().StartsWith(strFilter.ToUpper())).ToList();
            }

            return pbMediaPlatformLookupItemList;
        }

        public List<RegionLeeLookupItem> RegionList(string strFilter)
        {
            RegionLeeLookup regionLeeLookup = AcquisitionLOVLoader.GetRegionsLeeLookup();
            Converter<LookupItem, RegionLeeLookupItem> regionLeeLookupconvertor = new Converter<LookupItem, RegionLeeLookupItem>(LookItemConvertor<RegionLeeLookupItem>);
            List<RegionLeeLookupItem> regionLeeLookupItemList = regionLeeLookup.LookupItemList.ConvertAll<RegionLeeLookupItem>(regionLeeLookupconvertor);


            if (!String.IsNullOrEmpty(strFilter))
            {
                strFilter = strFilter.Replace("%", " ");
                strFilter = strFilter.Trim().ToUpper();
                regionLeeLookupItemList = (from regionLee in regionLeeLookupItemList where regionLee.RegionCode.ToLower().StartsWith(strFilter.ToLower()) select regionLee).ToList();
            }

            return regionLeeLookupItemList;
        }
    }
}
