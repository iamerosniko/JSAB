using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Tables
{
  [Table("AD_PromotionsAssociatePartners")]
  public class PromotionsAssociatePartners
  {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid PromotionsAssociatePartnerID { get; set; }
    public Guid CompanyProfileID { get; set; }
    public string RegionName { get; set; }
    public string EquityPartners { get; set; }
    public string NonEquityPartners { get; set; }
    public string Associates { get; set; }
    public string Counsel { get; set; }
    public string OtherLawyers { get; set; }
  }
}
