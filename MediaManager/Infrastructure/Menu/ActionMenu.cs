using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MediaManager.Infrastructure.Menu
{
    public class ActionMenu
    {
        public MenuName Index = new MenuName("Index","Index");
        public  MenuName Login = new MenuName("Login","Login");

        #region AcquisitionModule

        public  MenuName DealMemoSearch = new MenuName("Deal Memo Search","Deal Memo Search");
        public  MenuName DealMemoMaintenance = new MenuName("Deal Memo Maintenance","Deal Memo Maintenance");
        public  MenuName LicenseReview = new MenuName("License Review","License Review");

        #endregion AcquisitionModule


        #region Media_MngModule

        public MenuName SeriesMaintaince= new MenuName("Series Maintaince","Series Maintaince");
        public MenuName ProgrammeMaintaince = new MenuName("Programme Maintaince","Programme Maintaince");
      
        #endregion Media_MngModule

    }
}