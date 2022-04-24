using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Web;
using MediaManager.LicenseService;
using MediaManager.ProgrammeLibraryServices;
using System.ComponentModel;


namespace MediaManager.Areas.Acquisition.ViewModels
{

    public class ViewLicenseModel
    {

       List<ProgramLicenseReviewVO> prgLicReviewVOList = new List<ProgramLicenseReviewVO>();

       public List<ProgrammeLibraryServices.LineUpVO> lineUpVoList = null;
       public List<ProgramScheduleVO> prgSchVOList = null;
       public List<ScheduleSummaryVO> schSummaryVOList = null;
       int iCurrentRecord = 0;
       public ProgramLicenseReviewVO PrgLicReviewVO { get; set; }

       ProgrammeLibraryServices.ProgrammeVO prgSearch = null;


       [Display(Name = "View License")]
        public string LicNo
        {
            get;
            set;
        }

        public string Title
        {
            get;
            set;
        }

        public string ProgRefNo
        {
            get;
            set;
        }

        public string LicenseStatus
        {
            get;
            set;
        }

        public string WorkingTitle
        {
            get;
            set;
        }

        public bool Exclusive
        {
            get;
            set;
        }

        public bool Premier
        {
            get;
            set;
        }


        public string Licencee
        {
            get;
            set;
        }

        public string Contract
        {
            get;
            set;
        }

        public string ContractNo
        {

            get;
            set;
        }

        public string Channel
        {
            get;
            set;

        }

        public string StartLicPer
        {
            get;
            set;

        }

        public string LicPerAmort
        {

            get;
            set;

        }

        public string Play
        {
            get;
            set;
        }

        public string Status
        {
            get;
            set;
        }

        public string FirstShow
        {
            get;
            set;
        }

        public string PaidRuns
        {
            get;
            set;
        }

        public string EndLicPer
        {
            get;
            set;
        }

        public string TotLicRuns
        {
            get;
            set;
        }

        public string Reg
        {
            get;
            set;
        }

        public string LicSName
        {
            get;
            set;
        }

        public string LastShow
        {
            get;
            set;
        }

        public string FreeRuns
        {
            get;
            set;
        }
        public string MediaPlatform
        {
            get;
            set;
        }


    public bool flagLicAmoratationCall = false;

   
     


        public bool FlagLicAmoratationCall
        {
            get { return flagLicAmoratationCall; }
            set { flagLicAmoratationCall = value; }
        }

        public bool flagSchedulingCall = false;
        public bool FlagSchedulingCall
        {
            get { return flagSchedulingCall; }
            set { flagSchedulingCall = value; }
        }




        public List<ProgramLicenseReviewVO> OnLoadCall(int Refno)
        {
            // ViewLicenseModel objViewModel = null;
            try
            {
              
                prgSearch = new ProgrammeLibraryServices.ProgrammeVO();
                prgSearch.ProgrammeRefNo = Refno;

                ProgramLicenseReviewVO prgLicReviewVO = new ProgramLicenseReviewVO();

                if (prgSearch != null)
                    prgLicReviewVO.ProgramrefNo = prgSearch.ProgrammeRefNo;

                PrgLicReviewVO = prgLicReviewVO;

                prgLicReviewVOList = GetLicenseReviewDetails(Refno);

                //if (prgLicReviewVOList != null && prgLicReviewVOList.Count != 0)
                //{
                //    //Call from LIcenceAmortation

                //    //When Call View License Details page from Program Maintaince Page make this flag as true
                //    this.FlagLicAmoratationCall = true;

                //    if (FlagLicAmoratationCall == true)
                //    {
                //        ProgramLicenseReviewVO pgmLicenseReviewAmortation = null;
                //        for (int count = 0; count < prgLicReviewVOList.Count; count++)
                //        {
                //            //if (prgLicReviewVOList[count].LicNumber == ProgrammeMaintenanaceWIController.Controller.LicNumber)
                //          //  if (prgLicReviewVOList[count].LicNumber == 105204)
                //          //  {
                //                pgmLicenseReviewAmortation = prgLicReviewVOList[count];
                //            //}
                //        }
                //                objViewModel = UpdateData(pgmLicenseReviewAmortation);

                //   }

                //    //Call from Scheduling
                //    if (FlagSchedulingCall == true)
                //    {
                //        ProgramLicenseReviewVO pgmLicenseReviewAmortation = null;
                //        for (int count = 0; count < prgLicReviewVOList.Count; count++)
                //        {
                //            //if (prgLicReviewVOList[count].LicNumber == ProgrammeMaintenanaceWIController.Controller.LicNumber)

                //            if (prgLicReviewVOList[count].LicNumber == 105204)
                //            {
                //                pgmLicenseReviewAmortation = prgLicReviewVOList[count];
                //            }
                //        }
                //        UpdateData(pgmLicenseReviewAmortation);

                //    }

                // return objViewModel;
                return prgLicReviewVOList;



            }
            catch (Exception ex)
            {
                throw ex;
            }


        }

        public List<ProgramLicenseReviewVO> GetLicenseReviewDetails(int refno)
        {
            prgSearch = new ProgrammeLibraryServices.ProgrammeVO();
            prgSearch.ProgrammeRefNo = refno;

            ProgramLicenseReviewVO prgLicReviewVO = new ProgramLicenseReviewVO();

            if (prgSearch != null)
                prgLicReviewVO.ProgramrefNo = prgSearch.ProgrammeRefNo;

         
            PrgLicReviewVO = prgLicReviewVO;

            ProgrammeLibraryClient proxy = null;
            GetLicenseDetailsResponse response = new GetLicenseDetailsResponse();
            try
            {
                proxy = new ProgrammeLibraryClient();
                proxy.Open();

                GetLicenseDetailsRequest request = new GetLicenseDetailsRequest();
                request.LicenseReviewVO = PrgLicReviewVO;

                response = proxy.GetLicenseDetailsQuery(request);
            }
            finally
            {
                proxy.Close();
            }
            return response.LicenseReviewList;
       }

      

        //public ViewLicenseModel UpdateData(ProgramLicenseReviewVO prgLicReviewVO)
        //{
        //    ViewLicenseModel objViewLicenseModel = new ViewLicenseModel();

        //      objViewLicenseModel.Channel= prgLicReviewVO.ChannelServiceName;
        //      objViewLicenseModel.Contract = prgLicReviewVO.ContractName;
        //      objViewLicenseModel.ContractNo = Convert.ToString(prgLicReviewVO.ContractShortName); //TextContractNo is Contract Short Name

        //      objViewLicenseModel.LicNo = Convert.ToString(prgLicReviewVO.LicenseeNumber);


        //      objViewLicenseModel .FirstShow= Convert.ToString(prgLicReviewVO.LicShowingFirst);
        //      objViewLicenseModel.PaidRuns = Convert.ToString(prgLicReviewVO.LicShowingPaid);
        //      objViewLicenseModel.LastShow = Convert.ToString(prgLicReviewVO.LicShowingLast);

        //      objViewLicenseModel.Licencee= prgLicReviewVO.LicenseeShortName;
        //      objViewLicenseModel.LicenseStatus = prgLicReviewVO.LicStatus;
        //      objViewLicenseModel.LicNo = Convert.ToString(prgLicReviewVO.LicNumber);
        //      objViewLicenseModel.FreeRuns = Convert.ToString(prgLicReviewVO.LicShowingFree);
        //      objViewLicenseModel.ProgRefNo = Convert.ToString(prgLicReviewVO.ProgramrefNo);
        //      objViewLicenseModel.Title= prgLicReviewVO.ProgramTitle;
        //      objViewLicenseModel.WorkingTitle = prgLicReviewVO.ProgramWorkingTitle;

              
        //      objViewLicenseModel.Status= prgLicReviewVO.StatusDescription;

        //      DateTime dateTimeEndLicPer = new DateTime();
        //      dateTimeEndLicPer = Convert.ToDateTime(prgLicReviewVO.LicEnd);
        //      objViewLicenseModel.EndLicPer = dateTimeEndLicPer.ToShortDateString();

        //      DateTime dateTimeStartLicPer = new DateTime();
        //      dateTimeStartLicPer = Convert.ToDateTime(prgLicReviewVO.LicStart);
        //      objViewLicenseModel.StartLicPer = dateTimeStartLicPer.ToShortDateString();


        //      objViewLicenseModel.LicPerAmort= Convert.ToString(prgLicReviewVO.LicShowingLic);
        //      objViewLicenseModel.Play = prgLicReviewVO.LicPlayStatus;
        //      objViewLicenseModel.LicSName = prgLicReviewVO.RegistrationDetails;
        //      objViewLicenseModel.TotLicRuns = Convert.ToString(prgLicReviewVO.LicShowingInt);
        //      objViewLicenseModel.Reg = Convert.ToString(prgLicReviewVO.RegistrationDate);
        //      objViewLicenseModel .MediaPlatform= prgLicReviewVO.MediaPlatform;

        //      if (prgLicReviewVO.LicExclusive != null)
        //      {
        //          if (prgLicReviewVO.LicExclusive.CompareTo("Y") == 0)
        //              objViewLicenseModel.Exclusive = true;
        //          else
        //              objViewLicenseModel.Exclusive = false;
        //      }

        //      if (prgLicReviewVO.PremierFlag != null)
        //      {
        //          if (prgLicReviewVO.PremierFlag.CompareTo("Y") == 0)
        //              objViewLicenseModel.Premier = true;
        //          else
        //              objViewLicenseModel.Premier= false;
        //      }
        //      else
        //          objViewLicenseModel.Premier = false;



        //      if (prgLicReviewVO.LinupSchVOList != null && prgLicReviewVO.LinupSchVOList.Count > 0)
        //      {
        //          lineUpVoList = prgLicReviewVO.LinupSchVOList;
        //          objViewLicenseModel.lineUpVoList = lineUpVoList; 
        //      }

        //      if (prgLicReviewVO.SchProgramScheduleVOLIst != null && prgLicReviewVO.SchProgramScheduleVOLIst.Count > 0)
        //      {
        //          prgSchVOList = prgLicReviewVO.SchProgramScheduleVOLIst;
        //          objViewLicenseModel.prgSchVOList = prgSchVOList;
        //      }
          

        //      if (prgLicReviewVO.SchSummaryVOLIst != null && prgLicReviewVO.SchSummaryVOLIst.Count > 0)
        //      {
        //          schSummaryVOList = prgLicReviewVO.SchSummaryVOLIst;
        //          objViewLicenseModel.schSummaryVOList = schSummaryVOList;
        //      }
             

        //    return objViewLicenseModel;
        //}

      

    }
 
}