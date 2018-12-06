using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Tables
{
  [Table("AD_Audit")]
  public class Audit
  {

    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid AuditID { get; set; }
    public string Username { get; set; }
    public DateTime DateModified { get; set; }
    public string Module { get; set; }
    public string Action { get; set; }
  }
}
