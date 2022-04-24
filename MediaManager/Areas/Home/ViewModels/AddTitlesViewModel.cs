using System.Collections.Generic;
using MediaManager.AcquisitionLookupService;
using MediaManager.Infrastructure.Lookups;


namespace MediaManager.Areas.Home.ViewModels
{
    public class AddTitlesViewModel
    {
        public string Title { get; set; }
        public string Notes { get; set; }
        public string Synopsis { get; set; }
        public List<LanIDLookupItem> LanguageLOVList { get; set; }
        public List<PB_ProgrammeCategoryLookupItem> ProgrammeCategoryLOVList { get; set; }
        public List<TypeShowLookupItem> ProgrammeTypeLOVList { get; set; }
        public List<MediaManager.LookupsServices.SportTypeLookupItem> PrimaryGenreLOVlist { get; set; }
        public List<DMSubGenreLookupItem> SecondaryGenreLOVList { get; set; }

        #region AddTitleScreen_Lookups

        LOVLoader LOVLoader = new LOVLoader();
        AcquisitionLOVLoader AcquisitionLOVLoader = new AcquisitionLOVLoader();

        LanIDLookup lanIDLookup;
        PB_ProgrammeCategoryLookup pb_ProgrammeCategoryLookup;
        TypeShowLookup typeShowLookup;
        MediaManager.LookupsServices.SportTypeLookup sportTypeLookup;
        DMSubGenreLookup dmSubGenreLookup;

       public List<MediaManager.LookupsServices.SportTypeLookupItem> getPrimaryGenreLOVList()
        {
            sportTypeLookup = new MediaManager.LookupsServices.SportTypeLookup();
            List<MediaManager.LookupsServices.SportTypeLookupItem> PrimaryGenreLOVList = new List<MediaManager.LookupsServices.SportTypeLookupItem>();
            sportTypeLookup = LOVLoader.GetCatgLOV();
            foreach (MediaManager.LookupsServices.SportTypeLookupItem lookupitem in sportTypeLookup.LookupItemList)
            {
                PrimaryGenreLOVList.Add(lookupitem);
            }
            return PrimaryGenreLOVList;
        }
       public List<DMSubGenreLookupItem> getSecondaryGenreLOVList()
        {
            dmSubGenreLookup = new DMSubGenreLookup();
            List<DMSubGenreLookupItem> SecondaryGenreLOVList = new List<DMSubGenreLookupItem>();
            dmSubGenreLookup = AcquisitionLOVLoader.GetSubGenreLOV();
            foreach (DMSubGenreLookupItem lookupitem in dmSubGenreLookup.LookupItemList)
            {
                SecondaryGenreLOVList.Add(lookupitem);
            }
            return SecondaryGenreLOVList;
        }
       public List<PB_ProgrammeCategoryLookupItem> getProgrammeCategoryLOVList()
        {
            pb_ProgrammeCategoryLookup = new PB_ProgrammeCategoryLookup();
            List<PB_ProgrammeCategoryLookupItem> ProgrammeCategoryLOVList = new List<PB_ProgrammeCategoryLookupItem>();
            pb_ProgrammeCategoryLookup = AcquisitionLOVLoader.GetPB_ProgrammeCategoryLookup();
            foreach (PB_ProgrammeCategoryLookupItem lookupitem in pb_ProgrammeCategoryLookup.LookupItemList)
            {
                ProgrammeCategoryLOVList.Add(lookupitem);
            }
            return ProgrammeCategoryLOVList;
        }
       public List<TypeShowLookupItem> getProgrammeTypeLOVList()
        {
            typeShowLookup = new TypeShowLookup();
            List<TypeShowLookupItem> ProgrammeTypeLOVList = new List<TypeShowLookupItem>();
            typeShowLookup = AcquisitionLOVLoader.GetTypeShowLov();
            foreach (TypeShowLookupItem lookupitem in typeShowLookup.LookupItemList)
            {
                ProgrammeTypeLOVList.Add(lookupitem);
            }
            return ProgrammeTypeLOVList;
        }
       public List<LanIDLookupItem> getLanguageLOVList()
        {
            lanIDLookup = new LanIDLookup();
            List<LanIDLookupItem> LanguageLOVList = new List<LanIDLookupItem>();
            lanIDLookup = AcquisitionLOVLoader.GetLanID();
            foreach (LanIDLookupItem lookupitem in lanIDLookup.LookupItemList)
            {
                LanguageLOVList.Add(lookupitem);
            }
            return LanguageLOVList;
        }

        #endregion AddTitleScreen_Lookups
    }
}