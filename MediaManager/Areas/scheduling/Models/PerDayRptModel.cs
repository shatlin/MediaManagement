using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MediaManager.SchedulingOperationsServices;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using MediaManager.Infrastructure.Attributes;

namespace MediaManager.Areas.scheduling.Models
{
    public class PerDayRptModel
    {
        public List<ChannelVO> ChannelList { get; set; }
        public string Channel { get; set; }
        [Required]
        [Display(Name = "Date From")]
        [CompareTwoDateValidation(CompareOperator.LessThanEqual, "DateTo", ErrorMessage = "Date From must be less than or equal to Date To")]
        public DateTime DateFrom { get; set; }
        [Required]

        [Display(Name = "Date To")]
        public DateTime DateTo { get; set; }
        public string RatingType { get; set; }
        public bool GenreInput { get; set; }
        public bool Synopsis { get; set; }

        [IsValidField("Please Enter Valid Media Platform Code.")]
        public string MediaPlateform { get; set; }
        [IsValidField("Please Enter Valid Region Code.")]
        public string Region { get; set; }
    }
}