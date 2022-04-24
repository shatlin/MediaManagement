using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MediaManager.Infrastructure.Helpers
{
    public class ActionConstants
    {
        public const string Index = "Index";
        public const string Login = "Login";

        #region AcquisitionModule

        public const string DealMemoSearch = "Deal Memo Search";
        public const string DealMemoMaintenance = "Deal Memo Maintenance";
        public const string LicenseReview = "License Review";

        #endregion AcquisitionModule

        #region HomeModule

        public const string ManageTitles = "ManageTitles";
        public  const string SearchTitles = "SearchTitles";
        public const string ManageSeries = "ManageSeries";
        public const string GenerateEpisodes = "GenerateEpisodes";

        #endregion HomeModule


        #region Media_MngModule
        public const string SeriesMaintaince="SeriesMaintaince";

        #endregion Media_MngModule


        
      
        
        
 
    }
}