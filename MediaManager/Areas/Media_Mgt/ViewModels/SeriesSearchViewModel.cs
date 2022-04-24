using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MediaManager.ProgrammeLibraryServices;
using System.ComponentModel.DataAnnotations;
using MediaManager.LookupsServices;
using MediaManager.Infrastructure.Helpers;
using MediaManager.Infrastructure.Lookups;
using System.Web.Script.Serialization;


namespace MediaManager.Areas.Media_Mgt.ViewModels
{
    
    [Serializable]
    public class Searchresults
    {
        public string SeriesTitleList { get; set; }
        public int SeriesTitleNoList { get; set; }
        public string gridstatus { get; set; }
        public Searchresults(string SeriesTitleList, int SeriesTitleNoList)
        {
            this.SeriesTitleList = SeriesTitleList;
            this.SeriesTitleNoList = SeriesTitleNoList;
        }
        public Searchresults() { }

    }

    [Serializable]
    public class EpisodeDetails
    {
        public string SequenceEpisodeno { get; set; }
        public string GenRefNo { get; set; }
        public string EpisodeTitle { get; set; }
        public string Duration { get; set; }
        public string SportTypeGenre { get; set; }
        public string SubGenre { get; set; }
        public string EventType { get; set; }
        public string LicStart { get; set; }
        public string LicEnd { get; set; }
        public string Vennue { get; set; }
        public string Location { get; set; }
        public string LiveDate { get; set; }
        public string LiveTime { get; set; }
        public string Comments { get; set; }
        public string gridstatus { get; set; }

        public string ProgramMaxEpisodeNo { get; set; }
        public string ProgrammeCategory { get; set; }
        public string ProgrameRatingMPAA { get; set; }
        public string ProgrammeReleaseYear { get; set; }
        public string ProgrammeStudio { get; set; }
        public string ProgramRatingINT { get; set; }
        public string SynopsisDetails_Local { get; set; }
        public string SynopsisDetails_Full { get; set; }
        public string ProgType { get; set; }
        public string ProgrammeEPINumber { get; set; }
        public string ProgrammeTitle { get; set; }
        public string PersistFlag { get; set; }



        public EpisodeDetails(string SequenceEpisodeno, string GenRefNo, string EpisodeTitle, string Duration, string SportTypeGenre, string SubGenre, string EventType, string LicStart, string LicEnd, string Vennue, string Location, string LiveDate, string LiveTime, string Comments, string gridstatus,
             string ProgramMaxEpisodeNo, string ProgrammeCategory, string ProgrameRatingMPAA, string ProgrammeReleaseYear, string ProgrammeStudio, string ProgramRatingINT, string SynopsisDetails_Local, string SynopsisDetails_Full, string ProgType, string ProgrammeEPINumber, string ProgrammeTitle, string PersistFlag)

           
        {
            this.SequenceEpisodeno = SequenceEpisodeno;
            this.GenRefNo = GenRefNo;
            this.EpisodeTitle = EpisodeTitle;
            this.Duration = Duration;
            this.SportTypeGenre = SportTypeGenre;
            this.SubGenre = SubGenre;
            this.EventType = EventType;
            this.LicStart = LicStart;
            this.LicEnd = LicEnd;
            this.Vennue = Vennue;
            this.Location = Location;
            this.LiveDate = LiveDate;
            this.LiveTime = LiveTime;
            this.Comments = Comments;
            this.gridstatus = gridstatus;

            this.ProgramMaxEpisodeNo = ProgramMaxEpisodeNo;
            this.ProgrammeCategory = ProgrammeCategory;
            this.ProgrameRatingMPAA = ProgrameRatingMPAA;
            this.ProgrammeReleaseYear = ProgrammeReleaseYear;
            this.ProgrammeStudio = ProgrammeStudio;
            this.ProgramRatingINT = ProgramRatingINT;
            this.SynopsisDetails_Local = SynopsisDetails_Local;
            this.SynopsisDetails_Full = SynopsisDetails_Full;
            this.ProgType = ProgType;
            this.ProgrammeEPINumber = ProgrammeEPINumber;
            this.ProgrammeTitle = ProgrammeTitle;
            this.PersistFlag = PersistFlag;
        }
        public EpisodeDetails()
        { }
    }

    [Serializable]
    public class EpisodeWorkingTitle
    {
        public string Example { get; set; }
        public string EpisodeFrom { get; set; }
        public string EpisodeTo { get; set; }
        public string EpisodeTo1 { get; set; }
        public string EpisodeTo2 { get; set; }
        public string AdditionalText { get; set; }
        public bool checkedSeries { get; set; }
        public bool checkedSeasons { get; set; }
        public bool checkedAdditionaltext { get; set; }
        public bool checkedLeadingZeros { get; set; }
        public EpisodeWorkingTitle(string txtexample, string txtepisodeFrom, string EpisodeTo, string EpisodeTo1, string EpisodeTo2, string AdditionalText, bool checkedSeries,
            bool checkedSeasons, bool checkedAdditionaltext, bool checkedLeadingZeros)
        {
            this.Example = txtexample;
            this.EpisodeFrom = txtepisodeFrom;
            this.EpisodeTo = EpisodeTo;
            this.EpisodeTo1 = EpisodeTo1;
            this.EpisodeTo2 = EpisodeTo2;
            this.AdditionalText = AdditionalText;
            this.checkedSeries = checkedSeries;
            this.checkedSeasons = checkedSeasons;
            this.checkedAdditionaltext = checkedAdditionaltext;
            this.checkedLeadingZeros = checkedLeadingZeros;

        }
        public EpisodeWorkingTitle()
        {

        }
    }

    [Serializable]
    public class SeriesSearchViewModel
    {

        [Display(Name = "Series Title")]
        public string SeriesTitle { get; set; }
        [Display(Name = "Season Title")]
        public string SeasonTitle { get; set; }
        [Display(Name = "Episode Title")]
        public string EpisodeTitle { get; set; }
        [Display(Name = "Sport Type/Genre")]
        public string Genre { get; set; }

        public int SeriesNumber { get; set; }
        public int SeasonNumber { get; set; }
        public List<Searchresults> searchresults;
        public List<SeriesVO> getSeasonResult { get; set; }
        public List<EpisodeDetails> getEpisodeResult { get; set; }
        public string MessageToView { get; set; }

        public SeriesTitleMaintChangeEpisodeNo seriesTitleMaintChangeEpisodeNo { get; set; }
        public SeriesTitleMaintenanaceEnterUpdateLiveInfo enterUpdateLiveInfo { get; set; }
        public SeriesTitleMaintenanaceCrChEpisode seriesTitleMaintenanaceCrChEpisode { get; set; }
        public SeriesTitleMaintAddUpdateSeriesTitle seriesTitleMaintAddUpdateSeriesTitle { get; set; }
        public SeriesTitleChangeEpisode seriesTitleChangeEpisode { get; set; }


        public AddSeasonTitle addSeasonTitle { get; set; }


        public List<SportTypeLookupItem> genreItemList;
        public List<SeriesLookupItem> seriesItemList;
        public List<SeasonLookupItem> seasonItemList;
        public List<EpisodeTitleLookupItem> episodeTitleList;
        public List<SubGenreLookupItem> SecondaryGenreLOVList;
        public List<GetGenNationalityLookupItem> NationalityLOVList;
        public List<GetGenDistributorLookupItem> DistributorLOVList;
        public List<MediaManager.AcquisitionLookupService.EventLookupItem> eventLOVList;
        public List<ProgrammeTypeLookupItem> programmeTypeLOVList;
        public List<StudioCodeLookupItem> productioHouseLOVList;
        public List<GetGenRatingMPAALookupItem> officialRating;
        public List<GetGenRatingMPAALookupItem> unofficialRating;
        List<SeriesVO> newepisodeSeriesVOList;


        LOVLoader LOVLoader = new LOVLoader();
        AcquisitionLOVLoader acquisitionLOVLoader = new AcquisitionLOVLoader();


        public List<EpisodeWorkingTitle> episodeWorkingTitle { get; set; }
        public SeriesTitleManitChangeEpisodeWorkingNo seriesTitleMaintChangeEpisodeWorkingNo { get; set; }
        public DeleteSeasonTitle deleteSeasonTitle { get; set; }
        public int DeleteSeriesNumber { get; set; }
        public int DeleteSeasonNumber { get; set; }
        public string DeleteSeriesTitle { get; set; }
        public string DelSeasonTitle { get; set; }



        MediaManager.LookupsServices.SeasonLookup seasonTitleLookup;
        public class DeleteSeasonTitle
        {
            public int DeleteSeriesNumber { get; set; }
            public int DeleteSeasonNumber { get; set; }
            public string DeleteSeriesTitle { get; set; }
            public string DelSeasonTitle { get; set; }
            public DeleteSeasonTitle()
            {

            }
            public DeleteSeasonTitle(int delSeasonNo, int delSeriesNo, string delSeasonTitle, string delSeriesTitle)
            {
                this.DeleteSeasonNumber = delSeasonNo;
                this.DelSeasonTitle = delSeasonTitle;
                this.DeleteSeriesNumber = delSeriesNo;
                this.DeleteSeriesTitle = delSeriesTitle;
            }
        }

        public void GetSeasons(SeriesVO pSeriesVO)
        {
            ProgrammeLibraryClient proxy = null;
            SeriesVO seriesvoResult = new SeriesVO();
            MediaManager.ProgrammeLibraryServices.DisplaySeasonResponse response = new MediaManager.ProgrammeLibraryServices.DisplaySeasonResponse();
            try
            {
                proxy = new ProgrammeLibraryClient();
                DisplaySeasonRequest request = new DisplaySeasonRequest();
                request.GetSeasonTitleReq = pSeriesVO;
                response = proxy.DisplaySeasonTitle(request);

            }
            finally
            {
                proxy.Close();
            }
            getSeasonResult = response.GetSeasonTitleRes;

        }

        public List<SeriesVO> getSeasonsList(SeriesVO pSeriesVO)
        {
            ProgrammeLibraryClient proxy = null;
            SeriesVO seriesvoResult = new SeriesVO();
            MediaManager.ProgrammeLibraryServices.DisplaySeasonResponse response = new MediaManager.ProgrammeLibraryServices.DisplaySeasonResponse();
            try
            {
                proxy = new ProgrammeLibraryClient();
                DisplaySeasonRequest request = new DisplaySeasonRequest();
                request.GetSeasonTitleReq = pSeriesVO;
                response = proxy.DisplaySeasonTitle(request);

            }
            finally
            {
                proxy.Close();
            }
            getSeasonResult = response.GetSeasonTitleRes;
            return getSeasonResult;

        }

        public void GetEpidodes(SeriesVO pSeriesVO)
        {
            ProgrammeLibraryClient proxy = null;
            DisplayEpisodeResponse response = new DisplayEpisodeResponse();
            try
            {
                proxy = new ProgrammeLibraryClient();
                DisplayEpisodeRequest request = new DisplayEpisodeRequest();
                request.DispalyEpisodeVO = pSeriesVO;
                response = proxy.DisplayEpisodesQuery(request);

            }
            finally
            {
                proxy.Close();
            }
            string tempLiveTime;
            TimeSpan ts;
            string hr;
            string min;
            getEpisodeResult = new List<EpisodeDetails>();
            string comment;
            string tmp_SynopsisDetails_Local = string.Empty;
            string tmp_SynopsisDetails_Full = string.Empty;

            foreach (SeriesVO item in response.DisplayEpisodesList)
            {
                comment = item.ProgramDetails.ProgrameComment;
                if (String.IsNullOrEmpty(comment))
                    comment = string.Empty;
                try
                {
                    if (item.ProgramDetails.SynopsisDetails != null)
                    {

                        tmp_SynopsisDetails_Local = item.ProgramDetails.SynopsisDetails.SynopsisDetails_Local;
                        tmp_SynopsisDetails_Full = item.ProgramDetails.SynopsisDetails.SynopsisDetails_Full;
                    }
                    if (item.ProgramDetails.ProgramLIveInfo.LiveTime != null)
                    {
                        ts = TimeSpan.FromSeconds(Convert.ToDouble(item.ProgramDetails.ProgramLIveInfo.LiveTime.ToString()));

                        if (Convert.ToInt32(ts.Hours) <= 9)
                            hr = "0" + ts.Hours;
                        else
                            hr = ts.Hours.ToString();

                        if (Convert.ToInt32(ts.Minutes) <= 9)
                            min = "0" + ts.Minutes;
                        else
                            min = ts.Minutes.ToString();
                        tempLiveTime = hr + ":" + min;
                    }
                    else
                        tempLiveTime = null;
                    
                       // tempLiveTime
                    getEpisodeResult.Add(new EpisodeDetails(item.ProgramDetails.ProgrammeEPINumber.ToString(), item.ProgramDetails.ProgrammeRefNo.ToString(), item.ProgramDetails.ProgrammeTitle, item.ProgramDetails.ProgrammeDurationC, item.ProgramDetails.ProgrammeCategory, item.ProgramDetails.ProgramSubGenre, item.ProgramDetails.ProgramEvent, item.ProgramDetails.ProgramLicenseDetails.LicStart, item.ProgramDetails.ProgramLicenseDetails.LicEnd, item.ProgramDetails.ProgramLIveInfo.LiveVenue, item.ProgramDetails.ProgramLIveInfo.LiveLocation, item.ProgramDetails.ProgramLIveInfo.LiveDate, tempLiveTime, comment, string.Empty, item.ProgramDetails.ProgramMaxEpisodeNo.ToString(), item.ProgramDetails.ProgrammeCategory, item.ProgramDetails.ProgrameRatingMPAA, item.ProgramDetails.ProgrammeReleaseYear.ToString(), item.ProgramDetails.ProgrameRatingMPAA, item.ProgramDetails.ProgrammeReleaseYear.ToString(), tmp_SynopsisDetails_Local, tmp_SynopsisDetails_Full, item.ProgramDetails.ProgramType, Convert.ToString(item.ProgramDetails.ProgrammeEPINumber), item.ProgramDetails.ProgrammeTitle, Convert.ToString(item.ProgramDetails.PersistFlag)));
                    //, item.ProgramDetails.ProgrammeCategory, item.ProgramDetails.ProgrameRatingMPAA, item.ProgramDetails.ProgrammeReleaseYear.ToString(), item.ProgramDetails.ProgrammeStudio, item.ProgramDetails.ProgramRatingINT, item.ProgramDetails.SynopsisDetails.SynopsisDetails_Local, item.ProgramDetails.SynopsisDetails.SynopsisDetails_Full));
                }
                catch (Exception ex)
                {
                    throw ex;
                }

            }
        }

        public List<SeriesVO> ChangeEpisodesDetailsOnClose(List<SeriesVO> saveDetails)
        {
            ProgrammeLibraryClient proxy = null;
            SaveChangedEpisodesOnCloseResponse response = new SaveChangedEpisodesOnCloseResponse();
            try
            {
                proxy = new ProgrammeLibraryClient();
                SaveChangedEpisodesOnCloseRequest request = new SaveChangedEpisodesOnCloseRequest();
                request.ChangedEpisodeOnClose = saveDetails;
                response = proxy.SaveChangedEpisodesOnClose(request);
                if (response.Messages != null && response.Messages.Count > 0)
                {
                    if (response.ChangedEpisodeOnClose == null)
                    {
                        response.ChangedEpisodeOnClose = new List<SeriesVO>();
                        SeriesVO seriesVo = new SeriesVO();
                        response.ChangedEpisodeOnClose.Add(seriesVo);
                    }
                    response.ChangedEpisodeOnClose[0].Messages = response.Messages;
                }
                else
                {
                   // response.ChangedEpisodeOnClose[0].Messages = null;
                }
            }
            finally
            {
                proxy.Close();
            }
            return response.ChangedEpisodeOnClose;
        }

        public void SearchSeries(SeriesVO pSeriesVO)
        {
            ProgrammeLibraryClient proxy = null;
            ProgrammeVO programme = new ProgrammeVO();
            SearchSeriesTitleResponse response = new SearchSeriesTitleResponse();
            try
            {
                proxy = new ProgrammeLibraryClient();
                proxy.Open();
                SearchSeriesTitleRequest request = new SearchSeriesTitleRequest();
                request.SearchSeriesTitleReq = pSeriesVO;
                response = proxy.SearchSeriesTitleQuery(request);

                searchresults = new List<Searchresults>();

                foreach (SeriesVO item in response.SearchSeriesTitleRes)
                {
                    searchresults.Add(new Searchresults(item.SeriesTitle, item.SeriesNumber));

                }

            }
            finally
            {
                proxy.Close();
            }

        }

        public void LoadValuesChangeEpisodeNo()
        {
            SeriesVO seriesVO = new SeriesVO();
            seriesVO.SeasonNumber = this.SeasonNumber;
            seriesVO.Season_Number = this.SeasonNumber.ToString();
            seriesVO.SeasonTitle = this.SeasonTitle;
            seriesVO.SeriesNumber = this.SeriesNumber;
            seriesVO.SeriesTitle = this.SeriesTitle;
            this.GetEpidodes(seriesVO);
            this.seriesTitleMaintChangeEpisodeNo = new SeriesTitleMaintChangeEpisodeNo();
            this.seriesTitleMaintChangeEpisodeNo.SrcEpisodeFrom = (this.getEpisodeResult.Min(entry => Convert.ToInt32(entry.SequenceEpisodeno))).ToString();
            this.seriesTitleMaintChangeEpisodeNo.SrcEpisodeTo = (this.getEpisodeResult.Max(entry => Convert.ToInt32(entry.SequenceEpisodeno))).ToString();
        }
        public void SaveChangeEpisodeNo()
        {

            int srcEpisodFrom = Convert.ToInt32((this.seriesTitleMaintChangeEpisodeNo.SrcEpisodeFrom));
            int srcEpisodTo = Convert.ToInt32((this.seriesTitleMaintChangeEpisodeNo.SrcEpisodeTo));
            int desEpisodFrom = Convert.ToInt32((this.seriesTitleMaintChangeEpisodeNo.DesEpisodeFrom));
            int desEpisodTo = Convert.ToInt32((this.seriesTitleMaintChangeEpisodeNo.DesEpisodeTo));
            int integerTemp;
            SeriesVO tempseriesVO = new SeriesVO();
            tempseriesVO.SeasonNumber = this.SeasonNumber;
            tempseriesVO.Season_Number = this.SeasonNumber.ToString();
            tempseriesVO.SeasonTitle = this.SeasonTitle;
            tempseriesVO.SeriesNumber = this.SeriesNumber;
            tempseriesVO.SeriesTitle = this.SeriesTitle;
            this.GetEpidodes(tempseriesVO);

            for (int i = desEpisodFrom; i <= desEpisodTo; i++)
            {
                foreach (EpisodeDetails item in this.getEpisodeResult)
                {
                    if (Convert.ToInt32(item.SequenceEpisodeno) == i)
                    {
                        MessageToView = "Episode number already exist.";
                        return;
                    }
                }
            }


            integerTemp = srcEpisodFrom - 1;
            List<EpisodeDetails> newepisodedetailsList = new List<EpisodeDetails>();
            foreach (EpisodeDetails current in this.getEpisodeResult)
            {
                newepisodedetailsList.Add(current);
                if (Convert.ToInt32(current.SequenceEpisodeno) >= srcEpisodFrom && Convert.ToInt32(current.SequenceEpisodeno) <= srcEpisodTo)
                {
                    if (Convert.ToInt32(current.SequenceEpisodeno) == (integerTemp + 1))
                    {
                        integerTemp = Convert.ToInt32(current.SequenceEpisodeno);
                        current.SequenceEpisodeno = desEpisodFrom.ToString();
                        desEpisodFrom++;
                        newepisodedetailsList[newepisodedetailsList.Count - 1].gridstatus = "Edit";
                    }
                    else
                    {
                        MessageToView = "You are trying to change non-existent episode number. please check.";
                        newepisodedetailsList = null;
                        break;
                    }
                }
            }

            if (newepisodedetailsList != null)
            {
                //newepisodedetailsList = new List<SeriesVO>(SaveEpisodeTitle(newepisodedetailsList));
                //SeriesDetailsList = episodeSeriesVOList;
                //SetSeriesVOList();
                //OnCloseView();
                SaveEpisodeNoChanges(newepisodedetailsList);
            }

        }

        protected List<SeriesVO> transferSerisVOListToEpisodeDetails(List<EpisodeDetails> episodeGridList)
        {
            List<SeriesVO> seriesVO = new List<SeriesVO>();
            SeriesVO seriesVOItem;
            //List<SeriesVO> tempListSave = new List<SeriesVO>();
            ProgrammeVO programVO;
            ProgramLicenseReviewVO programlicensereviewVO;
            ProgramLiveInfoVO programLiveInfoVO;
            
            string[] hrmin;
            foreach (var item in episodeGridList)
            {
                seriesVOItem = new SeriesVO();
                programVO = new ProgrammeVO();
                programLiveInfoVO = new ProgramLiveInfoVO();
                programlicensereviewVO = new ProgramLicenseReviewVO();
                programVO.ProgrammeTitle = item.EpisodeTitle;
                programVO.ProgrammeDurationC = item.Duration;
                programVO.ProgrammeCategory = item.SportTypeGenre;
                programVO.ProgramSubGenre = item.SubGenre;
                programVO.ProgrammeEPINumber = Convert.ToInt32(item.SequenceEpisodeno);
                programVO.ProgrammeRefNo = Convert.ToInt32(item.GenRefNo);
                programVO.ProgramEvent = item.EventType;
                programVO.ProgrameComment = item.Comments;

                programlicensereviewVO.LicStart = item.LicStart;
                programlicensereviewVO.LicEnd = item.LicEnd;

                programVO.ProgramLicenseDetails = programlicensereviewVO;

                programLiveInfoVO.LiveDate = item.LiveDate;
                programLiveInfoVO.LiveLocation = item.Location;
                if (item.LiveTime != null)
                {
                    if (item.LiveTime.Contains(":"))
                    {
                        hrmin = item.LiveTime.Split(':');
                        programLiveInfoVO.LiveTime = (3600 * Convert.ToInt32(hrmin[0]) + (60 * Convert.ToInt32(hrmin[1])));
                        programLiveInfoVO.LiveTimeString = (3600 * Convert.ToInt32(hrmin[0]) + (60 * Convert.ToInt32(hrmin[1]))).ToString();
                    }
                    else
                    {
                        programLiveInfoVO.LiveTime = Convert.ToInt32(item.LiveTime);
                        programLiveInfoVO.LiveTimeString = Convert.ToInt32(item.LiveTime).ToString();
                    }
                }
                programLiveInfoVO.LiveVenue = item.Vennue;

                programVO.ProgramLIveInfo = programLiveInfoVO;

                seriesVOItem.ProgramDetails = programVO;

                if (item.gridstatus == "Edit")
                {
                    seriesVOItem.PersistFlag = PersistFlagEnum.Modified;
                }
                else if (item.gridstatus == "New")
                {
                    seriesVOItem.PersistFlag = PersistFlagEnum.Added;
                }
                else if (item.gridstatus == "Delete")
                {
                    seriesVOItem.PersistFlag = PersistFlagEnum.Deleted;
                }
                else
                {
                    seriesVOItem.PersistFlag = PersistFlagEnum.UnModified;
                }
                seriesVO.Add(seriesVOItem);


            }
            return seriesVO;
        }

        public void SaveEpisodeNoChanges(List<EpisodeDetails> episodeGridList)
        {
            List<EpisodeDetails> seriesEpisodeListTemp = new List<EpisodeDetails>(episodeGridList.Where<EpisodeDetails>(s => s.gridstatus == "Edit" || s.gridstatus == "New" || s.gridstatus == "Delete").ToList());
            List<SeriesVO> seriesVO = transferSerisVOListToEpisodeDetails(episodeGridList);
            ProgrammeLibraryClient proxy = null;
            SaveChangedEpisodeNoActualResponse response = new SaveChangedEpisodeNoActualResponse();
            try
            {
                proxy = new ProgrammeLibraryClient();
                SaveChangedEpisodeNoActualRequest request = new SaveChangedEpisodeNoActualRequest();
                request.ChangeEpisodeNoListVO = seriesVO;
                response = proxy.SaveChangedEpisodeNoActualQuery(request);
            }
            finally
            {
                proxy.Close();
            }
            return;



        }
        public void CreateChangeEpisode()
        {

        }
        public void LoadValuesEnterUpdateLiveInfo()
        {
            SeriesVO seriesVO = new SeriesVO();
            seriesVO.SeasonNumber = this.SeasonNumber;
            seriesVO.Season_Number = this.SeasonNumber.ToString();
            seriesVO.SeasonTitle = this.SeasonTitle;
            seriesVO.SeriesNumber = this.SeriesNumber;
            seriesVO.SeriesTitle = this.SeriesTitle;
            this.GetEpidodes(seriesVO);
            this.enterUpdateLiveInfo = new SeriesTitleMaintenanaceEnterUpdateLiveInfo();
            this.enterUpdateLiveInfo.SrcEpisodeFrom = (this.getEpisodeResult.Min(entry => Convert.ToInt32(entry.SequenceEpisodeno))).ToString();
            this.enterUpdateLiveInfo.SrcEpisodeTo = (this.getEpisodeResult.Max(entry => Convert.ToInt32(entry.SequenceEpisodeno))).ToString();
            this.enterUpdateLiveInfo.DefaultDate = DateTime.Today.ToShortDateString();
        }
        public void SaveLiveinfo()
        {
            List<EpisodeDetails> newepisodedetailsList = new List<EpisodeDetails>();

            {
                int integerScrEpisodeFrom = Convert.ToInt32(this.enterUpdateLiveInfo.SrcEpisodeFrom);
                int integerScrEpisodeTo = Convert.ToInt32(this.enterUpdateLiveInfo.SrcEpisodeTo);
                int integerDate = Convert.ToInt32(this.enterUpdateLiveInfo.DaysBetween);
                int integerTemp = (integerScrEpisodeFrom - 1);
                DateTime dateSelected = Convert.ToDateTime(this.enterUpdateLiveInfo.DefaultDate);
                dateSelected = dateSelected.AddDays(-integerDate);
                SeriesVO tempseriesVO = new SeriesVO();
                tempseriesVO.SeasonNumber = this.SeasonNumber;
                tempseriesVO.Season_Number = this.SeasonNumber.ToString();
                tempseriesVO.SeasonTitle = this.SeasonTitle;
                tempseriesVO.SeriesNumber = this.SeriesNumber;
                tempseriesVO.SeriesTitle = this.SeriesTitle;
                this.GetEpidodes(tempseriesVO);
                foreach (EpisodeDetails current in this.getEpisodeResult)
                {
                    newepisodedetailsList.Add(current);
                    if (Convert.ToInt32(current.SequenceEpisodeno) >= integerScrEpisodeFrom && Convert.ToInt32(current.SequenceEpisodeno) <= integerScrEpisodeTo)
                    {
                        if (Convert.ToInt32(current.SequenceEpisodeno) == (integerTemp + 1))
                        {
                            integerTemp = Convert.ToInt32(current.SequenceEpisodeno);
                            current.LiveDate = (Convert.ToDateTime(dateSelected.AddDays(integerDate)).ToString("dd-MMM-yyyy"));
                            integerDate = integerDate + Convert.ToInt32(this.enterUpdateLiveInfo.DaysBetween);
                            //current.ProgramDetails.ProgramLIveInfo.LiveTime = Convert.ToInt32(View.TextDefaultTime.Text.Trim());
                            current.LiveTime = (3600 * Convert.ToInt32(this.enterUpdateLiveInfo.DefaultTime) + (60 * Convert.ToInt32(this.enterUpdateLiveInfo.DefaultTimeMinutes))).ToString();
                            newepisodedetailsList[newepisodedetailsList.Count - 1].gridstatus = "Edit";
                        }
                        else
                        {
                            MessageToView = "You are trying to change live info non-existent episode number. please check.";
                            newepisodedetailsList = null;
                            break;
                        }
                    }

                }
                if (newepisodedetailsList != null)
                {
                    SaveEpisodeLiveInfo(newepisodedetailsList);
                    //SeriesEpisodeList = episodeSeriesVOList;
                    //SetSeriesVOList();
                    //OnCloseView();
                }
            }

        }
        public void SaveEpisodeLiveInfo(List<EpisodeDetails> episodeGridList)
        {
            List<EpisodeDetails> seriesEpisodeListTemp = new List<EpisodeDetails>(episodeGridList.Where<EpisodeDetails>(s => s.gridstatus == "Edit" || s.gridstatus == "New" || s.gridstatus == "Delete").ToList());
            List<SeriesVO> seriesVO = transferSerisVOListToEpisodeDetails(episodeGridList);
            ProgrammeLibraryClient proxy = null;
            SaveEnterUpdateLiveInfoResponse response = new SaveEnterUpdateLiveInfoResponse();
            try
            {
                proxy = new ProgrammeLibraryClient();
                SaveEnterUpdateLiveInfoRequest request = new SaveEnterUpdateLiveInfoRequest();
                request.UpdateLiveInfoSeriesVOList = seriesVO;
                response = proxy.SaveEnterUpdateLiveInfoQuery(request);
            }
            finally
            {
                proxy.Close();
            }
            return;
        }

        public SeriesVO AddUpdateSeriesTitle()
        {
            SeriesVO seriesvo = new SeriesVO();
            AddSeriesTitleResponse response = new AddSeriesTitleResponse();
            seriesvo.SeriesTitle = this.SeriesTitle;
            seriesvo.SeriesNumber = 0;
            if (seriesvo.SeriesTitle.Trim().ToUpper() == "")
            {
                this.MessageToView = "Please enter series name.";
            }
            else
            {
                ProgrammeLibraryClient proxy = null;

                try
                {
                    proxy = new ProgrammeLibraryClient();
                    AddSeriesTitleRequest request = new AddSeriesTitleRequest();
                    request.AddSeriesVO = seriesvo;

                    response = proxy.AddSeriesTitleQuery(request);
                    this.MessageToView = "Operation Successful";
                }
                finally
                {
                    proxy.Close();

                }
                if (response.Messages != null)
                {
                    this.MessageToView = string.Empty;
                    foreach (ProgrammeLibraryServices.AppMessage item in response.Messages)
                    {
                        this.MessageToView = this.MessageToView + item.Message;
                    }
                }

            }
            if (response.AddSeriesTitleRes != null)
                this.SeriesNumber = response.AddSeriesTitleRes.SeriesNumber;
            return response.AddSeriesTitleRes;
        }
        public void AddUpdateSeriesTitlepopupSave()
        {
            SeriesVO seriesVO = new SeriesVO();
            seriesVO.SeriesTitle = this.seriesTitleMaintAddUpdateSeriesTitle.SeriesTitle;
            bool isSaved = true;
            if (this.seriesTitleMaintAddUpdateSeriesTitle.IsAddSeriesTitle)
            {
                ProgrammeLibraryClient proxy = null;
                AddSeriesTitleResponse response = new AddSeriesTitleResponse();
                try
                {
                    proxy = new ProgrammeLibraryClient();
                    AddSeriesTitleRequest request = new AddSeriesTitleRequest();
                    request.AddSeriesVO = seriesVO;
                    response = proxy.AddSeriesTitleQuery(request);

                }
                finally
                {
                    seriesVO = response.AddSeriesTitleRes;
                    proxy.Close();
                }
                //return response.AddSeriesTitleRes;

            }
            else
            {
                seriesVO.SeriesNumber = this.SeriesNumber;
                if (this.seriesTitleMaintAddUpdateSeriesTitle.UpdateProgrammeTitle == true)
                {
                    seriesVO.IsProgramChk = (this.seriesTitleMaintAddUpdateSeriesTitle.UpdateProgrammeTitle == true) ? Convert.ToString(1) : Convert.ToString(0);
                    seriesVO.IsSeasonChk = (this.seriesTitleMaintAddUpdateSeriesTitle.CheckSeason == true) ? Convert.ToString(1) : Convert.ToString(0);
                    seriesVO.IsEpisodeChk = (this.seriesTitleMaintAddUpdateSeriesTitle.CheckEpisodeNo == true) ? Convert.ToString(1) : Convert.ToString(0);
                    seriesVO.IsSerieschk = (this.seriesTitleMaintAddUpdateSeriesTitle.CheckSeries == true) ? Convert.ToString(1) : Convert.ToString(0);
                    seriesVO.IsLeadingZeroChk = (this.seriesTitleMaintAddUpdateSeriesTitle.CheckLeadZero == true) ? Convert.ToString(1) : Convert.ToString(0);
                    seriesVO.AddtionalText = this.seriesTitleMaintAddUpdateSeriesTitle.AdditionalText.Trim();
                    //addText = View.TextAdditionalText.Text.Trim();
                    //this.seriesVO.EpisodeTitle = new string(' ', 1);
                    seriesVO.EpisodeTitle = this.SeriesTitle;
                }
                ProgrammeLibraryClient proxy = null;

                UpdateSeriesTitleResponse response = new UpdateSeriesTitleResponse();
                try
                {
                    proxy = new ProgrammeLibraryClient();
                    UpdateSeriesTitleRequest request = new UpdateSeriesTitleRequest();
                    request.UpdateSeriesVO = seriesVO;
                    response = proxy.UpdateSeriesQuery(request);

                }
                finally
                {
                    isSaved = response.UpdateSeriesTitleRes;
                    proxy.Close();
                }

            }
            if (isSaved == true && seriesVO != null)
            {
                this.MessageToView = "Record Saved Successfully.";
                this.SeriesTitle = seriesVO.SeriesTitle;
                this.SeriesNumber = seriesVO.SeriesNumber;
            }
            else
            {
                this.MessageToView = "Series Title already exist.";
            }
        }
        public List<SeriesVO> SaveEpisodeChanges(List<EpisodeDetails> episodeGridList)
        {
            List<SeriesVO> tempListSave = new List<SeriesVO>();
            List<SeriesVO> seriesVO;
            string[] hr;
            int rowNo = 0;
            bool isSaved = true;
            if (episodeGridList == null || episodeGridList.Count == 0)
            {
                this.MessageToView = "No changes to save.";
                isSaved = false;
            }
            else
            {
                seriesVO = transferSerisVOListToEpisodeDetails(episodeGridList);

                foreach (SeriesVO sVO in seriesVO)
                {
                    if (sVO.ProgramDetails != null)
                    {
                        if (sVO.ProgramDetails.ProgrammeTitle == null || sVO.ProgramDetails.ProgrammeTitle.Trim().Length <= 0)
                        {
                            this.MessageToView = "Please enter Episode Title.";
                            isSaved = false;
                            break;
                        }
                        if (sVO.ProgramDetails.ProgrammeCategory == null || sVO.ProgramDetails.ProgrammeCategory.Trim().Length <= 0)
                        {
                            sVO.ProgramDetails.ProgrammeCategory = "-";
                        }
                        rowNo++;
                        if (sVO.ProgramDetails.ProgramLIveInfo != null)
                        {
                            if (sVO.ProgramDetails.ProgramLIveInfo.LiveTimeString != null && sVO.ProgramDetails.ProgramLIveInfo.LiveTimeString.Trim().Length > 0)
                            {
                                if (sVO.ProgramDetails.ProgramLIveInfo.LiveTimeString.Contains(':'))
                                {
                                    hr = sVO.ProgramDetails.ProgramLIveInfo.LiveTimeString.Split(':');
                                    sVO.ProgramDetails.ProgramLIveInfo.LiveTime = (3600 * Convert.ToInt32(hr[0].Trim())) + (60 * Convert.ToInt32(hr[1].Trim()));
                                }
                                else
                                {
                                    sVO.ProgramDetails.ProgramLIveInfo.LiveTime = Convert.ToInt32(sVO.ProgramDetails.ProgramLIveInfo.LiveTimeString);
                                }
                            }
                            else
                            {
                                sVO.ProgramDetails.ProgramLIveInfo.LiveTime = null;
                            }
                        }
                    }
                }

                if (isSaved)
                    tempListSave = ChangeEpisodesDetailsOnClose(seriesVO);
                else
                    this.MessageToView = "Some error occured";
            }
            return tempListSave;
        }

        #region LOV's

        public void getPrimaryGenreLOVList()
        {
            MediaManager.LookupsServices.SportTypeLookup sportTypeLookup;
            sportTypeLookup = new MediaManager.LookupsServices.SportTypeLookup();
            List<MediaManager.LookupsServices.SportTypeLookupItem> PrimaryGenreLOVList = new List<MediaManager.LookupsServices.SportTypeLookupItem>();
            sportTypeLookup = LOVLoader.GetGenre();
            foreach (MediaManager.LookupsServices.SportTypeLookupItem lookupitem in sportTypeLookup.LookupItemList)
            {
                PrimaryGenreLOVList.Add(lookupitem);
            }
            this.genreItemList = PrimaryGenreLOVList;
        }

        public void getSeriesTitleLOVList()
        {
            MediaManager.LookupsServices.SeriesLookup seriesTitleLookup;
            seriesTitleLookup = new MediaManager.LookupsServices.SeriesLookup();
            List<MediaManager.LookupsServices.SeriesLookupItem> seriesTitleLOVList = new List<MediaManager.LookupsServices.SeriesLookupItem>();
            seriesTitleLookup = LOVLoader.GetSeriesLOV();
            foreach (MediaManager.LookupsServices.SeriesLookupItem lookupitem in seriesTitleLookup.LookupItemList)
            {
                seriesTitleLOVList.Add(lookupitem);
            }
            this.seriesItemList = seriesTitleLOVList;
        }

        public void getSeasonTitleLOVList()
        {
            seasonTitleLookup = new MediaManager.LookupsServices.SeasonLookup();
            List<MediaManager.LookupsServices.SeasonLookupItem> SeasonTitleLOVList = new List<MediaManager.LookupsServices.SeasonLookupItem>();
            seasonTitleLookup = LOVLoader.GetSeasonLOV();
            foreach (MediaManager.LookupsServices.SeasonLookupItem lookupitem in seasonTitleLookup.LookupItemList)
            {
                SeasonTitleLOVList.Add(lookupitem);
            }
            this.seasonItemList = SeasonTitleLOVList;
        }

        public void getEpisodeTitleLOVList()
        {
            MediaManager.LookupsServices.EpisodeTitleLookup episodeTitleLookup;
            episodeTitleLookup = new MediaManager.LookupsServices.EpisodeTitleLookup();
            List<MediaManager.LookupsServices.EpisodeTitleLookupItem> episodeTitleLOVList = new List<MediaManager.LookupsServices.EpisodeTitleLookupItem>();
            episodeTitleLookup = LOVLoader.GetEpisodeTitle();
            foreach (MediaManager.LookupsServices.EpisodeTitleLookupItem lookupitem in episodeTitleLookup.LookupItemList)
            {
                episodeTitleLOVList.Add(lookupitem);
            }
            this.episodeTitleList = episodeTitleLOVList;
        }

        public void getSubGenreLOVList()
        {
            MediaManager.LookupsServices.SubGenreLookup subGenreLookup;
            subGenreLookup = new MediaManager.LookupsServices.SubGenreLookup();
            List<MediaManager.LookupsServices.SubGenreLookupItem> subGenreLOVList = new List<MediaManager.LookupsServices.SubGenreLookupItem>();
            subGenreLookup = LOVLoader.GetSecGenreLOV();
            foreach (MediaManager.LookupsServices.SubGenreLookupItem lookupitem in subGenreLookup.LookupItemList)
            {
                subGenreLOVList.Add(lookupitem);
            }
            this.SecondaryGenreLOVList = subGenreLOVList;
        }


        public void getEventTypeLOVList()
        {
            MediaManager.AcquisitionLookupService.EventLookup eventLookup;
            eventLookup = new MediaManager.AcquisitionLookupService.EventLookup();
            List<MediaManager.AcquisitionLookupService.EventLookupItem> eventLOVList = new List<MediaManager.AcquisitionLookupService.EventLookupItem>();
            eventLookup = acquisitionLOVLoader.GetEventLOV();
            foreach (MediaManager.AcquisitionLookupService.EventLookupItem lookupitem in eventLookup.LookupItemList)
            {
                eventLOVList.Add(lookupitem);
            }
            this.eventLOVList = eventLOVList;
        }

        public GetCompanyCountryCodeLookup GetTerritory()
        {
            LookupsClient proxy = null;
            GetCompanyCountryCodeResponse response = new GetCompanyCountryCodeResponse();
            try
            {
                proxy = new LookupsClient();
                proxy.Open();
                GetCompanyCountryCodeRequest request = new GetCompanyCountryCodeRequest();
                response = proxy.GetCompanyCountryCode(request);
            }
            finally
            {
                proxy.Close();
            }
            return response.Lookup;
        }
        #endregion LOV's
        public List<MediaManager.ProgrammeLibraryServices.AppMessage> DeleteSeasonsTitleQuery(SeriesVO pSeriesvo)
        {
            ProgrammeLibraryClient proxy = null;
            DeleteSeasonResponse response = new DeleteSeasonResponse();
            DeleteSeasonRequest request = new DeleteSeasonRequest();
            try
            {
                proxy = new ProgrammeLibraryClient();
                proxy.Open();
                SeriesVO seriesVOobj = new SeriesVO();
                request.DeleteSeasonVO = pSeriesvo;
                response = proxy.DeleteSeasonTitleQuery(request);
            }
            catch
            {

            }
            finally
            {
                proxy.Close();
            }
            List<MediaManager.ProgrammeLibraryServices.AppMessage> messageList = response.Messages;
            return messageList;
        }

        public List<MediaManager.ProgrammeLibraryServices.AppMessage> DeleteSeriesTitleQuery(SeriesVO pSeriesvo)
        {
            ProgrammeLibraryClient proxy = null;
            DeleteSeriesTitleResponse response = new DeleteSeriesTitleResponse();
            DeleteSerieTitleRequest request = new DeleteSerieTitleRequest();
            try
            {
                proxy = new ProgrammeLibraryClient();
                proxy.Open();
                SeriesVO seriesVo = new SeriesVO();
                request.DeleteSeriesVO = pSeriesvo;
                response = proxy.DeleteSeriesTitleQuery(request);
            }
            catch
            {

            }
            finally
            {
                proxy.Close();
            }
            List<MediaManager.ProgrammeLibraryServices.AppMessage> messageList = response.Messages;
            return messageList;
        }

        public SeriesVO DisplayEpisodesDetails(SeriesVO getDetails)
        {
            ProgrammeLibraryClient proxy = null;
            GetEpisodeDetailsResponse response = new GetEpisodeDetailsResponse();
            try
            {
                proxy = new ProgrammeLibraryClient();
                GetEpisodeDetailsRequest request = new GetEpisodeDetailsRequest();
                request.GetEpisodeDetailsSeriesVO = getDetails;
                response = proxy.GetEpisodeDetailsQuery(request);
                
            }
            finally
            {
                proxy.Close();
            }
            return response.GetEpisodesDetailsSeriesVO;

        }

        public SeriesVO GetEpisodeNumbers(SeriesVO seriesVO)
        {
            ProgrammeLibraryClient proxy = null;
            GetEpisodesCountRequest request = new GetEpisodesCountRequest();
            GetEpisodesCountResponse response = new GetEpisodesCountResponse();

            try
            {
                proxy = new ProgrammeLibraryClient();
                proxy.Open();
                request.GetEpisodesCountReq = seriesVO;
                response = proxy.GetEpisodesCountQuery(request);
                
            }
            finally
            {
                proxy.Close();
            }

            return response.GetEpisodesCountRes;
        }


        public void SaveUpdateSeasonTitle()
        {
            //string addText = "";
            SeriesVO seasonVO = new SeriesVO();

            if (this.addSeasonTitle.SeasonTitle != null)
            {
                if (this.addSeasonTitle.SeasonTitle.Length <= 60)
                {

                    seasonVO.SeasonTitle = this.addSeasonTitle.SeasonTitle;
                    seasonVO.Season_Number = this.addSeasonTitle.SeasonNumber;
                    seasonVO.SeriesTitle = this.addSeasonTitle.SeriesTitle;
                    bool isSaved = true;

                    if (this.addSeasonTitle.Flag)
                    {
                        //this.SeriesVO.SeasonNumber, this.SeriesVO.SeasonTitle, this.SeriesVO.Season_Number, this.SeriesVO.IsProgramChk, this.SeriesVO.IsSerieschk, this.SeriesVO.IsSeasonChk, this.SeriesVO.AddtionalText, this.SeriesVO.IsEpisodeChk, this.SeriesVO.IsLeadingZeroChk, loginUser.Trim()

                        if (this.addSeasonTitle.IsProgramChk == true)
                        {
                            seasonVO.IsProgramChk = (this.addSeasonTitle.IsProgramChk == true) ? Convert.ToString(1) : Convert.ToString(0);
                            seasonVO.IsSeasonChk = (this.addSeasonTitle.IsSeasonChks == true) ? Convert.ToString(1) : Convert.ToString(0);
                            seasonVO.IsEpisodeChk = (this.addSeasonTitle.IsEpisodeChk == true) ? Convert.ToString(1) : Convert.ToString(0);
                            seasonVO.IsSerieschk = (this.addSeasonTitle.IsSerieschk == true) ? Convert.ToString(1) : Convert.ToString(0);
                            seasonVO.IsLeadingZeroChk = (this.addSeasonTitle.IsLeadingZeroChk == true) ? Convert.ToString(1) : Convert.ToString(0);

                            seasonVO.AddtionalText = this.addSeasonTitle.AddtionalText;

                            //seasonVO.EpisodeTitle = new string(' ', 1);
                            //seasonVO.EpisodeTitle = this.addSeasonTitle.EpisodeTitle;
                        }
                        else
                        {

                            seasonVO.IsProgramChk = (this.addSeasonTitle.IsProgramChk == true) ? Convert.ToString(1) : Convert.ToString(0);
                            seasonVO.IsSeasonChk = (this.addSeasonTitle.IsSeasonChks == true) ? Convert.ToString(1) : Convert.ToString(0);
                            seasonVO.IsEpisodeChk = (this.addSeasonTitle.IsEpisodeChk == true) ? Convert.ToString(1) : Convert.ToString(0);
                            seasonVO.IsSerieschk = (this.addSeasonTitle.IsSerieschk == true) ? Convert.ToString(1) : Convert.ToString(0);
                            seasonVO.IsLeadingZeroChk = (this.addSeasonTitle.IsLeadingZeroChk == true) ? Convert.ToString(1) : Convert.ToString(0);
                            seasonVO.AddtionalText = this.addSeasonTitle.AddtionalText;
                        }

                        seasonVO.SeasonNumber = Convert.ToInt32(this.addSeasonTitle.SeasonNumber); ;


                        ProgrammeLibraryClient proxy = null;
                        UpdateSeasonTitleResponse response = new UpdateSeasonTitleResponse();
                        try
                        {
                            proxy = new ProgrammeLibraryClient();
                            proxy.Open();
                            UpdateSeasonTitleRequest request = new UpdateSeasonTitleRequest();
                            request.UpdateSeasonVO = seasonVO;

                            response = proxy.UpdateSeasonQuery(request);

                        }
                        catch (Exception ex)
                        {
                            throw ex;
                        }
                        finally
                        {
                            proxy.Close();
                        }

                        isSaved = response.UpdateSeasonTitleRes;
                        // SeasonDetails = this.seasonVO;
                        // SetSeasonVO();
                        //OnCloseView();

                    }
                    else
                    {


                        ProgrammeLibraryClient proxy = null;
                        AddSeasonTitleResponse response = new AddSeasonTitleResponse();
                        try
                        {

                            proxy = new ProgrammeLibraryClient();

                            proxy.Open();
                            AddSeasonTitleRequest request = new AddSeasonTitleRequest();

                            request.AddSeasonVO = seasonVO;
                            response = proxy.AddSeasonTitleQuery(request);
                            // ShowApplicationMessage(response.Messages);
                        }
                        catch (Exception ex)
                        {
                            throw ex;
                        }

                        finally
                        {
                            proxy.Close();
                        }

                        SeriesVO seriesVO = response.AddSeasonTitleRes;

                        if (seriesVO == null)
                        {
                            isSaved = false;
                            //SeasonDetails = seriesVO;
                            //SetSeasonVO();
                            //OnCloseView();
                        }

                        if (isSaved == true)
                        {

                            this.MessageToView = "Record Saved Successfully.";

                        }
                    }

                }
                else
                {
                    this.MessageToView = "Season Title length can not be more than 30 characters.";
                }

            }

        }

        public List<EpisodeDetails> CreateUpdateEpisode()
        {

            List<EpisodeDetails> getTmpList = new List<EpisodeDetails>();
            List<EpisodeDetails> getEpisodeResultTemp = new List<EpisodeDetails>();

            string btnTextValue = this.seriesTitleMaintenanaceCrChEpisode.ButtonText;
            string strSaveFlag = this.seriesTitleMaintenanaceCrChEpisode.BtnSaveFlag;

            if (strSaveFlag != null && strSaveFlag.Equals("Save") && this.seriesTitleMaintenanaceCrChEpisode.Flag == true)
            {
                ChangeEpisodeDetails();
            }

            if (strSaveFlag != null && strSaveFlag.Equals("Save") && this.seriesTitleMaintenanaceCrChEpisode.Flag == false && this.seriesTitleMaintenanaceCrChEpisode.ChangeEpisode == false)
            {
                SaveCreatedEpisode();
            }
            else if (this.seriesTitleMaintenanaceCrChEpisode.ChangeEpisode == false && this.seriesTitleMaintenanaceCrChEpisode.Flag == false && this.seriesTitleMaintenanaceCrChEpisode.CommonFlag == null)
            {



                string temp_local_synopsis = "";
                string temp_full_synopsis = "";



                bool bln = this.seriesTitleMaintenanaceCrChEpisode.Flag;


                List<SeriesVO> tempListSave = new List<SeriesVO>();
                DisplayEpisodeResponse response = new DisplayEpisodeResponse();



                SeriesVO tempseriesVO = new SeriesVO();
                tempseriesVO.SeasonNumber = Convert.ToInt32(this.seriesTitleMaintenanaceCrChEpisode.SeasonNumber);
                tempseriesVO.Season_Number = this.seriesTitleMaintenanaceCrChEpisode.SeasonNumber;
                tempseriesVO.SeasonTitle = this.seriesTitleMaintenanaceCrChEpisode.SeasonTitle;
                tempseriesVO.SeriesNumber = Convert.ToInt32(this.seriesTitleMaintenanaceCrChEpisode.SeriesNumber);
                tempseriesVO.SeriesTitle = this.seriesTitleMaintenanaceCrChEpisode.SeriesTitle;

                this.GetEpidodes(tempseriesVO);


                try
                {

                    if (btnTextValue.Equals("Generate"))
                    {


                        int num;
                        if (this.seriesTitleMaintenanaceCrChEpisode.NumofEpisodes == string.Empty)
                        {
                            num = 0;
                        }
                        else
                        {
                            if (int.TryParse(this.seriesTitleMaintenanaceCrChEpisode.NumofEpisodes, out num))
                                num = Convert.ToInt32(this.seriesTitleMaintenanaceCrChEpisode.NumofEpisodes);
                            else
                            {
                                this.MessageToView = "Please enter number of episodes to create.";
                                // return;
                            }
                        }



                        if (num > 0)
                        {

                            for (int i = 0; i < num; i++)
                            {
                                ProgrammeVO tempList = new ProgrammeVO();
                                SynopsisDetailsVO tempSynopsis = new SynopsisDetailsVO();
                                List<SynopsisDetailsVO> tempSynopsisList = new List<SynopsisDetailsVO>();
                                SeriesVO tempSeries = new SeriesVO();

                                int first_epiNo = Convert.ToInt32(this.seriesTitleMaintenanaceCrChEpisode.FirstEpiNum);
                                tempList.ProgrammeEPINumber = first_epiNo + i;


                                if (tempList.ProgrammeEPINumber <= 9)
                                {
                                    tempList.ProgrammeTitle = (this.seriesTitleMaintenanaceCrChEpisode.PrTitleZero + " " + this.seriesTitleMaintenanaceCrChEpisode.PrTitleOne +
                                       " " + this.seriesTitleMaintenanaceCrChEpisode.PrTitleTwo);

                                    tempList.ProgrammeWorkingTitle = (this.seriesTitleMaintenanaceCrChEpisode.WrkTitleZero + " " + this.seriesTitleMaintenanaceCrChEpisode.WrkTitleOne +
                                    " " + this.seriesTitleMaintenanaceCrChEpisode.WrkTitleTwo);// + " " + strWrkTitle[3].ToString() + (seriesVO.ProgramDetails.ProgramMaxEpisodeNo + i).ToString()).Trim();


                                    if (this.seriesTitleMaintenanaceCrChEpisode.CheckEpisodeNum == true)
                                    {
                                        if (this.seriesTitleMaintenanaceCrChEpisode.CheckLeadZero == true)
                                        {
                                            tempList.ProgrammeWorkingTitle += " " + "000" + (first_epiNo + i).ToString();
                                            tempList.ProgrammeWorkingTitle = (tempList.ProgrammeWorkingTitle).Trim();
                                        }
                                        else
                                        {
                                            tempList.ProgrammeWorkingTitle += " " + (first_epiNo + i).ToString();
                                            tempList.ProgrammeWorkingTitle = tempList.ProgrammeWorkingTitle.Trim();
                                        }
                                    }

                                    if (this.seriesTitleMaintenanaceCrChEpisode.CheckPrEpisodeNum == true)
                                    {
                                        if (this.seriesTitleMaintenanaceCrChEpisode.CheckPrLeadZero == true)
                                        {
                                            tempList.ProgrammeTitle += " " + "000" + (first_epiNo + i).ToString();
                                            tempList.ProgrammeTitle = (tempList.ProgrammeTitle).Trim();
                                        }
                                        else
                                        {
                                            tempList.ProgrammeTitle += " " + (first_epiNo + i).ToString();
                                            tempList.ProgrammeTitle = tempList.ProgrammeTitle.Trim();
                                        }
                                    }
                                }

                                else if (tempList.ProgrammeEPINumber <= 99)
                                {

                                    tempList.ProgrammeTitle = (this.seriesTitleMaintenanaceCrChEpisode.PrTitleZero + " " + this.seriesTitleMaintenanaceCrChEpisode.PrTitleOne +
                                       " " + this.seriesTitleMaintenanaceCrChEpisode.PrTitleTwo);

                                    tempList.ProgrammeWorkingTitle = (this.seriesTitleMaintenanaceCrChEpisode.WrkTitleZero + " " + this.seriesTitleMaintenanaceCrChEpisode.WrkTitleOne +
                                    " " + this.seriesTitleMaintenanaceCrChEpisode.WrkTitleTwo);

                                    if (this.seriesTitleMaintenanaceCrChEpisode.CheckEpisodeNum == true)
                                    {
                                        if (this.seriesTitleMaintenanaceCrChEpisode.CheckLeadZero == true)
                                        {
                                            tempList.ProgrammeWorkingTitle += " " + "00" + (first_epiNo + i).ToString();
                                            tempList.ProgrammeWorkingTitle = (tempList.ProgrammeWorkingTitle).Trim();
                                        }
                                        else
                                        {
                                            tempList.ProgrammeWorkingTitle += " " + (first_epiNo + i).ToString();
                                            tempList.ProgrammeWorkingTitle = tempList.ProgrammeWorkingTitle.Trim();
                                        }
                                    }

                                    if (this.seriesTitleMaintenanaceCrChEpisode.CheckPrEpisodeNum == true)
                                    {
                                        if (this.seriesTitleMaintenanaceCrChEpisode.CheckPrLeadZero == true)
                                        {
                                            tempList.ProgrammeTitle += " " + "00" + (first_epiNo + i).ToString();
                                            tempList.ProgrammeTitle = (tempList.ProgrammeTitle).Trim();
                                        }
                                        else
                                        {
                                            tempList.ProgrammeTitle += " " + (first_epiNo + i).ToString();
                                            tempList.ProgrammeTitle = tempList.ProgrammeTitle.Trim();
                                        }
                                    }

                                }

                                else if (tempList.ProgrammeEPINumber <= 999)
                                {

                                    tempList.ProgrammeTitle = (this.seriesTitleMaintenanaceCrChEpisode.PrTitleZero + " " + this.seriesTitleMaintenanaceCrChEpisode.PrTitleOne +
                                       " " + this.seriesTitleMaintenanaceCrChEpisode.PrTitleTwo);

                                    tempList.ProgrammeWorkingTitle = (this.seriesTitleMaintenanaceCrChEpisode.WrkTitleZero + " " + this.seriesTitleMaintenanaceCrChEpisode.WrkTitleOne +
                                    " " + this.seriesTitleMaintenanaceCrChEpisode.WrkTitleTwo);

                                    if (this.seriesTitleMaintenanaceCrChEpisode.CheckEpisodeNum == true)
                                    {
                                        if (this.seriesTitleMaintenanaceCrChEpisode.CheckLeadZero == true)
                                        {
                                            tempList.ProgrammeWorkingTitle += " " + "0" + (first_epiNo + i).ToString();
                                            tempList.ProgrammeWorkingTitle = (tempList.ProgrammeWorkingTitle).Trim();
                                        }
                                        else
                                        {
                                            tempList.ProgrammeWorkingTitle += " " + (first_epiNo + i).ToString();
                                            tempList.ProgrammeWorkingTitle = tempList.ProgrammeWorkingTitle.Trim();
                                        }
                                    }

                                    if (this.seriesTitleMaintenanaceCrChEpisode.CheckPrEpisodeNum == true)
                                    {
                                        if (this.seriesTitleMaintenanaceCrChEpisode.CheckPrLeadZero == true)
                                        {
                                            tempList.ProgrammeTitle += " " + "0" + (first_epiNo + i).ToString();
                                            tempList.ProgrammeTitle = (tempList.ProgrammeTitle).Trim();
                                        }
                                        else
                                        {
                                            tempList.ProgrammeTitle += " " + (first_epiNo + i).ToString();
                                            tempList.ProgrammeTitle = tempList.ProgrammeTitle.Trim();
                                        }
                                    }

                                }
                                else
                                {
                                    tempList.ProgrammeTitle = (this.seriesTitleMaintenanaceCrChEpisode.PrTitleZero + " " + this.seriesTitleMaintenanaceCrChEpisode.PrTitleOne +
                                       " " + this.seriesTitleMaintenanaceCrChEpisode.PrTitleTwo);

                                    tempList.ProgrammeWorkingTitle = (this.seriesTitleMaintenanaceCrChEpisode.WrkTitleZero + " " + this.seriesTitleMaintenanaceCrChEpisode.WrkTitleOne +
                                    " " + this.seriesTitleMaintenanaceCrChEpisode.WrkTitleTwo);

                                    if (this.seriesTitleMaintenanaceCrChEpisode.CheckEpisodeNum == true)
                                    {
                                        if (this.seriesTitleMaintenanaceCrChEpisode.CheckLeadZero == true)
                                        {
                                            tempList.ProgrammeWorkingTitle += " " + (first_epiNo + i).ToString();
                                            tempList.ProgrammeWorkingTitle = (tempList.ProgrammeWorkingTitle).Trim();
                                        }
                                        else
                                        {
                                            tempList.ProgrammeWorkingTitle += " " + (first_epiNo + i).ToString();
                                            tempList.ProgrammeWorkingTitle = tempList.ProgrammeWorkingTitle.Trim();
                                        }
                                    }

                                    if (this.seriesTitleMaintenanaceCrChEpisode.CheckPrEpisodeNum == true)
                                    {
                                        if (this.seriesTitleMaintenanaceCrChEpisode.CheckPrLeadZero == true)
                                        {
                                            tempList.ProgrammeTitle += " " + (first_epiNo + i).ToString();
                                            tempList.ProgrammeTitle = (tempList.ProgrammeTitle).Trim();
                                        }
                                        else
                                        {
                                            tempList.ProgrammeTitle += " " + (first_epiNo + i).ToString();
                                            tempList.ProgrammeTitle = tempList.ProgrammeTitle.Trim();
                                        }
                                    }

                                }

                                string temp_for_value_swap = string.Empty;
                                temp_for_value_swap = tempList.ProgrammeWorkingTitle.Trim();
                                tempList.ProgrammeWorkingTitle = tempList.ProgrammeTitle.Trim();
                                tempList.ProgrammeTitle = temp_for_value_swap;



                                // Block entered by Bhushan Pande Start
                                if (this.seriesTitleMaintenanaceCrChEpisode.NumofEpisodes == string.Empty)
                                {
                                    tempList.ProgramMaxEpisodeNo = 0;
                                }
                                else
                                {
                                    tempList.ProgramMaxEpisodeNo = Convert.ToInt32(this.seriesTitleMaintenanaceCrChEpisode.NumofEpisodes);
                                }

                                if (this.seriesTitleMaintenanaceCrChEpisode.FirstEpiNum == string.Empty)
                                {
                                    tempList.ProgramMinEpisodeNo = 0;
                                }
                                else
                                {
                                    tempList.ProgramMinEpisodeNo = Convert.ToInt32(this.seriesTitleMaintenanaceCrChEpisode.FirstEpiNum);
                                }


                                if (this.seriesTitleMaintenanaceCrChEpisode.ProgType != null && this.seriesTitleMaintenanaceCrChEpisode.ProgType != "Select")
                                {
                                    tempList.ProgramType = this.seriesTitleMaintenanaceCrChEpisode.ProgType;
                                }
                                else
                                {   //Temprary added  
                                    //tempList.ProgramType = "10";
                                }




                                //#region new code for editable comboboxes

                                if (this.seriesTitleMaintenanaceCrChEpisode.ProgrammeCategory != null && this.seriesTitleMaintenanaceCrChEpisode.ProgrammeCategory != "Select")
                                {
                                    tempList.ProgrammeCategory = this.seriesTitleMaintenanaceCrChEpisode.ProgrammeCategory;
                                }
                                else
                                {
                                    tempList.ProgrammeCategory = "-";
                                }



                                if (this.seriesTitleMaintenanaceCrChEpisode.SubGenre != null && this.seriesTitleMaintenanaceCrChEpisode.SubGenre != "Select")
                                {
                                    tempList.ProgramSubGenre = this.seriesTitleMaintenanaceCrChEpisode.SubGenre;
                                }
                                else
                                {
                                    tempList.ProgramSubGenre = " ";
                                }

                                if (this.seriesTitleMaintenanaceCrChEpisode.ProgrammeStudio != null && this.seriesTitleMaintenanaceCrChEpisode.ProgrammeStudio != "Select")
                                {
                                    tempList.ProgrammeStudio = this.seriesTitleMaintenanaceCrChEpisode.ProgrammeStudio;
                                }
                                else
                                {
                                    tempList.ProgrammeStudio = "-";
                                }


                                if (this.seriesTitleMaintenanaceCrChEpisode.EventType != null && this.seriesTitleMaintenanaceCrChEpisode.EventType != "Select")
                                {
                                    tempList.ProgramEvent = this.seriesTitleMaintenanaceCrChEpisode.EventType;
                                }
                                else
                                {
                                    tempList.ProgramEvent = " ";
                                }

                                if (this.seriesTitleMaintenanaceCrChEpisode.Nationality != null && this.seriesTitleMaintenanaceCrChEpisode.Nationality != "Select")
                                {
                                    tempList.ProgramNationality = this.seriesTitleMaintenanaceCrChEpisode.Nationality;
                                }
                                else
                                {
                                    tempList.ProgramNationality = " ";
                                }


                                if (this.seriesTitleMaintenanaceCrChEpisode.Distribution != null && this.seriesTitleMaintenanaceCrChEpisode.Distribution != "Select")
                                {
                                    tempList.ProgramSuppName = this.seriesTitleMaintenanaceCrChEpisode.Distribution;
                                }
                                else
                                {
                                    tempList.ProgramSuppName = " ";
                                }


                                if (this.seriesTitleMaintenanaceCrChEpisode.OfficialRating != null && this.seriesTitleMaintenanaceCrChEpisode.OfficialRating != "Select")
                                {
                                    tempList.ProgrameRatingMPAA = this.seriesTitleMaintenanaceCrChEpisode.OfficialRating;
                                }
                                else
                                {
                                    tempList.ProgrameRatingMPAA = " ";
                                }

                                if (this.seriesTitleMaintenanaceCrChEpisode.unOfficialRating != null && this.seriesTitleMaintenanaceCrChEpisode.unOfficialRating != "Select")
                                {
                                    tempList.ProgrameRatingMPAA = this.seriesTitleMaintenanaceCrChEpisode.unOfficialRating;
                                }
                                else
                                {
                                    tempList.ProgrameRatingMPAA = " ";
                                }

                                tempSeries.SeasonNumber = Convert.ToInt32(this.seriesTitleMaintenanaceCrChEpisode.SeasonNumber);
                                tempSeries.SeriesNumber = Convert.ToInt32(this.seriesTitleMaintenanaceCrChEpisode.SeriesNumber);
                                tempList.ProgrameComment = this.seriesTitleMaintenanaceCrChEpisode.Comments;
                                tempList.ProgrammeDurationC = this.seriesTitleMaintenanaceCrChEpisode.Duration;
                                tempSeries.SeriesTitle = this.seriesTitleMaintenanaceCrChEpisode.SeriesTitle;
                                tempSeries.SeasonTitle = this.seriesTitleMaintenanaceCrChEpisode.SeasonTitle;


                                //if (AppInstanceTypes.Current == AppInstanceTypes.SuperSport)
                                //{
                                if (this.seriesTitleMaintenanaceCrChEpisode.EventValue != null && this.seriesTitleMaintenanaceCrChEpisode.EventValue != "Select")
                                {
                                    tempSeries.EventValue = this.seriesTitleMaintenanaceCrChEpisode.EventValue;
                                }
                                else
                                {
                                    tempSeries.EventValue = null;
                                }
                                //}


                                if (this.seriesTitleMaintenanaceCrChEpisode.ProdYear != String.Empty && this.seriesTitleMaintenanaceCrChEpisode.ProdYear != "Select")
                                {
                                    tempList.ProgrammeReleaseYear = Convert.ToInt32(this.seriesTitleMaintenanaceCrChEpisode.ProdYear);

                                }

                                //Adding data from  grid in List
                                string strLocalProgramData = this.seriesTitleMaintenanaceCrChEpisode.LocalGridData;
                                JavaScriptSerializer serializer = new JavaScriptSerializer();
                                List<LocalProgrammeVO> localProgList = null;

                                localProgList = serializer.Deserialize<List<LocalProgrammeVO>>(strLocalProgramData);


                                // inserting synopsis Bhushan
                                tempSynopsis.SynopsisDetails_Full = temp_full_synopsis;
                                tempSynopsis.SynopsisDetails_Local = temp_local_synopsis;
                                tempSynopsis.SynopsisID_Full = 2;
                                tempSynopsis.SynopsisID_Local = 1;


                                tempSynopsisList.Add(tempSynopsis);
                                tempList.ProgramSynopsisDetailsList = tempSynopsisList;


                                tempSeries.ProgramDetails = tempList;

                                //  add data related to an episode
                                tempListSave.Add(tempSeries);


                                if (getEpisodeResult != null)
                                {
                                    getEpisodeResult.Add(new EpisodeDetails(Convert.ToString(tempList.ProgrammeEPINumber), Convert.ToString(tempList.ProgrammeRefNo), tempList.ProgrammeTitle, tempList.ProgrammeDurationC, tempList.ProgrammeCategory, tempList.ProgramSubGenre, tempList.ProgramEvent, "", "", "", "", "", "", tempList.ProgrameComment, string.Empty, "", "", "", "", "", "", "", "", "", "", "", ""));
                                }
                                else
                                {
                                    getEpisodeResult = new List<EpisodeDetails>();
                                    getEpisodeResult.Add(new EpisodeDetails(Convert.ToString(tempList.ProgrammeEPINumber), Convert.ToString(tempList.ProgrammeRefNo), tempList.ProgrammeTitle, tempList.ProgrammeDurationC, tempList.ProgrammeCategory, tempList.ProgramSubGenre, tempList.ProgramEvent, "", "", "", "", "", "", tempList.ProgrameComment, string.Empty, "", "", "", "", "", "", "", "", "", "", "", ""));
                                }



                            } //For Loop End  

                            getTmpList = getEpisodeResult;

                        }

                        //else if (btnTextValue.Equals("Undo"))
                        //{
                            
                        //    int numofepisode = Convert.ToInt32(this.seriesTitleMaintenanaceCrChEpisode.NumofEpisodes);
                        //    int first_epiNo = Convert.ToInt32(this.seriesTitleMaintenanaceCrChEpisode.FirstEpiNum);
                        //    getTmpList = getEpisodeResult;
                        //    if (numofepisode > 0)
                        //    {
                        //        getTmpList.RemoveRange(first_epiNo, numofepisode);

                        //    }

                        //}



                    }


                }

                finally
                {
                    //proxy.Close();
                }
                // return response.DisplayEpisodesList; 


            } //If end Initial


            return getTmpList;


        }

        public void SaveCreatedEpisode()
        {
            //    try
            //    {

            #region create episode

            //if (CheckCrCh())
            //{
            //List<SeriesVO> tempListSave = new List<SeriesVO>();
            //List<SeriesVO> episodeSeriesVOList = DisplayEpisodes(seriesVO);


            string temp_local_synopsis = "";
            string temp_full_synopsis = "";
            List<SeriesVO> tempListSave = new List<SeriesVO>();

            int num;
            if (this.seriesTitleMaintenanaceCrChEpisode.NumofEpisodes == string.Empty)
            {
                num = 0;
            }
            else
            {
                if (int.TryParse(this.seriesTitleMaintenanaceCrChEpisode.NumofEpisodes, out num))
                    num = Convert.ToInt32(this.seriesTitleMaintenanaceCrChEpisode.NumofEpisodes);
                else
                {
                    this.MessageToView = "Please enter number of episodes to create.";
                    return;
                }
            }


            //if (Validate())
            //{
            //if (generateEpisodeFlag)
            // {
            if (num > 0)
            {

                int first_epiNo = 0;
                if (int.TryParse(this.seriesTitleMaintenanaceCrChEpisode.FirstEpiNum, out first_epiNo))
                    num = Convert.ToInt32(this.seriesTitleMaintenanaceCrChEpisode.NumofEpisodes);
                else
                {
                    this.MessageToView = "Please enter valid first episode number to create.";

                    return;
                }

                if (first_epiNo <= 0)
                {
                    this.MessageToView = "Please enter episode number greater than zero.";
                    return;
                }



                SeriesVO tempseriesVO = new SeriesVO();
                tempseriesVO.SeasonNumber = Convert.ToInt32(this.seriesTitleMaintenanaceCrChEpisode.SeasonNumber);
                tempseriesVO.Season_Number = this.seriesTitleMaintenanaceCrChEpisode.SeasonNumber;
                tempseriesVO.SeasonTitle = this.seriesTitleMaintenanaceCrChEpisode.SeasonTitle;
                tempseriesVO.SeriesNumber = Convert.ToInt32(this.seriesTitleMaintenanaceCrChEpisode.SeriesNumber);
                tempseriesVO.SeriesTitle = this.seriesTitleMaintenanaceCrChEpisode.SeriesTitle;

                this.GetEpidodes(tempseriesVO);

    
                if (getEpisodeResult != null && this.getEpisodeResult.Count > 0)
                {
                    for (int j = 0; j < getEpisodeResult.Count; j++)
                    {
                        if (Convert.ToInt32(getEpisodeResult[j].ProgrammeEPINumber) >= first_epiNo && Convert.ToInt32(getEpisodeResult[j].ProgrammeEPINumber) <= ((first_epiNo + num) - 1))
                        {
                            this.MessageToView = "Episode number already exists.";
                            return;
                        }
                    }
                }


                for (int i = 0; i < num; i++)
                {
                    ProgrammeVO tempList = new ProgrammeVO();
                    SynopsisDetailsVO tempSynopsis = new SynopsisDetailsVO();
                    List<SynopsisDetailsVO> tempSynopsisList = new List<SynopsisDetailsVO>();
                    SeriesVO tempSeries = new SeriesVO();

                     first_epiNo = Convert.ToInt32(this.seriesTitleMaintenanaceCrChEpisode.FirstEpiNum);
                    tempList.ProgrammeEPINumber = first_epiNo + i;


                    if (tempList.ProgrammeEPINumber <= 9)
                    {
                        tempList.ProgrammeTitle = (this.seriesTitleMaintenanaceCrChEpisode.PrTitleZero + " " + this.seriesTitleMaintenanaceCrChEpisode.PrTitleOne +
                           " " + this.seriesTitleMaintenanaceCrChEpisode.PrTitleTwo);

                        tempList.ProgrammeWorkingTitle = (this.seriesTitleMaintenanaceCrChEpisode.WrkTitleZero + " " + this.seriesTitleMaintenanaceCrChEpisode.WrkTitleOne +
                        " " + this.seriesTitleMaintenanaceCrChEpisode.WrkTitleTwo);// + " " + strWrkTitle[3].ToString() + (seriesVO.ProgramDetails.ProgramMaxEpisodeNo + i).ToString()).Trim();


                        if (this.seriesTitleMaintenanaceCrChEpisode.CheckEpisodeNum == true)
                        {
                            if (this.seriesTitleMaintenanaceCrChEpisode.CheckLeadZero == true)
                            {
                                tempList.ProgrammeWorkingTitle += " " + "000" + (first_epiNo + i).ToString();
                                tempList.ProgrammeWorkingTitle = (tempList.ProgrammeWorkingTitle).Trim();
                            }
                            else
                            {
                                tempList.ProgrammeWorkingTitle += " " + (first_epiNo + i).ToString();
                                tempList.ProgrammeWorkingTitle = tempList.ProgrammeWorkingTitle.Trim();
                            }
                        }

                        if (this.seriesTitleMaintenanaceCrChEpisode.CheckPrEpisodeNum == true)
                        {
                            if (this.seriesTitleMaintenanaceCrChEpisode.CheckPrLeadZero == true)
                            {
                                tempList.ProgrammeTitle += " " + "000" + (first_epiNo + i).ToString();
                                tempList.ProgrammeTitle = (tempList.ProgrammeTitle).Trim();
                            }
                            else
                            {
                                tempList.ProgrammeTitle += " " + (first_epiNo + i).ToString();
                                tempList.ProgrammeTitle = tempList.ProgrammeTitle.Trim();
                            }
                        }
                    }

                    else if (tempList.ProgrammeEPINumber <= 99)
                    {

                        tempList.ProgrammeTitle = (this.seriesTitleMaintenanaceCrChEpisode.PrTitleZero + " " + this.seriesTitleMaintenanaceCrChEpisode.PrTitleOne +
                           " " + this.seriesTitleMaintenanaceCrChEpisode.PrTitleTwo);

                        tempList.ProgrammeWorkingTitle = (this.seriesTitleMaintenanaceCrChEpisode.WrkTitleZero + " " + this.seriesTitleMaintenanaceCrChEpisode.WrkTitleOne +
                        " " + this.seriesTitleMaintenanaceCrChEpisode.WrkTitleTwo);

                        if (this.seriesTitleMaintenanaceCrChEpisode.CheckEpisodeNum == true)
                        {
                            if (this.seriesTitleMaintenanaceCrChEpisode.CheckLeadZero == true)
                            {
                                tempList.ProgrammeWorkingTitle += " " + "00" + (first_epiNo + i).ToString();
                                tempList.ProgrammeWorkingTitle = (tempList.ProgrammeWorkingTitle).Trim();
                            }
                            else
                            {
                                tempList.ProgrammeWorkingTitle += " " + (first_epiNo + i).ToString();
                                tempList.ProgrammeWorkingTitle = tempList.ProgrammeWorkingTitle.Trim();
                            }
                        }

                        if (this.seriesTitleMaintenanaceCrChEpisode.CheckPrEpisodeNum == true)
                        {
                            if (this.seriesTitleMaintenanaceCrChEpisode.CheckPrLeadZero == true)
                            {
                                tempList.ProgrammeTitle += " " + "00" + (first_epiNo + i).ToString();
                                tempList.ProgrammeTitle = (tempList.ProgrammeTitle).Trim();
                            }
                            else
                            {
                                tempList.ProgrammeTitle += " " + (first_epiNo + i).ToString();
                                tempList.ProgrammeTitle = tempList.ProgrammeTitle.Trim();
                            }
                        }

                    }

                    else if (tempList.ProgrammeEPINumber <= 999)
                    {

                        tempList.ProgrammeTitle = (this.seriesTitleMaintenanaceCrChEpisode.PrTitleZero + " " + this.seriesTitleMaintenanaceCrChEpisode.PrTitleOne +
                           " " + this.seriesTitleMaintenanaceCrChEpisode.PrTitleTwo);

                        tempList.ProgrammeWorkingTitle = (this.seriesTitleMaintenanaceCrChEpisode.WrkTitleZero + " " + this.seriesTitleMaintenanaceCrChEpisode.WrkTitleOne +
                        " " + this.seriesTitleMaintenanaceCrChEpisode.WrkTitleTwo);

                        if (this.seriesTitleMaintenanaceCrChEpisode.CheckEpisodeNum == true)
                        {
                            if (this.seriesTitleMaintenanaceCrChEpisode.CheckLeadZero == true)
                            {
                                tempList.ProgrammeWorkingTitle += " " + "0" + (first_epiNo + i).ToString();
                                tempList.ProgrammeWorkingTitle = (tempList.ProgrammeWorkingTitle).Trim();
                            }
                            else
                            {
                                tempList.ProgrammeWorkingTitle += " " + (first_epiNo + i).ToString();
                                tempList.ProgrammeWorkingTitle = tempList.ProgrammeWorkingTitle.Trim();
                            }
                        }

                        if (this.seriesTitleMaintenanaceCrChEpisode.CheckPrEpisodeNum == true)
                        {
                            if (this.seriesTitleMaintenanaceCrChEpisode.CheckPrLeadZero == true)
                            {
                                tempList.ProgrammeTitle += " " + "0" + (first_epiNo + i).ToString();
                                tempList.ProgrammeTitle = (tempList.ProgrammeTitle).Trim();
                            }
                            else
                            {
                                tempList.ProgrammeTitle += " " + (first_epiNo + i).ToString();
                                tempList.ProgrammeTitle = tempList.ProgrammeTitle.Trim();
                            }
                        }

                    }
                    else
                    {
                        tempList.ProgrammeTitle = (this.seriesTitleMaintenanaceCrChEpisode.PrTitleZero + " " + this.seriesTitleMaintenanaceCrChEpisode.PrTitleOne +
                           " " + this.seriesTitleMaintenanaceCrChEpisode.PrTitleTwo);

                        tempList.ProgrammeWorkingTitle = (this.seriesTitleMaintenanaceCrChEpisode.WrkTitleZero + " " + this.seriesTitleMaintenanaceCrChEpisode.WrkTitleOne +
                        " " + this.seriesTitleMaintenanaceCrChEpisode.WrkTitleTwo);

                        if (this.seriesTitleMaintenanaceCrChEpisode.CheckEpisodeNum == true)
                        {
                            if (this.seriesTitleMaintenanaceCrChEpisode.CheckLeadZero == true)
                            {
                                tempList.ProgrammeWorkingTitle += " " + (first_epiNo + i).ToString();
                                tempList.ProgrammeWorkingTitle = (tempList.ProgrammeWorkingTitle).Trim();
                            }
                            else
                            {
                                tempList.ProgrammeWorkingTitle += " " + (first_epiNo + i).ToString();
                                tempList.ProgrammeWorkingTitle = tempList.ProgrammeWorkingTitle.Trim();
                            }
                        }

                        if (this.seriesTitleMaintenanaceCrChEpisode.CheckPrEpisodeNum == true)
                        {
                            if (this.seriesTitleMaintenanaceCrChEpisode.CheckPrLeadZero == true)
                            {
                                tempList.ProgrammeTitle += " " + (first_epiNo + i).ToString();
                                tempList.ProgrammeTitle = (tempList.ProgrammeTitle).Trim();
                            }
                            else
                            {
                                tempList.ProgrammeTitle += " " + (first_epiNo + i).ToString();
                                tempList.ProgrammeTitle = tempList.ProgrammeTitle.Trim();
                            }
                        }

                    }



                    string temp_for_value_swap = string.Empty;
                    temp_for_value_swap = tempList.ProgrammeWorkingTitle.Trim();
                    tempList.ProgrammeWorkingTitle = tempList.ProgrammeTitle.Trim();
                    tempList.ProgrammeTitle = temp_for_value_swap;


                    //if (View.ComboProgType.SelectedIndex < 0)
                    //{
                    //    System.Windows.Forms.MessageBox.Show("Please enter valid Program Type.");
                    //    return;
                    //}
                    //else if (View.ComboProgType.SelectedIndex > 0)
                    //    tempList.ProgramType = View.ComboProgType.SelectedValue.ToString();
                    //else
                    //{
                    //    System.Windows.Forms.MessageBox.Show("Please enter required fields.");
                    //    return;
                    //}

                    if (this.seriesTitleMaintenanaceCrChEpisode.ProgType != null && this.seriesTitleMaintenanaceCrChEpisode.ProgType != "Select")
                    {
                        tempList.ProgramType = this.seriesTitleMaintenanaceCrChEpisode.ProgType.ToString().Trim();
                    }
                    else
                    {   //Temprary added  
                        // tempList.ProgramType = "10";    
                    }

                    // Block entered by Bhushan Pande Start
                    if (this.seriesTitleMaintenanaceCrChEpisode.NumofEpisodes == string.Empty)
                    {
                        tempList.ProgramMaxEpisodeNo = 0;
                    }
                    else
                    {
                        tempList.ProgramMaxEpisodeNo = Convert.ToInt32(this.seriesTitleMaintenanaceCrChEpisode.NumofEpisodes);
                    }

                    if (this.seriesTitleMaintenanaceCrChEpisode.FirstEpiNum == string.Empty)
                    {
                        tempList.ProgramMinEpisodeNo = 0;
                    }
                    else
                    {
                        tempList.ProgramMinEpisodeNo = Convert.ToInt32(this.seriesTitleMaintenanaceCrChEpisode.FirstEpiNum);
                    }


                    //#region new code for editable comboboxes

                    if (this.seriesTitleMaintenanaceCrChEpisode.ProgrammeCategory != null && this.seriesTitleMaintenanaceCrChEpisode.ProgrammeCategory != "Select")
                    {
                        tempList.ProgrammeCategory = this.seriesTitleMaintenanaceCrChEpisode.ProgrammeCategory.ToString().Trim();
                    }
                    else
                    {
                        tempList.ProgrammeCategory = "-";
                    }



                    if (this.seriesTitleMaintenanaceCrChEpisode.SubGenre != null && this.seriesTitleMaintenanaceCrChEpisode.SubGenre != "Select")
                    {
                        tempList.ProgramSubGenre = this.seriesTitleMaintenanaceCrChEpisode.SubGenre.ToString().Trim();
                    }
                    else
                    {
                        tempList.ProgramSubGenre = string.Empty;
                    }

                    if (this.seriesTitleMaintenanaceCrChEpisode.ProgrammeStudio != null && this.seriesTitleMaintenanaceCrChEpisode.ProgrammeStudio != "Select")
                    {
                      tempList.ProgrammeStudio = this.seriesTitleMaintenanaceCrChEpisode.ProgrammeStudio.ToString().Trim();
                    }
                    else
                    {
                        tempList.ProgrammeStudio = "-";
                    }


                    if (this.seriesTitleMaintenanaceCrChEpisode.EventType != null && this.seriesTitleMaintenanaceCrChEpisode.EventType != "Select")
                    {
                        tempList.ProgramEvent = this.seriesTitleMaintenanaceCrChEpisode.EventType.ToString().Trim();
                    }
                    else
                    {
                        tempList.ProgramEvent = string.Empty;
                    }

                    if (this.seriesTitleMaintenanaceCrChEpisode.Nationality != null && this.seriesTitleMaintenanaceCrChEpisode.Nationality != "Select")
                    {
                        tempList.ProgramNationality = this.seriesTitleMaintenanaceCrChEpisode.Nationality.ToString().Trim();
                    }
                    else
                    {
                        tempList.ProgramNationality = " ";
                    }


                    if (this.seriesTitleMaintenanaceCrChEpisode.Distribution != null && this.seriesTitleMaintenanaceCrChEpisode.Distribution != "Select")
                    {
                        tempList.ProgramSuppName = this.seriesTitleMaintenanaceCrChEpisode.Distribution.ToString().Trim();
                    }
                    else
                    {
                        tempList.ProgramSuppName = " ";
                    }


                    if (this.seriesTitleMaintenanaceCrChEpisode.OfficialRating != null && this.seriesTitleMaintenanaceCrChEpisode.OfficialRating != "Select")
                    {
                        tempList.ProgrameRatingMPAA = this.seriesTitleMaintenanaceCrChEpisode.OfficialRating.ToString().Trim();
                    }
                    else
                    {
                        tempList.ProgrameRatingMPAA = " ";
                    }

                    if (this.seriesTitleMaintenanaceCrChEpisode.unOfficialRating != null && this.seriesTitleMaintenanaceCrChEpisode.unOfficialRating != "Select")
                    {
                        tempList.ProgramRatingINT = this.seriesTitleMaintenanaceCrChEpisode.unOfficialRating.ToString().Trim();
                    }
                    else
                    {
                        tempList.ProgramRatingINT = " ";
                    }

                    tempSeries.SeasonNumber = Convert.ToInt32(this.seriesTitleMaintenanaceCrChEpisode.SeasonNumber);
                    tempSeries.SeriesNumber = Convert.ToInt32(this.seriesTitleMaintenanaceCrChEpisode.SeriesNumber);
                    tempList.ProgrameComment = this.seriesTitleMaintenanaceCrChEpisode.Comments;
                    tempList.ProgrammeDurationC = this.seriesTitleMaintenanaceCrChEpisode.Duration;
                    tempSeries.SeriesTitle = this.seriesTitleMaintenanaceCrChEpisode.SeriesTitle;
                    tempSeries.SeasonTitle = this.seriesTitleMaintenanaceCrChEpisode.SeasonTitle;


                    //if (AppInstanceTypes.Current == AppInstanceTypes.SuperSport)
                    //{
                    if (this.seriesTitleMaintenanaceCrChEpisode.EventValue != null && this.seriesTitleMaintenanaceCrChEpisode.EventValue != "Select")
                    {
                        tempSeries.EventValue = this.seriesTitleMaintenanaceCrChEpisode.EventValue.ToString().Trim();
                    }
                    else
                    {
                        tempSeries.EventValue = null;
                    }
                    //}


                    if (this.seriesTitleMaintenanaceCrChEpisode.ProdYear != String.Empty && this.seriesTitleMaintenanaceCrChEpisode.ProdYear != "Select")
                    {
                        tempList.ProgrammeReleaseYear = Convert.ToInt32(this.seriesTitleMaintenanaceCrChEpisode.ProdYear);

                    }



                    //Inserting Local Program List from Here 
                    string strLocalProgramData = this.seriesTitleMaintenanaceCrChEpisode.LocalGridData;
                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    List<LocalProgrammeVO> localProgList = null;

                    localProgList = serializer.Deserialize<List<LocalProgrammeVO>>(strLocalProgramData);


                    //row added in grid for local prog info
                    if (localProgList.Count > 0)
                    {
                        string chkTerrCode = string.Empty;

                        for (int cnt = 0; cnt < localProgList.Count; cnt++)
                        {
                            if (localProgList[cnt].TerritoryCode == null || localProgList[cnt].TerritoryCode=="") 
                            {
                                if (localProgList[cnt].TerritoryCode == "")
                                {
                                    localProgList[cnt].TerritoryCode = null;
                                }
                                chkTerrCode = "N";
                            }

                            if (localProgList[cnt].LocalTitle == null || localProgList[cnt].LocalTitle=="")
                            {
                                if (localProgList[cnt].LocalTitle == "")
                                {
                                    localProgList[cnt].LocalTitle = null;
                                }
                                chkTerrCode = "N";
                            }

                            if (localProgList[cnt].LocalReleaseVid == null || localProgList[cnt].LocalReleaseVid=="")
                            {
                                if (localProgList[cnt].LocalReleaseVid == "")
                                {
                                    localProgList[cnt].LocalReleaseVid = null;
                                }
                            }

                            if (localProgList[cnt].LocalReleaseCinema == null || localProgList[cnt].LocalReleaseCinema=="")
                            {
                                if (localProgList[cnt].LocalReleaseCinema == "")
                                {
                                    localProgList[cnt].LocalReleaseCinema = null;
                                }
                            }


                            if (localProgList[cnt].LocalReleaseTV == null || localProgList[cnt].LocalReleaseTV == "")
                            {
                                if (localProgList[cnt].LocalReleaseTV == "")
                                {
                                    localProgList[cnt].LocalReleaseTV = null;
                                }
                            }
                            if (localProgList[cnt].LocalComment == null || localProgList[cnt].LocalComment=="")
                            {
                                if (localProgList[cnt].LocalComment == "")
                                {
                                    localProgList[cnt].LocalComment = null;
                                }
                            }

                        }


                        if (chkTerrCode.Equals("N"))
                        {
                            tempList.LocalProgramList = null;
                        }
                        else
                        {
                             tempList.LocalProgramList = localProgList;
                        }
                    }
                    else
                    {
                        tempList.LocalProgramList = null;
                    }




                    // inserting synopsis Bhushan
                    tempSynopsis.SynopsisDetails_Full = temp_full_synopsis;
                    tempSynopsis.SynopsisDetails_Local = temp_local_synopsis;
                    tempSynopsis.SynopsisID_Full = 2;
                    tempSynopsis.SynopsisID_Local = 1;



                    tempSynopsisList.Add(tempSynopsis);
                    tempList.ProgramSynopsisDetailsList = tempSynopsisList;


                    tempSeries.ProgramDetails = tempList;

                    // add data related to an episode
                    tempListSave.Add(tempSeries);



                } //For Loop End  

            }
            //else
            //{
            //    DisplayMessage("Number of episodes to create should be greater than zero.", "Error");
            //    return;
            //}
            if (tempListSave.Count > 0)
            {
                ProgrammeLibraryClient proxy = null;
                SaveCreatedEpisodesResponse response = new SaveCreatedEpisodesResponse();
                try
                {
                    proxy = new ProgrammeLibraryClient();
                    proxy.Open();
                    SaveCreatedEpisodesRequest request = new SaveCreatedEpisodesRequest();
                    request.CreateEpisodesListVO = tempListSave;
                    response = proxy.SaveCreatedEpisodeQuery(request);

                    List<SeriesVO> lstSeriesVo = response.CreatedEpisodesListVO;

                }
                finally
                {
                    proxy.Close();
                }
                //return response.CreatedEpisodesListVO;

                // tempListSave = proxy.CreateEpisodesDetails(tempListSave);
                //if (tempListSave.Count > 0)
                //{
                //    foreach (SeriesVO createdEpisodes in tempListSave)
                //    {
                //        if (createdEpisodes.SuccessFlag == true)
                //            //MessageBox.Show("Episode(s) created successfully");
                //            UpdateApplicationMessageList(AppConstants.MessageCategory.StandardMessages, AppConstants.StandardMessageCodes.GeneralRecordsSaved, MessageTypeEnum.Information);
                //        else
                //            //MessageBox.Show("Failed to create Episode(s)");
                //            UpdateApplicationMessageList(AppConstants.MessageCategory.StandardMessages, AppConstants.StandardMessageCodes.GeneralRecordsNotSaved, MessageTypeEnum.Error);
                //    }
                //    SeriesDetailsList = tempListSave;
                //    SetSeriesVOList();
                //}
                //OnCloseView();

            }
            //}
            //else
            //{
            //    OnCloseView();
            //}
            //}
            //else
            //{
            //    //CustomValidate("Enter reqd fields");
            //    System.Windows.Forms.MessageBox.Show("Enter required fields");
            //}
            //}
            #endregion

            //}
            //catch (Exception ex)
            //{
            //    if (View.CheckSeries.IsChecked == true || View.CheckSeason.IsChecked == true || View.CheckEpisodeNum.IsChecked == true)
            //        View.TextDisplayWorkingTitle.Text = View.TextDisplayWorkingTitle.Text;
            //    else
            //        View.TextDisplayWorkingTitle.Text = "";
            //    ExceptionHandler.Handle(ex);
            //}
        }

        public void ChangeEpisodeDetails()
        {


            //ProgrammeVO tempList = new ProgrammeVO();
            List<SeriesVO> tempListSaveUpdate = new List<SeriesVO>();

            string temp_local_synopsis = "";
            string temp_full_synopsis = "";

            int num1 = 0;
            int num2 = 0;

            if (int.TryParse(this.seriesTitleMaintenanaceCrChEpisode.NumofEpisodes, out num1))
                num1 = Convert.ToInt32(this.seriesTitleMaintenanaceCrChEpisode.NumofEpisodes);
            else
            {
                //System.Windows.Forms.MessageBox.Show("Please enter From Episode number.");
                //return;
            }

            if (int.TryParse(this.seriesTitleMaintenanaceCrChEpisode.FirstEpiNum, out num2))
                num2 = Convert.ToInt32(this.seriesTitleMaintenanaceCrChEpisode.FirstEpiNum);
            else
            {
                //System.Windows.Forms.MessageBox.Show("Please enter To Episode number.");
                //return;
            }

            if (num1 == 0 || num2 == 0)
            {
                //DisplayMessage("From Episode number and To Episode Number can not be zero.", "Error");
                //return;
            }



            List<SeriesVO> episodeSeriesVOList = null;
            ProgrammeLibraryClient proxy1 = null;
            DisplayEpisodeResponse res = new DisplayEpisodeResponse();
            SeriesVO displayEpisodes = new SeriesVO();
            proxy1 = new ProgrammeLibraryClient();
            proxy1.Open();
            DisplayEpisodeRequest req = new DisplayEpisodeRequest();
            displayEpisodes.SeasonNumber = Convert.ToInt32(this.seriesTitleMaintenanaceCrChEpisode.SeasonNumber);
            req.DispalyEpisodeVO = displayEpisodes;
            res = proxy1.DisplayEpisodesQuery(req);
            episodeSeriesVOList = res.DisplayEpisodesList;
            proxy1.Close();


            // if (Validate())
            // {
            if (episodeSeriesVOList != null && episodeSeriesVOList.Count != 0)
            {

                if (num2 > 0)
                {
                    if (this.seriesTitleMaintenanaceCrChEpisode.DisplayWorkingTitle == "")
                        this.seriesTitleMaintenanaceCrChEpisode.DisplayWorkingTitle = episodeSeriesVOList[0].ProgramDetails.ProgrammeTitle;

                    for (int i = num1; i <= num2; i++)
                    {
                        for (int k = 0; k < episodeSeriesVOList.Count; k++)
                        {
                            if (episodeSeriesVOList[k].ProgramDetails.ProgrammeEPINumber == i)
                            {
                                ProgrammeVO tempList = new ProgrammeVO();
                                SynopsisDetailsVO tempSynopsis = new SynopsisDetailsVO();
                                List<SynopsisDetailsVO> tempSynopsisList = new List<SynopsisDetailsVO>();

                                SeriesVO tempSeries = new SeriesVO();

                                tempList.ProgrammeEPINumber = episodeSeriesVOList[k].ProgramDetails.ProgrammeEPINumber;


                                tempList.ProgrammeRefNo = episodeSeriesVOList[k].ProgramDetails.ProgrammeRefNo;

                                if (episodeSeriesVOList[k].ProgramDetails.ProgrammeEPINumber <= 9)
                                {
                                    tempList.ProgrammeTitle = (this.seriesTitleMaintenanaceCrChEpisode.PrTitleZero + " " + this.seriesTitleMaintenanaceCrChEpisode.PrTitleOne +
                                                      " " + this.seriesTitleMaintenanaceCrChEpisode.PrTitleTwo);

                                    tempList.ProgrammeWorkingTitle = (this.seriesTitleMaintenanaceCrChEpisode.WrkTitleZero + " " + this.seriesTitleMaintenanaceCrChEpisode.WrkTitleOne +
                        " " + this.seriesTitleMaintenanaceCrChEpisode.WrkTitleTwo);


                                    if (this.seriesTitleMaintenanaceCrChEpisode.CheckEpisodeNum == true)
                                    {
                                        if (this.seriesTitleMaintenanaceCrChEpisode.CheckLeadZero == true)
                                        {
                                            tempList.ProgrammeWorkingTitle += " " + "000" + (episodeSeriesVOList[k].ProgramDetails.ProgrammeEPINumber).ToString();
                                            tempList.ProgrammeWorkingTitle = (tempList.ProgrammeWorkingTitle).Trim();
                                        }
                                        else
                                        {
                                            tempList.ProgrammeWorkingTitle += " " + (episodeSeriesVOList[k].ProgramDetails.ProgrammeEPINumber).ToString();
                                            tempList.ProgrammeWorkingTitle = tempList.ProgrammeWorkingTitle.Trim();
                                        }
                                    }

                                    if (this.seriesTitleMaintenanaceCrChEpisode.CheckPrEpisodeNum == true)
                                    {
                                        if (this.seriesTitleMaintenanaceCrChEpisode.CheckPrLeadZero == true)
                                        {
                                            tempList.ProgrammeTitle += " " + "000" + (episodeSeriesVOList[k].ProgramDetails.ProgrammeEPINumber).ToString();
                                            tempList.ProgrammeTitle = (tempList.ProgrammeTitle).Trim();
                                        }
                                        else
                                        {
                                            tempList.ProgrammeTitle += " " + (episodeSeriesVOList[k].ProgramDetails.ProgrammeEPINumber).ToString();
                                            tempList.ProgrammeTitle = tempList.ProgrammeTitle.Trim();
                                        }
                                    }
                                }
                                else if (episodeSeriesVOList[k].ProgramDetails.ProgrammeEPINumber <= 99)
                                {
                                    tempList.ProgrammeTitle = (this.seriesTitleMaintenanaceCrChEpisode.PrTitleZero + " " + this.seriesTitleMaintenanaceCrChEpisode.PrTitleOne +
                                                     " " + this.seriesTitleMaintenanaceCrChEpisode.PrTitleTwo);

                                    tempList.ProgrammeWorkingTitle = (this.seriesTitleMaintenanaceCrChEpisode.WrkTitleZero + " " + this.seriesTitleMaintenanaceCrChEpisode.WrkTitleOne +
                        " " + this.seriesTitleMaintenanaceCrChEpisode.WrkTitleTwo);

                                    if (this.seriesTitleMaintenanaceCrChEpisode.CheckEpisodeNum == true)
                                    {
                                        if (this.seriesTitleMaintenanaceCrChEpisode.CheckLeadZero == true)
                                        {
                                            tempList.ProgrammeWorkingTitle += " " + "00" + (episodeSeriesVOList[k].ProgramDetails.ProgrammeEPINumber).ToString();
                                            tempList.ProgrammeWorkingTitle = (tempList.ProgrammeWorkingTitle).Trim();
                                        }
                                        else
                                        {
                                            tempList.ProgrammeWorkingTitle += " " + (episodeSeriesVOList[k].ProgramDetails.ProgrammeEPINumber).ToString();
                                            tempList.ProgrammeWorkingTitle = tempList.ProgrammeWorkingTitle.Trim();
                                        }
                                    }

                                    if (this.seriesTitleMaintenanaceCrChEpisode.CheckPrEpisodeNum == true)
                                    {
                                        if (this.seriesTitleMaintenanaceCrChEpisode.CheckPrLeadZero == true)
                                        {
                                            tempList.ProgrammeTitle += " " + "00" + (episodeSeriesVOList[k].ProgramDetails.ProgrammeEPINumber).ToString();
                                            tempList.ProgrammeTitle = (tempList.ProgrammeTitle).Trim();
                                        }
                                        else
                                        {
                                            tempList.ProgrammeTitle += " " + (episodeSeriesVOList[k].ProgramDetails.ProgrammeEPINumber).ToString();
                                            tempList.ProgrammeTitle = tempList.ProgrammeTitle.Trim();
                                        }
                                    }

                                }
                                else if (episodeSeriesVOList[k].ProgramDetails.ProgrammeEPINumber <= 999)
                                {
                                    tempList.ProgrammeTitle = (this.seriesTitleMaintenanaceCrChEpisode.PrTitleZero + " " + this.seriesTitleMaintenanaceCrChEpisode.PrTitleOne +
                                                     " " + this.seriesTitleMaintenanaceCrChEpisode.PrTitleTwo);

                                    tempList.ProgrammeWorkingTitle = (this.seriesTitleMaintenanaceCrChEpisode.WrkTitleZero + " " +
                                        this.seriesTitleMaintenanaceCrChEpisode.WrkTitleOne + " " + this.seriesTitleMaintenanaceCrChEpisode.WrkTitleTwo);


                                    if (this.seriesTitleMaintenanaceCrChEpisode.CheckEpisodeNum == true)
                                    {
                                        if (this.seriesTitleMaintenanaceCrChEpisode.CheckLeadZero == true)
                                        {
                                            tempList.ProgrammeWorkingTitle += " " + "0" + (episodeSeriesVOList[k].ProgramDetails.ProgrammeEPINumber).ToString();
                                            tempList.ProgrammeWorkingTitle = (tempList.ProgrammeWorkingTitle).Trim();
                                        }
                                        else
                                        {
                                            tempList.ProgrammeWorkingTitle += " " + (episodeSeriesVOList[k].ProgramDetails.ProgrammeEPINumber).ToString();
                                            tempList.ProgrammeWorkingTitle = tempList.ProgrammeWorkingTitle.Trim();
                                        }
                                    }

                                    if (this.seriesTitleMaintenanaceCrChEpisode.CheckPrEpisodeNum == true)
                                    {
                                        if (this.seriesTitleMaintenanaceCrChEpisode.CheckPrLeadZero == true)
                                        {
                                            tempList.ProgrammeTitle += " " + "0" + (episodeSeriesVOList[k].ProgramDetails.ProgrammeEPINumber).ToString();
                                            tempList.ProgrammeTitle = (tempList.ProgrammeTitle).Trim();
                                        }
                                        else
                                        {
                                            tempList.ProgrammeTitle += " " + (episodeSeriesVOList[k].ProgramDetails.ProgrammeEPINumber).ToString();
                                            tempList.ProgrammeTitle = tempList.ProgrammeTitle.Trim();
                                        }
                                    }

                                }
                                else
                                {
                                    tempList.ProgrammeTitle = (this.seriesTitleMaintenanaceCrChEpisode.PrTitleZero + " " + this.seriesTitleMaintenanaceCrChEpisode.PrTitleOne +
                                                     " " + this.seriesTitleMaintenanaceCrChEpisode.PrTitleTwo);

                                    tempList.ProgrammeWorkingTitle = (this.seriesTitleMaintenanaceCrChEpisode.WrkTitleZero + " " +
                                        this.seriesTitleMaintenanaceCrChEpisode.WrkTitleOne + " " + this.seriesTitleMaintenanaceCrChEpisode.WrkTitleTwo);



                                    if (this.seriesTitleMaintenanaceCrChEpisode.CheckEpisodeNum == true)
                                    {
                                        if (this.seriesTitleMaintenanaceCrChEpisode.CheckLeadZero == true)
                                        {
                                            tempList.ProgrammeWorkingTitle += " " + (episodeSeriesVOList[k].ProgramDetails.ProgrammeEPINumber).ToString();
                                            tempList.ProgrammeWorkingTitle = (tempList.ProgrammeWorkingTitle).Trim();
                                        }
                                        else
                                        {
                                            tempList.ProgrammeWorkingTitle += " " + (episodeSeriesVOList[k].ProgramDetails.ProgrammeEPINumber).ToString();
                                            tempList.ProgrammeWorkingTitle = tempList.ProgrammeWorkingTitle.Trim();
                                        }
                                    }

                                    if (this.seriesTitleMaintenanaceCrChEpisode.CheckPrEpisodeNum == true)
                                    {
                                        if (this.seriesTitleMaintenanaceCrChEpisode.CheckPrLeadZero == true)
                                        {
                                            tempList.ProgrammeTitle += " " + (episodeSeriesVOList[k].ProgramDetails.ProgrammeEPINumber).ToString();
                                            tempList.ProgrammeTitle = (tempList.ProgrammeTitle).Trim();
                                        }
                                        else
                                        {
                                            tempList.ProgrammeTitle += " " + (episodeSeriesVOList[k].ProgramDetails.ProgrammeEPINumber).ToString();
                                            tempList.ProgrammeTitle = tempList.ProgrammeTitle.Trim();
                                        }
                                    }
                                }

                                tempList.ProgrammeWorkingTitle = tempList.ProgrammeWorkingTitle.Trim();
                                tempList.ProgrammeTitle = tempList.ProgrammeTitle.Trim();

                                if (tempList.ProgrammeWorkingTitle == "")
                                {
                                    if (episodeSeriesVOList[k].ProgramDetails != null && episodeSeriesVOList[k].ProgramDetails.ProgrammeTitle != null)
                                        tempList.ProgrammeWorkingTitle = episodeSeriesVOList[k].ProgramDetails.ProgrammeTitle;
                                }

                                tempSeries.SeriesTitle = this.seriesTitleMaintenanaceCrChEpisode.SeriesTitle;
                                tempSeries.SeasonTitle = this.seriesTitleMaintenanaceCrChEpisode.SeasonTitle;


                                //if (View.ComboProgType.SelectedIndex < 0)
                                //{
                                //    System.Windows.Forms.MessageBox.Show("Please enter valid Program Type.");
                                //    return;
                                //}
                                //else if (View.ComboProgType.SelectedIndex > 0)
                                //    tempList.ProgramType = View.ComboProgType.SelectedValue.ToString();
                                //else
                                //{
                                //    System.Windows.Forms.MessageBox.Show("Please enter required fields.");
                                //    return;
                                //}

                                if (this.seriesTitleMaintenanaceCrChEpisode.ProgType != null && this.seriesTitleMaintenanaceCrChEpisode.ProgType != "Select")
                                {
                                    tempList.ProgramType = this.seriesTitleMaintenanaceCrChEpisode.ProgType.ToString().Trim();
                                }
                                else
                                {   //Temprary added  
                                    //tempList.ProgramType = "10";
                                }

                                // Block entered by Bhushan Pande Start
                                if (this.seriesTitleMaintenanaceCrChEpisode.NumofEpisodes == string.Empty)
                                {
                                    tempList.ProgramMaxEpisodeNo = 0;
                                }
                                else
                                {
                                    tempList.ProgramMaxEpisodeNo = Convert.ToInt32(this.seriesTitleMaintenanaceCrChEpisode.NumofEpisodes);
                                }

                                if (this.seriesTitleMaintenanaceCrChEpisode.FirstEpiNum == string.Empty)
                                {
                                    tempList.ProgramMinEpisodeNo = 0;
                                }
                                else
                                {
                                    tempList.ProgramMinEpisodeNo = Convert.ToInt32(this.seriesTitleMaintenanaceCrChEpisode.FirstEpiNum);
                                }


                                //#region new code for editable comboboxes

                                if (this.seriesTitleMaintenanaceCrChEpisode.ProgrammeCategory != null && this.seriesTitleMaintenanaceCrChEpisode.ProgrammeCategory != "Select")
                                {
                                    tempList.ProgrammeCategory = this.seriesTitleMaintenanaceCrChEpisode.ProgrammeCategory.ToString().Trim();
                                }
                                else
                                {
                                    tempList.ProgrammeCategory = "-";
                                }



                                if (this.seriesTitleMaintenanaceCrChEpisode.SubGenre != null && this.seriesTitleMaintenanaceCrChEpisode.SubGenre != "Select")
                                {
                                    tempList.ProgramSubGenre = this.seriesTitleMaintenanaceCrChEpisode.SubGenre.ToString().Trim();
                                }
                                else
                                {
                                    tempList.ProgramSubGenre = string.Empty;
                                }

                                if (this.seriesTitleMaintenanaceCrChEpisode.ProgrammeStudio != null && this.seriesTitleMaintenanaceCrChEpisode.ProgrammeStudio != "Select")
                                {
                                    tempList.ProgrammeStudio = this.seriesTitleMaintenanaceCrChEpisode.ProgrammeStudio.ToString().Trim();
                                  
                                }
                                else
                                {
                                    tempList.ProgrammeStudio = "-";
                                }


                                if (this.seriesTitleMaintenanaceCrChEpisode.EventType != null && this.seriesTitleMaintenanaceCrChEpisode.EventType != "Select")
                                {
                                    tempList.ProgramEvent = this.seriesTitleMaintenanaceCrChEpisode.EventType.ToString().Trim();
                                }
                                else
                                {
                                    tempList.ProgramEvent = string.Empty;
                                }

                                if (this.seriesTitleMaintenanaceCrChEpisode.Nationality != null && this.seriesTitleMaintenanaceCrChEpisode.Nationality != "Select")
                                {
                                    tempList.ProgramNationality = this.seriesTitleMaintenanaceCrChEpisode.Nationality.ToString().Trim();
                                }
                                else
                                {
                                    tempList.ProgramNationality = " ";
                                }


                                if (this.seriesTitleMaintenanaceCrChEpisode.Distribution != null && this.seriesTitleMaintenanaceCrChEpisode.Distribution != "Select")
                                {
                                    tempList.ProgramSuppName = this.seriesTitleMaintenanaceCrChEpisode.Distribution.ToString().Trim();
                                }
                                else
                                {
                                    tempList.ProgramSuppName = " ";
                                }


                                if (this.seriesTitleMaintenanaceCrChEpisode.OfficialRating != null && this.seriesTitleMaintenanaceCrChEpisode.OfficialRating != "Select")
                                {
                                    tempList.ProgrameRatingMPAA = this.seriesTitleMaintenanaceCrChEpisode.OfficialRating.ToString().Trim();
                                }
                                else
                                {
                                    tempList.ProgrameRatingMPAA = " ";
                                }

                                if (this.seriesTitleMaintenanaceCrChEpisode.unOfficialRating != null && this.seriesTitleMaintenanaceCrChEpisode.unOfficialRating != "Select")
                                {
                                    tempList.ProgramRatingINT = this.seriesTitleMaintenanaceCrChEpisode.unOfficialRating.ToString().Trim();
                                }
                                else
                                {
                                    tempList.ProgramRatingINT = " ";
                                }

                                tempSeries.SeasonNumber = Convert.ToInt32(this.seriesTitleMaintenanaceCrChEpisode.SeasonNumber);
                                tempSeries.SeriesNumber = Convert.ToInt32(this.seriesTitleMaintenanaceCrChEpisode.SeriesNumber);
                                tempList.ProgrameComment = this.seriesTitleMaintenanaceCrChEpisode.Comments;
                                tempList.ProgrammeDurationC = this.seriesTitleMaintenanaceCrChEpisode.Duration;
                                tempSeries.SeriesTitle = this.seriesTitleMaintenanaceCrChEpisode.SeriesTitle;
                                tempSeries.SeasonTitle = this.seriesTitleMaintenanaceCrChEpisode.SeasonTitle;


                                if (this.seriesTitleMaintenanaceCrChEpisode.EventValue != null && this.seriesTitleMaintenanaceCrChEpisode.EventValue != "Select")
                                {
                                    tempSeries.EventValue = this.seriesTitleMaintenanaceCrChEpisode.EventValue.ToString().Trim();
                                }
                                else
                                {
                                    tempSeries.EventValue = null;
                                }
                                //}


                                if (this.seriesTitleMaintenanaceCrChEpisode.ProdYear != String.Empty && this.seriesTitleMaintenanaceCrChEpisode.ProdYear != "Select")
                                {
                                    tempList.ProgrammeReleaseYear = Convert.ToInt32(this.seriesTitleMaintenanaceCrChEpisode.ProdYear);

                                }

                                //Inserting Local Program List from Here 
                                string strLocalProgramData = this.seriesTitleMaintenanaceCrChEpisode.LocalGridData;
                                JavaScriptSerializer serializer = new JavaScriptSerializer();
                                List<LocalProgrammeVO> localProgList = null;
                                localProgList = serializer.Deserialize<List<LocalProgrammeVO>>(strLocalProgramData);


                                //row added in grid for local prog info
                                if (localProgList.Count > 0)
                                {
                                    string chkTerrCode = string.Empty;

                                    for (int cnt = 0; cnt < localProgList.Count; cnt++)
                                    {
                                        if (localProgList[cnt].TerritoryCode == null || localProgList[cnt].TerritoryCode == "")
                                        {
                                            if (localProgList[cnt].TerritoryCode == "")
                                            {
                                                localProgList[cnt].TerritoryCode = null;
                                            }
                                            chkTerrCode = "N";
                                        }

                                        if (localProgList[cnt].LocalTitle == null || localProgList[cnt].LocalTitle == "")
                                        {
                                            if (localProgList[cnt].LocalTitle == "")
                                            {
                                                localProgList[cnt].LocalTitle = null;
                                            }
                                            chkTerrCode = "N";
                                        }

                                        if (localProgList[cnt].LocalReleaseVid == null || localProgList[cnt].LocalReleaseVid == "")
                                        {
                                            if (localProgList[cnt].LocalReleaseVid == "")
                                            {
                                                localProgList[cnt].LocalReleaseVid = null;
                                            }
                                        }

                                        if (localProgList[cnt].LocalReleaseCinema == null || localProgList[cnt].LocalReleaseCinema == "")
                                        {
                                            if (localProgList[cnt].LocalReleaseCinema == "")
                                            {
                                                localProgList[cnt].LocalReleaseCinema = null;
                                            }
                                        }


                                        if (localProgList[cnt].LocalReleaseTV == null || localProgList[cnt].LocalReleaseTV == "")
                                        {
                                            if (localProgList[cnt].LocalReleaseTV == "")
                                            {
                                                localProgList[cnt].LocalReleaseTV = null;
                                            }
                                        }
                                        if (localProgList[cnt].LocalComment == null || localProgList[cnt].LocalComment == "")
                                        {
                                            if (localProgList[cnt].LocalComment == "")
                                            {
                                                localProgList[cnt].LocalComment = null;
                                            }
                                        }

                                    }


                                    if (chkTerrCode.Equals("N"))
                                    {
                                        tempList.LocalProgramList = null;
                                    }
                                    else
                                    {
                                        tempList.LocalProgramList = localProgList;
                                    }
                                }
                                else
                                {
                                    tempList.LocalProgramList = null;
                                }

                           

                                //inserting synopsis
                                tempSynopsis.PersistFlag = PersistFlagEnum.Modified;
                                tempSynopsis.SynopsisDetails_Full = temp_full_synopsis;
                                tempSynopsis.SynopsisDetails_Local = temp_local_synopsis;
                                tempSynopsis.SynopsisID_Full = 2;
                                tempSynopsis.SynopsisID_Local = 1;


                                tempSynopsisList.Add(tempSynopsis);
                                tempList.ProgramSynopsisDetailsList = tempSynopsisList;


                                if (tempList.ProgrammeWorkingTitle.Trim() == "")
                                    tempList.ProgrammeWorkingTitle = this.seriesTitleMaintenanaceCrChEpisode.DisplayWorkingTitle;
                                tempSeries.ProgramDetails = tempList;
                                tempSeries.PersistFlag = PersistFlagEnum.Modified;
                                //add data related to an episode
                                tempListSaveUpdate.Add(tempSeries);


                            }
                        }
                    }


                }
                if (tempListSaveUpdate.Count > 0)
                {

                    ProgrammeLibraryClient proxy = null;
                    SaveUpdatedEpisodesResponse response = new SaveUpdatedEpisodesResponse();
                    try
                    {
                        proxy = new ProgrammeLibraryClient();
                        proxy.Open();
                        SaveUpdatedEpisodesRequest request = new SaveUpdatedEpisodesRequest();
                        request.UpdateEpisodesListVO = tempListSaveUpdate;
                        response = proxy.SaveUpdatedEpisodes(request);
                    }
                    finally
                    {
                        proxy.Close();
                    }

                    tempListSaveUpdate = response.UpdatedEpisodesListVO;

                    //if (tempListSave.Count < (num2 - num1))
                    //{
                    //    DisplayMessage("Please enter valid episode numbers to update.", "Error");
                    //    return;
                    //}
                    //tempListSave = ChangeEpisodesDetails(tempListSave);

                    //if (tempListSave.Count > 0)
                    //{
                    //    foreach (SeriesVO createdEpisodes in tempListSave)
                    //    {
                    //        if (createdEpisodes.SuccessFlag == true)
                    //            //MessageBox.Show("Episode(s) updated successfully");

                    //            UpdateApplicationMessageList(AppConstants.MessageCategory.StandardMessages, AppConstants.StandardMessageCodes.GeneralRecordsSaved, MessageTypeEnum.Information);
                    //        else
                    //            UpdateApplicationMessageList(AppConstants.MessageCategory.StandardMessages, AppConstants.StandardMessageCodes.GeneralRecordsNotSaved, MessageTypeEnum.Error);
                    //    }
                    //    SeriesDetailsList = tempListSave;
                    //    SetSeriesVOList();
                    //}
                    //   OnCloseView();

                }
            }
            else
            {
                //DisplayMessage("No episodes to edit", "Information");
            }
            // }
            // else
            //{
            //    //CustomValidate("Enter reqd fields");
            //    System.Windows.Forms.MessageBox.Show("Enter required fields");
            //}


        }

        public List<EpisodeDetails> changeEpisodeInfo()
        {

            ProgrammeVO programmeVOChangeEpis = new ProgrammeVO();

            int seriesNo;
            int programLength;
            List<EpisodeDetails> getTmpList = new List<EpisodeDetails>();

            programmeVOChangeEpis.ProgrammeWorkingTitle = this.seriesTitleChangeEpisode.DisplayWorkingTitle;
            programmeVOChangeEpis.ProgramMinEpisodeNo = Convert.ToInt32(this.seriesTitleChangeEpisode.NumofEpisodes);
            programmeVOChangeEpis.ProgramMaxEpisodeNo = Convert.ToInt32(this.seriesTitleChangeEpisode.FirstEpiNum);
            programmeVOChangeEpis.ProgrammeCategory = this.seriesTitleChangeEpisode.SportType;
            programmeVOChangeEpis.ProgramSubGenre = this.seriesTitleChangeEpisode.SubGenre;
            programmeVOChangeEpis.ProgrammeDurationC = this.seriesTitleChangeEpisode.Duration;
            programmeVOChangeEpis.ProgramEvent = this.seriesTitleChangeEpisode.EventType;

            seriesNo = Convert.ToInt32(this.seriesTitleChangeEpisode.NumofEpisodes);

            SeriesVO tempseriesVO = new SeriesVO();
            tempseriesVO.SeasonNumber = Convert.ToInt32(this.seriesTitleChangeEpisode.SeasonNumber);
            tempseriesVO.Season_Number = this.seriesTitleChangeEpisode.SeasonNumber;
            tempseriesVO.SeasonTitle = this.seriesTitleChangeEpisode.SeasonTitle;
            tempseriesVO.SeriesNumber = Convert.ToInt32(this.seriesTitleChangeEpisode.SeriesNumber);
            tempseriesVO.SeriesTitle = this.seriesTitleChangeEpisode.SeriesTitle;

            this.GetEpidodes(tempseriesVO);


            if (getEpisodeResult != null && getEpisodeResult.Count > 0)
            {

                for (int count = 0; count < getEpisodeResult.Count; count++)
                {

                    if (programmeVOChangeEpis.ProgramMinEpisodeNo <= Convert.ToInt32(getEpisodeResult[count].ProgrammeEPINumber) && programmeVOChangeEpis.ProgramMaxEpisodeNo >= Convert.ToInt32(getEpisodeResult[count].ProgrammeEPINumber))
                    {

                        if (programmeVOChangeEpis.ProgrammeWorkingTitle != null)
                        {
                            getEpisodeResult[count].EpisodeTitle = programmeVOChangeEpis.ProgrammeWorkingTitle;
                        }

                        //If Episode No checkbox is ticked  
                        if (this.seriesTitleChangeEpisode.CheckEpisodeNum)
                        {

                            programLength = getEpisodeResult[count].EpisodeTitle.Length;

                            if (this.seriesTitleChangeEpisode.CheckLeadZero)
                            {

                                if (seriesNo <= 9)
                                {


                                    var subProgramTitle = getEpisodeResult[count].EpisodeTitle.Substring(0, programLength - 4);
                                    subProgramTitle += "000" + seriesNo;
                                    getEpisodeResult[count].EpisodeTitle = "";
                                    getEpisodeResult[count].EpisodeTitle = subProgramTitle;



                                }

                                else if (seriesNo > 9 && seriesNo <= 99)
                                {
                                    var subProgramTitle = getEpisodeResult[count].EpisodeTitle.Substring(0, programLength - 4);
                                    subProgramTitle += "00" + seriesNo;
                                    getEpisodeResult[count].EpisodeTitle = "";
                                    getEpisodeResult[count].EpisodeTitle = subProgramTitle;
                                }
                                else if (seriesNo > 99 && seriesNo <= 999)
                                {
                                    var subProgramTitle = getEpisodeResult[count].EpisodeTitle.Substring(0, programLength - 4);
                                    subProgramTitle += "0" + seriesNo;
                                    getEpisodeResult[count].EpisodeTitle = "";
                                    getEpisodeResult[count].EpisodeTitle = subProgramTitle;
                                }

                            }
                            else
                            {
                                var subProgramTitle = getEpisodeResult[count].EpisodeTitle.Substring(0, programLength - 1);
                                subProgramTitle += seriesNo;
                                getEpisodeResult[count].EpisodeTitle = "";
                                getEpisodeResult[count].EpisodeTitle += subProgramTitle;
                            }

                            seriesNo++;
                        }




                        if ((programmeVOChangeEpis.ProgrammeCategory != "-") && (programmeVOChangeEpis.ProgrammeCategory != "Select"))
                        {
                            getEpisodeResult[count].ProgrammeCategory = programmeVOChangeEpis.ProgrammeCategory;
                        }

                        if ((programmeVOChangeEpis.ProgramSubGenre != "-") && (programmeVOChangeEpis.ProgramSubGenre != "Select"))
                        {
                            getEpisodeResult[count].SubGenre = programmeVOChangeEpis.ProgramSubGenre;
                        }

                        if ((programmeVOChangeEpis.ProgramEvent != "-") && (programmeVOChangeEpis.ProgramEvent != "Select"))
                        {
                            getEpisodeResult[count].EventType = programmeVOChangeEpis.ProgramEvent;
                        }


                        getEpisodeResult[count].Duration = programmeVOChangeEpis.ProgrammeDurationC;
                        getEpisodeResult[count].PersistFlag = "1"; //PersistFlagEnum.Modified;





                    }


                }//For Loop end

                getTmpList = getEpisodeResult;
            }
            return getTmpList;

        }

        public string  SaveChangeWorkingtitle()
        {
            string IsSaved = "N";
           
            int integerDesEpisodeFrom = Convert.ToInt32(this.seriesTitleMaintChangeEpisodeWorkingNo.SrcEpisodeTo1Working);
            int integerScrEpisodeFrom = Convert.ToInt32(this.seriesTitleMaintChangeEpisodeWorkingNo.SrcEpisodeFromWorking);
            int integerScrEpisodeTo = Convert.ToInt32(this.seriesTitleMaintChangeEpisodeWorkingNo.SrcEpisodeToWorking);
            int integerTemp = integerScrEpisodeFrom - 1;
            newepisodeSeriesVOList = new List<SeriesVO>();

            SeriesSearchViewModel objViewModel = new SeriesSearchViewModel();
            List<SeriesVO> episodeSeriesVOList = new List<SeriesVO>();
            SeriesVO objSeriesvo = new SeriesVO();
            objSeriesvo.SeriesNumber = Convert.ToInt32(this.seriesTitleMaintChangeEpisodeWorkingNo.SeriesNumber);
            objSeriesvo.SeasonNumber = Convert.ToInt32(this.seriesTitleMaintChangeEpisodeWorkingNo.SeasonNumber);
            objSeriesvo.SeriesTitle = this.seriesTitleMaintChangeEpisodeWorkingNo.SeriesTitle;
            objSeriesvo.SeasonTitle = this.seriesTitleMaintChangeEpisodeWorkingNo.SeriesTitle;
            objSeriesvo.Season_Number =this.seriesTitleMaintChangeEpisodeWorkingNo.SeasonNumber.ToString();



            ProgrammeLibraryClient proxy = null;
            DisplayEpisodeResponse response = new DisplayEpisodeResponse();
            try
            {
                proxy = new ProgrammeLibraryClient();
                DisplayEpisodeRequest request = new DisplayEpisodeRequest();
                request.DispalyEpisodeVO = objSeriesvo;
                response = proxy.DisplayEpisodesQuery(request);
               episodeSeriesVOList= response.DisplayEpisodesList;
            }
            finally
            {
                proxy.Close();
            }


            try
            {
                foreach (SeriesVO current in episodeSeriesVOList)
                {
                    newepisodeSeriesVOList.Add(current);

                    if (current.ProgramDetails.ProgrammeEPINumber >= integerScrEpisodeFrom && current.ProgramDetails.ProgrammeEPINumber <= integerScrEpisodeTo)
                    {
                        if (this.seriesTitleMaintChangeEpisodeWorkingNo.SrcEpisodeExampleWorking.Length > 0)
                        {
                            int index = 0;
                            index = this.seriesTitleMaintChangeEpisodeWorkingNo.SrcEpisodeExampleWorking.LastIndexOf(" ");
                            if (index != -1)
                                current.ProgramDetails.ProgrammeWorkingTitle = this.seriesTitleMaintChangeEpisodeWorkingNo.SrcEpisodeExampleWorking.Substring(0, this.seriesTitleMaintChangeEpisodeWorkingNo.SrcEpisodeExampleWorking.LastIndexOf(" "));
                        }

                        current.ProgramDetails.ProgrammeWorkingTitle = this.seriesTitleMaintChangeEpisodeWorkingNo.SrcEpisodeExampleWorking.Trim();
                        if (current.ProgramDetails.ProgrammeEPINumber == (integerTemp + 1))
                        {
                            integerTemp = current.ProgramDetails.ProgrammeEPINumber;
                            if (this.seriesTitleMaintChangeEpisodeWorkingNo.SrcLeadingZeros == true)
                            {
                                if (current.ProgramDetails.ProgrammeWorkingTitle != null)
                                    current.ProgramDetails.ProgrammeWorkingTitle = (current.ProgramDetails.ProgrammeWorkingTitle.Substring(0, current.ProgramDetails.ProgrammeWorkingTitle.Length - 1) + integerDesEpisodeFrom.ToString().PadLeft(4, '0')).ToString().Trim();//View.TextExample;
                                else
                                    current.ProgramDetails.ProgrammeWorkingTitle = (integerDesEpisodeFrom.ToString().PadLeft(4, '0')).ToString().Trim();//View.TextExample;                                
                            }
                            else
                            {
                                if (current.ProgramDetails.ProgrammeWorkingTitle != null)
                                    current.ProgramDetails.ProgrammeWorkingTitle = (current.ProgramDetails.ProgrammeWorkingTitle + " " + integerDesEpisodeFrom.ToString()).ToString().Trim(); // View.TextExample;
                                else
                                    current.ProgramDetails.ProgrammeWorkingTitle = (integerDesEpisodeFrom.ToString()).ToString().Trim(); // View.TextExample;
                            }
                            newepisodeSeriesVOList[newepisodeSeriesVOList.Count - 1].PersistFlag = PersistFlagEnum.Modified;
                            integerDesEpisodeFrom++;
                        }
                        else
                        {
                            MessageToView = "You are trying to change name for non-existent episode number. please check.";
                            newepisodeSeriesVOList = null;
                            break;
                        }

                    }

                }
            }catch(Exception ex)
                {
                    throw;
                }
            if (newepisodeSeriesVOList != null)
            {

                episodeSeriesVOList = new List<SeriesVO>(SaveEpisodeTitle(newepisodeSeriesVOList));
                IsSaved = "Y";
                //SeriesEpisodeListProperty = episodeSeriesVOList;
                //SetSeriesVOList();
                //OnCloseView();

            }

            return IsSaved;
        }


        public IEnumerable<SeriesVO> SaveEpisodeTitle(List<SeriesVO> newepisodeSeriesVOList)
        {
            List<SeriesVO> seriesEpisodeListTemp = new List<SeriesVO>(newepisodeSeriesVOList.Where<SeriesVO>(s => s.PersistFlag != PersistFlagEnum.UnModified).ToList());

            seriesEpisodeListTemp = this.SaveTitleEpisode(seriesEpisodeListTemp);
          
            return newepisodeSeriesVOList;
        }

        public List<SeriesVO> SaveTitleEpisode(List<SeriesVO> saveEpisodeTitleList)
        {
            ProgrammeLibraryClient proxy = null;
            SaveChangeWorkingTitleResponse response = new SaveChangeWorkingTitleResponse();
            try
            {
                proxy = new ProgrammeLibraryClient();
                proxy.Open();
                SaveChangeWorkingTitleRequest request = new SaveChangeWorkingTitleRequest();
                request.SaveChangeWorkingTitleListReq = saveEpisodeTitleList;
                response = proxy.SaveChangeWorkingTitleQuery(request);
               // ShowApplicationMessage(response.Messages);
                //if (response.Messages == null)
                //{
                //    MPLSeriesTitleMaintenancePresenter.isClosebuttonClick = false;
                //}
                //else
                //    MPLSeriesTitleMaintenancePresenter.isClosebuttonClick = true;
            }
            finally
            {
                proxy.Close();
            }
            return response.SaveChangeWorkingTitleListRes;
        }

        
       


    }

     

    [Serializable]
    public class SeriesTitleMaintChangeEpisodeNo
    {
        [Display(Name = "Change Episodes")]
        public string SrcEpisodeFrom { get; set; }
        [Display(Name = "To")]
        public string SrcEpisodeTo { get; set; }
        [Display(Name = "To Episodes")]
        public string DesEpisodeFrom { get; set; }
        [Display(Name = "To")]
        public string DesEpisodeTo { get; set; }


    }

    [Serializable]
    public class SeriesTitleMaintenanaceEnterUpdateLiveInfo
    {
        [Display(Name = "Change Episodes")]
        public string SrcEpisodeFrom { get; set; }
        [Display(Name = "To")]
        public string SrcEpisodeTo { get; set; }
        [Display(Name = "Days Between")]
        public string DaysBetween { get; set; }
        [Display(Name = "Default Time")]
        public string DefaultTime { get; set; }
        [Display(Name = "")]
        public string DefaultTimeMinutes { get; set; }
        [Display(Name = "Default Date")]
        public string DefaultDate { get; set; }


    }


    [Serializable]
    public class SeriesTitleMaintenanaceCrChEpisode
    {

        //DevExpress.Wpf.Grid.TableView TableLocalProgram { get; set; }
        [Display(Name = "Display Working Title")]
        public string DisplayWorkingTitle { get; set; }
        [Display(Name = "Additional Text")]
        public string AddText { get; set; }
        [Display(Name = "")]
        public string DisplayProgTitle { get; set; }
        [Display(Name = "Additional Text")]
        public string PrAddText { get; set; }
        [Display(Name = "Number Of Episodes")]
        public string NumofEpisodes { get; set; }
        [Display(Name = "1st Episode Number")]
        public string FirstEpiNum { get; set; }
        [Display(Name = "Production Year")]
        public string ProdYear { get; set; }
        [Display(Name = "Comment")]
        public string Comments { get; set; }
        [Display(Name = "Duration")]
        public string Duration { get; set; }
        [Display(Name = "Synopsis")]
        public string TextSynopsis { get; set; }

        [Display(Name = "Programme Types")]
        public string ProgType { get; set; }

        [Display(Name = "Programme Category")]
        public string ProgrammeCategory { get; set; }

        [Display(Name = "Event Type")]
        public string EventType { get; set; }

        [Display(Name = "Event Value")]
        public string EventValue { get; set; }

        [Display(Name = "Unofficial Rating")]
        public string UnofficailRating { get; set; }
        [Display(Name = "Nationality")]
        public string Nationality { get; set; }
        [Display(Name = "Synopsis")]
        public string ComboSynopsis { get; set; }
        [Display(Name = "SportType/Genre")]
        public string SportType { get; set; }
        [Display(Name = "Sub Genres")]
        public string SubGenre { get; set; }

        [Display(Name = "Program Studio")]
        public string ProgrammeStudio { get; set; }

        [Display(Name = "Production House")]
        public string ProdHouse { get; set; }
        [Display(Name = "Distribution")]
        public string Distribution { get; set; }
        [Display(Name = "Official Rating")]
        public string OfficialRating { get; set; }

        [Display(Name = "unofficial Rating")]
        public string unOfficialRating { get; set; }

        [Display(Name = "Series")]
        public bool CheckSeries { get; set; }
        [Display(Name = "Season")]
        public bool CheckSeason { get; set; }
        [Display(Name = "Leading Zeroes Y/N")]
        public bool CheckLeadZero { get; set; }
        [Display(Name = "Additional Text")]
        public bool CheckAddText { get; set; }
        [Display(Name = "Episode Number")]
        public bool CheckEpisodeNum { get; set; }
        [Display(Name = "Series")]
        public bool CheckPrSeries { get; set; }
        [Display(Name = "Season")]
        public bool CheckPrSeason { get; set; }
        [Display(Name = "Leading Zeroes Y/N")]
        public bool CheckPrLeadZero { get; set; }
        [Display(Name = "Additional Text")]
        public bool CheckProgAddText { get; set; }
        [Display(Name = "Episode Number")]
        public bool CheckPrEpisodeNum { get; set; }
        [Display(Name = "Number Of Episodes")]
        public string LabelNumofEpisodes { get; set; }
        [Display(Name = "1st Episode Number")]
        public string Label1stEpisode { get; set; }
        [Display(Name = "")]
        public string TitleLabel { get; set; }
        [Display(Name = "")]
        public string GenerateButton { get; set; }

        [Display(Name = "PrTitleZero")]
        public string PrTitleZero { get; set; }

        [Display(Name = "PrTitleOne")]
        public string PrTitleOne { get; set; }

        [Display(Name = "PrTitleTwo")]
        public string PrTitleTwo { get; set; }

        [Display(Name = "WrkTitleZero")]
        public string WrkTitleZero { get; set; }

        [Display(Name = "WrkTitleOne")]
        public string WrkTitleOne { get; set; }

        [Display(Name = "WrkTitleTwo")]
        public string WrkTitleTwo { get; set; }

        [Display(Name = "SeasonNumber")]
        public string SeasonNumber { get; set; }

        [Display(Name = "SeriesNumber")]
        public string SeriesNumber { get; set; }

        [Display(Name = "SeriesTitle")]
        public string SeriesTitle { get; set; }

        [Display(Name = "SeasonTitle")]
        public string SeasonTitle { get; set; }

        [Display(Name = "ButtonText")]
        public string ButtonText { get; set; }


        [Display(Name = "BtnSaveFlag")]
        public string BtnSaveFlag { get; set; }

        [Display(Name = "LocalGridData")]
        public string LocalGridData { get; set; }

        [Display(Name = "ChangeEpisode")]
        public bool ChangeEpisode { get; set; }


        [Display(Name = "CommonFlag")]
        public string CommonFlag { get; set; }

        [Display(Name = "Flag")]
        public bool Flag { get; set; }

        [Display(Name = "Update Programme Title")]
        public bool IsProgramChk { get; set; }


        [Display(Name = "Update Working Title")]
        public bool IsWorkingTitleChk { get; set; }


        [Display(Name = "ProgrammeEPINumber")]
        public string ProgrammeEPINumber { get; set; }


        [Display(Name = "ProgrammeTitle")]
        public string ProgrammeTitle { get; set; }

    }

    [Serializable]
    public class SeriesTitleChangeEpisode
    {

        [Display(Name = "Display Working Title")]
        public string DisplayWorkingTitle { get; set; }

        [Display(Name = "Number Of Episodes")]
        public string NumofEpisodes { get; set; }
       
        [Display(Name = "1st Episode Number")]
        public string FirstEpiNum { get; set; }

        [Display(Name = "Duration")]
        public string Duration { get; set; }
 
        [Display(Name = "Event Type")]
        public string EventType { get; set; }

        [Display(Name = "SportType/Genre")]
        public string SportType { get; set; }

        [Display(Name = "Sub Genres")]
        public string SubGenre { get; set; }

        [Display(Name = "Leading Zeroes Y/N")]
        public bool CheckLeadZero { get; set; }

        [Display(Name = "Episode Number")]
        public bool CheckEpisodeNum { get; set; }

        [Display(Name = "SeasonNumber")]
        public string SeasonNumber { get; set; }

        [Display(Name = "SeriesNumber")]
        public string SeriesNumber { get; set; }

        [Display(Name = "SeriesTitle")]
        public string SeriesTitle { get; set; }

        [Display(Name = "SeasonTitle")]
        public string SeasonTitle { get; set; }

    }

   

    [Serializable]
    public class SeriesTitleMaintAddUpdateSeriesTitle
    {
        [Display(Name = "Enter The Title")]
        public string SeasonTitle { get; set; }
        [Display(Name = "Enter The Title")]
        public string SeriesTitle { get; set; }
        [Display(Name = "Additional Text")]
        public string AdditionalText { get; set; }
        [Display(Name = "Update Programme Title")]
        public bool CheckPrgm { get; set; }
        [Display(Name = "Series")]
        public bool CheckSeries { get; set; }
        [Display(Name = "Season")]
        public bool CheckSeason { get; set; }
        [Display(Name = "Additional Text")]
        public bool CheckAdditionalText { get; set; }
        [Display(Name = "Episode Number")]
        public bool CheckEpisodeNo { get; set; }
        [Display(Name = "Leading Zero Y/N")]
        public bool CheckLeadZero { get; set; }
        [Display(Name = "Update Programme Title")]
        public bool UpdateProgrammeTitle { get; set; }
        public bool IsAddSeriesTitle { get; set; }

    }


    [Serializable]
    public class AddSeasonTitle
    {
        [Display(Name = "Enter The Title")]
        public string SeasonTitle { get; set; }

        [Display(Name = "Season Number")]
        public string SeasonNumber { get; set; }

        [Display(Name = "Example :")]
        public string EpisodeTitle { get; set; }

        [Display(Name = "Update Programme Title")]
        public bool IsProgramChk { get; set; }

        [Display(Name = "Season")]
        public bool IsSeasonChks { get; set; }

        [Display(Name = "Episode Number")]
        public bool IsEpisodeChk { get; set; }

        [Display(Name = "Series")]
        public bool IsSerieschk { get; set; }

        [Display(Name = "Leading Zero Y/N")]
        public bool IsLeadingZeroChk { get; set; }


        [Display(Name = "Additional Text")]
        public bool IsAdditionalText { get; set; }


        [Display(Name = "Additional Description")]
        public string AddtionalText { get; set; }

        [Display(Name = "SeriesTitle")]
        public string SeriesTitle { get; set; }

        [Display(Name = "chkSeasonFlag")]
        public bool Flag { get; set; }

    }

    //public class SeriesTitleMaintChangeEpisodeNo
    // Change Episode Working Title.
    [Serializable]
    public class SeriesTitleManitChangeEpisodeWorkingNo
    {
        [Display(Name = "Example")]
        public string SrcEpisodeExampleWorking { get; set; }
        [Display(Name = "From")]
        public string SrcEpisodeFromWorking { get; set; }
        [Display(Name = "To")]
        public string SrcEpisodeToWorking { get; set; }
        [Display(Name = "To")]
        public string SrcEpisodeTo1Working { get; set; }
        [Display(Name = "To")]
        public string SrcEpisodeTo2Working { get; set; }
        [Display(Name = "Additional Text")]
        public string SrcEpisodeWorkingTitleAddnText { get; set; }
        [Display(Name = "Series")]
        public bool SrcSeries { get; set; }
        [Display(Name = "Seasons")]
        public bool SrcSeasons { get; set; }
        [Display(Name = "Additional Checked")]
        public bool SrcAddtionalText { get; set; }
        [Display(Name = "Leading Zeros")]
        public bool SrcLeadingZeros { get; set; }
        [Display(Name = "Series No")]
        public string SeriesNumber { get; set; }
        [Display(Name = "Season No")]
        public string SeasonNumber { get; set; }
        [Display(Name = "Series Title")]
        public string SeriesTitle {get;set;}
        [Display(Name = "Season Title")]
        public string SeasonTitle { get; set; }
             
    }
}
