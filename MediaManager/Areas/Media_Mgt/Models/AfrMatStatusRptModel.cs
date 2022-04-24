using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using MediaManager.Infrastructure.Attributes;
using MediaManager.LookupsServices;
using MediaManager.Infrastructure.Lookups;

namespace MediaManager.Areas.Media_Mgt.Models
{
    public class AfrMatStatusRptModel
    {

        public string ProgTitle { get; set; }

        [IsValidField("Please Enter Valid Supplier")]
        public string SupplierId { get; set; }
        public string RefNo { get; set; }

        [IsValidField("Please Enter Valid MaterialID")]
        public string MaterialId { get; set; }
        public string MaterialName { get; set; }
        public string ReceiptNo { get; set; }
        public string DispatchNo { get; set; }
        public string SupplierIDForGen { get; set; }
        public List<GetGenDistributorLookupItem> DistributorsLOVList { get; set; }
        LookupServiceLookups Lookupgenerator = new LookupServiceLookups();
        public void getsupplier()
        {
            this.DistributorsLOVList = Lookupgenerator.GetDistributorList();
        }

    }
    
}