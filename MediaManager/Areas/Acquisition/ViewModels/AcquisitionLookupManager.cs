using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MediaManager.AcquisitionLookupService;

namespace MediaManager.Areas.Acquisition.ViewModels
{
    public class AcquisitionLookupManager
    {
        public static List<LookupItem> GetChannelCompanyRpt(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {
            AcquisitionLookupServiceClient proxy = null;
            try
            {
                proxy = new AcquisitionLookupServiceClient();
                proxy.Open();
                ChannelCompanyRptLookupRequest request = new ChannelCompanyRptLookupRequest();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;
                ChannelCompanyRptLookupResponse response = proxy.GetChannelCompanyRpt(request);
                return response.Lookup.LookupItemList;
            }
            finally
            {
                proxy.Close();
            }

        }

        public static List<LookupItem> GetReportCurrency(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {
            AcquisitionLookupServiceClient proxy = null;
            try
            {
                proxy = new AcquisitionLookupServiceClient();
                proxy.Open();
                ReportCurrencyLookupRequest request = new ReportCurrencyLookupRequest();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;
                ReportCurrencyLookupResponse response = proxy.GetReportCurrency(request);
                return response.Lookup.LookupItemList;
            }
            finally
            {
                proxy.Close();
            }
        }
    }
}