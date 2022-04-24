using MediaManager.AcquisitionLookupService;
using MediaManager.LookupsServices;
using MediaManager.InfrastructureService;
using MediaManager.DealMemoService;
using MediaManager.MediaManagementLookupServices;
using MediaManager.ContractLicenseLookupService;
using MediaManager.ProgrammeLibraryServices;
using MediaManager.MediaManagerLibraryService;

namespace MediaManager.Infrastructure.Helpers
{
    public class ServiceInvoker
    {
        public static void CloseLookupsProxy(LookupsClient proxy)
        {
            if (proxy != null)
            {
                if (proxy.State == System.ServiceModel.CommunicationState.Faulted)
                {
                    proxy.Abort();
                }
                else
                {
                    proxy.Close();
                }

                proxy = null;
            }
        }
        public static void CloseAcquisitionLookupProxy(AcquisitionLookupServiceClient proxy)
        {
            if (proxy != null)
            {
                if (proxy.State == System.ServiceModel.CommunicationState.Faulted)
                {
                    proxy.Abort();
                }
                else
                {
                    proxy.Close();
                }

                proxy = null;
            }
        }
        public static void CloseContractLicenseLookupServiceProxy(ContractLicenseLookupServiceClient proxy)
        {
            if (proxy != null)
            {
                if (proxy.State == System.ServiceModel.CommunicationState.Faulted)
                {
                    proxy.Abort();
                }
                else
                {
                    proxy.Close();
                }

                proxy = null;
            }
        }
        public static InfrastructureClient OpenInfrastructureClientProxy()
        {
            return new InfrastructureClient();
        }
        public static void CloseInfrastructureClientProxy(InfrastructureClient proxy)
        {
            if (proxy != null)
            {
                if (proxy.State == System.ServiceModel.CommunicationState.Faulted)
                {
                    proxy.Abort();
                }
                else
                {
                    proxy.Close();
                }

                proxy = null;
            }
        }
        public static DealMemoClient OpenDealMemoProxy()
        {
            return new DealMemoClient();
        }
        public static void CloseDealMemoProxy(DealMemoClient proxy)
        {
            if (proxy != null)
            {
                if (proxy.State == System.ServiceModel.CommunicationState.Faulted)
                {
                    proxy.Abort();
                }
                else
                {
                    proxy.Close();
                }

                proxy = null;
            }
        }
        public static void CloseMediaLibraryLookupProxy(MediaManagementLookupsClient proxy)
        {
            if (proxy != null)
            {
                if (proxy.State == System.ServiceModel.CommunicationState.Faulted)
                {
                    proxy.Abort();
                }
                else
                {
                    proxy.Close();
                }

                proxy = null;
            }
        }

        public static LibraryMaintainenceClient OpenLibraryMaintainenceProxy()
        {
            return new LibraryMaintainenceClient();
        }
        public static void CloseLibraryMaintainenceProxy(LibraryMaintainenceClient proxy)
        {
            if (proxy != null)
            {
                if (proxy.State == System.ServiceModel.CommunicationState.Faulted)
                {
                    proxy.Abort();
                }
                else
                {
                    proxy.Close();
                }

                proxy = null;
            }
        }
        public static ProgrammeLibraryClient OpenProgrammeLibraryProxy()
        {
            return new ProgrammeLibraryClient();
        }
        public static void CloseProgrammeLibraryProxy(ProgrammeLibraryClient proxy)
        {
            if (proxy != null)
            {
                if (proxy.State == System.ServiceModel.CommunicationState.Faulted)
                {
                    proxy.Abort();
                }
                else
                {
                    proxy.Close();
                }

                proxy = null;
            }
        }
    }
}
