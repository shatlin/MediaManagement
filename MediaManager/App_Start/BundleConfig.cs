using System.Web;
using System.Web.Optimization;

namespace MediaManager
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Content/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Content/Scripts/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Content/Scripts/jquery.unobtrusive*",
                        "~/Content/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Content/Scripts/modernizr-*"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/styles/Project.css",
                "~/Content/styles/style.css",
                "~/Content/styles/jquery-ui.css",
                "~/Content/SlickGrid-master/slick.grid.css",
                "~/Content/SlickGrid-master/examples/slick-default-theme.css"
                ));


            bundles.Add(new StyleBundle("~/Content/seriedetailstyles").Include(
                "~/Content/styles/treeview.css",
                "~/Content/styles/jquery.contextMenu.css"
              ));

            bundles.Add(new ScriptBundle("~/Content/seriedetailscripts").Include(
                "~/Content/Scripts/Helper/treeview.js",
                "~/Content/Scripts/jquery/jquery.contextMenu.js"
           ));



            bundles.Add(new ScriptBundle("~/Content/AllCorescripts").Include(
                              "~/Content/SlickGrid-master/lib/jquery-1.7.min.js",
                              "~/Content/Scripts/jquery/jquery-ui-1.8.20.min.js",
                            "~/Content/SlickGrid-master/lib/jquery.event.drag-2.0.min.js",
                            "~/Content/SlickGrid-master/slick.core.js",
                            "~/Content/SlickGrid-master/slick.dataview.js",
                            "~/Content/SlickGrid-master/slick.grid.js",
                            "~/Content/SlickGrid-master/slick.editors.js",
                            "~/Content/SlickGrid-master/slick.formatters.js",
                            "~/Content/SlickGrid-master/plugins/slick.rowselectionmodel.js",
                            "~/Content/Scripts/Helper/SlickGridManager.js",
                            "~/Content/Scripts/Helper/shortcut.js",
                            "~/Content/Scripts/jquery/jquery.unobtrusive-ajax.js",
                            "~/Content/Scripts/jquery/Jquery_BrowserCompatibility.js",
                            "~/Content/Scripts/Helper/Validation.js",
                            "~/Content/Scripts/jquery/jquery.validate.min.js",
                            "~/Content/Scripts/jquery/jquery.validate.unobtrusive.min.js"
                 ));




            bundles.Add(new ScriptBundle("~/Content/GridCheckboxscripts").Include(

                            "~/Content/SlickGrid-master/plugins/slick.checkboxselectcolumn.js",
                            "~/Content/SlickGrid-master/plugins/slick.autotooltips.js",
                            "~/Content/SlickGrid-master/plugins/slick.cellrangedecorator.js",
                            "~/Content/SlickGrid-master/plugins/slick.cellrangeselector.js",
                            "~/Content/SlickGrid-master/plugins/slick.cellcopymanager.js",
                            "~/Content/SlickGrid-master/plugins/slick.cellselectionmodel.js",
                            "~/Content/SlickGrid-master/plugins/slick.rowselectionmodel.js"
                ));



            bundles.Add(new ScriptBundle("~/Content/LoginPagescripts").Include(
                         "~/Content/Scripts/jquery/jquery-latest.min.js",
                         "~/Content/Scripts/jquery/jquery.unobtrusive-ajax.js",
                         "~/Content/Scripts/jquery/Jquery_BrowserCompatibility.js",
                         "~/Content/noty/jquery.noty.js",
                         "~/Content/noty/layouts/bottom.js",
                            "~/Content/Scripts/jquery/jquery.validate.min.js",
                            "~/Content/Scripts/jquery/jquery.validate.unobtrusive.min.js"
            ));



            bundles.Add(new ScriptBundle("~/Content/NotyScripts").Include(
                         "~/content/noty/jquery.noty.js",
                           "~/content/noty/layouts/bottom.js",
                           "~/content/noty/layouts/bottomCenter.js",
                           "~/content/noty/layouts/bottomLeft.js",
                           "~/content/noty/layouts/bottomRight.js",
                           "~/content/noty/layouts/center.js",
                           "~/content/noty/layouts/centerLeft.js",
                           "~/content/noty/layouts/centerRight.js",
                           "~/content/noty/layouts/inline.js",
                           "~/content/noty/layouts/top.js",
                           "~/content/noty/layouts/topCenter.js",
                           "~/content/noty/layouts/topLeft.js",
                           "~/content/noty/layouts/topRight.js",
                           "~/content/noty/themes/default.js",
                         "~/Content/Scripts/Helper/Common.js"
            ));


            //bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
            //            "~/Content/themes/base/jquery.ui.core.css",
            //            "~/Content/themes/base/jquery.ui.resizable.css",
            //            "~/Content/themes/base/jquery.ui.selectable.css",
            //            "~/Content/themes/base/jquery.ui.accordion.css",
            //            "~/Content/themes/base/jquery.ui.autocomplete.css",
            //            "~/Content/themes/base/jquery.ui.button.css",
            //            "~/Content/themes/base/jquery.ui.dialog.css",
            //            "~/Content/themes/base/jquery.ui.slider.css",
            //            "~/Content/themes/base/jquery.ui.tabs.css",
            //            "~/Content/themes/base/jquery.ui.datepicker.css",
            //            "~/Content/themes/base/jquery.ui.progressbar.css",
            //            "~/Content/themes/base/jquery.ui.theme.css"));

            BundleTable.EnableOptimizations = true;
        }
    }
}