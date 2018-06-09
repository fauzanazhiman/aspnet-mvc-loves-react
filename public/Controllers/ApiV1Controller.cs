using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Website.Codes.Base;
using Website.Codes.Utils;
using Website.Models.Api;

namespace Website.Controllers
{
    public class ApiV1Controller : JsonControllerBase
    {
        [HttpGet]
        public JsonResult Default()
        {
            Response.StatusCode = 403;
            return new JsonResult
            {
                Data = new ApiResponse
                {
                    StatusCode = 403,
                    Message = "Unauthorized!"
                },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        [HttpGet]
        public JsonResult GetArticles()
        {
            return new JsonResult
            {
                Data = ArticleUtils.GetArticles(),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        [HttpGet]
        public JsonResult GetArticle(int id)
        {
            return new JsonResult
            {
                Data = ArticleUtils.GetArticle(id),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
    }
}

