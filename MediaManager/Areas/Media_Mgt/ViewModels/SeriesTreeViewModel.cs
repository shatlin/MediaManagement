using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MediaManager.DealMemoService;
using MediaManager.Infrastructure.Helpers;
using System.ComponentModel.DataAnnotations;
using MediaManager.Infrastructure.Attributes;
using System.Web.Script.Serialization;

namespace MediaManager.Areas.Media_Mgt.ViewModels
{
    [HandleErrorWithELMAHAttribute]
    public class SeriesTreeViewModel
    {
        public SeriesVO seriesvo { get; set; }

        [Display(Name = "Number of Unlicenced Episodes")]
        public string NumberofUnlicencedEpisodes { get; set; }
        [Display(Name = "First Episode Number")]
        public string FirstEpisodeNumber { get; set; }
        [Display(Name = "Relicence From")]
        public string TextRelicence_From { get; set; }
        [Display(Name = "Next Episode Number")]
        public string TextNextEpi { get; set; }
        [Display(Name = "Relicence To")]
        public string TextRelicence_To { get; set; }
        [Display(Name = "Price of First Episode")]
        public string TextPriFirEpi { get; set; }
        [Display(Name = "Price of Other Episodes")]
        public string TextPriOthEpi { get; set; }
        [Display(Name = "Duration")]
        public string TextDuration { get; set; }
        [Display(Name = "Text")]
        public string TextWTAddText { get; set; }
        [Display(Name = "Text")]
        public string TextAddText { get; set; }
        [Display(Name = "Sport Type/Genre")]
        public string TextSportType { get; set; }
        [Display(Name = "Sub-Genre")]
        public string TextSubGenre { get; set; }
        [Display(Name = "Event Type")]
        public string TextEventType { get; set; }
        [Display(Name = "Series")]
        public bool ChkWTSeries { get; set; }
        [Display(Name = "Series")]
        public bool ChkSeries { get; set; }
        [Display(Name = "Season")]
        public bool ChkWTSeason { get; set; }
        [Display(Name = "Season")]
        public bool ChkSeason { get; set; }
        [Display(Name = "Additional Text")]
        public bool ChkWTAddText { get; set; }
        [Display(Name = "Additional Text")]
        public bool ChkAddText { get; set; }
        [Display(Name = "Episode Number")]
        public bool ChkWTEpi_No { get; set; }
        [Display(Name = "Episode Number")]
        public bool ChkEpi_No { get; set; }


        public string DMVo_DMNumber { get; set; }
        public string TypeComboSelection { get; set; }
        public string RefNo { get; set; }
        public string Type { get; set; }
        public string ReleaseYear { get; set; }
        public string Id { get; set; }

        [Display(Name = "Enter The Title")]
        public string SeasonTitle { get; set; }
        [Display(Name = "Season Number")]
        public string SeasonNumber { get; set; }
        //[Display(Name = "Season Number")]
        // public string SeriesTitle { get; set; }
        public List<DMEpisodeDetails> dMEpisodeDetails { get; set; }
        public List<string> ErrorMessage { get; set; }





        public string NewTitle { get; set; }
        public string NewSeriesTitle { get; set; }
        public string NewsportTypeGenre { get; set; }
        public string NewsubGenre { get; set; }
        public string NeweventType { get; set; }
        public string NewRefNo { get; set; }
        public string NewDuration { get; set; }
       

        //public void SearchDealMemoSeriesDetails(ProgrammeVO selectedPgData, string DMVo_DMNumber, string TypeComboSelection)
        //{
        //    SeriesVO dealMemoSeries = new SeriesVO();
        //    dealMemoSeries.DMNumber = Convert.ToInt32(DMVo_DMNumber);
        //    dealMemoSeries.DMType = TypeComboSelection;
        //    dealMemoSeries.DMGenRefNo = selectedPgData.RefNo;
        //    dealMemoSeries.DMProgrammme_Type = selectedPgData.Type;
        //    dealMemoSeries.Production_Year = selectedPgData.ReleaseYear;
        //    DealMemoClient proxy = null;
        //    SeriesTreeResponse response = new SeriesTreeResponse();
        //    try
        //    { 
        //        proxy = ServiceInvoker.OpenDealMemoProxy();
        //        SeriesTreeRequest request = new SeriesTreeRequest();
        //        request.DealMemoSeries = dealMemoSeries;
        //        response = proxy.SearchDealMemoSeriesDetails(request);
        //        if (response.Messages != null && response.Messages.Count > 0)
        //        {
        //            //this.OraCustomExceptionMsg = new List<AppMessage>();
        //            //this.OraCustomExceptionMsg = response.Messages;
        //        }
        //    }
        //    finally
        //    {
        //        ServiceInvoker.CloseDealMemoProxy(proxy);
        //    }
        //    this.seriesvo = response.DealMemoSeries;
        //}
        public void LoadDefaultValues()
        {
            this.ChkWTSeason = true;
            this.ChkSeason = true;
            this.ChkEpi_No = true;
            this.ChkWTEpi_No = true;
            this.FirstEpisodeNumber = "1";
            this.NumberofUnlicencedEpisodes = "1";
            this.TextNextEpi = "1";
            this.TextPriFirEpi = this.seriesvo.DMProgrammme_Price.ToString();
            this.TextPriOthEpi = "0.000";
            this.TextDuration = "00:00:00";

        }
        public void LoadValues()
        {
            int NextEpi;
            int FirstEpiNo;
            string duration;
            if (this.dMEpisodeDetails.Count > 0)
            {
                NextEpi = Convert.ToInt32(this.dMEpisodeDetails[this.dMEpisodeDetails.Count - 1].SequenceEpisodeno) + 1;
                FirstEpiNo = this.dMEpisodeDetails.Min(ep => Convert.ToInt32(ep.SequenceEpisodeno));
                duration = this.dMEpisodeDetails.Max(s => s.Duration);
            }
            else
            {
                NextEpi = 0;
                FirstEpiNo = 1;
                duration = "00:00:00";
            }
            int UnLicEpi = this.dMEpisodeDetails.Count(ep => ep.MemNo == null || ep.MemNo == "");

           
            
            this.ChkWTSeason = true;
            this.ChkSeason = true;
            this.ChkEpi_No = true;
            this.ChkWTEpi_No = true;
            this.FirstEpisodeNumber = FirstEpiNo.ToString();
            this.NumberofUnlicencedEpisodes = UnLicEpi.ToString();
            this.TextNextEpi = NextEpi.ToString();
            this.TextPriFirEpi = (this.seriesvo.Season_Data.FirstOrDefault(s => s.Title == this.seriesvo.Selected_Season_Title).Price_First_Episode).ToString();
            //this.TextPriOthEpi = (this.seriesvo.Season_Data.FirstOrDefault(s => s.Title == this.seriesvo.Selected_Season_Title).Price_Other_Episode).ToString();
            this.TextPriOthEpi = (this.seriesvo.DMProgrammme_Price - Convert.ToDouble(this.TextPriFirEpi)).ToString();
            if (duration == "" || duration == null)
                this.TextDuration = "00:00:00";
            else
                this.TextDuration = duration;

        }
        public void SearchDealMemoSeriesDetails(string DMVo_DMNumber, string TypeComboSelection, string RefNo, string Type, string ReleaseYear)
        {
            SeriesVO dealMemoSeries = new SeriesVO();
            dealMemoSeries.DMNumber = Convert.ToInt32(DMVo_DMNumber);
            dealMemoSeries.DMType = TypeComboSelection;
            if (RefNo != null)
                dealMemoSeries.DMGenRefNo = Convert.ToInt32(RefNo);
            if (Type != null)
                dealMemoSeries.DMProgrammme_Type = Type;
            if (ReleaseYear != "null")
                dealMemoSeries.Production_Year = Convert.ToInt32(ReleaseYear);
            DealMemoClient proxy = null;
            SeriesTreeResponse response = new SeriesTreeResponse();
            try
            {
                proxy = ServiceInvoker.OpenDealMemoProxy();
                SeriesTreeRequest request = new SeriesTreeRequest();
                request.DealMemoSeries = dealMemoSeries;
                response = proxy.SearchDealMemoSeriesDetails(request);
                if (response.Messages != null && response.Messages.Count > 0)
                {
                    //this.OraCustomExceptionMsg = new List<AppMessage>();
                    //this.OraCustomExceptionMsg = response.Messages;
                }
            }
            finally
            {
                ServiceInvoker.CloseDealMemoProxy(proxy);
            }
            this.seriesvo = response.DealMemoSeries;
            this.DMVo_DMNumber = DMVo_DMNumber;
            this.TypeComboSelection = TypeComboSelection;
            this.RefNo = RefNo;
            this.ReleaseYear = ReleaseYear;
            this.Type = Type;

        }
        public void GetSeasonEpisodes(string series, string season)
        {
            dMEpisodeDetails = new List<DMEpisodeDetails>();
            DMEpisodeDetails dmepisode;
            if (this.seriesvo != null)
            {
                if (this.seriesvo.Season_Data != null)
                {
                    foreach (SeriesVO item in this.seriesvo.Season_Data)
                    {
                        if (this.seriesvo.Title == series && item.Title == season)
                        {
                            this.seriesvo.Selected_Season_Title = season;
                            this.seriesvo.Id = item.Id;
                            if (item.Episode_Data != null)
                            {
                                foreach (EpisodeVO episodeitem in item.Episode_Data)
                                {
                                    dmepisode = new DMEpisodeDetails();
                                    dmepisode.SequenceEpisodeno = episodeitem.Episode_Number.ToString();
                                    dmepisode.EpisodeTitle = episodeitem.Episode_Working_Title;
                                    dmepisode.Duration = episodeitem.Duration;
                                    dmepisode.Comments = episodeitem.Epi_Comments;
                                    dmepisode.LiveDate = episodeitem.LiveDate.ToString();
                                    dmepisode.LiveTime = episodeitem.LiveTime.ToString();
                                    dmepisode.Location = episodeitem.Location;
                                    dmepisode.Vennue = episodeitem.Venue;
                                    dmepisode.MemNo = episodeitem.MemNo.ToString();
                                    dMEpisodeDetails.Add(dmepisode);
                                }
                            }
                            else
                            {
                                dmepisode = new DMEpisodeDetails();
                                dMEpisodeDetails.Add(dmepisode);

                            }
                            break;
                        }
                    }
                }
            }
        }
        public string GenerateSeasonEpisodes(SeriesTreeViewModel seriesTreeViewModel)
        {

            JavaScriptSerializer serializer = new JavaScriptSerializer();
            List<EpisodeVO> episodeList = new List<EpisodeVO>();
            seriesTreeViewModel.ErrorMessage = new List<string>();
            int firstepisodenumber = Convert.ToInt32(seriesTreeViewModel.FirstEpisodeNumber);

            if (seriesTreeViewModel.seriesvo == null)
                seriesTreeViewModel.seriesvo = new SeriesVO();
            seriesTreeViewModel.SearchDealMemoSeriesDetails(seriesTreeViewModel.DMVo_DMNumber, seriesTreeViewModel.TypeComboSelection, seriesTreeViewModel.RefNo, seriesTreeViewModel.Type, seriesTreeViewModel.ReleaseYear);
            seriesTreeViewModel.seriesvo.Selected_Season_Title = seriesTreeViewModel.SeasonTitle;
            if (seriesTreeViewModel.seriesvo.Season_Data != null)
            {
                foreach (SeriesVO item in seriesTreeViewModel.seriesvo.Season_Data)
                {
                    if (seriesTreeViewModel.SeasonTitle == item.Title)
                    {

                        if (item.Episode_Data != null)
                        {
                            foreach (var epi in item.Episode_Data)
                            {
                                if (epi.Episode_Number == firstepisodenumber)
                                {
                                    seriesTreeViewModel.ErrorMessage.Add("Episode Number already exist,Check the Last Episode Number for this Season");
                                    break;
                                }

                            }

                        }
                        seriesTreeViewModel.seriesvo.Id = item.Id;
                        break;
                    }
                }
            }
            //seriesTreeViewModel.seriesvo.Id = seriesTreeViewModel.seriesvo.Season_Data[i].Id;
            if (seriesTreeViewModel.ErrorMessage.Count == 0)
            {
                seriesTreeViewModel.seriesvo.Title_Series = seriesTreeViewModel.ChkSeries;
                seriesTreeViewModel.seriesvo.Title_Season = seriesTreeViewModel.ChkSeason;
                seriesTreeViewModel.seriesvo.Title_Additional_Text = seriesTreeViewModel.ChkAddText;
                seriesTreeViewModel.seriesvo.Title_Text = seriesTreeViewModel.TextAddText;
                seriesTreeViewModel.seriesvo.Title_Episode_No = seriesTreeViewModel.ChkEpi_No;
                seriesTreeViewModel.seriesvo.WT_Series = seriesTreeViewModel.ChkWTSeries;
                seriesTreeViewModel.seriesvo.WT_Season = seriesTreeViewModel.ChkWTSeason;
                seriesTreeViewModel.seriesvo.WT_Additional_Text = seriesTreeViewModel.ChkWTAddText;
                seriesTreeViewModel.seriesvo.WT_Text = seriesTreeViewModel.TextWTAddText;
                seriesTreeViewModel.seriesvo.WT_Episode_No = seriesTreeViewModel.ChkWTEpi_No;
                seriesTreeViewModel.seriesvo.Duration = seriesTreeViewModel.TextDuration;
                seriesTreeViewModel.seriesvo.SportType_Genre = seriesTreeViewModel.TextSportType;
                seriesTreeViewModel.seriesvo.Genre = seriesTreeViewModel.TextSubGenre;
                seriesTreeViewModel.seriesvo.Event_Type = seriesTreeViewModel.TextEventType;
                seriesTreeViewModel.seriesvo.Unlicensed_Episodes = Convert.ToInt32(seriesTreeViewModel.NumberofUnlicencedEpisodes);
                seriesTreeViewModel.seriesvo.Episode_Count = Convert.ToInt32(seriesTreeViewModel.NumberofUnlicencedEpisodes);
                seriesTreeViewModel.seriesvo.First_Episode = Convert.ToInt32(seriesTreeViewModel.FirstEpisodeNumber);
                DealMemoClient proxy = null;
                SeriesTreeResponse response = new SeriesTreeResponse();
                try
                {
                    proxy = ServiceInvoker.OpenDealMemoProxy();
                    SeriesTreeRequest request = new SeriesTreeRequest();
                    request.DealMemoSeries = seriesTreeViewModel.seriesvo;
                    response = proxy.GenerateEpisodeDetails(request);
                    if (response.Messages != null && response.Messages.Count > 0)
                    {
                        //this.OraCustomExceptionMsg = new List<AppMessage>();
                        //this.OraCustomExceptionMsg = response.Messages;
                    }
                }
                finally
                {
                    ServiceInvoker.CloseDealMemoProxy(proxy);
                }

                DMEpisodeDetails dmepisode;
                if (seriesTreeViewModel.dMEpisodeDetails == null)
                    seriesTreeViewModel.dMEpisodeDetails = new List<DMEpisodeDetails>();
                foreach (EpisodeVO episodeitem in response.EpisodeData)
                {

                    dmepisode = new DMEpisodeDetails();
                    dmepisode.SequenceEpisodeno = episodeitem.Episode_Number.ToString();
                    dmepisode.EpisodeTitle = episodeitem.Episode_Working_Title;
                    dmepisode.Duration = episodeitem.Duration;
                    dmepisode.Comments = episodeitem.Epi_Comments;
                    dmepisode.LiveDate = episodeitem.LiveDate.ToString();
                    dmepisode.LiveTime = episodeitem.LiveTime.ToString();
                    dmepisode.Location = episodeitem.Location;
                    dmepisode.Vennue = episodeitem.Venue;
                    dmepisode.MemNo = episodeitem.MemNo.ToString();
                    dmepisode.gridstatus = "New";
                    //   dMEpisodeDetails.Add(dmepisode);

                    seriesTreeViewModel.dMEpisodeDetails.Add(dmepisode);
                }
            }
            //  seriesTreeViewModel.dMEpisodeDetails.AddRange(genratedepisodeList);
            seriesTreeViewModel.seriesvo = null;
            serializer.MaxJsonLength = 2147483647;
            return serializer.Serialize(seriesTreeViewModel);
        }

        public string AddSeasonSave(SeriesTreeViewModel seriesTreeViewModel)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            //SeriesVO tt;
            seriesTreeViewModel.SearchDealMemoSeriesDetails(seriesTreeViewModel.DMVo_DMNumber, seriesTreeViewModel.TypeComboSelection, seriesTreeViewModel.RefNo, seriesTreeViewModel.Type, seriesTreeViewModel.ReleaseYear);


            SeriesVO newseason = new SeriesVO();
            newseason.Title = seriesTreeViewModel.SeasonTitle.ToUpper();
            newseason.Season_Number = seriesTreeViewModel.SeasonNumber;
            newseason.Price_First_Episode = seriesTreeViewModel.seriesvo.DMProgrammme_Price;
            newseason.PersistFlag = PersistFlagEnum.Added;
            newseason.Episode_Data = new List<EpisodeVO>();
            newseason.Episode_Count = 0;
            if (seriesTreeViewModel.seriesvo.Season_Data == null)
                seriesTreeViewModel.seriesvo.Season_Data = new List<SeriesVO>();
            seriesTreeViewModel.seriesvo.Season_Data.Add(newseason);

            DealMemoClient proxy = null;
            SeriesTreeResponse response = new SeriesTreeResponse();
            try
            {
                proxy = ServiceInvoker.OpenDealMemoProxy();
                SeriesTreeRequest request = new SeriesTreeRequest();
                request.DealMemoSeries = seriesTreeViewModel.seriesvo;
                response = proxy.SaveDealMemoSeriesDetails(request);
                if (response.Messages != null && response.Messages.Count > 0)
                {
                    // this.OraCustomExceptionMsg = new List<AppMessage>();
                    //  this.OraCustomExceptionMsg = response.Messages;
                    
                }
                else
                {
                    // this.OraCustomExceptionMsg = null;
                }
            }
            finally
            {
                ServiceInvoker.CloseDealMemoProxy(proxy);
            }
            seriesTreeViewModel.seriesvo = response.DealMemoSeries;
            seriesTreeViewModel.seriesvo.Season_Data=null;
            seriesTreeViewModel.NewTitle=seriesTreeViewModel.SeasonTitle.ToUpper();
            seriesTreeViewModel.NewSeriesTitle =seriesTreeViewModel.seriesvo.Title;
            seriesTreeViewModel.NewRefNo = seriesTreeViewModel.seriesvo.DMGenRefNo.ToString();
            serializer.MaxJsonLength = 2147483647;
            return serializer.Serialize(seriesTreeViewModel);
        }


        public string SaveEpisodeDetails(SeriesTreeViewModel seriesTreeViewModel)
        {

            seriesTreeViewModel.ErrorMessage = new List<string>();

            JavaScriptSerializer serializer = new JavaScriptSerializer();
            string errormsg;
            SeriesVO retseriesvo;
            EpisodeVO addepisode;
            seriesTreeViewModel.SearchDealMemoSeriesDetails(seriesTreeViewModel.DMVo_DMNumber, seriesTreeViewModel.TypeComboSelection, seriesTreeViewModel.RefNo, seriesTreeViewModel.Type, seriesTreeViewModel.ReleaseYear);
            if (seriesTreeViewModel.seriesvo == null)
                seriesTreeViewModel.seriesvo = new SeriesVO();

            seriesTreeViewModel.seriesvo.Selected_Season_Title = seriesTreeViewModel.SeasonTitle;
            try
            {
                double chkprice = Convert.ToDouble(seriesTreeViewModel.TextPriFirEpi);
            }
            catch (Exception ex)
            {
                errormsg = "Invalid First Episode Price";
                seriesTreeViewModel.ErrorMessage.Add(errormsg);
                return serializer.Serialize(seriesTreeViewModel);
            }
            if (Convert.ToDouble(seriesTreeViewModel.TextPriFirEpi) < 0)
            {
                errormsg = "First Episode Price can't be negative value";
                seriesTreeViewModel.ErrorMessage.Add(errormsg);
                return serializer.Serialize(seriesTreeViewModel);
            }
            if (Convert.ToDouble(seriesTreeViewModel.TextPriFirEpi) > seriesTreeViewModel.seriesvo.DMProgrammme_Price)
            {
                errormsg = "First Episode Price can't be greater than DM Total Price";
                seriesTreeViewModel.ErrorMessage.Add(errormsg);
            }
            else
            {


                double Total_Price = seriesTreeViewModel.seriesvo.DMProgrammme_Price;
                double Total_Other_Price_Epi = Total_Price - Convert.ToDouble(seriesTreeViewModel.TextPriFirEpi);
                seriesTreeViewModel.seriesvo.Season_Data.FirstOrDefault(s => s.Title == seriesTreeViewModel.seriesvo.Selected_Season_Title).Price_First_Episode = Convert.ToDouble(seriesTreeViewModel.TextPriFirEpi);
                seriesTreeViewModel.seriesvo.Season_Data.FirstOrDefault(s => s.Title == seriesTreeViewModel.seriesvo.Selected_Season_Title).Price_Other_Episode = Total_Other_Price_Epi;
                //seriesTreeViewModel.seriesvo.Season_Data.FirstOrDefault(s => s.Title == seriesTreeViewModel.seriesvo.Selected_Season_Title).Episode_Count = seriesTreeViewModel.dMEpisodeDetails.Count;
                seriesTreeViewModel.seriesvo.Season_Data.FirstOrDefault(s => s.Title == seriesTreeViewModel.seriesvo.Selected_Season_Title).PersistFlag = PersistFlagEnum.Modified;


                if (seriesTreeViewModel.dMEpisodeDetails != null)
                {
                    foreach (DMEpisodeDetails epi in seriesTreeViewModel.dMEpisodeDetails)
                    {
                        foreach (SeriesVO season in seriesTreeViewModel.seriesvo.Season_Data)
                        {
                            if (season.Title == seriesTreeViewModel.SeasonTitle)
                            {
                                if (epi.gridstatus == "Edit" || epi.gridstatus == "Delete")
                                {
                                    foreach (EpisodeVO seriesvoepi in season.Episode_Data)
                                    {
                                        if (seriesvoepi.Episode_Number == Convert.ToInt32(epi.SequenceEpisodeno))
                                        {

                                            if (epi.gridstatus == "Edit")
                                            {
                                                seriesvoepi.Episode_Working_Title = epi.EpisodeTitle;
                                                seriesvoepi.Duration = epi.Duration;
                                                seriesvoepi.Epi_Comments = epi.Comments;
                                                seriesvoepi.LiveDate = Convert.ToDateTime(epi.LiveDate);
                                                seriesvoepi.LiveTime = Convert.ToInt32(epi.LiveTime);
                                                seriesvoepi.Location = epi.Location;
                                                seriesvoepi.Venue = epi.Vennue;
                                                seriesvoepi.MemNo = Convert.ToInt32(epi.MemNo);
                                                seriesvoepi.PersistFlag = PersistFlagEnum.Modified;
                                            }
                                            if (epi.gridstatus == "Delete")
                                            {
                                                seriesvoepi.PersistFlag = PersistFlagEnum.Deleted;
                                            }
                                        }
                                    }
                                }
                                else if (epi.gridstatus == "New")
                                {
                                    addepisode = new EpisodeVO();
                                    addepisode.Episode_Number = Convert.ToInt32(epi.SequenceEpisodeno);
                                    addepisode.Episode_Working_Title = epi.EpisodeTitle;
                                    addepisode.Episode_Title = epi.EpisodeTitle;

                                   
                                    addepisode.Duration = epi.Duration;
                                    addepisode.Epi_Comments = epi.Comments;
                                    addepisode.LiveDate = Convert.ToDateTime(epi.LiveDate);
                                    addepisode.LiveTime = Convert.ToInt32(epi.LiveTime);
                                    addepisode.Location = epi.Location;
                                    addepisode.Venue = epi.Vennue;
                                    addepisode.MemNo = Convert.ToInt32(epi.MemNo);
                                    addepisode.PersistFlag = PersistFlagEnum.Added;
                                    if (season.Episode_Data == null)
                                        season.Episode_Data = new List<EpisodeVO>();
                                    season.PersistFlag = PersistFlagEnum.Modified;
                                    season.Episode_Data.Add(addepisode);
                                }

                            }

                        }
                    }
                }


                DealMemoClient proxy = null;
                SeriesTreeResponse response = new SeriesTreeResponse();
                try
                {
                    proxy = ServiceInvoker.OpenDealMemoProxy();
                    SeriesTreeRequest request = new SeriesTreeRequest();
                    request.DealMemoSeries = seriesTreeViewModel.seriesvo;
                    response = proxy.SaveDealMemoSeriesDetails(request);
                    if (response.Messages != null && response.Messages.Count > 0)
                    {
                        //this.OraCustomExceptionMsg = new List<AppMessage>();
                        //this.OraCustomExceptionMsg = response.Messages;
                    }
                    else
                    {
                        //this.OraCustomExceptionMsg = null;
                    }
                }
                finally
                {
                    ServiceInvoker.CloseDealMemoProxy(proxy);
                }
                retseriesvo = response.DealMemoSeries;
                if (retseriesvo != null)
                {
                    if (retseriesvo.Season_Data != null)
                    {
                        this.NewTitle = retseriesvo.Selected_Season_Title;
                        this.NewSeriesTitle = retseriesvo.Title;
                        if (retseriesvo.Season_Data.Exists(ser => ser.Title == retseriesvo.Selected_Season_Title))
                        {
                            this.NewsportTypeGenre = (from e1 in retseriesvo.Season_Data[retseriesvo.Season_Data.FindIndex(ser => ser.Title == retseriesvo.Selected_Season_Title)].Episode_Data
                                                      select e1.Epi_SportType_Genre).Distinct().Count() > 1 ? NewsportTypeGenre = "VARIOUS" : (from epi in retseriesvo.Season_Data[retseriesvo.Season_Data.FindIndex(ser => ser.Title == retseriesvo.Selected_Season_Title)].Episode_Data
                                                                                                                                    select epi.Epi_SportType_Genre).FirstOrDefault();

                            this.NewsubGenre = (from e2 in retseriesvo.Season_Data[retseriesvo.Season_Data.FindIndex(ser => ser.Title == retseriesvo.Selected_Season_Title)].Episode_Data
                                             select e2.Epi_Genre).Distinct().Count() > 1 ? NewsubGenre = "VARIOUS" : (from epi in retseriesvo.Season_Data[retseriesvo.Season_Data.FindIndex(ser => ser.Title == retseriesvo.Selected_Season_Title)].Episode_Data
                                                                                                              select epi.Epi_Genre).FirstOrDefault();

                            this.NeweventType = (from e3 in retseriesvo.Season_Data[retseriesvo.Season_Data.FindIndex(ser => ser.Title == retseriesvo.Selected_Season_Title)].Episode_Data
                                                 select e3.Epi_Event_Type).Distinct().Count() > 1 ? NeweventType = "VARIOUS" : (from epi in retseriesvo.Season_Data[retseriesvo.Season_Data.FindIndex(ser => ser.Title == retseriesvo.Selected_Season_Title)].Episode_Data
                                                                                                                     select epi.Epi_Event_Type).FirstOrDefault();

                            this.NewRefNo = retseriesvo.Season_Data[retseriesvo.Season_Data.FindIndex(ser => ser.Title == retseriesvo.Selected_Season_Title)].Id.ToString();
                            this.NewDuration = GetTotalDuration(int.Parse(seriesTreeViewModel.DMVo_DMNumber), int.Parse(this.Id));
                        }
                    }
                }

            }
            this.seriesvo = null;
            return serializer.Serialize(seriesTreeViewModel);
        }


        public string GetTotalDuration(int DmNo, int seasonNumber)
        {
            DealMemoClient proxy = null;
            SearchDealMemoResponse response = new SearchDealMemoResponse();
            try
            {
                proxy = ServiceInvoker.OpenDealMemoProxy();
                SearchDealMemoRequest request = new SearchDealMemoRequest();
                request.DealMemo = new DealMemoVO() { DMNumber = DmNo };
                request.Programme = new ProgrammeVO() { Id = seasonNumber };
                response = proxy.GetDuration(request);
                if (response.Messages != null && response.Messages.Count > 0)
                {
                    //this.OraCustomExceptionMsg = new List<AppMessage>();
                    //this.OraCustomExceptionMsg = response.Messages;
                }
                if (response.Programme.SuccessFlag == true) return response.Programme.Duration;
                else return string.Empty;
            }
            finally
            {
                ServiceInvoker.CloseDealMemoProxy(proxy);
            }
        }

    }

    [Serializable]
    public class DMEpisodeDetails
    {
        public string SequenceEpisodeno { get; set; }
        public string EpisodeTitle { get; set; }
        public string Duration { get; set; }
        public string Location { get; set; }
        public string Vennue { get; set; }
        public string LiveDate { get; set; }
        public string LiveTime { get; set; }
        public string Comments { get; set; }
        public string MemNo { get; set; }
        public string gridstatus { get; set; }
    }
    [Serializable]
    public class DMSeason
    {
        public string seasonNo { get; set; }
        public string seasonTitle { get; set; }
        public List<DMEpisodeDetails> episodeList = new List<DMEpisodeDetails>();


    }

}