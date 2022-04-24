using System.Web.Mvc;

namespace MediaManager.Areas.License_Admin
{
    public class License_AdminAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "License_Admin";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "License_Admin_default",
                "License_Admin/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
