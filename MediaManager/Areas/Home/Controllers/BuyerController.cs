using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Web.Mvc;
using Oracle.DataAccess.Client;
using StackExchange.Profiling;
using MediaManager.Areas.Home.ViewModels;
using MediaManager.Infrastructure.Attributes;
using MediaManager.Infrastructure.Authorization;
using MediaManager.Infrastructure.Helpers;
using MediaManager.Infrastructure.Logging;
using MediaManager.Models;
using MediaManager.SystemAdminService;
using System.Web.Script.Serialization;

namespace MediaManager.Areas.Home.Controllers
{
    [CustomAuthorize(Roles = SampleRole.Buyer + "," + SampleRole.Admin)]
    public class BuyerController : Controller
    {
        #region : List and Class object declartion
        #region : list for role
        public static List<Role> roleList;
        #endregion
        
        public static List<TaskControlVO> taskControlVolist;
        #region : List for All Task 
        public static List<TaskVO> taskVOlist=null;
        #endregion

        public static List<TaskVO> taskRoleVOlist = null;
        
        public static List<Role> taskRolelist = null;
        
       
        #endregion
        // GET: /Buyer/
        #region PrivateVariables
        ManageSeriesDB manageSeriesDB = new ManageSeriesDB();
        #endregion PrivateVariables
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult SearchTitles()
        {
            return View();
        }
        [OutputCache(CacheProfile = "ZeroCacheProfile")]
        public ActionResult Additem(int listcount)
        {
            return PartialView("AddItemDialog");
        }
        [HttpPost]
        [OutputCache(CacheProfile = "ZeroCacheProfile")]
        public ActionResult Additem(string AddItem)
        {
            //form_mdc.list.Add(AddItem);
            return View("SearchTitles");
            //return RedirectToAction("JQuery");\
        }
        [HttpPost]
        public ActionResult SearchPage(string title, string status, string primary_genre, string secondary_genre, string language, string deal_memo_no, string series, string season)
        {

            #region Sql conncted db
            //string connection = ConfigurationManager.ConnectionStrings["mock_screen"].ToString();
            //SqlConnection con = new SqlConnection(connection);

            ////string query = "select * from faculty where name = @name and pass = @pass";
            //string query = "select * from Search_Table where (Title=@title or  @title IS NULL ) and (Working_Title=@title or @title IS NULL) and (Status=@status or @status IS NULL) and (Primary_Genre=@pgenre or @pgenre IS NULL) and (Secondary_Genre=@sgenre or @sgenre IS NULL) and (Language=@lang or @lang IS NULL) and  (Deal_Memo_No=@dmno or @dmno IS NULL) and (Series=@series or @series IS NULL) and (Season=@season or @season IS NULL)";
            //SqlCommand cmd = new SqlCommand(query, con);
            //SqlParameter param;

            //param = cmd.Parameters.Add("@title", SqlDbType.VarChar, 50);
            //if (String.IsNullOrEmpty(title))
            //    param.Value = DBNull.Value;
            //else
            //    param.Value = title;

            //param = cmd.Parameters.Add("@status", SqlDbType.VarChar, 50);
            //if (String.IsNullOrEmpty(status))
            //    param.Value = DBNull.Value;
            //else
            //    param.Value = status;

            //param = cmd.Parameters.Add("@pgenre", SqlDbType.VarChar, 50);
            //if (String.IsNullOrEmpty(primary_genre))
            //    param.Value = DBNull.Value;
            //else
            //    param.Value = primary_genre;

            //param = cmd.Parameters.Add("@sgenre", SqlDbType.VarChar, 50);
            //if (String.IsNullOrEmpty(secondary_genre))
            //    param.Value = DBNull.Value;
            //else
            //    param.Value = secondary_genre;

            //param = cmd.Parameters.Add("@lang", SqlDbType.VarChar, 50);
            //if (String.IsNullOrEmpty(language))
            //    param.Value = DBNull.Value;
            //else
            //    param.Value = language;

            //param = cmd.Parameters.Add("@dmno", SqlDbType.VarChar, 50);
            //if (String.IsNullOrEmpty(deal_memo_no))
            //    param.Value = DBNull.Value;
            //else
            //    param.Value = deal_memo_no;

            //param = cmd.Parameters.Add("@series", SqlDbType.VarChar, 50);
            //if (String.IsNullOrEmpty(series))
            //    param.Value = DBNull.Value;
            //else
            //    param.Value = series;

            //param = cmd.Parameters.Add("@season", SqlDbType.VarChar, 50);
            //if (String.IsNullOrEmpty(season))
            //    param.Value = DBNull.Value;
            //else
            //    param.Value = season;

            //SqlDataAdapter da = new SqlDataAdapter(cmd);
            //System.Data.DataTable dt = new DataTable("mydt");
            //da.Fill(dt);


            //return PartialView("SearchPartial", dt);
            ////return Content("This cone from content");
            #endregion
            #region oracledb conncted
            string connection = ConfigurationManager.ConnectionStrings["ReviewsConnectionString"].ToString();
            OracleConnection con = new OracleConnection(connection);
            //string query = "select * from Search_Table where (Title=:title or  :title IS NULL ) and (Working_Title=:title or :title IS NULL) and (Status=:status or :status IS NULL) and (Primary_Genre=:pgenre or :pgenre IS NULL) and (Secondary_Genre=:sgenre or :sgenre IS NULL) and (Language=:lang or :lang IS NULL) and  (Deal_Memo_No=:dmno or :dmno IS NULL) and (Series=:series or :series IS NULL) and (Season=:season or :season IS NULL)";
            string query = "select * from Search_Table ";
            //string query;
            OracleCommand cmd = new OracleCommand();
            cmd.Connection = con;
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "PKG_SEARCH_TABLE.SP_SEARCH_TABLE";

            cmd.Parameters.Add("pTITLE", OracleDbType.Varchar2, title, ParameterDirection.Input);
            cmd.Parameters.Add("pSTATUS", OracleDbType.Varchar2, status, ParameterDirection.Input);
            cmd.Parameters.Add("pPGENRE", OracleDbType.Varchar2, primary_genre, ParameterDirection.Input);
            cmd.Parameters.Add("pSGENRE", OracleDbType.Varchar2, secondary_genre, ParameterDirection.Input);
            cmd.Parameters.Add("pLANG", OracleDbType.Varchar2, language, ParameterDirection.Input);
            cmd.Parameters.Add("pDMNO", OracleDbType.Varchar2, deal_memo_no, ParameterDirection.Input);
            cmd.Parameters.Add("pSERIES", OracleDbType.Varchar2, series, ParameterDirection.Input);
            cmd.Parameters.Add("pSEASON", OracleDbType.Varchar2, season, ParameterDirection.Input);
            cmd.Parameters.Add("O_CURSOR", OracleDbType.RefCursor, ParameterDirection.Output);



            OracleDataAdapter da = new OracleDataAdapter(cmd);
            System.Data.DataTable dt = new DataTable("mydt");
            da.Fill(dt);

            return PartialView("SearchPartial", dt);
            //return Content("This cone from content");
            #endregion
        }
        [OutputCache(CacheProfile = "ZeroCacheProfile")]
        public ActionResult Title_popup(string title)
        {
            string connection = ConfigurationManager.ConnectionStrings["ReviewsConnectionString"].ToString();
            OracleConnection con = new OracleConnection(connection);
            OracleCommand cmd = new OracleCommand();
            cmd.Connection = con;
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "PKG_SEARCH_TABLE.TITLE_POPUP";

            cmd.Parameters.Add("pTITLE", OracleDbType.Varchar2, title, ParameterDirection.Input);
            cmd.Parameters.Add("O_CURSOR", OracleDbType.RefCursor, ParameterDirection.Output);

            OracleDataAdapter da = new OracleDataAdapter(cmd);
            System.Data.DataTable dt = new DataTable("mydt");
            da.Fill(dt);
            return PartialView("Titlepopup", dt);
        }
        public ActionResult GetTask_PopUp()
        {

            return PartialView("");
        }
        [HttpPost]
        [OutputCache(CacheProfile = "ZeroCacheProfile")]
        public ActionResult Title_popup_submit(string AddItem)
        {
            //form_mdc.list.Add(AddItem);
            return View("SearchTitles");
            //return RedirectToAction("JQuery");
        }
        public ActionResult ManageTitles()
        {
            return View();
        }
        public ActionResult ManageSeries()
        {

            List<SelectListItem> items = manageSeriesDB.GetSeries();
            ViewBag.Series = items;

            return View();
        }
        public ActionResult AddSeries()
        {
            return PartialView();
        }
        public ActionResult ViewSeriesDetails()
        {
            return PartialView();
        }
        public ActionResult GenerateEpisodes()
        {
            return View();
        }
        [HttpPost]
        [MultiButton(MatchFormKey = "action", MatchFormValue = "Save")]
        public ActionResult ManageSeries(AddSeries add)
        {
            Session["Series"] = add.Series;
            Session["Season"] = add.Season;

            return RedirectToAction(ActionConstants.GenerateEpisodes,
                                    ControllerConstants.Buyer,
                                    new { area = AreaConstants.Home });
        }

        public ActionResult AddTitles()
        {
            AddTitlesViewModel model = new AddTitlesViewModel();
            var profiler = MiniProfiler.Current;
            //lanIDLookup = new LanIDLookup();
            using (profiler.Step("ScreenerController ManageTitles"))
            {
                MediaManagerLogger.StartPerformanceLogging();
                model.LanguageLOVList =model.getLanguageLOVList();
                //model.PrimaryGenreLOVlist = model.getPrimaryGenreLOVList();
                model.SecondaryGenreLOVList = model.getSecondaryGenreLOVList();
                model.ProgrammeTypeLOVList = model.getProgrammeTypeLOVList();
                model.ProgrammeCategoryLOVList = model.getProgrammeCategoryLOVList();
                MediaManagerLogger.StopPerformanceLogging("Screener-ManageTitles", "ManageTitles page of Screener Controller");
                return View(model);
            }
        }
        
    }
}
