using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Tables
{
  [Table("AD_Certificates")]
  public class Certificates
  {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid CertificateID { get; set; }
    public Guid CompanyProfileID { get; set; }
    public string Name { get; set; }
    public DateTime DateCert { get; set; }
  }
}
