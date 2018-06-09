using System.Web.Mvc;

namespace Shaper.Samples.Web.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Natural drawer";

            return View();
        }
    }
}
