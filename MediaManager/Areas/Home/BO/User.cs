using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text;

namespace MediaManager.Areas.Home.BO
{
    public class User
    {
        public string UserName { get; set; }
        private string password ;
        
        /// <summary>
        /// Gets and set Password
        /// </summary>
        public string Password
        {
            get { return Decryptdata(this.password); }
            set { this.password = Encryptdata(value); }
        }

        /// <summary>
        /// Gets the instance of User type.
        /// </summary>
        /// <returns></returns>
        public static User GetCurrent()
        {
            if (HttpContext.Current.Session["User"] == null)
            {
                HttpContext.Current.Session["User"] = new User();
                HttpContext.Current.Session.Timeout = 36000;
            }
            return (User)HttpContext.Current.Session["User"];

        }
        /// <summary>
        /// Function is used to encrypt the password
        /// </summary>
        /// <param name="password"></param>
        /// <returns></returns>
        private string Encryptdata(string password)
        {
            string strmsg = string.Empty;
            if (!String.IsNullOrEmpty(password))
            {
                byte[] encode = new byte[password.Length];
                encode = Encoding.UTF8.GetBytes(password);
                strmsg = Convert.ToBase64String(encode);
            }
            return strmsg;
        }
        /// <summary>
        /// Function is used to Decrypt the password
        /// </summary>
        /// <param name="password"></param>
        /// <returns></returns>
        private string Decryptdata(string encryptpwd)
        {
            string decryptpwd = string.Empty;
            UTF8Encoding encodepwd = new UTF8Encoding();
            Decoder Decode = encodepwd.GetDecoder();
            if (!String.IsNullOrEmpty(encryptpwd))
            {
                byte[] todecode_byte = Convert.FromBase64String(encryptpwd);
                int charCount = Decode.GetCharCount(todecode_byte, 0, todecode_byte.Length);
                char[] decoded_char = new char[charCount];
                Decode.GetChars(todecode_byte, 0, todecode_byte.Length, decoded_char, 0);
                decryptpwd = new String(decoded_char);
            }
            return decryptpwd;
        }
    }
}