using MediaManager.LookupsServices;
using MediaManager.Infrastructure.Helpers;

namespace MediaManager.Infrastructure.Lookups
{
    public class LookupsManager
    {
        public static SportTypeLookup GetSportType(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {

            LookupsClient proxy = null;
            try
            {
                proxy = new LookupsClient();
                proxy.Open();
                GetSportTypeRequest request = new GetSportTypeRequest();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;
                GetSportTypeResponse response = proxy.GetSportType(request);
                return response.LookUp;
            }
            finally
            {
                ServiceInvoker.CloseLookupsProxy(proxy);
            }

        }

        public static SeriesLookup GetSeries(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {

            LookupsClient proxy = null;
            try
            {
                proxy = new LookupsClient();
                proxy.Open();
                GetSeriesRequest request = new GetSeriesRequest();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;
                GetSeriesResponse response = proxy.GetSeries(request);
                return response.LookUp;
            }
            finally
            {
                ServiceInvoker.CloseLookupsProxy(proxy);
            }

        }


        public static SeasonLookup GetSeason(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {

            LookupsClient proxy = null;
            try
            {
                proxy = new LookupsClient();
                proxy.Open();
                GetSeasonRequest request = new GetSeasonRequest();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;
                GetSeasonResponse response = proxy.GetSeason(request);
                return response.LookUp;
            }
            finally
            {
                ServiceInvoker.CloseLookupsProxy(proxy);
            }

        }

        public static EpisodeTitleLookup GetEpisodeTitle(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {

            LookupsClient proxy = null;
            try
            {
                proxy = new LookupsClient();
                proxy.Open();
                EpisodeTitleLookupRequest request = new EpisodeTitleLookupRequest();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;
                EpisodeTitleLookupResponse response = proxy.EpisodeTitleLookup(request);
                return response.EpisodeTitleLookupRes;
            }
            finally
            {
                ServiceInvoker.CloseLookupsProxy(proxy);
            }

        }

        public static GetGenDistributorLookup GetDistributor(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {

            LookupsClient proxy = null;
            try
            {
                proxy = new LookupsClient();
                proxy.Open();
                GetGenDistributorRequest request = new GetGenDistributorRequest();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;
                GetGenDistributorResponse response = proxy.GetdistributorLookup(request);
                return response.GetDistributorRes;
            }
            finally
            {
                ServiceInvoker.CloseLookupsProxy(proxy);
            }

        }

        public static GetGenColorLookup GetColor(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {

            LookupsClient proxy = null;
            try
            {
                proxy = new LookupsClient();
                proxy.Open();
                GetGenColouRequest request = new GetGenColouRequest();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;
                GetGenColorResponse response = proxy.GetColorLookup(request);
                return response.GetGenColorRes;
            }
            finally
            {
                ServiceInvoker.CloseLookupsProxy(proxy);
            }

        }

        public static GetSpokenLangLookup GetSpokenLang(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {

            LookupsClient proxy = null;
            try
            {
                proxy = new LookupsClient();
                proxy.Open();
                GetLangSpokenRequest request = new GetLangSpokenRequest();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;
                GetLangSpokenResponse response = proxy.GetLanSpokenLookUp(request);
                return response.GetLangSpokenRes;
            }
            finally
            {
                ServiceInvoker.CloseLookupsProxy(proxy);
            }

        }

        public static GetGenNationalityLookup GetNationality(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {

            LookupsClient proxy = null;
            try
            {
                proxy = new LookupsClient();
                proxy.Open();
                GenNationalityRequest request = new GenNationalityRequest();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;
                GenNationalityResponse response = proxy.GetGenNationalityLookup(request);
                return response.GenNationalityRes;
            }
            finally
            {
                ServiceInvoker.CloseLookupsProxy(proxy);
            }

        }

        public static GetGenQualityLookup GetQuality(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {

            LookupsClient proxy = null;
            try
            {
                proxy = new LookupsClient();
                proxy.Open();
                GetGenQualityRequest request = new GetGenQualityRequest();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;
                GetGenQualityResponse response = proxy.GetQualityLookup(request);
                return response.GetGenQualityRes;
            }
            finally
            {
                ServiceInvoker.CloseLookupsProxy(proxy);
            }

        }

        public static ProgrammeTypeLookup GetType(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {

            LookupsClient proxy = null;
            try
            {

                proxy = new LookupsClient();
                proxy.Open();
                GetProgrammeTypeRequest request = new GetProgrammeTypeRequest();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;
                GetProgrammeTypeResponse response = proxy.GetProgrammeType(request);
                return response.LookUp;
            }
            finally
            {
                ServiceInvoker.CloseLookupsProxy(proxy);
            }

        }

        public static GetGenTargetGroupLookup GetTargetGroup(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {

            LookupsClient proxy = null;
            try
            {

                proxy = new LookupsClient();
                proxy.Open();
                GetGenTargetGroupRequest request = new GetGenTargetGroupRequest();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;
                GetGenTargetGroupResponse response = proxy.GetTotalGroupLookup(request);
                return response.GenTargetGroupRes;
            }
            finally
            {
                ServiceInvoker.CloseLookupsProxy(proxy);
            }

        }

        public static GetGenRatingMPAALookup GetAgeRestrication(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {

            LookupsClient proxy = null;
            try
            {

                proxy = new LookupsClient();
                proxy.Open();
                GetRatingMPAARequest request = new GetRatingMPAARequest();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;
                GetRatingMPAAResponse response = proxy.GetGenRatingMPAALookup(request);
                return response.GetGenRatingMPAARes;
            }
            finally
            {
                ServiceInvoker.CloseLookupsProxy(proxy);
            }

        }
        public static GetGenRatingMPAALookup GetGenRatingMPAA()
        {
            LookupsClient proxy = null;

            GetRatingMPAAResponse response = new GetRatingMPAAResponse();
            try
            {
                proxy = new LookupsClient();
                proxy.Open();
                GetRatingMPAARequest request = new GetRatingMPAARequest();
                response = proxy.GetGenRatingMPAALookup(request);
            }
            finally
            {
                proxy.Close();
            }
            return response.GetGenRatingMPAARes;
        }

        public static StudioCodeLookup GetProductionHouse(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {

            LookupsClient proxy = null;
            try
            {

                proxy = new LookupsClient();
                proxy.Open();
                StudioCodeLookupRequest request = new StudioCodeLookupRequest();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;
                StudioCodeLookupResponse response = proxy.GetStudioCode(request);
                return response.LookUp;
            }
            finally
            {
                ServiceInvoker.CloseLookupsProxy(proxy);
            }

        }


        public static ProgrammeCategoryLookup GetPriGenre(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {

            LookupsClient proxy = null;
            try
            {

                proxy = new LookupsClient();
                proxy.Open();
                GetProgrammeCategoryRequest request = new GetProgrammeCategoryRequest();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;
                GetPrgorammeCategoryResponse response = proxy.GetProgrammeCategory(request);
                return response.LookUp;
            }
            finally
            {
                ServiceInvoker.CloseLookupsProxy(proxy);
            }

        }

        public static SubGenreLookup GetSecGenre(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {

            LookupsClient proxy = null;
            try
            {

                proxy = new LookupsClient();
                proxy.Open();
                GetSubGenreLookupRequest request = new GetSubGenreLookupRequest();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;
                GetSubGenreLookupResponse response = proxy.SubGenreLookup(request);
                return response.SubGenreLookupRes;
            }
            finally
            {
                ServiceInvoker.CloseLookupsProxy(proxy);
            }

        }

        public static MoodLookup GetMood(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {

            LookupsClient proxy = null;
            try
            {

                proxy = new LookupsClient();
                proxy.Open();
                MoodLookupRequest request = new MoodLookupRequest();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;
                MoodLookupResponse response = proxy.MoodLookUp(request);
                return response.LookUp;
            }
            finally
            {
                ServiceInvoker.CloseLookupsProxy(proxy);
            }

        }

        public static GetGenCodeLookup GetUserCode(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {

            LookupsClient proxy = null;
            try
            {

                proxy = new LookupsClient();
                proxy.Open();
                GetGenCodeLookupRequest request = new GetGenCodeLookupRequest();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;
                GetGenCodeLookupResponse response = proxy.GetGenCodeLookup(request);
                return response.GetGenCodeLookUpRes;
            }
            finally
            {
                ServiceInvoker.CloseLookupsProxy(proxy);
            }

        }

        public static CastRoleLookUp GetCastRoles(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {

            LookupsClient proxy = null;
            try
            {

                proxy = new LookupsClient();
                proxy.Open();
                CastRoleLookUpRequest request = new CastRoleLookUpRequest();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;
                CastRoleLookUpResponse response = proxy.GetCastRoleLookup(request);
                return response.CastRoleLookUpRes;
            }
            finally
            {
                ServiceInvoker.CloseLookupsProxy(proxy);
            }

        }

        public static CastAwardLookup GetCastAwards(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {

            LookupsClient proxy = null;
            try
            {

                proxy = new LookupsClient();
                proxy.Open();
                CastAwardLookUpRequest request = new CastAwardLookUpRequest();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;
                CastAwardLookUpResponse response = proxy.GetCastAwardLookup(request);
                return response.CastAwardLookUpRes;
            }
            finally
            {
                ServiceInvoker.CloseLookupsProxy(proxy);
            }

        }

        //public static SportTypeLookup GetSportType(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        //{

        //    LookupsClient proxy = null;
        //    try
        //    {
        //        proxy = new LookupsClient();
        //        proxy.Open();
        //        GetSportTypeRequest request = new GetSportTypeRequest();
        //        request.ModuleEnum = moduleEnum;
        //        request.LookupKeyEnum = lookupKeyEnum;
        //        GetSportTypeResponse response = proxy.GetSportType(request);
        //        return response.LookUp;
        //    }
        //    finally
        //    {
        //        ServiceInvoker.CloseLookupsProxy(proxy);
        //    }

        //}


        public static ChannelLookup GetChannels(ModuleEnum moduleEnum, LookupKeyEnum lookupKeyEnum)
        {

            LookupsClient proxy = null;
            try
            {
                proxy = new LookupsClient();
                proxy.Open();
                GetChannelsRequest request = new GetChannelsRequest();
                request.ModuleEnum = moduleEnum;
                request.LookupKeyEnum = lookupKeyEnum;
                GetChannelsResponse response = proxy.GetChannels(request);
                return response.LookUp;
            }
            finally
            {
                ServiceInvoker.CloseLookupsProxy(proxy);
            }

        }

    }
}