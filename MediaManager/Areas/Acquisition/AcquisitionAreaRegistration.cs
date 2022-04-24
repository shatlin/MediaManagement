using System.Web.Mvc;

namespace MediaManager.Areas.Acquisition
{
    public class AcquisitionAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Acquisition";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "Acquisition_default",
                "Acquisition/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
