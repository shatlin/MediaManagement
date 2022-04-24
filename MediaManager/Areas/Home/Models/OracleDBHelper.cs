using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Oracle.DataAccess.Client;
using System.Configuration;
using System.Data;

namespace MediaManager.Models
{
    public class OracleDBHelper
    {
        public static IDbConnection GetConnection()
        {
            OracleConnection connection = new OracleConnection(ConfigurationManager.ConnectionStrings["SAConnection"].ConnectionString);
            return connection;
        }

        public static IDbCommand GetCommand(IDbConnection connection, string query)
        {
            OracleCommand command = new OracleCommand();
            command.Connection = (OracleConnection) connection;
            command.CommandText = query;
            return command;
        }
    }
}