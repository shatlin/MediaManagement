using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MediaManager.LookupsServices;
using System.ComponentModel.DataAnnotations;
using MediaManager.Infrastructure.Attributes;

namespace MediaManager.Areas.scheduling.Models
{
    public class ScheduleChangesRptModel
    {
        public List<LookupItem> ChannelList { get; set; }
        public string Channel { get; set; }

        [Required]
        [Display(Name = "Schedule Entries From")]
        [CompareTwoDateValidation(CompareOperator.LessThanEqual, "ScheduleEntriesTo", ErrorMessage = "Schedule Entries From date must be less than or equal to Schedule Entries To date")]
        public DateTime ScheduleEntriesFrom { get; set; }

        [Required]
        [Display(Name = "Schedule Entries To")]
        public DateTime ScheduleEntriesTo { get; set; }

        [Required]
        [Display(Name = "Changes Made From")]
        [CompareTwoDateValidation(CompareOperator.LessThanEqual, "ChangesMadeTo", ErrorMessage = "Changes Made From date must be less than or equal to Changes Made To date")]
        public DateTime ChangesMadeFrom { get; set; }

        [Required]
        [Display(Name = "Changes Made To")]
        public DateTime ChangesMadeTo { get; set; }
    }
}