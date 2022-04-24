using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MediaManager.LicenseService;

namespace MediaManager.Areas.Acquisition.ViewModels
{
    public class LicenseViewModel
    {
        public List<ProgrammeVO> SearchLicenseeReviewDetails(MediaManager.LicenseService.ProgrammeVO objLicenseService)
        {

            string LicenseSearchResponse = string.Empty;
            LicenseClient proxy = null;
            SearchLicenseeReviewResponse response = new SearchLicenseeReviewResponse();
            try
            {
                proxy = new LicenseClient();
                proxy.Open();
                SearchLicenseeReviewRequest request = new SearchLicenseeReviewRequest();
                SearchLicenseeReviewResponse obj = new SearchLicenseeReviewResponse();


                MediaManager.LicenseService.ProgrammeVO objProVo = new MediaManager.LicenseService.ProgrammeVO();

                objProVo.Title = objLicenseService.Title;
                objProVo.Producer = objLicenseService.Producer;
                objProVo.YearValue = objLicenseService.YearValue;
                objProVo.Type = objLicenseService.Type;
                objProVo.Category = objLicenseService.Category;
                objProVo.Code = objLicenseService.Code;
                objProVo.RefNo = objLicenseService.RefNo;
                objProVo.Series = objLicenseService.Series;
                objProVo.PremierFlag = objLicenseService.PremierFlag;





                request.LicenseeSearchList = objProVo;
                response = proxy.SearchLicenseeSrchDetails(request);



                //System.Web.Script.Serialization.JavaScriptSerializer js = new System.Web.Script.Serialization.JavaScriptSerializer();// (response.LicenseeSearchList);
                // LicenseSearchResponse = js.Serialize(response.LicenseeSearchList);

            }
            finally
            {
                proxy.Close();
            }
            return response.LicenseeSearchList;
        }
    }
}