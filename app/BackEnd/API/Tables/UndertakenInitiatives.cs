using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Tables
{
  [Table("AD_UntertakenInitiatives")]
  public class UndertakenInitiatives
  {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid UndertakenInitiativeID { get; set; }
    public Guid CompanyProfileID { get; set; }
    public string Answer1 { get; set; }
    public string Answer2 { get; set; }
    public string Answer3 { get; set; }
    public string Answer4 { get; set; }
    public string Answer5 { get; set; }
    public string Answer6 { get; set; }
    public string Answer7 { get; set; }
    public string Answer8 { get; set; }
    public string Answer9 { get; set; }
    public string Answer10 { get; set; }
    public string Answer11 { get; set; }
    public string Answer12 { get; set; }
    public string Answer13 { get; set; }
    public string Answer14 { get; set; }
    public string Answer15 { get; set; }
    public string Answer16 { get; set; }
    public string Answer17 { get; set; }
    public string Comment1 { get; set; }
    public string Comment2 { get; set; }
    public string Comment3 { get; set; }
    public string Comment4 { get; set; }
    public string Comment5 { get; set; }
    public string Comment6 { get; set; }
    public string Comment7 { get; set; }
    public string Comment8 { get; set; }
    public string Comment9 { get; set; }
    public string Comment10 { get; set; }
    public string Comment11 { get; set; }
    public string Comment12 { get; set; }
    public string Comment13 { get; set; }
    public string Comment14 { get; set; }
    public string Comment15 { get; set; }
    public string Comment16 { get; set; }
    public string Comment17 { get; set; }
    public string MainComment { get; set; }

  }
}
