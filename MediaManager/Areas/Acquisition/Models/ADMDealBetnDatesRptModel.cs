using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.ComponentModel.DataAnnotations;
using MediaManager.Infrastructure.Attributes;

namespace MediaManager.Areas.Acquisition.Models
{
    public class ADMDealBetnDatesRptModel
    {
        [Required]
        [Display(Name = "From Date")]
        [CompareTwoDateValidation(CompareOperator.LessThanEqual, "ToDate", ErrorMessage = "Date From must be Less than or Equal to Date To.")]
        public DateTime FromDate { get; set; }
        
        [Required]
        [Display(Name = "To Date")]
        [IsValidDate( "sss")]
        public DateTime ToDate { get; set; }
        
        public string CurrCode { get; set; }
        public SelectList ReportCurrencyList { get; set; }
    }
}