using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MediaManager.ProgrammeLibraryServices;
using MediaManager.Areas.Media_Mgt.ViewModels;
using Newtonsoft.Json;
using System.Web.Script.Serialization;
using MediaManager.LookupsServices;
using MediaManager.Infrastructure.Lookups;
using MediaManager.Infrastructure.Authorization;
using MediaManager.Models;
using MediaManager.Infrastructure.Attributes;

namespace MediaManager.Areas.Media_Mgt.Controllers
{
    [HandleErrorWithELMAHAttribute]
    public class SeriesMaintainceController : Controller
    {
        //
        // GET: /Media_Mgt/SeriesMaintaince/

        [CustomAuthorize(Roles = "SEARCHSERIESTITLE")]
        public ActionResult SeriesMaintaince()
        {
            SeriesSearchViewModel seriesSearchViewModel = new SeriesSearchViewModel();
            return View(seriesSearchViewModel);
        }
        [CustomAuthorize(Roles = "ADDSEASON")]
        public PartialViewResult AddSeasonTitle(SeriesSearchViewModel pSeriesSearchViewModel)
        {

            return PartialView("AddSeasonTitle"); 
        }
        [CustomAuthorize(Roles = "AddSeriesTitle")]
        public PartialViewResult AddSeriesTitle(SeriesSearchViewModel pSeriesSearchViewModel)
        {
            SeriesTitleMaintAddUpdateSeriesTitle seriesTitleMaintAddUpdateSeriesTitle = new SeriesTitleMaintAddUpdateSeriesTitle();
            seriesTitleMaintAddUpdateSeriesTitle.SeriesTitle = pSeriesSearchViewModel.SeriesTitle;
            seriesTitleMaintAddUpdateSeriesTitle.SeasonTitle = pSeriesSearchViewModel.SeasonTitle;
            pSeriesSearchViewModel.seriesTitleMaintAddUpdateSeriesTitle = seriesTitleMaintAddUpdateSeriesTitle;
            pSeriesSearchViewModel.seriesTitleMaintAddUpdateSeriesTitle.IsAddSeriesTitle = true;
            pSeriesSearchViewModel.seriesTitleMaintAddUpdateSeriesTitle.UpdateProgrammeTitle = false;
            return PartialView("AddUpdateSeriesTitle", pSeriesSearchViewModel);
        }
        public PartialViewResult UpdateSeriesTitle(SeriesSearchViewModel pSeriesSearchViewModel)
        {
            SeriesTitleMaintAddUpdateSeriesTitle seriesTitleMaintAddUpdateSeriesTitle = new SeriesTitleMaintAddUpdateSeriesTitle();
            seriesTitleMaintAddUpdateSeriesTitle.SeriesTitle = pSeriesSearchViewModel.SeriesTitle;
            seriesTitleMaintAddUpdateSeriesTitle.SeasonTitle = pSeriesSearchViewModel.SeasonTitle;
            pSeriesSearchViewModel.seriesTitleMaintAddUpdateSeriesTitle = seriesTitleMaintAddUpdateSeriesTitle;
            pSeriesSearchViewModel.seriesTitleMaintAddUpdateSeriesTitle.IsAddSeriesTitle = false;
            pSeriesSearchViewModel.seriesTitleMaintAddUpdateSeriesTitle.UpdateProgrammeTitle = false;
            return PartialView("AddUpdateSeriesTitle", pSeriesSearchViewModel);
        }
   
     
        SeriesSearchViewModel seriesSearchViewModel = new SeriesSearchViewModel();
        public void getCombo()
        {

            LookupServiceLookups lookupServiceLookups = new LookupServiceLookups();
            Lookups lookups = new Lookups();

            seriesSearchViewModel.NationalityLOVList = lookupServiceLookups.GetNationalityList();
            seriesSearchViewModel.DistributorLOVList = lookupServiceLookups.GetDistributorList();
            seriesSearchViewModel.genreItemList = lookupServiceLookups.GetSportTypeGenreList();
            seriesSearchViewModel.SecondaryGenreLOVList = lookupServiceLookups.GetSecondaryGenreList();
            seriesSearchViewModel.eventLOVList = lookups.EventTypeList(string.Empty);
            seriesSearchViewModel.programmeTypeLOVList = lookupServiceLookups.GetTypeList();
            seriesSearchViewModel.productioHouseLOVList = lookupServiceLookups.GetProductionHouseList();
            seriesSearchViewModel.officialRating = lookupServiceLookups.GetOfficialRatingList();

        }
        
        [CustomAuthorize(Roles = "SAVECREATEDEPISODE")]
        public PartialViewResult CreateEpisode(SeriesSearchViewModel pSeriesSearchViewModel)
        {

            getCombo();

            return PartialView("CreateChangeEpisode", seriesSearchViewModel);
        }
         [CustomAuthorize(Roles = "SAVEUPDATEDEPISODES")]
        public PartialViewResult ChangeEpisode(SeriesSearchViewModel pSeriesSearchViewModel)
        {
            getCombo();
            return PartialView("CreateChangeEpisode", seriesSearchViewModel);
        }


        public PartialViewResult UpdateSeasonTitle(SeriesSearchViewModel pSeriesSearchViewModel)
        {

            return PartialView("AddSeasonTitle");
        }
        public PartialViewResult EnterUpdateLiveInfo(SeriesSearchViewModel pSeriesSearchViewModel)
        {
            pSeriesSearchViewModel.LoadValuesEnterUpdateLiveInfo();
            return PartialView("EnterUpdateLiveInfo", pSeriesSearchViewModel);
        }
        public PartialViewResult ChangeEpisodenumberWorkingTitle(SeriesSearchViewModel pSeriesSearchViewModel)
        {

            return PartialView("ChangeEpisodenumberWorkingTitle");
        }
        public PartialViewResult ChangeEpisodenumberActualNumber(SeriesSearchViewModel pSeriesSearchViewModel)
        {
            pSeriesSearchViewModel.LoadValuesChangeEpisodeNo();
            return PartialView("ChangeEpisodenumberActualNumber", pSeriesSearchViewModel);
        }                
        
        //public ActionResult AddNewSeries(string AddedSeriesTitle)
        //{
        //    SeriesSearchViewModel seriesSearchViewModel = new SeriesSearchViewModel();
        //    seriesSearchViewModel.SeriesTitle = AddedSeriesTitle;
        //    seriesSearchViewModel.AddUpdateSeriesTitle();
        //    seriesSearchViewModel.getSeasonResult = new List<SeriesVO>();
        //    return View("SeriesDetails",seriesSearchViewModel); 
        //}

        [HttpPost]
        public string AddNewSeries(List<Searchresults> searchresults)
        {
            SeriesSearchViewModel seriesSearchViewModel = new SeriesSearchViewModel();
           JavaScriptSerializer jserilizer=new JavaScriptSerializer();
           seriesSearchViewModel.SeriesTitle = searchresults[0].SeriesTitleList;
           seriesSearchViewModel.AddUpdateSeriesTitle();
           seriesSearchViewModel.getSeasonResult = new List<SeriesVO>();
           return jserilizer.Serialize(seriesSearchViewModel);
        }
        [HttpPost]
        public JsonResult SaveChangeEpisodeNo(SeriesSearchViewModel pSeriesSearchViewModel)
        {
            pSeriesSearchViewModel.MessageToView = "Operation Successful";
            pSeriesSearchViewModel.SaveChangeEpisodeNo();
            return Json(pSeriesSearchViewModel);
        }
        [HttpPost]
        public JsonResult SaveLiveinfo(SeriesSearchViewModel pSeriesSearchViewModel)
        {
            pSeriesSearchViewModel.MessageToView = "Operation Successful";
            pSeriesSearchViewModel.SaveLiveinfo();
            return Json(pSeriesSearchViewModel);
        }
        [HttpPost]
        public JsonResult CreateChangeEpisode(SeriesSearchViewModel pSeriesSearchViewModel)
        {
            pSeriesSearchViewModel.CreateChangeEpisode();
            return Json("this is my error");
        }
        [HttpPost]
        public JsonResult AddUpdateSeriesTitleSave(SeriesSearchViewModel pSeriesSearchViewModel)
        {
            pSeriesSearchViewModel.AddUpdateSeriesTitlepopupSave();
            return Json(pSeriesSearchViewModel);
        }
        public string GetSeriesSearchResult(SeriesSearchViewModel seriesSearchViewModel)
        {
            SeriesVO seriesVO = new SeriesVO();
            ProgrammeVO programme = new ProgrammeVO();
            seriesVO.SeriesTitle = seriesSearchViewModel.SeriesTitle;
            seriesVO.SeasonTitle = seriesSearchViewModel.SeasonTitle;
            programme.ProgrammeTitle = seriesSearchViewModel.EpisodeTitle;
            seriesVO.ProgramDetails = programme;
            seriesVO.SportTimeGenre = seriesSearchViewModel.Genre;
            seriesSearchViewModel.SearchSeries(seriesVO);
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            if (seriesSearchViewModel.searchresults.Count == 0)
            {

                return serializer.Serialize("");
            }
            else
            {
                return serializer.Serialize(seriesSearchViewModel.searchresults);
            }
        }

        [CustomAuthorize(Roles = "ShowSeriesTitleMaintenance")]
        public ActionResult SeriesDetails(string seriestitle, int seriesno)
        {
            SeriesSearchViewModel seriesSearchViewModel = new SeriesSearchViewModel();
            SeriesVO seriesvoRequstInput = new SeriesVO();
            seriesvoRequstInput.SeriesNumber = seriesno;
            seriesvoRequstInput.SeriesTitle = seriestitle;
            seriesSearchViewModel.GetSeasons(seriesvoRequstInput);
            //seriesSearchViewModel.seriesVO.SeriesTitle = seriestitle;
            //seriesSearchViewModel.seriesVO.SeriesNumber = seriesno;
            //seriesSearchViewModel.GetSeasons();
            seriesSearchViewModel.SeriesNumber = seriesno;
            seriesSearchViewModel.SeriesTitle = seriestitle;
            return View(seriesSearchViewModel);
            //return View();
        }

        public string GetSeasonEpisodes(string pSeasonTitle, int pSeasonNumber, string pSeriesTitle, int pSeriesNumber)
        {
            SeriesSearchViewModel seriesSearchViewModel = new SeriesSearchViewModel();
            SeriesVO seriesVO = new SeriesVO();
            seriesVO.SeasonNumber = pSeasonNumber;
            seriesVO.Season_Number = pSeasonNumber.ToString();
            seriesVO.SeasonTitle = pSeasonTitle;
            seriesVO.SeriesNumber = pSeriesNumber;
            seriesVO.SeriesTitle = pSeriesTitle;
            seriesSearchViewModel.GetEpidodes(seriesVO);
            //seriesSearchViewModel.newlistSeriesbvo = seriesSearchViewModesl.getSeasonsList(seriesVO);
            seriesSearchViewModel.DeleteSeasonNumber = pSeasonNumber;
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            return serializer.Serialize(seriesSearchViewModel.getEpisodeResult);

        }

        [HttpPost]
        public JsonResult SaveEpisodeDetails(List<EpisodeDetails> episodeGridList)
        {
            List<SeriesVO> resultVO;
            if (episodeGridList==null || episodeGridList.Count == 0)
            {
                resultVO = new List<SeriesVO>();
                
            }
            else
            {
                SeriesSearchViewModel seriesSearchViewModel = new SeriesSearchViewModel();
                seriesSearchViewModel.MessageToView = "Successful";
                resultVO = seriesSearchViewModel.SaveEpisodeChanges(episodeGridList);
            }
            return Json(resultVO);
        }

        [HttpPost]
        public JsonResult CaptureData(List<EpisodeDetails> jsonData)
        {
            //  string message = string.Format("Successfully processed {0} item(s).", model.CartItems.Count.ToString());
            //object t = TempData["myModel"];
            //List<EpisodeDetails> t1 = (List<EpisodeDetails>)TempData["myModel"];
            return Json("");
        }

        public ActionResult View1()
        {
            return View();
        }
        
        #region LOV'S
        public string GetSeriesLOV(string SeriesTitle)
        {
            SeriesSearchViewModel seriesSearchViewModel = new SeriesSearchViewModel();
            seriesSearchViewModel.SeriesTitle = SeriesTitle;
            seriesSearchViewModel.SeasonTitle = string.Empty;
            seriesSearchViewModel.EpisodeTitle = string.Empty;
            seriesSearchViewModel.Genre = string.Empty;
            seriesSearchViewModel.getSeriesTitleLOVList();
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            var result = from item in seriesSearchViewModel.seriesItemList
                         where item.SeriesTitle.StartsWith(SeriesTitle, StringComparison.CurrentCultureIgnoreCase)
                         orderby item.SeriesTitle
                         select item;

            return serializer.Serialize(result);
        }
        public string GetGenreLOV(string Genre)
        {
            SeriesSearchViewModel seriesSearchViewModel = new SeriesSearchViewModel();
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            if (String.IsNullOrEmpty(Genre))
                Genre = string.Empty;
            seriesSearchViewModel.SeriesTitle = Genre;
            seriesSearchViewModel.SeasonTitle = string.Empty;
            seriesSearchViewModel.EpisodeTitle = string.Empty;
            seriesSearchViewModel.Genre = string.Empty;
            seriesSearchViewModel.getPrimaryGenreLOVList();
            var result = from item in seriesSearchViewModel.genreItemList
                         where item.SportTypeValue.StartsWith(Genre, StringComparison.CurrentCultureIgnoreCase)
                         orderby item.SportTypeValue
                         select item;
            return serializer.Serialize(result);
        }
        public string GetSeasonLOV(string SeasonTitle)
        {
            SeriesSearchViewModel seriesSearchViewModel = new SeriesSearchViewModel();
            seriesSearchViewModel.SeriesTitle = SeasonTitle;
            seriesSearchViewModel.SeasonTitle = string.Empty;
            seriesSearchViewModel.EpisodeTitle = string.Empty;
            seriesSearchViewModel.Genre = string.Empty;
            seriesSearchViewModel.getSeasonTitleLOVList();
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            var result = from item in seriesSearchViewModel.seasonItemList
                         where item.SeasonTitle.StartsWith(SeasonTitle, StringComparison.CurrentCultureIgnoreCase)
                         orderby item.SeasonTitle
                         select item;
            return serializer.Serialize(result);
        }
        public string GetEpisodeLOV(string EpisodeTitle)
        {
            SeriesSearchViewModel seriesSearchViewModel = new SeriesSearchViewModel();
            seriesSearchViewModel.SeriesTitle = EpisodeTitle;
            seriesSearchViewModel.SeasonTitle = string.Empty;
            seriesSearchViewModel.EpisodeTitle = string.Empty;
            seriesSearchViewModel.Genre = string.Empty;
            seriesSearchViewModel.getEpisodeTitleLOVList();
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            serializer.MaxJsonLength = 2147483647;
            var result = from item in seriesSearchViewModel.episodeTitleList
                         where item.SGenTitle.StartsWith(EpisodeTitle, StringComparison.CurrentCultureIgnoreCase)
                         orderby item.SGenTitle
                         select item;
            return serializer.Serialize(result);
        }
        public string GetSubGenreLOV(string subGenre)
        {
            SeriesSearchViewModel seriesSearchViewModel = new SeriesSearchViewModel();
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            if (String.IsNullOrEmpty(subGenre))
                subGenre = string.Empty;
            seriesSearchViewModel.getSubGenreLOVList();
            
            var result = from item in seriesSearchViewModel.SecondaryGenreLOVList
                         where item.SubGenreCodeValue.StartsWith(subGenre, StringComparison.CurrentCultureIgnoreCase)
                         orderby item.SubGenreCodeValue
                         select item;
            return serializer.Serialize(result);
        }        
        public string getEventLOVList(string eventstring)
        {
            SeriesSearchViewModel seriesSearchViewModel = new SeriesSearchViewModel();
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            if (String.IsNullOrEmpty(eventstring))
                eventstring = string.Empty;
            seriesSearchViewModel.getEventTypeLOVList();
            
            var result = from item in seriesSearchViewModel.eventLOVList
                         where item.CodeValue.StartsWith(eventstring, StringComparison.CurrentCultureIgnoreCase)
                         orderby item.CodeValue
                         select item;
            return serializer.Serialize(result);
        }

      

        #endregion LOV'S


        [CustomAuthorize(Roles = "ADDSEASON")]
        [HttpPost]
        public JsonResult SaveSeasonTitle(SeriesSearchViewModel SearchViewModelForSeasonTitle)
        {
            //SearchViewModelForSeasonTitle.MessageToView = "Sucess";
            SearchViewModelForSeasonTitle.SaveUpdateSeasonTitle();
            return Json(SearchViewModelForSeasonTitle.MessageToView);
        }

       

        [CustomAuthorize(Roles = "DELETESEASON")]
        [HttpPost]
        public string DeleteSeasonTitleDetails(string pSeasonTitle, int pSeasonNumber, string pSeriesTitle, int pSeriesNumber)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            List<MediaManager.ProgrammeLibraryServices.AppMessage> messageList = new List<ProgrammeLibraryServices.AppMessage>();
            try
            {
                SeriesSearchViewModel seriesSearchviewmodel = new SeriesSearchViewModel();
                SeriesVO seriesVoobj = new SeriesVO();
                seriesVoobj.SeasonNumber = pSeasonNumber;
                seriesVoobj.SeriesNumber = pSeriesNumber;
                seriesVoobj.SeasonTitle = pSeasonTitle;
                seriesVoobj.SeriesTitle = pSeriesTitle;
                messageList = seriesSearchviewmodel.DeleteSeasonsTitleQuery(seriesVoobj);
                return serializer.Serialize(messageList);
            }
            catch(Exception ex)
            {
                messageList.Add(new MediaManager.ProgrammeLibraryServices.AppMessage() { Type = MediaManager.ProgrammeLibraryServices.MessageTypeEnum.Error, Message = ex.Message });
                messageList.Add(new MediaManager.ProgrammeLibraryServices.AppMessage() { Type = MediaManager.ProgrammeLibraryServices.MessageTypeEnum.Error, Message = ex.Message });
                return serializer.Serialize(messageList); 
            }
        }

        [CustomAuthorize(Roles = "DELETESERIES")]
        [HttpPost]
        public string DeleteSeriesTitleQuery(string SeriesNumber)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            List<MediaManager.ProgrammeLibraryServices.AppMessage> messageList = new List<ProgrammeLibraryServices.AppMessage>();
            try
            {
                SeriesSearchViewModel seriesSearchviewmodel = new SeriesSearchViewModel();
                SeriesVO seriesVo = new SeriesVO();
                seriesVo.SeriesNumber = Convert.ToInt32(SeriesNumber);
                messageList = seriesSearchviewmodel.DeleteSeriesTitleQuery(seriesVo);
                seriesSearchviewmodel.GetSeasons(seriesVo);
                return serializer.Serialize(messageList);
            }
            catch(Exception ex)
            {
                messageList.Add(new MediaManager.ProgrammeLibraryServices.AppMessage() { Type = MediaManager.ProgrammeLibraryServices.MessageTypeEnum.Error, Message = ex.Message });
                messageList.Add(new MediaManager.ProgrammeLibraryServices.AppMessage() { Type = MediaManager.ProgrammeLibraryServices.MessageTypeEnum.Error, Message = ex.Message });
                return serializer.Serialize(messageList); 
            }
        }


        [CustomAuthorize(Roles = "SAVEUPDATEDEPISODES")]
        [HttpPost]
        public string CreateUpdateEpisode(SeriesSearchViewModel pSeriesSearchViewModel)
        {
            List<EpisodeDetails> getEpisodeResult = pSeriesSearchViewModel.CreateUpdateEpisode();

            JavaScriptSerializer serializer = new JavaScriptSerializer();
            return serializer.Serialize(getEpisodeResult);
            // return Json("this is my error");
        }

        public string GetTerritory()
        {
            SeriesSearchViewModel seriesSearchViewModel = new SeriesSearchViewModel();
            GetCompanyCountryCodeLookup objTerritoryLookup = seriesSearchViewModel.GetTerritory();
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            return serializer.Serialize(objTerritoryLookup.LookupItemList);
        }


        [CustomAuthorize(Roles = "SAVEUPDATEDEPISODES")]
        [HttpPost]
        public string changeEpisodeInfo(SeriesSearchViewModel pSeriesSearchViewModel)
        {
            List<EpisodeDetails> getEpisodeResult = pSeriesSearchViewModel.changeEpisodeInfo();

            JavaScriptSerializer serializer = new JavaScriptSerializer();
            return serializer.Serialize(getEpisodeResult);
            
        }
        
        [HttpPost]
        public string DisplayDetailsOnLoad(string seriesnumber, string seasonnumber)
        {
           
            SeriesSearchViewModel objViewModel = new SeriesSearchViewModel();
            SeriesVO objResult = new SeriesVO();
            SeriesVO objSeriesvo = new SeriesVO();
            objSeriesvo.SeriesNumber = Convert.ToInt32(seriesnumber);
            objSeriesvo.SeasonNumber = Convert.ToInt32(seasonnumber);
            objResult=  objViewModel.DisplayEpisodesDetails(objSeriesvo);
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            return serializer.Serialize(objResult); 
        }

        [HttpPost]
        public string GetEpisodeNumbers(string seriesnumber, string seasonnumber)
        {

            SeriesSearchViewModel objViewModel = new SeriesSearchViewModel();
            SeriesVO objResult = new SeriesVO();
            SeriesVO objSeriesvo = new SeriesVO();
            objSeriesvo.SeriesNumber = Convert.ToInt32(seriesnumber);
            objSeriesvo.SeasonNumber = Convert.ToInt32(seasonnumber);
            objResult = objViewModel.GetEpisodeNumbers(objSeriesvo);
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            return serializer.Serialize(objResult);
        }

        public string SaveChangeWorkingtitle(SeriesSearchViewModel pSeriesSearchViewModel)
        {
            string IsSaved = pSeriesSearchViewModel.SaveChangeWorkingtitle();
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            return serializer.Serialize(IsSaved);
        }
    }

}
