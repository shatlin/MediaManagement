using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MediaManager.InfrastructureService;

namespace MediaManager.Infrastructure.Helpers
{

    public class UserContext
    {
        #region Constructors

        static UserContext()
        {
            current = new UserContext();
        }

        private UserContext()
        {
            adUserId = string.Empty;
        }
        #endregion

        #region Private Fields
        private static UserContext current;
        private string adUserId;
        private List<Role> roles;
        private List<MenuVO> menus;
        private Queue<ActionInfo> recentActions;
        private string menUserId;
        private string menUserLogin;
        private bool userStatus = false;
        #endregion

        #region Public Properties
        /// <summary>
        /// Static 
        /// </summary>
        public static UserContext Current
        {
            get
            {
                return UserContext.current;
            }
        }

        public List<MenuVO> Menus
        {
            get { return this.menus; }
            set { this.menus = value; }
        }

        /// <summary>
        /// AD User Id
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
            get { return menUserId; }
            set { menUserId = value; }
        }

        /// <summary>
        /// User Login from MEN_USER
        /// </summary>
        public string MENUserLogin
        {
            get { return menUserLogin; }
            set { menUserLogin = value; }
        }

        public List<Role> Roles
        {
            get { return this.roles; }
            set { this.roles = value; }
        }

        public Queue<ActionInfo> RecentActions
        {
            get { return this.recentActions; }
            set { this.recentActions = value; }
        }
        /// <summary>
        /// User Status from MEN_USER
        /// </summary>
        public bool UserStatus
        {
            get
            {
                return userStatus;
            }
            set
            {
                userStatus = value;
            }
        }

        /// <summary>
        /// Most recent task name
        /// </summary>
        public string LastTaskName { get; set; }

        /// <summary>
        /// List of the controls that will be disabled / hide against the task
        /// </summary>
        public List<Control> Controls { get; set; }

        #endregion

        #region Public Methods
        public bool IsTaskAllowed(string taskName)
        {
            foreach (Role role in this.Roles)
            {
                foreach (TaskVO task in role.TasksList)
                {
                    if (taskName.ToString().ToUpper().Equals(task.Task.ToUpper()))
                    {
                        return true;
                    }
                }
            }
            return false;
        }
        #endregion
    }
    public class ActionInfo
    {
        public string ActionName { get; set; }
        public string TaskName { get; set; }
    }

}