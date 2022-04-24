using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MediaManager.DealMemoService;
using MediaManager.Infrastructure.Helpers;
using System.Data;
using Oracle.DataAccess.Client;
using System.Configuration;
using System.IO;
using System.Text;
using MediaManager.AcquisitionLookupService;
using MediaManager.Infrastructure.Lookups;

namespace MediaManager.Areas.Acquisition.BO
{
    public class DealMemoMaintenanceBO
    {
        #region Common

        public List<DealMemoVO> GetDealMemoSearchResult(DealMemoVO searchDealMemo)
        {
            DealMemoClient proxy = null;
            SearchDealMemoResponse response = new SearchDealMemoResponse();
            try
            {
                proxy = ServiceInvoker.OpenDealMemoProxy();
                SearchDealMemoRequest request = new SearchDealMemoRequest();
                request.DealMemo = searchDealMemo;
                response = proxy.SearchDealMemo(request);
            }
            finally
            {
                ServiceInvoker.CloseDealMemoProxy(proxy);
            }
            return response.DealMemoList;
        }

        public DealMemoVO SearchDealMemoDetails(DealMemoVO searchDealMemo)
        {
            DealMemoClient proxy = null;
            SearchDealMemoResponse response = new SearchDealMemoResponse();
            SearchDealMemoResponse responseDMGridData = new SearchDealMemoResponse();
            try
            {
                proxy = ServiceInvoker.OpenDealMemoProxy();
                SearchDealMemoRequest request = new SearchDealMemoRequest();
                request.DealMemo = searchDealMemo;
                response = proxy.SearchDealMemoDetails(request);
                ///history
                responseDMGridData = proxy.SearchDealMemoHistoryDetails(request);
                response.DealMemo.HistoryDetails = responseDMGridData.DealMemo.HistoryDetails;
                ///language
                responseDMGridData = proxy.SearchDealMemoLanguageDetails(request);
                response.DealMemo.LanguageDetails = responseDMGridData.DealMemo.LanguageDetails;
                ///protection
                responseDMGridData = proxy.SearchDealMemoProtectionDetails(request);
                response.DealMemo.ProtectionDetails = responseDMGridData.DealMemo.ProtectionDetails;
                //territory
                responseDMGridData = proxy.SearchDealMemoTerritoryDetails(request);
                response.DealMemo.TerritoryDetails = responseDMGridData.DealMemo.TerritoryDetails;
                //Material
                responseDMGridData = proxy.SearchDealMemoMaterialDetails(request);
                response.DealMemo.MaterialDetails = responseDMGridData.DealMemo.MaterialDetails;
                //PaymentDetails
                responseDMGridData = proxy.SearchDealMemoPaymentDetails(request);
                response.DealMemo.PaymentDetails = responseDMGridData.DealMemo.PaymentDetails;
                //Programme
                responseDMGridData = proxy.SearchDealMemoProgrammeDetails(request);
                response.DealMemo.ProgrammeDetails = responseDMGridData.DealMemo.ProgrammeDetails;
            }
            finally
            {
                ServiceInvoker.CloseDealMemoProxy(proxy);
            }
            return response.DealMemo;
        }

        public DealMemoVO SaveDealMemoDetails(DealMemoVO searchDealMemo)
        {
         
            DealMemoClient proxy = null;
            SaveDealMemoResponse response = new SaveDealMemoResponse();
            try
            {
                proxy = ServiceInvoker.OpenDealMemoProxy();
                SaveDealMemoRequest request = new SaveDealMemoRequest();
                request.DealMemo = searchDealMemo;
                response = proxy.SaveDealMemoDetails(request);
                if (response.Messages != null && response.Messages.Count > 0)
                {
                    if (response.DealMemo == null)
                        response.DealMemo = new DealMemoVO();
                    response.DealMemo.Messages = response.Messages;
                }
                else
                {
                    response.DealMemo.Messages = null;
                }
            }
            finally
            {
                ServiceInvoker.CloseDealMemoProxy(proxy);
            }
            return response.DealMemo;
        }

        public DealMemoVO CheckDealMemoSign(DealMemoVO dealMemo)
        {
            DealMemoClient proxy = null;
            SearchDealMemoResponse response = new SearchDealMemoResponse();
            try
            {
                proxy = ServiceInvoker.OpenDealMemoProxy();
                SearchDealMemoRequest request = new SearchDealMemoRequest();
                request.DealMemo = dealMemo;
                response = proxy.CheckDealMemoSign(request);
                if (response.Messages != null && response.Messages.Count > 0)
                {
                    if (response.DealMemo == null)
                        response.DealMemo = new DealMemoVO();
                    response.DealMemo.Messages = response.Messages;
                }
                else
                {
                    response.DealMemo.Messages = null;
                }
            }
            finally
            {
                ServiceInvoker.CloseDealMemoProxy(proxy);
            }
            return response.DealMemo;
        }

        public DealMemoVO ChangeDealMemoStatus(DealMemoVO DealMemoSignQA, int dealmemoNumber, string dealmemoStatus)
        {
            DealMemoClient proxy = null;
            SearchDealMemoResponse response = new SearchDealMemoResponse();
            try
            {
                proxy = ServiceInvoker.OpenDealMemoProxy();
                SearchDealMemoRequest request = new SearchDealMemoRequest();
                request.DealMemo = new DealMemoVO();
                request.DealMemo.DMNumber = dealmemoNumber;
                request.DealMemo.Status = dealmemoStatus;
                //if (DealMemoSignQA != null)
                //{
                //    request.DealMemo.QARejectComment = DealMemoSignQA.QARejectComment.Trim();
                //    DealMemoSignQA.QARejectComment = string.Empty;
                //}
                response = proxy.ChangeDealMemoStatus(request);
                if (response.Messages != null && response.Messages.Count > 0)
                {
                    if (response.DealMemo == null)
                        response.DealMemo = new DealMemoVO();
                    response.DealMemo.Messages = response.Messages;
                }
                else
                {
                    response.DealMemo.Messages = null;
                }
            }
            finally
            {
                ServiceInvoker.CloseDealMemoProxy(proxy);
            }
            return response.DealMemo;
        }

        public DealMemoVO ChangeDealMemoStatus(int dealmemoNumber, string dealmemoStatus)
        {
            DealMemoClient proxy = null;
            SearchDealMemoResponse response = new SearchDealMemoResponse();
            try
            {
                proxy = ServiceInvoker.OpenDealMemoProxy();
                SearchDealMemoRequest request = new SearchDealMemoRequest();
                request.DealMemo = new DealMemoVO();
                request.DealMemo.DMNumber = dealmemoNumber;
                request.DealMemo.Status = dealmemoStatus;

                //Project Bioscope: Nilesh_24April2012: Added Sign QA
                //if (DealMemoSignQA != null)
                //{
                //    request.DealMemo.QARejectComment = DealMemoSignQA.QARejectComment.Trim();
                //    DealMemoSignQA.QARejectComment = string.Empty;
                //}
                response = proxy.ChangeDealMemoStatus(request);
                //Project Bioscope: End

                if (response.Messages != null && response.Messages.Count > 0)
                {
                    if (response.DealMemo == null)
                        response.DealMemo = new DealMemoVO();
                    response.DealMemo.Messages = response.Messages;
                }
                else
                {
                    response.DealMemo.Messages = null;
                }
            }
            finally
            {
                ServiceInvoker.CloseDealMemoProxy(proxy);
            }
            return response.DealMemo;
        }
        #endregion

        #region Programme Tab

        public DealMemoVO GetDealMemoDetails(DealMemoVO searchDealMemo)
        {
            DealMemoClient proxy = null;
            SearchDealMemoResponse response = new SearchDealMemoResponse();
            SearchDealMemoResponse responseDMGridData = new SearchDealMemoResponse();
            try
            {
                proxy = ServiceInvoker.OpenDealMemoProxy();
                SearchDealMemoRequest request = new SearchDealMemoRequest();
                request.DealMemo = searchDealMemo;
                response = proxy.SearchDealMemoDetails(request);
            }
            finally
            {
                ServiceInvoker.CloseDealMemoProxy(proxy);
            }
            return response.DealMemo;
        }
        public List<CompetitorVO> ChannelServiceLov()
        {
            DealMemoClient proxy = null;
            try
            {
                proxy = ServiceInvoker.OpenDealMemoProxy();
                proxy.Open();
                SearchCompetitorRequest request = null;
                SearchCompetitorResponse response = proxy.SearchCompetitorForLookUp(request);
                return response.CompetitorList;
            }
            finally
            {
                ServiceInvoker.CloseDealMemoProxy(proxy);
            }
        }
        public List<ChannelVO> RunsPerChannelLov(int channelService)
        {
            DealMemoClient proxy = null;
            try
            {
                proxy = ServiceInvoker.OpenDealMemoProxy();
                proxy.Open();
                ChannelMaintenanceRequest channelRequest = new ChannelMaintenanceRequest();
                channelRequest.Channels = new ChannelVO() { ChannelNumber = channelService };
                ChannelMaintenanceResponse channelResponse = proxy.Lookup_DealMemoChannel(channelRequest);
                return channelResponse.ChannelsList;
            }
            finally
            {
                ServiceInvoker.CloseDealMemoProxy(proxy);
            }
        }
        public List<SeriesVO> TitlesLookup(bool isSer, string title, string type)
        {
            DealMemoClient proxy = null;
            try
            {
                proxy = new DealMemoClient();
                proxy.Open();
                SearchDealMemoRequest request = new SearchDealMemoRequest();
                request.Programme = new ProgrammeVO();
                request.Programme.IsSeries = isSer;
                request.Programme.SeriesTitle = title;
                request.Programme.Type = type;
                SearchDealMemoResponse response = proxy.Lookup_DealMemoProgrammeTitles(request);
                return response.ProgrameTitles;



            }
            finally
            {
                ServiceInvoker.CloseDealMemoProxy(proxy);
            }
        }
        public List<MediaServicePlatformVO> GetCatchUpPlatformRights(int dealNumber)
        {
            DealMemoClient proxy = null;
            SearchDealMemoResponse response = new SearchDealMemoResponse();
            try
            {
                proxy = ServiceInvoker.OpenDealMemoProxy();
                SearchDealMemoRequest request = new SearchDealMemoRequest();
                request.DealMemo = new DealMemoVO();
                request.DealMemo.DMNumber = dealNumber;
                response = proxy.GetCatchUpPlatformRights(request);
            }
            finally
            {
                ServiceInvoker.CloseDealMemoProxy(proxy);
            }
            return response.DealMemo.RightsMediaList;
        }
        public List<ProgrammeVO> SearchDealMemoProgrammeDetails(DealMemoVO searchDealMemo)
        {
            DealMemoClient proxy = null;
            SearchDealMemoResponse response = new SearchDealMemoResponse();
            SearchDealMemoResponse responseDMGridData = new SearchDealMemoResponse();
            try
            {
                proxy = ServiceInvoker.OpenDealMemoProxy();
                SearchDealMemoRequest request = new SearchDealMemoRequest();
                request.DealMemo = searchDealMemo;
                response = proxy.SearchDealMemoDetails(request);
                responseDMGridData = proxy.SearchDealMemoProgrammeDetails(request);
                response.DealMemo.ProgrammeDetails = responseDMGridData.DealMemo.ProgrammeDetails;
            }
            finally
            {
                ServiceInvoker.CloseDealMemoProxy(proxy);
            }
            return response.DealMemo.ProgrammeDetails;
        }
        public List<MemTypeLookupItem> TypeCombo()
        {
            MemTypeLookup Type = new MemTypeLookup();
            List<MemTypeLookupItem> typeList = new List<MemTypeLookupItem>();
            Type = AcquisitionLookupsManager.GetMemType(ModuleEnum.Acquisition, LookupKeyEnum.MemTypeLookup);
            typeList = this.ConvertList<MemTypeLookup, MemTypeLookupItem>(Type);
            return typeList;
        }
        private List<TLookUpItem> ConvertList<TLookUp, TLookUpItem>(TLookUp lookup)
            where TLookUp : Lookup
            where TLookUpItem : LookupItem
        {
            List<TLookUpItem> lookUpItemList = null;
            if (lookup != null)
            {
                Converter<LookupItem, TLookUpItem> convertor = new Converter<LookupItem, TLookUpItem>(LookItemConvertor<TLookUpItem>);
                lookUpItemList = lookup.LookupItemList.ConvertAll<TLookUpItem>(convertor);
            }
            return lookUpItemList;
        }
        public static TLookUpItem LookItemConvertor<TLookUpItem>(LookupItem li) where TLookUpItem : LookupItem
        {
            return (TLookUpItem)li;
        }

        #endregion Programme Tab

        #region Language Tab

        public List<LanguageVO> SearchDealMemoDefaultLanguageDetails(DealMemoVO searchDealMemo)
        {
            DealMemoClient proxy = null;
            SearchDealMemoResponse response = new SearchDealMemoResponse();
            try
            {
                proxy = ServiceInvoker.OpenDealMemoProxy();
                SearchDealMemoRequest request = new SearchDealMemoRequest();
                request.DealMemo = searchDealMemo;
                response = proxy.SearchDealMemoDefaultLanguageDetails(request);
            }
            finally
            {
                ServiceInvoker.CloseDealMemoProxy(proxy);
            }
            return response.DealMemo.LanguageDetails;
        }

        public DealMemoVO SearchDealMemoLanguageDetails(DealMemoVO searchDealMemo)
        {
            DealMemoClient proxy = null;
            SearchDealMemoResponse response = new SearchDealMemoResponse();
            SearchDealMemoResponse responseDMGridData = new SearchDealMemoResponse();

            try
            {
                proxy = ServiceInvoker.OpenDealMemoProxy();
                SearchDealMemoRequest request = new SearchDealMemoRequest();
                request.DealMemo = searchDealMemo;
                response = proxy.SearchDealMemoDetails(request);
                responseDMGridData = proxy.SearchDealMemoLanguageDetails(request);
                response.DealMemo.LanguageDetails = responseDMGridData.DealMemo.LanguageDetails;
            }
            finally
            {
                ServiceInvoker.CloseDealMemoProxy(proxy);
            }
            return response.DealMemo;
        }

        #endregion

        #region Territory Tab

        public List<TerritoryVO> SearchDealMemoDefaultTerritoryDetails(DealMemoVO searchDealMemo)
        {
            DealMemoClient proxy = null;
            SearchDealMemoResponse response = new SearchDealMemoResponse();
            try
            {
                proxy = ServiceInvoker.OpenDealMemoProxy();
                SearchDealMemoRequest request = new SearchDealMemoRequest();
                request.DealMemo = searchDealMemo;
                response = proxy.SearchDealMemoDefaultTerritoryDetails(request);
            }
            finally
            {
                ServiceInvoker.CloseDealMemoProxy(proxy);
            }
            return response.DealMemo.TerritoryDetails;
        }
        
        public DealMemoVO SearchDealMemoTerritoryDetails(DealMemoVO searchDealMemo)
        {
            DealMemoClient proxy = null;
            SearchDealMemoResponse response = new SearchDealMemoResponse();
            SearchDealMemoResponse responseDMGridData = new SearchDealMemoResponse();
            try
            {
                proxy = ServiceInvoker.OpenDealMemoProxy();
                SearchDealMemoRequest request = new SearchDealMemoRequest();
                request.DealMemo = searchDealMemo;
                response = proxy.SearchDealMemoDetails(request);
                responseDMGridData = proxy.SearchDealMemoTerritoryDetails(request);
                response.DealMemo.TerritoryDetails = responseDMGridData.DealMemo.TerritoryDetails;
            }
            finally
            {
                ServiceInvoker.CloseDealMemoProxy(proxy);
            }
            return response.DealMemo;
        }

        #endregion

        #region Payment Tab

        public DealMemoVO SearchDealMemoPaymentDetails(DealMemoVO searchDealMemo)
        {
            DealMemoClient proxy = null;
            SearchDealMemoResponse response = new SearchDealMemoResponse();
            SearchDealMemoResponse responseDMGridData = new SearchDealMemoResponse();
            try
            {
                proxy = ServiceInvoker.OpenDealMemoProxy();
                SearchDealMemoRequest request = new SearchDealMemoRequest();
                request.DealMemo = searchDealMemo;
                response = proxy.SearchDealMemoDetails(request);
                responseDMGridData = proxy.SearchDealMemoPaymentDetails(request);
                response.DealMemo.PaymentDetails = responseDMGridData.DealMemo.PaymentDetails;
            }
            finally
            {
                ServiceInvoker.CloseDealMemoProxy(proxy);
            }
            return response.DealMemo;
        }

        #endregion

        #region History Tab

        public List<HistoryVO> GetHistoryDetails(DealMemoVO searchDealMemo)
        {
            DealMemoClient proxy = null;
            SearchDealMemoResponse response = new SearchDealMemoResponse();
            try
            {
                proxy = ServiceInvoker.OpenDealMemoProxy();
                SearchDealMemoRequest request = new SearchDealMemoRequest();
                request.DealMemo = searchDealMemo;
                response = proxy.SearchDealMemoHistoryDetails(request);
            }
            finally
            {
                ServiceInvoker.CloseDealMemoProxy(proxy);
            }
            return response.DealMemo.HistoryDetails;
        }

        #endregion

        
    }
}
