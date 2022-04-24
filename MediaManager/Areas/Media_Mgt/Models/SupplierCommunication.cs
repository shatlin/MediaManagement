using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MediaManager.MediaManagerLibraryService;

namespace MediaManager.Areas.Media_Mgt.Models
{
    public class SupplierCommunication
    {
        public int CommId { get; set; }
        public string MaterialId { get; set; }
        public string MaterialName { get; set; }
        public string MaterialType { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
        public string MOC { get; set; }
        public string Person_contacted { get; set; }
        public string Comments { get; set; }
        public string Supplier { get; set; }
        public PersistFlagEnum PersistFlag { get; set; }
    }
}