using Client.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace Client.Controllers
{
  public class HomeController : Controller
  {
    public IActionResult Index()
    {
      if (HttpContext.User.Identity.Name == "" || HttpContext.User.Identity.Name == null)
      {
        return Redirect("~/SignIn");
      }
      return View();
    }

    [Route("signin")]
    public IActionResult SignIn()
    {
      return Challenge(new AuthenticationProperties { RedirectUri = "/" });
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
      return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
  }
}
