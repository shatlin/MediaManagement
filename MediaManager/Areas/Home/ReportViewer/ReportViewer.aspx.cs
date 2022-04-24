using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Reporting.WebForms;
using MediaManager.Areas.Home.Controllers;
using System.Web.Script.Serialization;
using MediaManager.Areas.Home.Models;
using System.Web.UI.HtmlControls;

namespace MediaManager.Areas.Home.ReportViewer
{
    public partial class ReportViewer : System.Web.UI.Page
    {
       
        protected void Page_Load(object sender, EventArgs e)
        {
                reportViewer.ServerReport.Timeout = -1;
                scriptManager.AsyncPostBackTimeout = 0;
                if (!this.IsPostBack && Request["ReportPrerequisiteDataString"] != null)  
                {
                    try
                    {
                        HttpBrowserCapabilities _browser = HttpContext.Current.Request.Browser;
                        HttpContext.Current.Session.Timeout =36000;
                        if (_browser != null && _browser.Id.StartsWith("ie"))   //_browser.Id.Contains("chrome")
                            reportViewer.SizeToReportContent = true;

                        JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
                        ReportPrerequisiteDataModel reportPrerequisiteData = javaScriptSerializer.Deserialize<ReportPrerequisiteDataModel>(Request["ReportPrerequisiteDataString"].ToString());

                            reportViewer.ProcessingMode = ProcessingMode.Remote;
                            reportViewer.ServerReport.ReportServerUrl = new System.Uri(reportPrerequisiteData.ReportServerUrl);   //    "http://ntvmsyndb0384/ReportServer"
                            reportViewer.ServerReport.ReportPath = reportPrerequisiteData.ReportPath;
                            reportViewer.ServerReport.ReportServerCredentials = new ReportServerCredentials(reportPrerequisiteData.NetworkUserName, reportPrerequisiteData.NetworkPassword, reportPrerequisiteData.NetworkDomain);
                            if (reportPrerequisiteData.ReportParameterList != null)
                            {
                                foreach (MediaManager.Areas.Home.Models.ReportParameter reportParameter in reportPrerequisiteData.ReportParameterList)
                                {
                                    Microsoft.Reporting.WebForms.ReportParameter param = new Microsoft.Reporting.WebForms.ReportParameter();
                                    param.Name = reportParameter.Name;
                                    param.Values.Add(reportParameter.Value);
                                    reportViewer.ServerReport.SetParameters(param);
                                }
                            }
                            reportViewer.ShowParameterPrompts = false;
                            reportViewer.ServerReport.Refresh();
                    }
                    catch (Exception ex)
                    {
                        throw new Exception(ex.Message);
                    }
            }

        }

        protected void ReportViewer_Load(object sender, EventArgs e)
        {
            Page.Header.Controls.AddAt(0, new HtmlMeta { HttpEquiv = "X-UA-Compatible", Content = "IE=EmulateIE7" });
        }


    }

    public class ReportServerCredentials : Microsoft.Reporting.WebForms.IReportServerCredentials
    {

        private string strUserName;

        private string strPassword;

        private string strDomain;

        public ReportServerCredentials(string sUserName, string sPassword, string sDomain)
        {

            //Set the values in local variables.

            strUserName = sUserName;

            strPassword = sPassword;

            strDomain = sDomain;

        }

        #region IReportServerCredentials Members

        public bool GetFormsCredentials(out System.Net.Cookie authCookie, out string userName, out string password, out string authority)
        {

            authCookie = null;

            userName = password = authority = null;

            return false;

        }

        public System.Security.Principal.WindowsIdentity ImpersonationUser
        {

            get { return null; }

        }

        public System.Net.ICredentials NetworkCredentials
        {

            get { return new System.Net.NetworkCredential(strUserName, strPassword, strDomain); }

        }

        #endregion

    }


}