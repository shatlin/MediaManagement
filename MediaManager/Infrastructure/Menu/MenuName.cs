using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MediaManager.Infrastructure.Menu
{
    public class MenuName
    {
        public  string MenuLinkName {get;set;}
        public  string MenuDisplayName {get;set;}
        

        public MenuName(string menuLinkName, string menuDisplayName)
        {
            this.MenuLinkName=menuLinkName;
            this.MenuDisplayName=menuDisplayName;
       }
   }
}