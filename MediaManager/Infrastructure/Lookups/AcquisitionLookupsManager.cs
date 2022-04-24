
using MediaManager.AcquisitionLookupService;
using MediaManager.Infrastructure.Helpers;


namespace MediaManager.Infrastructure.Lookups
{
    public class AcquisitionLookupsManager
    {
        public static LanIDLookup GetLanID(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {
            AcquisitionLookupServiceClient proxy = null;
            try
            {
                proxy = new AcquisitionLookupServiceClient();
                proxy.Open();
                LanIDRequest request = new LanIDRequest();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;
                LanIDResponse response = proxy.GetLanID(request);
                return response.Lookup;
            }
            finally
            {
                ServiceInvoker.CloseAcquisitionLookupProxy(proxy);
            }
        }

        public static PB_ProgrammeCategoryLookup GetPB_ProgrammeCategoryLookup(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {
            AcquisitionLookupServiceClient proxy = null;
            try
            {
                proxy = new AcquisitionLookupServiceClient();
                proxy.Open();
                PB_ProgrammeCategoryLookupRequest request = new PB_ProgrammeCategoryLookupRequest();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;
                PB_ProgrammeCategoryLookupResponse response = proxy.GetPB_ProgrammeCategoryLookup(request);
                return response.Lookup;
            }
            finally
            {
                ServiceInvoker.CloseAcquisitionLookupProxy(proxy);
            }
        }
        public static TypeShowLookup GetTypeShow(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {
            AcquisitionLookupServiceClient proxy = null;
            try
            {
                proxy = new AcquisitionLookupServiceClient();
                proxy.Open();
                TypeShowRequest request = new TypeShowRequest();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;
                TypeShowResponse response = proxy.GetTypeShow(request);
                return response.Lookup;
            }
            finally
            {
                ServiceInvoker.CloseAcquisitionLookupProxy(proxy);
            }
        }
        public static EventLookup GetEvent(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {
            AcquisitionLookupServiceClient proxy = null;
            try
            {
                proxy = new AcquisitionLookupServiceClient();
                proxy.Open();
                EventRequest request = new EventRequest();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;
                EventResponse response = proxy.GetEvent(request);
                return response.Lookup;
            }
            finally
            {
                ServiceInvoker.CloseAcquisitionLookupProxy(proxy);
            }
        }
        public static DMSubGenreLookup GetSubGenre(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {
            AcquisitionLookupServiceClient proxy = null;
            try
            {
                proxy = new AcquisitionLookupServiceClient();
                proxy.Open();
                DMSubGenreRequest request = new DMSubGenreRequest();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;
                DMSubGenreResponse response = proxy.GetSubGenre(request);
                return response.Lookup;
            }
            finally
            {
                ServiceInvoker.CloseAcquisitionLookupProxy(proxy);
            }
        }
        public static BOCategoryLookup GetBOCategoryLookup(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {
            AcquisitionLookupServiceClient proxy = null;
            try
            {
                proxy = new AcquisitionLookupServiceClient();
                proxy.Open();
                BOCategoryLookupRequest request = new BOCategoryLookupRequest();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;
                BOCategoryLookupResponse response = proxy.GetBOCategoryLookup(request);
                return response.Lookup;
            }
            finally
            {
                ServiceInvoker.CloseAcquisitionLookupProxy(proxy);
            }
        }

        public static AmortMethodLookup GetAmortMethod(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {
            AcquisitionLookupServiceClient proxy = null;
            try
            {
                proxy = new AcquisitionLookupServiceClient();
                proxy.Open();
                AmortMethodRequest request = new AmortMethodRequest();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;
                AmortMethodResponse response = proxy.GetAmortMethod(request);
                return response.Lookup;
            }
            finally
            {
                ServiceInvoker.CloseAcquisitionLookupProxy(proxy);
            }
        }
        public static MemCurrencyLookup GetMemCurrency(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {
            AcquisitionLookupServiceClient proxy = null;
            try
            {
                proxy = new AcquisitionLookupServiceClient();
                proxy.Open();
                MemCurrencyRequest request = new MemCurrencyRequest();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;
                MemCurrencyResponse response = proxy.GetMemCurrency(request);
                return response.Lookup;
            }
            finally
            {
                ServiceInvoker.CloseAcquisitionLookupProxy(proxy);
            }
        }
        public static MemConNameLookup GetMemConName(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {
            AcquisitionLookupServiceClient proxy = null;
            try
            {
                proxy = new AcquisitionLookupServiceClient();
                proxy.Open();
                MemConNameRequest request = new MemConNameRequest();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;
                MemConNameResponse response = proxy.GetMemConName(request);
                return response.Lookup;
            }
            finally
            {
                ServiceInvoker.CloseAcquisitionLookupProxy(proxy);
            }
        }
        public static MemComNameLookup GetMemComName(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {
            AcquisitionLookupServiceClient proxy = null;
            try
            {
                proxy = new AcquisitionLookupServiceClient();
                proxy.Open();
                MemComNameRequest request = new MemComNameRequest();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;
                MemComNameResponse response = proxy.GetMemComName(request);
                return response.Lookup;
            }
            finally
            {
                ServiceInvoker.CloseAcquisitionLookupProxy(proxy);
            }
        }
        public static ComNameLookup GetComName(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {
            AcquisitionLookupServiceClient proxy = null;
            try
            {
                proxy = new AcquisitionLookupServiceClient();
                proxy.Open();
                ComNameRequest request = new ComNameRequest();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;
                ComNameResponse response = proxy.GetComName(request);
                return response.Lookup;
            }
            finally
            {
                ServiceInvoker.CloseAcquisitionLookupProxy(proxy);
            }
        }
        public static MemLicenseeLookup GetMemLicensee(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {
            AcquisitionLookupServiceClient proxy = null;
            try
            {
                proxy = new AcquisitionLookupServiceClient();
                proxy.Open();
                MemLicenseeRequest request = new MemLicenseeRequest();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;
                MemLicenseeResponse response = proxy.GetMemLicensee(request);
                return response.Lookup;
            }
            finally
            {
                ServiceInvoker.CloseAcquisitionLookupProxy(proxy);
            }
        }
        public static MemTypeLookup GetMemType(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {
            AcquisitionLookupServiceClient proxy = null;
            try
            {
                proxy = new AcquisitionLookupServiceClient();
                proxy.Open();
                MemTypeRequest request = new MemTypeRequest();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;
                MemTypeResponse response = proxy.GetMemType(request);
                return response.Lookup;
            }
            finally
            {
                ServiceInvoker.CloseAcquisitionLookupProxy(proxy);
            }
        }

        public static TerritoryLookup GetTerritories(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {
            AcquisitionLookupServiceClient proxy = null;
            try
            {
                proxy = new AcquisitionLookupServiceClient();
                proxy.Open();
                TerritoryLookupRequest request = new TerritoryLookupRequest();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;
                TerritoryLookupResponse response = proxy.GetTerritory(request);
                return response.Lookup;
            }
            finally
            {
                ServiceInvoker.CloseAcquisitionLookupProxy(proxy);
            }
        }

        public static RightsLookup GetRight(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {
            AcquisitionLookupServiceClient proxy = null;
            try
            {
                proxy = new AcquisitionLookupServiceClient();
                proxy.Open();
                RightsRequest request = new RightsRequest();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;
                RightsResponse response = proxy.GetRights(request);
                return response.Lookup;
            }
            finally
            {
                ServiceInvoker.CloseAcquisitionLookupProxy(proxy);
            }
        }

        public static PaymentCodeLookup GetPaymentCode(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {
            AcquisitionLookupServiceClient proxy = null;
            try
            {
                proxy = new AcquisitionLookupServiceClient();
                proxy.Open();
                PaymentCodeRequest request = new PaymentCodeRequest();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;
                PaymentCodeResponse response = proxy.GetPaymentCode(request);
                return response.Lookup;
            }
            finally
            {
                ServiceInvoker.CloseAcquisitionLookupProxy(proxy);
            }
        }
        public static ActiveUserLookup GetActiveUser(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {
            AcquisitionLookupServiceClient proxy = null;
            try
            {
                proxy = new AcquisitionLookupServiceClient();
                proxy.Open();
                ActiveUserLookupRequest request = new ActiveUserLookupRequest();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;
                ActiveUserLookupResponse response = proxy.GetActiveUser(request);
                return response.Lookup;
            }
            finally
            {
                ServiceInvoker.CloseAcquisitionLookupProxy(proxy);
            }
        }
        public static MediaManager.LookupsServices.LicenseeLookup GetLicensee(MediaManager.LookupsServices.ModuleEnum moduleEnum, MediaManager.LookupsServices.LookupKeyEnum lookupKeyEnum)
        {
            MediaManager.LookupsServices.LookupsClient proxy = null;
            try
            {
                proxy = new MediaManager.LookupsServices.LookupsClient();
                proxy.Open();
                MediaManager.LookupsServices.GetLicenseeRequest request = new MediaManager.LookupsServices.GetLicenseeRequest();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;
                MediaManager.LookupsServices.GetLicenseeResponse response = proxy.GetLicensee(request);
                return response.LookUp;
            }
            finally
            {
                ServiceInvoker.CloseLookupsProxy(proxy);
            }
        }
        public static UserCompDetailLookup GetCompanyDetail(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {
            AcquisitionLookupServiceClient proxy = null;
            try
            {
                proxy = new AcquisitionLookupServiceClient();
                proxy.Open();
                UserCompDetailLookupRequest request = new UserCompDetailLookupRequest();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;
                UserCompDetailLookupResponse response = proxy.GetCompanyDetail(request);
                return response.Lookup;
            }
            finally
            {
                ServiceInvoker.CloseAcquisitionLookupProxy(proxy);
            }
        }


        public static PB_MediaPlatformLookup GetPBMediaPlatformLookup(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {
            AcquisitionLookupServiceClient proxy = null;
            try
            {
                proxy = new AcquisitionLookupServiceClient();
                proxy.Open();
                PB_MediaPlatformLookupRequest request = new PB_MediaPlatformLookupRequest();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;
                PB_MediaPlatformLookupResponse response = proxy.GetPB_MediaPlatformLookup(request);
                return response.Lookup;
            }
            finally
            {
                ServiceInvoker.CloseAcquisitionLookupProxy(proxy);
            }
        }


        public static RegionLeeLookup GetRegionsLeeLookup(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {

            // LookupsClient proxy = null;
            AcquisitionLookupServiceClient proxy = null;
            try
            {
                proxy = new AcquisitionLookupServiceClient();
                proxy.Open();
                RegionLeeLookupRequest request = new RegionLeeLookupRequest();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;
                RegionLeeLookupResponse response = proxy.GetRegionLeeLookup(request);
                return response.Lookup;
            }
            finally
            {
                ServiceInvoker.CloseAcquisitionLookupProxy(proxy);
            }
        }
    }
}