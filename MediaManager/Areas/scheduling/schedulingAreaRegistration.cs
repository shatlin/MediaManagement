using System.Web.Mvc;

namespace MediaManager.Areas.scheduling
{
    public class schedulingAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "scheduling";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "scheduling_default",
                "scheduling/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
