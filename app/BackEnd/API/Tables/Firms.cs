using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Tables
{
  [Table("AD_Firms")]
  public class Firms
  {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid FirmID { get; set; }
    public string FirmName { get; set; }
  }
}
