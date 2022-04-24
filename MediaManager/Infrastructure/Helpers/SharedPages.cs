using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MediaManager.Infrastructure.Helpers
{
    public class SharedPages
    {
        public const string ErrorPage = @"~/Areas/Home/Views/Shared/Error.cshtml";
        public const string LayoutPage = @"~/Areas/Home/Views/Shared/_Layout.cshtml";
        public const string ReportLayoutPage = @"~/Areas/Home/Views/Shared/_ReportLayout.cshtml";
        public const string LayoutLoginPage = @"~/Areas/Home/Views/Shared/_LayoutLoginPage.cshtml";
        public const string UnauthorizedPage = @"~/Areas/Home/Views/Shared/Http403.cshtml";
        public const string LoginPartialPage = @"~/Areas/Home/Views/Shared/_LoginPartial.cshtml";
        public const string UnhandledError = @"~/Areas/Home/Views/Shared/Http500.cshtml";
        
    }
}