using MediaManager.LookupsServices;

namespace MediaManager.Infrastructure.Lookups
{
    public class LOVLoader
    {
        public SportTypeLookup GetCatgLOV()
        {
            return LookupsManager.GetSportType(ModuleEnum.Acquisition,LookupKeyEnum.TypeShowLookup);
        }

        public SeriesLookup GetSeriesLOV()
        {
            return LookupsManager.GetSeries(ModuleEnum.Scheduling, LookupKeyEnum.SeriesLookup);
        }
         public SeasonLookup GetSeasonLOV()
        {
            return LookupsManager.GetSeason(ModuleEnum.Scheduling, LookupKeyEnum.SeasonLookup);
        }
         public EpisodeTitleLookup GetEpisodeTitle()
         {
             return LookupsManager.GetEpisodeTitle(ModuleEnum.MediaManagement, LookupKeyEnum.EpisodeTitleLookup);
         }
         public SportTypeLookup GetGenre()
         {
             return LookupsManager.GetSportType(ModuleEnum.Acquisition, LookupKeyEnum.SportTypeLookup);
         }

         public GetGenDistributorLookup GetDistributorLOV()
         {
             return LookupsManager.GetDistributor(ModuleEnum.MediaManagement, LookupKeyEnum.GetGenDistributorLookup);
         }

         public GetGenColorLookup GetColorLOV()
         {
             return LookupsManager.GetColor(ModuleEnum.MediaManagement, LookupKeyEnum.GetGenColorLookup);
         }

         public GetSpokenLangLookup GetSpokenLangLOV()
         {
             return LookupsManager.GetSpokenLang(ModuleEnum.MediaManagement, LookupKeyEnum.GetSpokenLangLookup);
         }

         public GetGenNationalityLookup GetNationalityLOV()
         {
             return LookupsManager.GetNationality(ModuleEnum.MediaManagement, LookupKeyEnum.GetGenNationalityLookup);
         }

         public GetGenQualityLookup GetQualityLOV()
         {
             return LookupsManager.GetQuality(ModuleEnum.MediaManagement, LookupKeyEnum.GetGenQualityLookup);
         }

         public ProgrammeTypeLookup GetTypeLOV()
         {
             return LookupsManager.GetType(ModuleEnum.MediaManagement, LookupKeyEnum.ProgrammeTypeLookup);
         }

         public GetGenTargetGroupLookup GetTargetGroupLOV()
         {
             return LookupsManager.GetTargetGroup(ModuleEnum.MediaManagement, LookupKeyEnum.GetGenTargetGroupLookup);
         }

         public GetGenRatingMPAALookup GetAgeRestricationLOV()
         {
             return LookupsManager.GetAgeRestrication(ModuleEnum.MediaManagement, LookupKeyEnum.GetGenRatingMPAALookup);
         }

         public StudioCodeLookup GetProductionHouseLOV()
         {
             return LookupsManager.GetProductionHouse(ModuleEnum.MediaManagement, LookupKeyEnum.StudioCodeLookup);
         }

         public ProgrammeCategoryLookup GetPriGenreLOV()
         {
             return LookupsManager.GetPriGenre(ModuleEnum.MediaManagement, LookupKeyEnum.ProgrammeCategoryLookup);
         }

         public SubGenreLookup GetSecGenreLOV()
         {
             return LookupsManager.GetSecGenre(ModuleEnum.MediaManagement, LookupKeyEnum.SubGenreLookup);
         }

         public MoodLookup GetMoodLOV()
         {
             return LookupsManager.GetMood(ModuleEnum.MediaManagement, LookupKeyEnum.MoodLookup);
         }

         public GetGenCodeLookup GetUserCodeLOV()
         {
             return LookupsManager.GetUserCode(ModuleEnum.MediaManagement, LookupKeyEnum.GetGenCodeLookup);
         }

         public CastRoleLookUp GetCastRolesLOV()
         {
             return LookupsManager.GetCastRoles(ModuleEnum.MediaManagement, LookupKeyEnum.CastRoleLookUp);
         }

         public CastAwardLookup GetCastAwardLOV()
         {
             return LookupsManager.GetCastAwards(ModuleEnum.MediaManagement, LookupKeyEnum.CastAwardLookup);
         }
         public GetGenRatingMPAALookup GetOfficialRating()
         {
             return LookupsManager.GetGenRatingMPAA();
         }
    }
}