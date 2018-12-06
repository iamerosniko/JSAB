using System;

namespace API.DTO
{
  public class GenericDataSurveyDTO
  {
    public Guid CompanyProfileID { get; set; }
    public string RegionName { get; set; }
    public string EquityPartners { get; set; }
    public string NonEquityPartners { get; set; }
    public string Associates { get; set; }
    public string Counsel { get; set; }
    public string OtherLawyers { get; set; }
  }
}
