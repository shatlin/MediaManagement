using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MediaManager.MediaManagementLookupServices;
using MediaManager.Infrastructure.Helpers;
using MediaManager.ProgrammeLibraryServices;
using MediaManager.Areas.Media_Mgt.ViewModels;

namespace MediaManager.Infrastructure.Lookups
{
    public class Med_mngtLookupsManager
    {

        private static MediaManagementLookupsClient proxy;
        private static GetLookupsItemsResponse getLookupsItemsResponse;
        private static GetLookupsItemsRequest getLookupsItemsRequest;
        public static List<TMProgrammeSearchResult> ProgrammeSearchResult;

        public static TertiaryGenreLookup GetTerGenre(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {
            try
            {
                proxy = new MediaManagementLookupsClient();
                proxy.Open();
                TertiaryGenreLookupRequest request = new TertiaryGenreLookupRequest();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;
                TertiaryGenreLookupResponse response = proxy.GetTertiaryGenreLookup(request);
                return response.TertiaryGenreLookup;
            }
            finally
            {
                proxy.Close();
                //ServiceInvoker.CloseMediaManagementLookupProxy(proxy);
            }

        }

        public static ActionLookup GetActionList(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {

            getLookupsItemsResponse = new GetLookupsItemsResponse();
            try
            {
                proxy = new MediaManagementLookupsClient();
                proxy.Open();
                getLookupsItemsRequest = new GetLookupsItemsRequest();
                getLookupsItemsResponse = proxy.GetTapeActionsLookup(getLookupsItemsRequest);
            }
            finally
            {
                proxy.Close();
            }
            return getLookupsItemsResponse.Actionlookups;
        }

        public static TapeTypeLookup GetTapTypeList(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {
            getLookupsItemsResponse = new GetLookupsItemsResponse();
            try
            {
                proxy = new MediaManagementLookupsClient();
                proxy.Open();
                getLookupsItemsRequest = new GetLookupsItemsRequest();
                getLookupsItemsResponse = proxy.GetTapeTypeLookup(getLookupsItemsRequest);
            }
            finally
            {
                proxy.Close();
            }
            return getLookupsItemsResponse.TapeTypeLookup;
        }

        public static TapeCategoryLookups GetTapeCategoryList(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {
            getLookupsItemsResponse = new GetLookupsItemsResponse();
            try
            {
                proxy = new MediaManagementLookupsClient();
                proxy.Open();
                getLookupsItemsRequest = new GetLookupsItemsRequest();
                getLookupsItemsResponse = proxy.GetTapeCategoryLookup(getLookupsItemsRequest);
            }
            finally
            {
                proxy.Close();
            }
            return getLookupsItemsResponse.TapeCategoryLookUps;
        }

        public static LibraryLookUp GetLibraryList(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {
            LibraryLookUpResponse libraryLookUpResponse;
            try
            {
                proxy = new MediaManagementLookupsClient();
                proxy.Open();
                getLookupsItemsRequest = new GetLookupsItemsRequest();
                libraryLookUpResponse = proxy.GetLibraryLookup(getLookupsItemsRequest);
            }
            finally
            {
                proxy.Close();
            }
            return libraryLookUpResponse.Librarylookups;
        }

        public static MediaManager.LookupsServices.CourierCompanyLookup GetCourierCompany(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {
            MediaManager.LookupsServices.CourierCompanyResponse CourierCompanyResponse;
            MediaManager.LookupsServices.LookupsClient proxy = null;
            try
            {
                proxy = new MediaManager.LookupsServices.LookupsClient();
                proxy.Open();
                MediaManager.LookupsServices.CourierCompanyResquest courierCompanyResquest = new MediaManager.LookupsServices.CourierCompanyResquest();
                CourierCompanyResponse = proxy.GetCourierCompnayLookup(courierCompanyResquest);
            }
            finally
            {
                proxy.Close();
            }
            return CourierCompanyResponse.Lookup;
        }

        public static TertiaryGenreLookup GetTertiaryGenreLookup(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {
            MediaManagementLookupsClient proxy = null;
            try
            {
                proxy = new MediaManagementLookupsClient();
                proxy.Open();
                TertiaryGenreLookupRequest request = new TertiaryGenreLookupRequest();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;
                TertiaryGenreLookupResponse response = proxy.GetTertiaryGenreLookup(request);
                return response.TertiaryGenreLookup;
            }
            finally
            {
                ServiceInvoker.CloseMediaLibraryLookupProxy(proxy);
            }
        }        

    }
}
