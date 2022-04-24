using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MediaManager.Infrastructure.Lookups;
using MediaManager.MediaManagementLookupServices;
using MediaManager.Areas.Media_Mgt.ViewModels;

namespace MediaManager.Infrastructure.Lookups
{
    public class Med_mngt_Lookups
    {

        Med_mngtLOVLoader med_mngtLOVLoader;

        public static TLookUpItem LookItemConvertor<TLookUpItem>(LookupItem li) where TLookUpItem : LookupItem
        {
            return (TLookUpItem)li;
        }

        public static TLookUpItem LookItemConvertor<TLookUpItem>(MediaManager.LookupsServices.LookupItem li) where TLookUpItem : MediaManager.LookupsServices.LookupItem
        {
            return (TLookUpItem)li;
        }

        //Manisha:This method get the Tertiary Genre list from lovloader 
        
        public List<TertiaryGenreLookupItem> GetTerGenreList()
        {

            Med_mngtLOVLoader ld = new Med_mngtLOVLoader();
            TertiaryGenreLookup TerGenre = ld.GetTerGenreLOV();
            Converter<LookupItem, TertiaryGenreLookupItem> TerGenreLookupItemConverter = new Converter<LookupItem, TertiaryGenreLookupItem>(LookItemConvertor<TertiaryGenreLookupItem>);
            List<TertiaryGenreLookupItem> TerGenreList = new List<TertiaryGenreLookupItem>();
            TerGenreList = TerGenre.LookupItemList.ConvertAll<TertiaryGenreLookupItem>(TerGenreLookupItemConverter);
            return TerGenreList;
        }       
        
        public List<ActionLookupItem> GetActionList()
        {
            med_mngtLOVLoader = new Med_mngtLOVLoader();
            ActionLookup actionLookup = med_mngtLOVLoader.GetActionList();
            Converter<LookupItem, ActionLookupItem> ActionLookupItemConverter = new Converter<LookupItem, ActionLookupItem>(LookItemConvertor<ActionLookupItem>);
            List<ActionLookupItem> ActionList = new List<ActionLookupItem>();
            ActionList = actionLookup.LookupItemList.ConvertAll<ActionLookupItem>(ActionLookupItemConverter);
            return ActionList;
        }

        public List<TapeTypeLookupItem> GetTapTypeList()
        {
            med_mngtLOVLoader = new Med_mngtLOVLoader();
            TapeTypeLookup tapeTypeLookup = med_mngtLOVLoader.GetTapTypeList();
            Converter<LookupItem, TapeTypeLookupItem> TapeTypeLookupItemConverter = new Converter<LookupItem, TapeTypeLookupItem>(LookItemConvertor<TapeTypeLookupItem>);
            List<TapeTypeLookupItem> TapeTypeList = new List<TapeTypeLookupItem>();
            TapeTypeList = tapeTypeLookup.LookupItemList.ConvertAll<TapeTypeLookupItem>(TapeTypeLookupItemConverter);
            return TapeTypeList;
        }

        public List<TapeCategoryLookupsItem> GetTapeCategoryList()
        {
            med_mngtLOVLoader = new Med_mngtLOVLoader();
            TapeCategoryLookups tapeCategoryLookups = med_mngtLOVLoader.GetTapeCategoryList();
            Converter<LookupItem, TapeCategoryLookupsItem> TapeCategoryLookupItemConverter = new Converter<LookupItem, TapeCategoryLookupsItem>(LookItemConvertor<TapeCategoryLookupsItem>);
            List<TapeCategoryLookupsItem> TapeCategoryList = new List<TapeCategoryLookupsItem>();
            TapeCategoryList = tapeCategoryLookups.LookupItemList.ConvertAll<TapeCategoryLookupsItem>(TapeCategoryLookupItemConverter);
            return TapeCategoryList;
        }

        public List<LibraryLookUpItem> GetLibraryList()
        {
            med_mngtLOVLoader = new Med_mngtLOVLoader();
            LibraryLookUp libraryLookUp = med_mngtLOVLoader.GetLibraryList();
            Converter<LookupItem, LibraryLookUpItem> LibraryLookupItemConverter = new Converter<LookupItem, LibraryLookUpItem>(LookItemConvertor<LibraryLookUpItem>);
            List<LibraryLookUpItem> libraryLookUpItemList = new List<LibraryLookUpItem>();
            libraryLookUpItemList = libraryLookUp.LookupItemList.ConvertAll<LibraryLookUpItem>(LibraryLookupItemConverter);
            return libraryLookUpItemList;
        }

        public List<MediaManager.LookupsServices.CourierCompanyLookupItem> GetCourierCompany()
        {
            med_mngtLOVLoader = new Med_mngtLOVLoader();
            MediaManager.LookupsServices.CourierCompanyLookup courierCompanyLookup = med_mngtLOVLoader.GetCourierCompany();
            Converter<MediaManager.LookupsServices.LookupItem, MediaManager.LookupsServices.CourierCompanyLookupItem> courierCompanyLookupItemConverter = new Converter<MediaManager.LookupsServices.LookupItem, MediaManager.LookupsServices.CourierCompanyLookupItem>(LookItemConvertor<MediaManager.LookupsServices.CourierCompanyLookupItem>);
            List<MediaManager.LookupsServices.CourierCompanyLookupItem> courierCompanyLookupItemList = new List<MediaManager.LookupsServices.CourierCompanyLookupItem>();
            courierCompanyLookupItemList = courierCompanyLookup.LookupItemList.ConvertAll<MediaManager.LookupsServices.CourierCompanyLookupItem>(courierCompanyLookupItemConverter);
            return courierCompanyLookupItemList;
        }       
               
    }
}