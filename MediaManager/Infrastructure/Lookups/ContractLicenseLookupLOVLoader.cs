using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MediaManager.ContractLicenseLookupService;

namespace MediaManager.Infrastructure.Lookups
{
    public class ContractLicenseLookupLOVLoader
    {
        public LicShortLookup GetLicShortLOV()
        {
            return ContractLicenseLookupsManager.GetLicShort(ModuleEnum.Acquisition, LookupKeyEnum.LicShortLookup);
        }
    }
}