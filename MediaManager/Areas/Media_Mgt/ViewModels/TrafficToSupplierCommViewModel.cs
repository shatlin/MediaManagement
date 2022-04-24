using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MediaManager.Areas.Media_Mgt.Models;
using MediaManager.InfrastructureService;
using MediaManager.MediaManagerLibraryService;
using MediaManager.Areas.Media_Mgt.Common;

namespace MediaManager.Areas.Media_Mgt.ViewModels
{
    public class TrafficToSupplierCommViewModel
    {
        //public static List<SupplierCommunication> allSupplierCommunicationList = new List<SupplierCommunication>();
        public TrafficToSupplierCommViewModel()
        {
        }
        //static TrafficToSupplierCommViewModel()
        //{
        //    //allSupplierCommunicationList = GetLoadSupplierCommunicationList();
        //}

        public List<Common.IDValPair> GetMaterialTyepList()
        {
            Common.Common objCommon = new Common.Common();
            return objCommon.GetMaterialType();
        }

        public List<IDValPair> GetModeOfCommunicationList()
        {
            return GetMOCList();
        }

        public List<Common.IDValPair> GetLibraryList()
        {
            List<Common.IDValPair> listLibrary = new List<Common.IDValPair>();
            listLibrary.Add(new Common.IDValPair("Nlby", "Nigerian Library"));
            listLibrary.Add(new Common.IDValPair("Alby", "MediaManager Library"));
            return listLibrary;
        }

        public List<MaterialVO> GetMaterialList()
        {
            List<MaterialVO> listLibrary = new List<MaterialVO>();
            listLibrary = GetMaterialDetails();
            return listLibrary;
        }

        public List<MediaManager.MediaManagerLibraryService.AppMessage> Save(ref List<SupplierCommunication> supplierCommunicationList)
        {
            List<MaterialVO> materialVOList = new List<MaterialVO>();
            List<MediaManager.MediaManagerLibraryService.AppMessage> messageList = new List<MediaManager.MediaManagerLibraryService.AppMessage>();
            if (supplierCommunicationList != null)
            {
                materialVOList = new List<MaterialVO>();
                foreach (SupplierCommunication objSupplierCommunication in supplierCommunicationList)
                {
                    DateTime dt = DateTime.Parse(objSupplierCommunication.Date);
                    dt = dt.Add(TimeSpan.Parse(objSupplierCommunication.Time));
                    materialVOList.Add(new MaterialVO()
                    {
                        Comments = objSupplierCommunication.Comments,
                        CommId = objSupplierCommunication.CommId,
                        Date = dt,
                        MaterialId = objSupplierCommunication.MaterialId,
                        MaterialName = objSupplierCommunication.MaterialName,
                        MaterialType = objSupplierCommunication.MaterialType,
                        MOC = objSupplierCommunication.MOC,
                        Person_contacted = objSupplierCommunication.Person_contacted,
                        Supplier = objSupplierCommunication.Supplier,
                        PersistFlag = objSupplierCommunication.PersistFlag
                    });
                }
            }

            materialVOList = SaveTrafficToSuppDetails(materialVOList);
            supplierCommunicationList = ConvertToSupplierCommunication(materialVOList);
            messageList.Add(new MediaManager.MediaManagerLibraryService.AppMessage()
            {
                Type = MediaManager.MediaManagerLibraryService.MessageTypeEnum.Information,
                Message = "Data Saved successfully."
            });
            return messageList;
        }
        private List<SupplierCommunication> ConvertToSupplierCommunication(List<MaterialVO> materialVOList)
        {
            List<SupplierCommunication> supplierCommunicationList = null;
            if (materialVOList != null)
            {
                supplierCommunicationList = new List<SupplierCommunication>();
                foreach (MaterialVO objMaterial in materialVOList)
                {
                    supplierCommunicationList.Add(new SupplierCommunication()
                    {
                        Comments = objMaterial.Comments,
                        CommId = objMaterial.CommId,
                        Date = objMaterial.Date.ToString("dd-MMM-yyyy"),
                        MaterialId = objMaterial.MaterialId,
                        MaterialName = objMaterial.MaterialName,
                        MaterialType = objMaterial.MaterialType,
                        MOC = objMaterial.MOC,
                        Person_contacted = objMaterial.Person_contacted,
                        Supplier = objMaterial.Supplier,
                        Time = objMaterial.Date.ToString("hh:mm")
                    });
                }
            }
            return supplierCommunicationList;
        }
        public List<SupplierCommunication> GetSearchList(string supplierName, string materialID, string materialName)
        {
            List<MaterialVO> materialVOList;
            List<SupplierCommunication> supplierCommunicationList;
            MaterialVO objMaterialVO = new MaterialVO() { MaterialId = materialID, MaterialName = materialName, Supplier = supplierName };
            materialVOList = SearchTrafficToSuppDetails(objMaterialVO);
            supplierCommunicationList = ConvertToSupplierCommunication(materialVOList);
            return supplierCommunicationList;
        }


        #region proxy
        public List<IDValPair> GetMOCList()
        {
            if ((HttpContext.Current.Session["callContext"] == null) || (HttpContext.Current.Session["callContext"] != null &&
                ((MediaManager.Infrastructure.WCFIntegration.CallContext)HttpContext.Current.Session["callContext"]).MENUserId == null))
            {
                throw new Exception("Your session has expired.ReLogin is required.");
            }

            LibraryMaintainenceClient proxy = null;
            GetFIDCodeIDValResponse response = new GetFIDCodeIDValResponse();
            List<IDValPair> modeOfCommList = new List<IDValPair>();
            try
            {
                proxy = new LibraryMaintainenceClient();
                proxy.Open();
                GetFIDCodeIDValRequest request = new GetFIDCodeIDValRequest();
                request.FidCodeVO = new FidCodeVO();
                if (request.FidCodeVO != null)
                {
                    request.FidCodeVO.COD_TYPE = "MODE";
                    response = proxy.GetFidCodeList(request);
                }
                modeOfCommList = new List<IDValPair>();
                foreach (FidCodeVO fidCodeVO in response.FidCodeListVOList)
                {
                    modeOfCommList.Add(new IDValPair(fidCodeVO.COD_VALUE.ToString(), fidCodeVO.COD_DESCRIPTION.ToString()));
                }
            }
            catch (Exception ex)
            {

            }
            finally
            {
                proxy.Close();
            }
            return modeOfCommList;
        }

        public List<MaterialVO> GetMaterialDetails()
        {
            if ((HttpContext.Current.Session["callContext"] == null) || (HttpContext.Current.Session["callContext"] != null &&
                ((MediaManager.Infrastructure.WCFIntegration.CallContext)HttpContext.Current.Session["callContext"]).MENUserId == null))
            {
                throw new Exception("Your session has expired.ReLogin is required.");
            }
            LibraryMaintainenceClient proxy = new LibraryMaintainenceClient();
            List<MaterialVO> materialVOList;
            try
            {
                proxy.Open();
                GetMaterialResponse response = proxy.GetMaterialList();
                materialVOList = response.MaterialDetailList.ToList();
            }

            finally
            {
                if (proxy.State == System.ServiceModel.CommunicationState.Faulted)
                    proxy.Abort();
                else
                    proxy.Close();
            }

            return materialVOList;
        }

        public List<MaterialVO> SaveTrafficToSuppDetails(List<MaterialVO> materialVOList)
        {
            if ((HttpContext.Current.Session["callContext"] == null) || (HttpContext.Current.Session["callContext"] != null &&
                 ((MediaManager.Infrastructure.WCFIntegration.CallContext)HttpContext.Current.Session["callContext"]).MENUserId == null))
            {
                throw new Exception("Your session has expired.ReLogin is required.");
            }
            LibraryMaintainenceClient proxy = new LibraryMaintainenceClient();
            SaveMaterialRequest request = new SaveMaterialRequest();
            SaveMaterialResponse response = new SaveMaterialResponse();
            try
            {
                proxy.Open();
                request.MaterialVOList = materialVOList.ToList();
                response = proxy.SaveTrafficToSuppDetails(request);
                materialVOList = response.MaterialVOList.ToList();
            }
            finally
            {
                if (proxy.State == System.ServiceModel.CommunicationState.Faulted)
                    proxy.Abort();
                else
                    proxy.Close();
            }

            return materialVOList;
        }

        public List<MaterialVO> SearchTrafficToSuppDetails(MaterialVO objMaterialVO)
        {
            if ((HttpContext.Current.Session["callContext"] == null) || (HttpContext.Current.Session["callContext"] != null &&
                ((MediaManager.Infrastructure.WCFIntegration.CallContext)HttpContext.Current.Session["callContext"]).MENUserId == null))
            {
                throw new Exception("Your session has expired.ReLogin is required.");
            }
            LibraryMaintainenceClient proxy = new LibraryMaintainenceClient();
            SearchMaterialRequest request = new SearchMaterialRequest();
            SearchMaterialResponse response = new SearchMaterialResponse();
            List<MaterialVO> materialVOList;
            try
            {
                proxy.Open();
                request.MaterialVO = objMaterialVO;
                response = proxy.SearchTrafficToSuppDetails(request);
                materialVOList = response.MaterialSearchList.ToList();
            }
            finally
            {
                if (proxy.State == System.ServiceModel.CommunicationState.Faulted)
                    proxy.Abort();
                else
                    proxy.Close();
            }

            return materialVOList;
        }
        #endregion
    }
}