using API.Tables;
using System.Collections.Generic;

namespace API.DTO
{
  public class Survey
  {
    public Firms Firm { get; set; }
    public CompanyProfiles CompanyProfile { get; set; }
    public UndertakenInitiatives UndertakenInitiatives { get; set; }
    public List<FirmDemographics> FirmDemographics { get; set; }
    public List<JoinedLawyers> JoinedLawyers { get; set; }
    public List<LeadershipDemographics> LeadershipDemographics { get; set; }
    public List<LeftLawyers> LeftLawyers { get; set; }
    public List<PromotionsAssociatePartners> PromotionsAssociatePartners { get; set; }
    public List<ReducedHoursLawyers> ReducedHoursLawyers { get; set; }
    public List<Certificates> Certificates { get; set; }
    public List<TopTenHighestCompensations> TopTenHighestCompensations { get; set; }
    public bool IsNewFIrm { get; set; }
  }
}
