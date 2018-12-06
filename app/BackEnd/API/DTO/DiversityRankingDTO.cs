namespace API.DTO
{
  public class DiversityRankingDTO
  {
    public string FirmName { get; set; }
    public double EquityPartners { get; set; }
    public double NonEquityPartners { get; set; }
    public double Associates { get; set; }
    public double Counsel { get; set; }
    public double OtherLawyers { get; set; }
    public double Total { get; set; }
  }
}
