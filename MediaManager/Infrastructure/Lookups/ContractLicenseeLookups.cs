using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MediaManager.ContractLicenseLookupService;

namespace MediaManager.Infrastructure.Lookups
{
    public class ContractLicenseeLookups
    {
        ContractLicenseLookupLOVLoader contractLicenseLOVLoader = new ContractLicenseLookupLOVLoader();
        public static TLookUpItem LookItemConvertor<TLookUpItem>(LookupItem li) where TLookUpItem : LookupItem
        {
            return (TLookUpItem)li;
        }
        public List<LicShortLookupItem> LicenseeList(string hintLicensee, string LeeType)
        {
            LicShortLookup licShortLookup = contractLicenseLOVLoader.GetLicShortLOV();
            Converter<LookupItem, LicShortLookupItem> licShortFilterConvertor = new Converter<LookupItem, LicShortLookupItem>(LookItemConvertor<LicShortLookupItem>);
            List<LicShortLookupItem> licShortFilterList = licShortLookup.LookupItemList.ConvertAll<LicShortLookupItem>(licShortFilterConvertor);

            //Dev1: Catch-up R1:Start:[CACQ 3]_[Nilesh]_[2012/10/13]
            if (LeeType == "CATCHUP")
                licShortFilterList = licShortFilterList.Where(filterData => filterData.LeeType == "CATCHUP").ToList();
            else
                licShortFilterList = licShortFilterList.Where(filterData => filterData.LeeType != "CATCHUP").ToList();
            //Dev1: End

            if (!string.IsNullOrEmpty(hintLicensee))
            {
                licShortFilterList = licShortFilterList.Where(filterData => filterData.ShortName.StartsWith(hintLicensee)).ToList();
                return licShortFilterList;
            }
            else
            {
                return licShortFilterList;
            }
        }
    }
}