using API.Tables;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace API.Controllers
{
  [Produces("application/json")]
  [Route("api/Test")]
  public class TestController : Controller
  {

    private readonly ADContext _context;

    public TestController(ADContext context)
    {
      _context = context;
    }

    [HttpGet]
    public List<string> CheckTableExisting()
    {
      List<string> details = new List<string>();
      details.Add(IsExisting("AD_Audit"));
      details.Add(IsExisting("AD_UntertakenInitiatives"));
      details.Add(IsExisting("AD_TopTenHighestCompensations"));
      details.Add(IsExisting("AD_ReducedHoursLawyers"));
      details.Add(IsExisting("AD_PromotionsAssociatePartners"));
      details.Add(IsExisting("AD_LeftLawyers"));
      details.Add(IsExisting("AD_LeadershipDemographics"));
      details.Add(IsExisting("AD_JoinedLawyers"));
      details.Add(IsExisting("AD_Firms"));
      details.Add(IsExisting("AD_CompanyProfiles"));
      details.Add(IsExisting("AD_FirmDemographics"));
      details.Add(IsExisting("AD_Certificates"));

      return details;
    }

    public string IsExisting(string TableName)
    {
      string detail = "";

      using (var command = _context.Database.GetDbConnection().CreateCommand())
      {
        command.CommandText = @"SELECT count(*) FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME =N'" + TableName + "'";
        _context.Database.OpenConnection();
        using (var result = command.ExecuteReader())
        {
          while (result.Read())
          {
            detail += (result[0].ToString() == "1") ? TableName.Remove(0, 3) + " : True" : TableName.Remove(0, 3) + " : False";
          }
        }
      }
      return detail;
    }
  }
}
