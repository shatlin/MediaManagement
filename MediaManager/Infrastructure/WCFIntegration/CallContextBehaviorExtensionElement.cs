using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ServiceModel.Configuration;

namespace MediaManager.Infrastructure.WCFIntegration
{
    public class CallContextBehaviorExtensionElement : BehaviorExtensionElement
    {
        protected override object CreateBehavior()
        {
            return new CallContextBehavior();
        }

        public override Type BehaviorType
        {
            get
            {
                return typeof(CallContextBehavior);
            }
        }

    }
}
