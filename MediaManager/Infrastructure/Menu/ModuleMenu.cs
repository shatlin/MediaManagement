using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MediaManager.Infrastructure.Menu
{
    public  class ModuleMenu
    {

      
        public MenuName Finance = new MenuName("Finance", "Finance");
        public MenuName Acquisition = new MenuName("License_Admin", "License Administrartion");
        public MenuName Admin = new MenuName("Admin", "Admin");
        public MenuName Media_Mgt = new MenuName("Media_Mgt", "Media Management");
        public MenuName scheduling = new MenuName("scheduling", "scheduling");



    }
}