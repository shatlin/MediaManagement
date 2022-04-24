using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MediaManager.LookupsServices;

namespace MediaManager.Infrastructure.Lookups
{
    
    public class LookupServiceLookups
    {
        LOVLoader lovloader = new LOVLoader();

        //Manisha:This method get the Distributor list from lovloader 

        public List<GetGenDistributorLookupItem> GetDistributorList()
        {
            GetGenDistributorLookup distributor = lovloader.GetDistributorLOV();
            Converter<LookupItem, GetGenDistributorLookupItem> DistributorLookupItemConverter = new Converter<LookupItem, GetGenDistributorLookupItem>(LookItemConvertor<GetGenDistributorLookupItem>);
            List<GetGenDistributorLookupItem> DistributorList = new List<GetGenDistributorLookupItem>();
            DistributorList = distributor.LookupItemList.ConvertAll<GetGenDistributorLookupItem>(DistributorLookupItemConverter);
            return DistributorList;
        }

        //Manisha:This method get the Color list from lovloader 

        public List<GetGenColorLookupItem> GetColorList()
        {
            GetGenColorLookup color = lovloader.GetColorLOV();
            Converter<LookupItem, GetGenColorLookupItem> ColorLookupItemConverter = new Converter<LookupItem, GetGenColorLookupItem>(LookItemConvertor<GetGenColorLookupItem>);
            List<GetGenColorLookupItem> ColorList = new List<GetGenColorLookupItem>();
            ColorList = color.LookupItemList.ConvertAll<GetGenColorLookupItem>(ColorLookupItemConverter);
            return ColorList;
        }

        //Manisha:This method get the Spoken Language list from lovloader 

        public List<GetSpokenLangLookupItem> GetSpokenLangList()
        {
            GetSpokenLangLookup spokenlang = lovloader.GetSpokenLangLOV();
            Converter<LookupItem, GetSpokenLangLookupItem> LangLookupItemConverter = new Converter<LookupItem, GetSpokenLangLookupItem>(LookItemConvertor<GetSpokenLangLookupItem>);
            List<GetSpokenLangLookupItem> SpokenLangList = new List<GetSpokenLangLookupItem>();
            SpokenLangList = spokenlang.LookupItemList.ConvertAll<GetSpokenLangLookupItem>(LangLookupItemConverter);
            return SpokenLangList;
        }

        //Manisha:This method get the Nationality list from lovloader 

        public List<GetGenNationalityLookupItem> GetNationalityList()
        {
            GetGenNationalityLookup nationality = lovloader.GetNationalityLOV();
            Converter<LookupItem, GetGenNationalityLookupItem> NationalityLookupItemConverter = new Converter<LookupItem, GetGenNationalityLookupItem>(LookItemConvertor<GetGenNationalityLookupItem>);
            List<GetGenNationalityLookupItem> NationalityList = new List<GetGenNationalityLookupItem>();
            NationalityList = nationality.LookupItemList.ConvertAll<GetGenNationalityLookupItem>(NationalityLookupItemConverter);
            return NationalityList;
        }

        //Manisha:This method get the Quality/Grade list from lovloader 

        public List<GetGenQualityLookupItem> GetQualityList()
        {
            GetGenQualityLookup quality = lovloader.GetQualityLOV();
            Converter<LookupItem, GetGenQualityLookupItem> QualityLookupItemConverter = new Converter<LookupItem, GetGenQualityLookupItem>(LookItemConvertor<GetGenQualityLookupItem>);
            List<GetGenQualityLookupItem> QualityList = new List<GetGenQualityLookupItem>();
            QualityList = quality.LookupItemList.ConvertAll<GetGenQualityLookupItem>(QualityLookupItemConverter);
            return QualityList;
        }

        //Manisha:This method get the Programme Type list from lovloader 

        public List<ProgrammeTypeLookupItem> GetTypeList()
        {
            ProgrammeTypeLookup Type = lovloader.GetTypeLOV();
            Converter<LookupItem, ProgrammeTypeLookupItem> TypeLookupItemConverter = new Converter<LookupItem, ProgrammeTypeLookupItem>(LookItemConvertor<ProgrammeTypeLookupItem>);
            List<ProgrammeTypeLookupItem> TypeList = new List<ProgrammeTypeLookupItem>();
            TypeList = Type.LookupItemList.ConvertAll<ProgrammeTypeLookupItem>(TypeLookupItemConverter);
            return TypeList;
        }

        //Manisha:This method get the Tertiary Group list from lovloader 

        public List<GetGenTargetGroupLookupItem> GetTertiaryGroupList()
        {
            GetGenTargetGroupLookup TertiaryGroup = lovloader.GetTargetGroupLOV();
            Converter<LookupItem, GetGenTargetGroupLookupItem> TertiaryGroupLookupItemConverter = new Converter<LookupItem, GetGenTargetGroupLookupItem>(LookItemConvertor<GetGenTargetGroupLookupItem>);
            List<GetGenTargetGroupLookupItem> TertiaryGroupList = new List<GetGenTargetGroupLookupItem>();
            TertiaryGroupList = TertiaryGroup.LookupItemList.ConvertAll<GetGenTargetGroupLookupItem>(TertiaryGroupLookupItemConverter);
            return TertiaryGroupList;
        }

        //Manisha:This method get the Age Restriction for domestic and MediaManagern list from lovloader 

        public List<GetGenRatingMPAALookupItem> GetAgeRestricationList()
        {
            GetGenRatingMPAALookup AgeRestrication = lovloader.GetAgeRestricationLOV();
            Converter<LookupItem, GetGenRatingMPAALookupItem> AgeRestricationLookupItemConverter = new Converter<LookupItem, GetGenRatingMPAALookupItem>(LookItemConvertor<GetGenRatingMPAALookupItem>);
            List<GetGenRatingMPAALookupItem> AgeRestricationList = new List<GetGenRatingMPAALookupItem>();
            AgeRestricationList = AgeRestrication.LookupItemList.ConvertAll<GetGenRatingMPAALookupItem>(AgeRestricationLookupItemConverter);
            return AgeRestricationList;
        }

        //Manisha:This method get the Production House list from lovloader 

        public List<StudioCodeLookupItem> GetProductionHouseList()
        {
            StudioCodeLookup ProductionHouse = lovloader.GetProductionHouseLOV();
            Converter<LookupItem, StudioCodeLookupItem> ProductionHouseLookupItemConverter = new Converter<LookupItem, StudioCodeLookupItem>(LookItemConvertor<StudioCodeLookupItem>);
            List<StudioCodeLookupItem> ProductionHouseList = new List<StudioCodeLookupItem>();
            ProductionHouseList = ProductionHouse.LookupItemList.ConvertAll<StudioCodeLookupItem>(ProductionHouseLookupItemConverter);
            return ProductionHouseList;
        }

        //Manisha:This method get the Primary Genre list from lovloader 

        public List<ProgrammeCategoryLookupItem> GetPriGenreList()
        {
            ProgrammeCategoryLookup PriGenre = lovloader.GetPriGenreLOV();
            Converter<LookupItem, ProgrammeCategoryLookupItem> PriGenreLookupItemConverter = new Converter<LookupItem, ProgrammeCategoryLookupItem>(LookItemConvertor<ProgrammeCategoryLookupItem>);
            List<ProgrammeCategoryLookupItem> PriGenreList = new List<ProgrammeCategoryLookupItem>();
            PriGenreList = PriGenre.LookupItemList.ConvertAll<ProgrammeCategoryLookupItem>(PriGenreLookupItemConverter);
            return PriGenreList;
        }

        //Manisha:This method get the Secondary Genre list from lovloader 

        public List<SubGenreLookupItem> GetSecGenreList()
        {
            SubGenreLookup SecGenre = lovloader.GetSecGenreLOV();
            Converter<LookupItem, SubGenreLookupItem> SecGenreLookupItemConverter = new Converter<LookupItem, SubGenreLookupItem>(LookItemConvertor<SubGenreLookupItem>);
            List<SubGenreLookupItem> SecGenreList = new List<SubGenreLookupItem>();
            SecGenreList = SecGenre.LookupItemList.ConvertAll<SubGenreLookupItem>(SecGenreLookupItemConverter);
            return SecGenreList;
        }

        //Manisha:This method get the Mood list from lovloader

        public List<MoodLookupItem> GetMoodList()
        {
            MoodLookup Mood = lovloader.GetMoodLOV();
            Converter<LookupItem, MoodLookupItem> MoodLookupItemConverter = new Converter<LookupItem, MoodLookupItem>(LookItemConvertor<MoodLookupItem>);
            List<MoodLookupItem> MoodList = new List<MoodLookupItem>();
            MoodList = Mood.LookupItemList.ConvertAll<MoodLookupItem>(MoodLookupItemConverter);
            return MoodList;
        }

        //Manisha:This method get the User Code list from lovloader

        public List<GetGenCodeLookupItem> GetUserCodeList()
        {
            GetGenCodeLookup Usercode = lovloader.GetUserCodeLOV();
            Converter<LookupItem, GetGenCodeLookupItem> UserCodeLookupItemConverter = new Converter<LookupItem, GetGenCodeLookupItem>(LookItemConvertor<GetGenCodeLookupItem>);
            List<GetGenCodeLookupItem> UserCodeList = new List<GetGenCodeLookupItem>();
            UserCodeList = Usercode.LookupItemList.ConvertAll<GetGenCodeLookupItem>(UserCodeLookupItemConverter);
            return UserCodeList;
        }

        //Manisha:This method get the Cast Roles list from lovloader

        public List<CastRoleLookUpItem> GetCastRolesList()
        {
            CastRoleLookUp CastRole = lovloader.GetCastRolesLOV();
            Converter<LookupItem, CastRoleLookUpItem> CastRoleLookupItemConverter = new Converter<LookupItem, CastRoleLookUpItem>(LookItemConvertor<CastRoleLookUpItem>);
            List<CastRoleLookUpItem> CastRoleList = new List<CastRoleLookUpItem>();
            CastRoleList = CastRole.LookupItemList.ConvertAll<CastRoleLookUpItem>(CastRoleLookupItemConverter);
            return CastRoleList;
        }

        //Manisha:This method get the Cast Awards list from lovloader

        public List<CastAwardLookupItem> GetCastAwardList()
        {
            CastAwardLookup CastAward = lovloader.GetCastAwardLOV();
            Converter<LookupItem, CastAwardLookupItem> CastAwardLookupItemConverter = new Converter<LookupItem, CastAwardLookupItem>(LookItemConvertor<CastAwardLookupItem>);
            List<CastAwardLookupItem> CastAwardList = new List<CastAwardLookupItem>();
            CastAwardList = CastAward.LookupItemList.ConvertAll<CastAwardLookupItem>(CastAwardLookupItemConverter);
            return CastAwardList;
        }
        public static TLookUpItem LookItemConvertor<TLookUpItem>(LookupItem li) where TLookUpItem : LookupItem
        {
            return (TLookUpItem)li;
        }

        public List<SportTypeLookupItem> GetSportTypeGenreList()
        {
            SportTypeLookup SportTypeGenre = lovloader.GetGenre();
            Converter<LookupItem, SportTypeLookupItem> SportTypeGenreLookupItemConverter = new Converter<LookupItem, SportTypeLookupItem>(LookItemConvertor<SportTypeLookupItem>);
            List<SportTypeLookupItem> SportTypeGenreList = new List<SportTypeLookupItem>();
            SportTypeGenreList = SportTypeGenre.LookupItemList.ConvertAll<SportTypeLookupItem>(SportTypeGenreLookupItemConverter);
            return SportTypeGenreList;
        }

        public List<SubGenreLookupItem> GetSecondaryGenreList()
        {
            SubGenreLookup SecondayGenre = lovloader.GetSecGenreLOV();
            Converter<LookupItem, SubGenreLookupItem> SecondaryGenreLookupItemConverter = new Converter<LookupItem, SubGenreLookupItem>(LookItemConvertor<SubGenreLookupItem>);
            List<SubGenreLookupItem> SecondayGenreList = new List<SubGenreLookupItem>();
            SecondayGenreList = SecondayGenre.LookupItemList.ConvertAll<SubGenreLookupItem>(SecondaryGenreLookupItemConverter);
            return SecondayGenreList;
        }

        public List<GetGenRatingMPAALookupItem> GetOfficialRatingList()
        {
            GetGenRatingMPAALookup OfficialRating = lovloader.GetOfficialRating();
            Converter<LookupItem, GetGenRatingMPAALookupItem> OfficialRatingLookupItemConverter = new Converter<LookupItem, GetGenRatingMPAALookupItem>(LookItemConvertor<GetGenRatingMPAALookupItem>);
            List<GetGenRatingMPAALookupItem> OfficialRatingList = new List<GetGenRatingMPAALookupItem>();
            OfficialRatingList = OfficialRating.LookupItemList.ConvertAll<GetGenRatingMPAALookupItem>(OfficialRatingLookupItemConverter);
            return OfficialRatingList;
        }
       
    }
}