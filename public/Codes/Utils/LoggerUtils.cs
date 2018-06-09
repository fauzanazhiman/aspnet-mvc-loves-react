namespace Website.Codes.Utils
{
    public static class LoggerUtils
    {
        private static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        public static log4net.ILog GetLogger()
        {
            return log;
        }
    }
}