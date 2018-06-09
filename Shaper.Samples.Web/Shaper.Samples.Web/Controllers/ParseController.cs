using System;
using System.Runtime.Serialization.Json;
using System.Web.Mvc;
using Shaper.Samples.Application;

namespace Shaper.Samples.Web.Controllers
{
    public class ParseController : Controller
    {
        private readonly ParserAppService _parserService;

        public ParseController()
        {
            //Here we should use dependency injection.
            _parserService = new ParserAppService();
        }

        public JsonResult Shape(string value)
        {
            var result = _parserService.ParseShape(value);
            return result == null
                ? new BadRequestResult {JsonRequestBehavior = JsonRequestBehavior.AllowGet}
                : Json(result, JsonRequestBehavior.AllowGet);
        }
    }

    public class BadRequestResult : JsonResult
    {
        public override void ExecuteResult(ControllerContext context)
        {
            context.RequestContext.HttpContext.Response.StatusCode = 400;
            base.ExecuteResult(context);
        }

    }

    //Can be used to use the data contract serializer; problem is, it serializes the dictionary as a key value pair instead of as an object!
    public class JsonDataContractActionResult : JsonResult
    {
        public JsonDataContractActionResult(Object data)
        {
            Data = data;
            JsonRequestBehavior = JsonRequestBehavior.AllowGet;
        }

        public override void ExecuteResult(ControllerContext context)
        {
            var serializer = new DataContractJsonSerializer(Data.GetType());
            context.HttpContext.Response.ContentType = "application/json";
            serializer.WriteObject(context.HttpContext.Response.OutputStream,
                Data);
        }
    }
}
