using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MediaManager.MediaManagementLookupServices;
using MediaManager.ProgrammeLibraryServices;
using MediaManager.Areas.Media_Mgt.ViewModels;

namespace MediaManager.Infrastructure.Lookups
{
    public class Med_mngtLOVLoader
    {

        public TertiaryGenreLookup GetTerGenreLOV()
        {
            return Med_mngtLookupsManager.GetTerGenre(ModuleEnum.MediaManagement, LookupKeyEnum.TertiaryGenreLookup);
        }

        public ActionLookup GetActionList()
        {
            return Med_mngtLookupsManager.GetActionList(ModuleEnum.MediaManagement, LookupKeyEnum.ActionLookup);
        }

        public TapeTypeLookup GetTapTypeList()
        {
            return Med_mngtLookupsManager.GetTapTypeList(ModuleEnum.MediaManagement, LookupKeyEnum.ActionLookup);
        }

        public TapeCategoryLookups GetTapeCategoryList()
        {
            return Med_mngtLookupsManager.GetTapeCategoryList(ModuleEnum.MediaManagement, LookupKeyEnum.ActionLookup);
        }

        public LibraryLookUp GetLibraryList()
        {
            return Med_mngtLookupsManager.GetLibraryList(ModuleEnum.MediaManagement, LookupKeyEnum.LibraryLookUp);
        }

        public MediaManager.LookupsServices.CourierCompanyLookup GetCourierCompany()
        {
            return Med_mngtLookupsManager.GetCourierCompany(ModuleEnum.MediaManagement, LookupKeyEnum.LibraryLookUp);
        }
        
        public TertiaryGenreLookup GetTertiaryGenreLookup()
        {
            return Med_mngtLookupsManager.GetTertiaryGenreLookup(ModuleEnum.Acquisition, LookupKeyEnum.TertiaryGenreLookup);
        }
                
    }
}
