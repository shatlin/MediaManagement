using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MediaManager.ContractLicenseLookupService;
using MediaManager.Infrastructure.Helpers;

namespace MediaManager.Infrastructure.Lookups
{
    public class ContractLicenseLookupsManager
    {
        public static LicShortLookup GetLicShort(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {
            ContractLicenseLookupServiceClient proxy = null;
            try
            {
                proxy = new ContractLicenseLookupServiceClient();
                proxy.Open();
                LicShortRequest request = new LicShortRequest();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;
                LicShortResponse response = proxy.GetLicShort(request);

                return response.Lookup;
            }
            finally
            {
                ServiceInvoker.CloseContractLicenseLookupServiceProxy(proxy);
            }
        }
    }
}