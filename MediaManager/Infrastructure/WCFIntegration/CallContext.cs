using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ServiceModel.Channels;
using System.Xml;
using System.Configuration;
using System.Web;


namespace MediaManager.Infrastructure.WCFIntegration
{
    /// <summary>
    /// 
    /// </summary>
    public class CallContext : MessageHeader
    {
        #region Private Variables
        private string requestId;
        private string machineName;
        private string windowsUserName;
        private string domainName;
        private string emailId;
        private string clientName;
        private string clientAppInstanceType;
        private string adUserId;
        private string menUserId;
        private string menUserLogin;
        
        //private static object sync = new object();
        //private static CallContext instance;

        // Swapnil : START
        /// <summary>
        /// AppVersion used for Showing the version on the Scheduler window
        /// </summary>
        public string AppVersion { get;set;}
        // Swapnil : END
        
        #endregion

        #region Constructor
        /// <summary>
        /// Gets the instance of CallContext type.
        /// </summary>
        /// <returns></returns>
        public static CallContext GetCurrent()
        {

            //if (instance == null)
            //{
            //    lock (sync)
            //    {
            //        instance = new CallContext();
            //    }
            //}

            //return instance;

            if (HttpContext.Current.Session["callContext"] == null)
                HttpContext.Current.Session["callContext"] = new CallContext();
            return (CallContext)HttpContext.Current.Session["callContext"];

        }

        private CallContext()
        {
        }
        #endregion

        #region Public Properties
        /// <summary>
        /// Gets the request id for each service operation
        /// </summary>
        public string RequestId
        {
            get { return this.requestId; }
            set { this.requestId = value; }
        }
        /// <summary>
        /// Gets the machine name of the client
        /// </summary>
        public string MachineName
        {
            get { return this.machineName; }
            set { this.machineName = value; }
        }
        /// <summary>
        /// Gets the windows logged on user name of client
        /// </summary>
        public string WindowsUserName
        {
            get { return this.windowsUserName; }
            set { this.windowsUserName = value; }
        }
        /// <summary>
        /// Gets the domain name of user of client
        /// </summary>
        public string DomainName
        {
            get { return this.domainName; }
            set { this.domainName = value; }
        }

        /// <summary>
        /// Gets the mail id of user
        /// </summary>
        public string EmailId
        {
            get { return this.emailId; }
            set { this.emailId = value; }
        }

        /// <summary>
        /// Gets the name of user of client
        /// </summary>
        public string ClientName
        {
            get { return this.clientName; }
            set { this.clientName = value; }
        }
        
        /// <summary>
        /// Gets the name of Client App Instance Type
        /// </summary>
        public string ClientAppInstanceType
        {
            get { return this.clientAppInstanceType; }
            set { this.clientAppInstanceType = value; }
        }
        /// <summary>
        /// Gets the AD user id of service caller
        /// </summary>
        public string ADUserId
        {
            get { return this.adUserId; }
            set { this.adUserId = value; }
        }

        /// <summary>
        /// User Id from MEN_USER
        /// </summary>
        public string MENUserId
        {
            get { return this.menUserId == null ? null : this.menUserId.ToUpper(); }
            set { this.menUserId = value; }
        }

        /// <summary>
        /// User Login from MEN_USER
        /// </summary>
        public string MENUserLogin
        {
            get { return this.menUserLogin; }
            set { this.menUserLogin = value; }
        }

      
        #endregion

        #region Overridden Members
        /// <summary>
        /// Gets the custome headers name
        /// </summary>
        public override string Name
        {
            get { return (CallContextHeaderNames.CustomHeaderName); }
        }

        /// <summary>
        /// Gets the namespace of CallContext header
        /// </summary>
        public override string Namespace
        {
            get { return (CallContextHeaderNames.CustomHeaderNamespace); }
        }

        protected override void OnWriteHeaderContents(XmlDictionaryWriter writer, MessageVersion messageVersion)
        {
            // Write the content of the header directly using the XmlDictionaryWriter
            writer.WriteElementString(CallContextHeaderNames.RequestId, this.RequestId);
            writer.WriteElementString(CallContextHeaderNames.ADUserId, System.Threading.Thread.CurrentPrincipal.Identity.Name);
            writer.WriteElementString(CallContextHeaderNames.MENUserId, this.MENUserId);
            writer.WriteElementString(CallContextHeaderNames.MENUserLogin, this.MENUserLogin);
            writer.WriteElementString(CallContextHeaderNames.MachineName, this.MachineName);
            writer.WriteElementString(CallContextHeaderNames.WindowsUserName, this.WindowsUserName);
            writer.WriteElementString(CallContextHeaderNames.DomainName, this.DomainName);
            writer.WriteElementString(CallContextHeaderNames.EmailId, this.EmailId);
            writer.WriteElementString(CallContextHeaderNames.ClientName, ConfigurationManager.AppSettings["AppName"]);
            //writer.WriteElementString(CallContextHeaderNames.ClientAppInstanceType, ConfigurationManager.AppSettings["AppInstanceType"]);

            writer.WriteElementString(CallContextHeaderNames.ClientAppInstanceType, this.ClientAppInstanceType);
        }
        #endregion
    }


}
