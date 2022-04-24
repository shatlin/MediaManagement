using System.Collections.Generic;
using MediaManager.Infrastructure.Helpers;
using MediaManager.InfrastructureService;

namespace MediaManager.Infrastructure.Menu
{
    public class MenuManager
    {
        public static List<MediaManagerMenuVO> GetMenu()
        {
            List<MediaManagerMenuVO> Menu = new List<MediaManagerMenuVO>();
            List<string> modules = new List<string>();
            List<MediaManagerMenuItemVO> subMenu = new List<MediaManagerMenuItemVO>();
            List<MediaManagerMenuItemVO> subMenu1 = null;
            modules = GetModules();
            subMenu = GetSubMenu();
            foreach (string  module in modules)
            {
                subMenu1 = new List<MediaManagerMenuItemVO>();
                foreach (MediaManagerMenuItemVO menuitem in subMenu)
                {
                    if (module == menuitem.Module)
                    {
                        subMenu1.Add(menuitem);
                    }
                }
                Menu.Add(new MediaManagerMenuVO(module,subMenu1));
            }
            return Menu;
        }

        public static List<string> GetModules()
        {
            List<string> Modules = new List<string>();
         
            Modules.Add(AreaConstants.Media_Mgt);
            Modules.Add(AreaConstants.Acquisition);

           //  Modules.Add(AreaConstants.Admin);
           // Modules.Add(AreaConstants.Home);
           // Modules.Add(AreaConstants.MediaManager);
           // Modules.Add(AreaConstants.Finance);
           // Modules.Add(AreaConstants.License_Admin);
           // Modules.Add(AreaConstants.scheduling);
            return Modules;
        }
        public static List<MediaManagerMenuItemVO> GetSubMenu()
        {
            List<MediaManagerMenuItemVO> Controllers = new List<MediaManagerMenuItemVO>();

            Controllers.Add(new MediaManagerMenuItemVO(AreaConstants.Media_Mgt,
                                                        ControllerConstants.SeriesMaintaince, 
                                                        new List<string>(new string[]
                                                                                    { 
                                                                                        
                                                                                        ActionConstants.SeriesMaintaince
                                                                                    }
                                                                         )
                                                           )
                               );

          
            Controllers.Add(new MediaManagerMenuItemVO(AreaConstants.Acquisition, ControllerConstants.DealMemoMaintenance, new List<string>(new string[] 
                                                                                                                  { 
                                                                                                                    ActionConstants.DealMemoSearch, 
                                                                                                                    ActionConstants.DealMemoMaintenance
                                                                                                                  })));
            Controllers.Add(new MediaManagerMenuItemVO(AreaConstants.Acquisition, ControllerConstants.License, new List<string>(new string[] 
                                                                                                                  { 
                                                                                                                    ActionConstants.LicenseReview
                                                                                                                  })));

            //Controllers.Add(new MediaManagerMenuItemVO(AreaConstants.Home, ControllerConstants.Buyer, new List<string>(new string[] 
            //                                                                                                      { 
            //                                                                                                        ActionConstants.SearchTitles,
            //                                                                                                        ActionConstants.ManageTitles,
            //                                                                                                        ActionConstants.ManageSeries,
            //                                                                                                        ActionConstants.GenerateEpisodes
            //                                                                                                      })));
            
            return Controllers;
        }
    }
    public class MediaManagerMenuVO
    {
        public string Module { get; set; }
        public List<MediaManagerMenuItemVO> MenuItem { get; set; }

        public MediaManagerMenuVO(string module, List<MediaManagerMenuItemVO> menuItem)
        {
            this.Module = module;
            this.MenuItem = menuItem;
        }

    }
    public class MediaManagerMenuItemVO
    {
        public string Module { get; set; }
        public string Controller { get; set; }
        public List<string> MenuitemList { get; set; }

        public MediaManagerMenuItemVO(string module, string controller, List<string> menuItemList)
        {
            this.Module = module;
            this.Controller = controller;
            this.MenuitemList = menuItemList;
        }

    }
}