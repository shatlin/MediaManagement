using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MediaManager.Infrastructure.Menu
{
    public class ControllerMenu
    {



        public MenuName Account = new MenuName("Account", "Account");
        public MenuName Error = new MenuName("Error", "Error");
        public MenuName Home = new MenuName("Home", "Home");

        #region AcquisitionModule

        public MenuName DealMemoMaintenance = new MenuName("DealMemoMaintenance", "Deal Memo Maintenance");
        public MenuName License = new MenuName("LicenseAdministration", "License Administration");
        

        #endregion AcquisitionModule


        #region Media_MngModule

        
        public MenuName ProgramLibrary = new MenuName("ProgrammeLibrary", "Programme Library");
        public MenuName SeriesMaintaince = new MenuName("SeriesMaintaince", "Series Title Maintenance");
        public MenuName ProgrammeMaintaince = new MenuName("ProgrammeMaintaince", "Programme Maintaince");

        #endregion Media_MngModule



    }
}