using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.Reporting.WebForms;

namespace MediaManager.Areas.Home.Models
{
    public class ReportPrerequisiteDataModel
    {
        public string ReportName { get; set; }
        public string ReportPath { get; set; }
        public string ReportServerUrl { get; set; }
        public string  ReportParameterNames{ get; set; }
        public string ReportParameterValues { get; set; }
        public List<ReportParameter> ReportParameterList { get; set; }
        public string NetworkDomain { get; set; }
        public string NetworkPassword { get; set; }
        public string NetworkUserName { get; set; }
    }
}