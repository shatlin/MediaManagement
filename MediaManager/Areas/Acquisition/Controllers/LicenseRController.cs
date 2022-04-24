using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MediaManager.LicenseService;
using MediaManager.Areas.Acquisition.ViewModels;
using MediaManager.Infrastructure.Attributes;

namespace MediaManager.Areas.Acquisition.Controllers
{
    [HandleErrorWithELMAHAttribute]
    public class LicenseRController : Controller
    {
        //
        // GET: /Acquisition/LicenseR/

        // GET: /Acquisition/TestLicense/

        public List<ProgrammeVO> licenseReviewSrchVOList;
        public List<LicenseeVO> LicenseDetailsVOList;
        public ProgrammeVO licenseReviewDetailsSrchVO;
        public LicenseeVO licenseDetailsVO;
        public List<ChannelSummaryVO> channelSummary;
        public List<LineUpVO> lineUp;
        public List<ScheduleVO> scheduleVO;
        List<ProgrammeVO> objProgVO;


        int LicenseNumber = 0;

        public ActionResult Index()
        {
            //Session["ProgramRefNo"] = "1234";

            return View();
        }

        public ActionResult ViewLic()
        {

            return View();
        }


        [HttpPost]
        public JsonResult GetLicenseReviewData(string title, string producer, string yearvalue, string type, string category, string code, string refno, string series, string premierflag)
        {

            if (refno.Equals(""))
            {
                refno = "0";
            }

            ProgrammeVO objProg = new ProgrammeVO();
            objProgVO = new List<ProgrammeVO>();

            objProg.Title = title;
            objProg.Producer = producer;
            objProg.YearValue = yearvalue;
            objProg.Type = type;
            objProg.Category = category;
            objProg.Code = code;
            objProg.RefNo = Convert.ToInt32(refno);
            objProg.Series = series;

            if (premierflag.Equals("true"))
                premierflag = "Y";
            else
                premierflag = "N";

            objProg.PremierFlag = premierflag;


            LicenseViewModel objLicenseViewModel = new LicenseViewModel();
            objProgVO = objLicenseViewModel.SearchLicenseeReviewDetails(objProg);

            LicenseClient proxy = null;
            proxy = new LicenseClient();
            proxy.Open();

            try
            {

                ProgrammeVO TempProVO = new ProgrammeVO();
                //if (licenseReviewSrchVOList.Count > 0)
                if (objProgVO != null)
                {

                    if (objProgVO.Count > 0)
                    {
                        Session["Data"] = objProgVO;

                        TempProVO = objProgVO.ElementAt<ProgrammeVO>(0);
                        if (TempProVO.LicenseeData.Count > 0)
                        {

                            LicenseNumber = TempProVO.LicenseeData[0].LicenseeNumber;
                            LicenseeVO TempLicVO = new LicenseeVO();
                            TempLicVO.LicenseeNumber = LicenseNumber;

                            SearchLicenseeReviewRequest request = new SearchLicenseeReviewRequest();
                            SearchLicenseeReviewResponse response = new SearchLicenseeReviewResponse();

                            request.LicenseeList = TempLicVO;

                            response = proxy.SearchLicenseebyNumberDetails(request);

                            licenseDetailsVO = response.LicenseebyNumberList;


                            LicenseDetailsVOList = objProgVO[0].LicenseeData;

                            channelSummary = licenseDetailsVO.ChannelSummaryData;
                            lineUp = licenseDetailsVO.LineUpData;
                            scheduleVO = licenseDetailsVO.ScheduleData;


                            // licenseDetailsVO.ChannelSummaryData;
                            //licenseDetailsVO = proxy.l(TempLicVO);
                            //gridLicensees.DataSource =  objProgVO[0].LicenseeData;
                            //gridChannelSummary.DataSource = licenseDetailsVO.ChannelSummaryData;
                            //gridLineupSummary.DataSource = licenseDetailsVO.LineUpData;
                            //gridScheduleSummary.DataSource = licenseDetailsVO.ScheduleData;
                        }
                    }
                }
            }
            finally
            {
                proxy.Close();
            }

            return Json(new { First = objProgVO, Second = LicenseDetailsVOList, Three = channelSummary, Four = lineUp, Five = scheduleVO });

        }

        /// <summary>
        /// Displaying license details.
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>

        [HttpPost]
        public JsonResult DisplayLicenseDetails(string GenRefNo)
        {
            LicenseClient proxy = null;
            List<LicenseeVO> currentLicenseeData = null;
            try
            {
                this.objProgVO = (List<ProgrammeVO>)Session["Data"];

                foreach (ProgrammeVO current in this.objProgVO)
                {
                    if (GenRefNo == current.GenRefNo.ToString())
                    {
                        //Get gridLicensees data here
                        currentLicenseeData = current.LicenseeData;

                        if (current.LicenseeData.Count > 0)
                        {

                            proxy = new LicenseClient();
                            proxy.Open();

                            LicenseeVO licenseeVO = new LicenseeVO();
                            licenseeVO = current.LicenseeData[0];

                            SearchLicenseeReviewRequest request = new SearchLicenseeReviewRequest();
                            SearchLicenseeReviewResponse response = new SearchLicenseeReviewResponse();


                            request.LicenseeList = licenseeVO;
                            response = proxy.SearchLicenseebyNumberDetails(request);

                            licenseDetailsVO = response.LicenseebyNumberList;

                            if (licenseDetailsVO != null)
                            {
                                channelSummary = licenseDetailsVO.ChannelSummaryData;
                                lineUp = licenseDetailsVO.LineUpData;
                                scheduleVO = licenseDetailsVO.ScheduleData;
                            }
                        }
                        else
                        {
                            channelSummary = null;
                            lineUp = null;
                            scheduleVO = null;
                        }
                    }
                }
            }
            finally
            {
                if (proxy != null)
                {
                    proxy.Close();

                    //if (Session["Data"]!=null)
                    //{
                    //    Session["Data"] = null;
                    //}

                }

            }

            return Json(new { dtlsgridLicensees = currentLicenseeData, dtlsgridChannelSummary = channelSummary, dltsLineUpSummary = lineUp, dtlsScheduleSummary = scheduleVO });


        }


        [HttpPost]
        public JsonResult DisplayLicSummaryDetails(string LicNumber)
        {
            LicenseClient proxy = null;
            proxy = new LicenseClient();
            proxy.Open();

            try
            {
                if (LicNumber != string.Empty)
                {
                    LicenseeVO TempLicVO = new LicenseeVO();
                    TempLicVO.LicenseeNumber = Convert.ToInt32(LicNumber);

                    SearchLicenseeReviewRequest request = new SearchLicenseeReviewRequest();
                    SearchLicenseeReviewResponse response = new SearchLicenseeReviewResponse();

                    request.LicenseeList = TempLicVO;

                    response = proxy.SearchLicenseebyNumberDetails(request);

                    licenseDetailsVO = response.LicenseebyNumberList;

                    if (licenseDetailsVO != null)
                    {
                        channelSummary = licenseDetailsVO.ChannelSummaryData;
                        lineUp = licenseDetailsVO.LineUpData;
                        scheduleVO = licenseDetailsVO.ScheduleData;
                    }
                }
                else
                {
                    channelSummary = null;
                    lineUp = null;
                    scheduleVO = null;
                }
            }
            finally
            {
                if (proxy != null)
                {
                    proxy.Close();
                }
            }

            return Json(new { dtlsgridChannelSummary = channelSummary, dltsLineUpSummary = lineUp, dtlsScheduleSummary = scheduleVO });

        }

    }
}
