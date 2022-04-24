using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace MediaManager.Areas.Media_Mgt.ViewModels
{

    public class IDValPair
    {
        public string ID { get; set; }
        public string Val { get; set; }

        public IDValPair(string ID, string Val)
        {
            this.ID = ID;
            this.Val = Val;
        }
    }

    public class TMSearchLibraries
    {
        public int LibraryID { get; set; }
        public string LibraryTitle { get; set; }
        public string Country { get; set; }
        public string CountryVal { get; set; }
        public string LibraryType { get; set; }
        public string LibraryTypeVal { get; set; }
        public string Storage { get; set; }
        public string StorageVal { get; set; }
        public string Status { get; set; }

        public TMSearchLibraries(int LibraryID, string LibraryTitle, string Country,string CountryVal , string LibraryType,  string LibraryTypeVal, string Storage,string StorageVal, string Status)
        {
            this.LibraryID = LibraryID;
            this.LibraryTitle = LibraryTitle;
            this.Country = Country;
            this.CountryVal = CountryVal;
            this.LibraryType = LibraryType;
            this.LibraryTypeVal = LibraryTypeVal;
            this.Storage = Storage;
            this.StorageVal = StorageVal;
            this.Status = Status;
        }
    }

    public class MediaLibraryViewModel
    {
        [Display(Name = "Library")]
        public SelectList Library;
        [Display(Name = "Library Type")]
        public SelectList LibraryType;
        [Display(Name = "Type/Storage")]
        public SelectList Storage;
        [Display(Name = "Country")]
        public SelectList Country;

        public List<TMSearchLibraries> Libraries { get; set; }

        public MediaLibraryViewModel()
        {
            LibraryType = new SelectList(GetLibraryList());
            Country = new SelectList(GetCountryList());
            Storage = new SelectList(GetStorageList());
        }

        public List<IDValPair> GetCountryList()
        {
            List<IDValPair> listCountry = new List<IDValPair>();
            listCountry.Add(new IDValPair("KEN" , "Kenya"));    
            listCountry.Add(new IDValPair("NIG" , "Nigeria"));
            listCountry.Add(new IDValPair("SA", "South MediaManager"));  
            return listCountry;
        }

        public List<IDValPair> GetLibraryList()
        {
            List<IDValPair> listMediaType = new List<IDValPair>();
            listMediaType.Add(new IDValPair("KENLIB", "Kenya Library"));
            listMediaType.Add(new IDValPair("NIGLIB", "Nigeria Library"));
            listMediaType.Add(new IDValPair("SALIB", "SouthMediaManager Library"));     
            return listMediaType;
        }

        public List<IDValPair> GetStorageList()
        {
            List<IDValPair> listMediaType = new List<IDValPair>();
            listMediaType.Add(new IDValPair("Box1", "Box1"));
            listMediaType.Add(new IDValPair("Box2", "Box2")); 
            listMediaType.Add(new IDValPair("Shelf1", "Shelf1"));
            listMediaType.Add(new IDValPair("Shelf2", "Shelf2"));  
            return listMediaType;
        }

        public List<TMSearchLibraries> SearchLibraryDetail(string LibraryTitle, string Country, string LibraryType, string Type)
        {
            Libraries = new List<TMSearchLibraries>();
            Libraries.Add(new TMSearchLibraries(1, "BBF", "Kenya", "KEN", "Kenya Library", "KENLIB", "Box1", "Box1", null));
            Libraries.Add(new TMSearchLibraries(2, "BBL", "Nigeria", "NIG", "Nigeria Library", "NIGLIB", "Shelf1", "Shelf1", null));
            Libraries.Add(new TMSearchLibraries(3, "BBP", "South MediaManager", "SA", "SouthMediaManager Library", "SASALIB", "Shelf2", "Shelf2", null));
            return Libraries;
        }
    }
}