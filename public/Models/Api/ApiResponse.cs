using System;

namespace Website.Models.Api
{
    [Serializable]
    public class ApiResponse
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public string Detail { get; set; }
    }
}