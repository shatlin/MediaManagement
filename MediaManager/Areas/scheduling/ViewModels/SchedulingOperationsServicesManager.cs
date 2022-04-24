using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MediaManager.SchedulingOperationsServices;

namespace MediaManager.Areas.scheduling.ViewModels
{
    public class SchedulingOperationsServicesManager
    {
        public static List<ChannelVO> LoadChannelLookup()
        {
            SchedulingOperationsClient proxy = new SchedulingOperationsClient();
            GetChannelsResponse response = new GetChannelsResponse();
            try
            {
                proxy.Open();
                GetChannelsRequest request = new GetChannelsRequest();
                response = proxy.GetChannelsDayByDayRpt(request);
            }
            finally
            {
                proxy.Close();
            }
            return response.ChannelList;
        }
    }
}