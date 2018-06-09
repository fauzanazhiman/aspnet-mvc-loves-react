using System.Web;
using System.Web.Mvc;

namespace AspNetMvc_ReactRouter_StarterSite
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
