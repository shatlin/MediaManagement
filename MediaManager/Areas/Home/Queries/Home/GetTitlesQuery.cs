using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

namespace MediaManager.Areas.Home.Queries.Home
{
    public class GetTitlesQuery
    {
        public DataTable Execute()
        {
	        DataTable TitlesTable = new DataTable();
            TitlesTable.Columns.Add("Titlename", typeof(string));
            TitlesTable.Columns.Add("TitleStatus", typeof(string));
            TitlesTable.Columns.Add("SeriesName", typeof(string));
            TitlesTable.Columns.Add("SeasonName", typeof(string));
            TitlesTable.Columns.Add("NoofEpisodes", typeof(byte));
            TitlesTable.Columns.Add("FirstEpisodeNumber", typeof(byte));
            TitlesTable.Columns.Add("PrimaryGenre", typeof(string));
            TitlesTable.Columns.Add("SecondaryGenre", typeof(string));
            for (int i = 0; i < 50; i++)
            {
                TitlesTable.Rows.Add("X-men", "Accepted", "None", "None", 0, 0, "Action", "Action");
            }
            return TitlesTable;
        }
    }
}