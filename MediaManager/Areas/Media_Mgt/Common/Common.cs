using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MediaManager.Areas.Media_Mgt.Common
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

    public class Common
    {       

        public List<IDValPair> GetTypeList()
        {
            List<IDValPair> listMediaType = new List<IDValPair>();
            listMediaType.Add(new IDValPair("Box", "Box"));
            listMediaType.Add(new IDValPair("Slf", "Shelf"));
            return listMediaType;
        }

        public List<IDValPair> GetStorageTypeList(string TypeVal)
        {
            List<IDValPair> listMediaType = new List<IDValPair>();
            listMediaType.Add(new IDValPair("Box1", "Box1"));
            listMediaType.Add(new IDValPair("Box1", "Box1"));
            listMediaType.Add(new IDValPair("Box1", "Box1"));
            listMediaType.Add(new IDValPair("Box1", "Box1"));
            listMediaType.Add(new IDValPair("Box1", "Box1"));
            listMediaType.Add(new IDValPair("Shlf1", "Shelf1"));
            listMediaType.Add(new IDValPair("Shlf1", "Shelf1"));
            listMediaType.Add(new IDValPair("Shlf1", "Shelf1"));
            listMediaType.Add(new IDValPair("Shlf1", "Shelf1"));
            listMediaType.Add(new IDValPair("Shlf1", "Shelf1"));
            //listMediaType = listMediaType.Where(e=>e.ID.Contains(TypeVal);
            return listMediaType;
        }

        public List<IDValPair> GetLocationList()
        {            
            List<IDValPair> locationList = new List<IDValPair>();           
            locationList.Add(new IDValPair("KEN", "Kenya"));
            locationList.Add(new IDValPair("NIG", "Nigeria"));            
            return locationList;
        }

        public List<IDValPair> GetMaterialType()   
        {
            List<IDValPair> locationList = new List<IDValPair>();
            locationList.Add(new IDValPair("HDD", "HDD"));
            locationList.Add(new IDValPair("TAP", "Tape"));
            locationList.Add(new IDValPair("PEN", "Pen Drive"));
            return locationList;
        }

        public List<IDValPair> GetModeofCommunication()
        {
            List<IDValPair> locationList = new List<IDValPair>();
            locationList.Add(new IDValPair("PHN", "Phone"));
            locationList.Add(new IDValPair("EML", "Email"));
            locationList.Add(new IDValPair("VRB", "Verbal"));
            locationList.Add(new IDValPair("SMS", "SMS"));
            return locationList;
        }        

        public List<IDValPair> GetUserStatus()
        {
            List<IDValPair> locationList = new List<IDValPair>();
            locationList.Add(new IDValPair("ACT", "Active"));
            locationList.Add(new IDValPair("INA", "In-active"));           
            return locationList;
        }

        public List<IDValPair> GetAcceptRejectStatus()
        {
            List<IDValPair> locationList = new List<IDValPair>();
            locationList.Add(new IDValPair("ACC", "Accept"));
            locationList.Add(new IDValPair("REJ", "Reject"));
            return locationList;
        }

        public List<IDValPair> GetBookingStatus()
        {
            List<IDValPair> locationList = new List<IDValPair>();           
            locationList.Add(new IDValPair("BOOKOUT", "BookOut"));
            locationList.Add(new IDValPair("PRAC", "To Prg Acc"));
            locationList.Add(new IDValPair("RSA", "To RSA"));
            locationList.Add(new IDValPair("SUP", "To Supplier"));
            return locationList;
        }

        

        public List<IDValPair> GetLibraryList()
        {
            List<IDValPair> locationList = new List<IDValPair>();
            locationList.Add(new IDValPair("KENLIB", "Kenya Library"));
            locationList.Add(new IDValPair("NIGLIB", "Nigeria Library"));
            return locationList;
        }

        public List<IDValPair> GetSupplierType()
        {
            List<IDValPair> locationList = new List<IDValPair>();
            locationList.Add(new IDValPair("SUPP", "Supplier"));
            locationList.Add(new IDValPair("TXN", "TXN"));
            locationList.Add(new IDValPair("MNET", "MNET"));
            return locationList;
        }

        public List<IDValPair> GetMaterialList()
        {
            List<IDValPair> listLibrary = new List<IDValPair>();
            listLibrary.Add(new IDValPair("3DD-TAP-MOV-HDD-00001-NGA1", "Movie"));
            listLibrary.Add(new IDValPair("3DD-HDD-MOV-HDD-00002-NGA1", "Song"));
            return listLibrary;
        }

        public List<IDValPair> GetMaterialIDList()
        {
            
            List<IDValPair> lookuplist = new List<IDValPair>();

            for (long i = 0; i < 50; i++)
            {
                lookuplist.Add(new IDValPair("Mat " + i, "MaterialID " + i));

            }
            return lookuplist;
        }

        public List<IDValPair> GetSupplierList()
        {

            List<IDValPair> lookuplist = new List<IDValPair>();

            for (long i = 0; i < 50000; i++)
            {
                lookuplist.Add(new IDValPair("SUP " + i, "SUPPLIER " + i));

            }
            return lookuplist;
        }
        public List<IDValPair> GetStorageList()
        {

            List<IDValPair> lookuplist = new List<IDValPair>();


            lookuplist.Add(new IDValPair("BOX 1", "BOX "));
            lookuplist.Add(new IDValPair("BOX 2", "BOX "));
            lookuplist.Add(new IDValPair("BOX 3", "BOX "));
            lookuplist.Add(new IDValPair("BOX 4", "BOX "));
            lookuplist.Add(new IDValPair("SHELF 1", "SHELF "));
            lookuplist.Add(new IDValPair("SHELF 2", "SHELF "));
            lookuplist.Add(new IDValPair("SHELF 3", "SHELF "));

          
            return lookuplist;
        }



    }
}