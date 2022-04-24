using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MediaManager.BudgetingLookupService;

namespace MediaManager.Areas.Acquisition.ViewModels
{
    public class BudgetingLookupManager
    {
        /// <summary>
        /// Gets the programme combination types.
        /// </summary>
        /// <param name="moduleEnum">The module enum.</param>
        /// <param name="lookupKeyEnum">The lookup key enum.</param>
        /// <returns></returns>
        public static List<LookupItem> GetProgrammeCombinationTypes(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {
            BudgetingLookupServiceClient proxy = null;
            try
            {
                proxy = new BudgetingLookupServiceClient();
                proxy.Open();

                ProgrammeCombinationTypesRequest request = new ProgrammeCombinationTypesRequest();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;

                ProgrammeCombinationTypesResponse response = proxy.GetProgrammeCombinationTypes(request);
                return ((ProgrammeCombinationTypesResponse)response).Lookup.LookupItemList;

            }
            finally
            {
                proxy.Close();
            }
        }
    }
}