using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.ComponentModel.DataAnnotations;

namespace MediaManager.Areas.Acquisition.Models
{
    public class DealsNotSignedModel
    {
        public string CompanyName { get; set; }
        public string BudgetCode { get; set; }
        [Required]
        [Display(Name = "For Date")]
        public DateTime ForDate { get; set; }
        public List<MediaManager.AcquisitionLookupService.LookupItem> ChannelCompanyList { get; set; }
        public List<MediaManager.BudgetingLookupService.LookupItem> BudgetCodeList { get; set; }
    }
}