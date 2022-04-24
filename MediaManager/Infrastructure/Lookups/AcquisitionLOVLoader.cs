using MediaManager.AcquisitionLookupService;

namespace MediaManager.Infrastructure.Lookups
{
    public class AcquisitionLOVLoader
    {
        public LanIDLookup GetLanID()
        {
            return AcquisitionLookupsManager.GetLanID(ModuleEnum.Acquisition, LookupKeyEnum.LanIDLookup);
        }
        public PB_ProgrammeCategoryLookup GetPB_ProgrammeCategoryLookup()
        {
            return AcquisitionLookupsManager.GetPB_ProgrammeCategoryLookup(ModuleEnum.Acquisition, LookupKeyEnum.PB_ProgrammeCategoryLookup);
        }
        public BOCategoryLookup GetBOCategoryLookup()
        {
            return AcquisitionLookupsManager.GetBOCategoryLookup(ModuleEnum.Acquisition, LookupKeyEnum.BOCategoryLookup);
        }
        public EventLookup GetEventLOV()
        {
            return AcquisitionLookupsManager.GetEvent(ModuleEnum.Acquisition, LookupKeyEnum.EventLookup);
        }


        public TypeShowLookup GetTypeShowLov()
        {
            return AcquisitionLookupsManager.GetTypeShow(ModuleEnum.Acquisition, LookupKeyEnum.TypeShowLookup);
        }
        public DMSubGenreLookup GetSubGenreLOV()
        {
            return AcquisitionLookupsManager.GetSubGenre(ModuleEnum.Acquisition, LookupKeyEnum.DMSubGenreLookup);
        }
        public AmortMethodLookup GetAmortMethodLov()
        {
            return AcquisitionLookupsManager.GetAmortMethod(ModuleEnum.Acquisition, LookupKeyEnum.AmortMethodLookup);
        }
        public MemCurrencyLookup GetCurrencyLov()
        {
            return AcquisitionLookupsManager.GetMemCurrency(ModuleEnum.Acquisition, LookupKeyEnum.MemCurrencyLookup);
        }
        public MemConNameLookup GetContractLov()
        {
            return AcquisitionLookupsManager.GetMemConName(ModuleEnum.Acquisition, LookupKeyEnum.MemConNameLookup);
        }
        public MemComNameLookup GetLicensorLov()
        {
            return AcquisitionLookupsManager.GetMemComName(ModuleEnum.Acquisition, LookupKeyEnum.MemComNameLookup);
        }
        public ComNameLookup GetContractEntityLov()
        {
            return AcquisitionLookupsManager.GetComName(ModuleEnum.Acquisition, LookupKeyEnum.ComNameLookup);
        }
        public MemLicenseeLookup GetMainLicenseLov()
        {
            return AcquisitionLookupsManager.GetMemLicensee(ModuleEnum.Acquisition, LookupKeyEnum.MemLicenseeLookup);
        }
        public TerritoryLookup GetTerritoryLOV()
        {
            return AcquisitionLookupsManager.GetTerritories(ModuleEnum.Acquisition, LookupKeyEnum.TerritoryLookup);
        }
        public RightsLookup GetRightsLOV()
        {
            return AcquisitionLookupsManager.GetRight(ModuleEnum.Acquisition, LookupKeyEnum.RightsLookup);
        }
        public PaymentCodeLookup GetPaymentCodeLOV()
        {
            return AcquisitionLookupsManager.GetPaymentCode(ModuleEnum.Acquisition, LookupKeyEnum.PaymentCodeLookup);
        }
        public ActiveUserLookup GetActiveUserLOV()
        {
            return AcquisitionLookupsManager.GetActiveUser(ModuleEnum.Acquisition, LookupKeyEnum.ActiveUserLookup);
        }
        public MediaManager.LookupsServices.LicenseeLookup GetLicenseeLOV()
        {
            return AcquisitionLookupsManager.GetLicensee(MediaManager.LookupsServices.ModuleEnum.Acquisition,MediaManager.LookupsServices.LookupKeyEnum.LicenseeLookup);
        }
        public UserCompDetailLookup GetCompanyDetailLOV()
        {
            return AcquisitionLookupsManager.GetCompanyDetail(ModuleEnum.Acquisition, LookupKeyEnum.UserCompDetailLookup);
        }
        public PB_MediaPlatformLookup GetPBMediaPlatformLookup()
        {
            return AcquisitionLookupsManager.GetPBMediaPlatformLookup(ModuleEnum.Acquisition, LookupKeyEnum.PB_MediaPlatformLookup);
        }
        public RegionLeeLookup GetRegionsLeeLookup()
        {
            return AcquisitionLookupsManager.GetRegionsLeeLookup(ModuleEnum.Acquisition, LookupKeyEnum.RegionLeeLookup);
        }
    }
}