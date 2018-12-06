using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Tables
{
  [Table("AD_LeadershipDemographics")]
  public class LeadershipDemographics
  {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid LeadershipDemographicID { get; set; }
    public Guid CompanyProfileID { get; set; }
    public string NumberQuestion { get; set; }
    public string MinorityFemale { get; set; }
    public string MinorityMale { get; set; }
    public string WhiteFemale { get; set; }
    public string WhiteMale { get; set; }
    public string LGBT { get; set; }
    public string Disabled { get; set; }
    //public List<Genders> Genders { get; set; }
  }
}
