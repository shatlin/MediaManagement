using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MediaManager.Infrastructure.WCFIntegration
{
    public static class CallContextHeaderNames
    {
        public const String CustomHeaderName = "CallContext";

        public const String RequestId = "RequestId";
        public const String ADUserId = "ADUserId";
        public const String MENUserId = "MENUserId";
        public const String MENUserLogin = "MENUserLogin";
        public const String MachineName = "MachineName";
        public const String WindowsUserName = "WindowsUserName";
        public const String DomainName = "DomainName";
        public const String EmailId = "EmailId";
        public const String ClientName = "ClientName";
        public const String ClientAppInstanceType = "ClientAppInstanceType";


        public const String CustomHeaderNamespace = "http://tempuri.org/CallContext";

    }
}
