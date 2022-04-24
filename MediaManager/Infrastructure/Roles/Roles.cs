using System.Collections.Generic;
using MediaManager.Models;
using MediaManager.InfrastructureService;
using MediaManager.Infrastructure.Helpers;


namespace MediaManager.Infrastructure.Roles
{
    public class Roles
    {
        public static List<UserAuthentication> UserAuthorization()
        {
            List<UserAuthentication> users = new List<UserAuthentication>();
            users.Add(new UserAuthentication("Pravin.kale", SampleRole.Buyer));
            users.Add(new UserAuthentication("neetu.kumari", SampleRole.Buyer));
            users.Add(new UserAuthentication("s.denistan", SampleRole.Buyer));
            users.Add(new UserAuthentication("manisha.hirugade", SampleRole.Buyer));
            users.Add(new UserAuthentication("mohasin.devale", SampleRole.Buyer));
            users.Add(new UserAuthentication("abhishek.sharma", SampleRole.Buyer));
            users.Add(new UserAuthentication("ravichandra.amber", SampleRole.Buyer));
            users.Add(new UserAuthentication("kumar.ravishankar", SampleRole.Buyer));
            users.Add(new UserAuthentication("sagar.taralekar", SampleRole.Buyer));
            users.Add(new UserAuthentication("ravi.joshi", SampleRole.Buyer));
            users.Add(new UserAuthentication("sangeetha.p", SampleRole.Buyer));
            users.Add(new UserAuthentication("nishant.gorde", SampleRole.Buyer));
            users.Add(new UserAuthentication("milind.firake", SampleRole.Buyer));
            return users;
        }
        public static List<Role> GetRolesForUser(string userName, out MENUserVO menUserVODetails)
        {
            List<Role> Roles = new List<Role>();
            LoadRolesResponse response = GetRoles(userName);
            menUserVODetails = response.MenUserVODetails;
            if (response.Roles != null && response.Roles.Length > 0)
            {
                foreach (Role userrole in response.Roles)
                {
                    Roles.Add(userrole);
                }
            }
            return Roles;
        }
        public static LoadRolesResponse GetRoles(string UserID)
        {
            InfrastructureClient proxy = null;
            LoadRolesResponse response = null;
            try
            {
                proxy = ServiceInvoker.OpenInfrastructureClientProxy();

                LoadRolesRequest request = new LoadRolesRequest();
                request.UserId = UserID;

                response = proxy.GetRolesForUser(request);
            }
            finally
            {
                ServiceInvoker.CloseInfrastructureClientProxy(proxy);
            }
            return response;

        }
    } 
}
