using System.Web.Mvc;

namespace MediaManager.Areas.Media_Mgt
{
    public class Media_MgtAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Media_Mgt";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "Media_Mgt_default",
                "Media_Mgt/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
