using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Tables
{
  [Table("AD_CompanyProfiles")]
  public class CompanyProfiles
  {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid CompanyProfileID { get; set; }
    public Guid FirmID { get; set; }
    public string Firmname { get; set; }
    public string Firmhead { get; set; }
    public DateTime Datecomp { get; set; }
    public string Srcname { get; set; }
    public string Srctitle { get; set; }
    public string Srcemail { get; set; }
    public int Totalfw { get; set; }
    public int Totalusfw { get; set; }
    public string Sizecat { get; set; }
    public string Firmown { get; set; }
    public string Catown { get; set; }
    public string Firmcert { get; set; }
  }

}
