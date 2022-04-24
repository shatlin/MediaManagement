using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MediaManager.ReportingService;
using System.IO;
using System.Net;
using System.Windows.Forms;

namespace MediaManager.Areas.Infrastructure.Report
{
    public class ReportManager
    {
        public static ReportsVO GetReportServerData(ReportsVO reportsVO)
        {
            ReportingClient proxy = null;
            try
            {
                proxy = new ReportingClient();
                proxy.Open();
                GetReportServerDataRequest request = new GetReportServerDataRequest();
                request.ReportsVO = reportsVO;
                GetReportServerDataResponse response = proxy.GetReportServerData(request);
                return response.ReportsVO;
            }
            finally
            {
                //ServiceInvoker.CloseReportingClientProxy(proxy);
                proxy.Close();
            }
        }

        public static ExportReportResponse GetExportReport(ExportReportRequest req)
        {
            ReportingClient proxy = null;
            try
            {
                proxy = new ReportingClient();
                proxy.Open();
                ExportReportResponse response = proxy.ExportReport(req);
                return response;
            }
            finally
            {
                proxy.Close();
            }
        }

        public static Stream GetExportedFileData(string reportName, string fileURLPath)
        {
            Stream readStream = null;
            try
            {
                WebClient Client = new WebClient();
                readStream = Client.OpenRead(fileURLPath);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw ex;
            }
            return readStream;
        }

    }
}