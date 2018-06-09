using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Website.Codes.Utils;
using Website.Models.Api;

namespace Website.Codes.Base
{
    public class JsonControllerBase : Controller
    {
        protected override void OnResultExecuting(ResultExecutingContext filterContext)
        {
            filterContext.HttpContext.Response.Cache.SetExpires(DateTime.UtcNow.AddDays(-1));
            filterContext.HttpContext.Response.Cache.SetValidUntilExpires(false);
            filterContext.HttpContext.Response.Cache.SetRevalidation(HttpCacheRevalidation.AllCaches);
            filterContext.HttpContext.Response.Cache.SetCacheability(HttpCacheability.NoCache);
            filterContext.HttpContext.Response.Cache.SetNoStore();

            base.OnResultExecuting(filterContext);
        }

        protected override void OnException(ExceptionContext filterContext)
        {
            Exception ex = filterContext.Exception;
            filterContext.ExceptionHandled = true;
            LoggerUtils.GetLogger().Error("API call throw exception. URL: " + Request.RawUrl, filterContext.Exception);
            filterContext.Result = new JsonResult
            {
                Data = new ApiResponse
                {
                    StatusCode = 500,
                    Message = "Internal Server Error"
                },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };

        }
    }
}