using System.Web.Mvc;

namespace MediaManager.Areas.MediaManager
{
    public class MediaManagerAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "MediaManager";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "MediaManager_default",
                "MediaManager/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
