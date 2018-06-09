using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Website
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Api",
                url: "api/v1/{action}/{id}",
                defaults: new { controller = "ApiV1", action = "Default", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Error",
                url: "errorpage/{action}",
                defaults: new { controller = "Error", action = "NotFound"}
            );

            routes.MapRoute(
                name: "ClientRoute",
                url: "{*ClientRoute}",
                defaults: new { controller = "Home", action = "Index"}
            );
        }
    }
}
