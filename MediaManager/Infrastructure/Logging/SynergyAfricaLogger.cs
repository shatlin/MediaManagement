using System;
using System.Diagnostics;
using System.IO;
using NLog;
using System.Web;


namespace MediaManager.Infrastructure.Logging
{
    public static class MediaManagerLogger
    {

        private readonly static Stopwatch stopwatch=new Stopwatch();
        private static bool LogPerfomanceInfo = false;
        private static Logger logger;
        private static string startTime = string.Empty;
        private static string endTime = string.Empty;

        static MediaManagerLogger()
        {
            LogPerfomanceInfo = true;
            logger = LogManager.GetLogger("MediaManagerLogger");
        
        }

        public static void StartPerformanceLogging()
        {
            if (LogPerfomanceInfo)
            {
                
                stopwatch.Start();
                startTime = DateTime.Now.ToString("MM/dd/yy hh:mm:ss.fff");

                /*header for performanceLogger log
                NLog.Targets.FileTarget PerformanceLoggerTarget = new NLog.Targets.FileTarget();
                PerformanceLoggerTarget = NLog.LogManager.Configuration.FindTargetByName("PerformanceLogger") as NLog.Targets.FileTarget;
                PerformanceLoggerTarget.FileName = HttpContext.Current.Server.MapPath("\\Logs\\PerformanceLogger-" + DateTime.Now.ToString("yyyy-MM-dd") + ".csv");
                string path = PerformanceLoggerTarget.FileName.ToString();
                path = path.Remove(path.Length - 1);
                path = path.Remove(0, 1);
                if (!File.Exists(path))
                {
                    PerformanceLoggerTarget.Header = "Source,User,Action,Identifier,Method,Caller,Execution Start time,Execution End time,process id,RAM mb";
                }
                */

            }
              
        }

        public static void StopPerformanceLogging(string MethodName, string MethodDetails)
        {

            if (LogPerfomanceInfo)
            { 
            
                string user = string.Empty;
                
                long memory = 0;
                string pid = string.Empty;
                string endTime = string.Empty;
                //////To do ///////
                /*user= get the user name after authorization implemented*/
                user = HttpContext.Current.User.Identity.Name;


                memory = GetProcessMemory();
           
                stopwatch.Stop();
                TimeSpan timetaken = stopwatch.Elapsed;

                string elapsedTime = String.Format("{0:00}:{1:00}:{2:00}.{3:000}",
                                                timetaken.Hours,timetaken.Minutes, timetaken.Seconds,
                                                timetaken.Milliseconds);

                stopwatch.Reset();
                endTime = DateTime.Now.ToString("MM/dd/yy hh:mm:ss.fff");

                logger.Debug("{0},{1},{2},{3},{4},{5},{6}", 
                              user, MethodName, MethodDetails,startTime, endTime,elapsedTime, memory);

                
             }

        }
        
        private static long GetProcessMemory()
        {
          return  Process.GetCurrentProcess().PrivateMemorySize64 / (1024 * 1024);
        }

        public static void LogException(Exception exception)
        {

        }

        public static void LogInfo(string InfoMessage)
        {

        }

        public static void LogWarning(string WarningMessage)
        {

        }

        public static void LogError(string ErrorMessage)
        {

        }

        public static void LogDebug(string DebugMessage)
        {

        }

        public static void LogTrace(string TraceMessage)
        {

        }
      

        
    }
}
