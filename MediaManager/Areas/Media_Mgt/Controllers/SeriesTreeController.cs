using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MediaManager.Areas.Media_Mgt.ViewModels;
using MediaManager.DealMemoService;
using System.Web.Script.Serialization;
using MediaManager.Infrastructure.Helpers;
using MediaManager.Infrastructure.Attributes;


namespace MediaManager.Areas.Media_Mgt.Controllers
{
    [HandleErrorWithELMAHAttribute]
    public class SeriesTreeController : Controller
    {
        //public PartialViewResult SeriesTreeLoad(ProgrammeVO selectedPgData, string DMVo_DMNumber, string TypeComboSelection)
        //{
        //    SeriesTreeViewModel seriesTreeViewModel = new SeriesTreeViewModel();
        //    seriesTreeViewModel.SearchDealMemoSeriesDetails(selectedPgData, DMVo_DMNumber, TypeComboSelection);
        //    return PartialView("SeriesTreeLoad");
        //}
        //public ActionResult SeriesTreeLoad(MediaManager.Areas.Acquisition.ViewModels.DealMemoMaintenanceViewModel dd)
        //{


        //    return View();
        //}
       // SeriesTreeViewModel seriesTreeViewModel = new SeriesTreeViewModel();
        public PartialViewResult SeriesTreeLoad(SeriesTreeViewModel seriesTreeViewModel)
        {

            seriesTreeViewModel.SearchDealMemoSeriesDetails(seriesTreeViewModel.DMVo_DMNumber, seriesTreeViewModel.TypeComboSelection, seriesTreeViewModel.RefNo, seriesTreeViewModel.Type, seriesTreeViewModel.ReleaseYear);
            seriesTreeViewModel.LoadDefaultValues();
            return PartialView("SeriesTreeLoad", seriesTreeViewModel);
        }
        public string GetSeasonEpisodes(string series, string season, string DMVo_DMNumber, string TypeComboSelection, string RefNo, string Type, string ReleaseYear)
        {
            SeriesTreeViewModel seriesTreeViewModel = new SeriesTreeViewModel();
            JavaScriptSerializer serializer = new JavaScriptSerializer();

            if (!string.IsNullOrEmpty(series + season + DMVo_DMNumber + TypeComboSelection + RefNo + Type))
            {
                seriesTreeViewModel.SearchDealMemoSeriesDetails(DMVo_DMNumber, TypeComboSelection, RefNo, Type, ReleaseYear);
                seriesTreeViewModel.GetSeasonEpisodes(series, season);
            }
            seriesTreeViewModel.LoadValues();
            return serializer.Serialize(seriesTreeViewModel);
        }
        public string GenerateSeasonEpisodes(SeriesTreeViewModel seriesTreeViewModel)
        {
            return seriesTreeViewModel.GenerateSeasonEpisodes(seriesTreeViewModel);
          
        }

        public string AddSeasonSave(SeriesTreeViewModel seriesTreeViewModel)
        {
            return seriesTreeViewModel.AddSeasonSave(seriesTreeViewModel);
        }


        public string SaveEpisodeDetails(SeriesTreeViewModel seriesTreeViewModel)
        {

            return seriesTreeViewModel.SaveEpisodeDetails(seriesTreeViewModel);
        }

    }
}
