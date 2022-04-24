using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ServiceModel.Dispatcher;
using System.ServiceModel.Channels;
using System.ServiceModel;
using System.Xml;

namespace MediaManager.Infrastructure.WCFIntegration
{
    public class CallContextMessageInspector : IClientMessageInspector
    {
        #region Message Inspector of the Consumer

        public void AfterReceiveReply(ref Message reply, object correlationState)
        {
        }

        public object BeforeSendRequest(ref Message request, IClientChannel channel)
        {
            // Prepare the request message copy to be modified
            MessageBuffer buffer = request.CreateBufferedCopy(Int32.MaxValue);
            request = buffer.CreateMessage();

            // Simulate to have a random Key generation process
            CallContext callContext = CallContext.GetCurrent();
            callContext.RequestId = Guid.NewGuid().ToString();

            request.Headers.Add(callContext);


            return null;
        }

        #endregion
    }
}
