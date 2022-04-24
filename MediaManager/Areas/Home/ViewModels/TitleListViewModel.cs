using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MediaManager.Areas.Home.Queries.Home;
using System.Data;
using MediaManager.Models;

namespace MediaManager.Areas.Home.ViewModels
{
    public class TitleListViewModel
    {
        public TitleListViewModel()
        {

        }

        public List<Title> GetTitles()
        {

            var getTitlesQuery = new GetTitlesQuery();
            DataTable dt = getTitlesQuery.Execute();

            var TitleList = new List<Title>();


            foreach (DataRow row in dt.Rows) // Loop over the rows.
            {
                TitleList.Add(new Title
                {
                    Titlename = row["Titlename"].ToString(),
                    TitleStatus = row["TitleStatus"].ToString(),
                    SeriesName = row["SeriesName"].ToString(),
                    SeasonName = row["SeasonName"].ToString(),
                    NoofEpisodes = Convert.ToByte(row["NoofEpisodes"]),
                    FirstEpisodeNumber = Convert.ToByte(row["FirstEpisodeNumber"]),
                    PrimaryGenre = row["PrimaryGenre"].ToString(),
                    SecondaryGenre = row["SecondaryGenre"].ToString()
                });

            }


            return TitleList;
        }
    }
}