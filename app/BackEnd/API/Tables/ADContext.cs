using Microsoft.EntityFrameworkCore;

namespace API.Tables
{
  public class ADContext : DbContext
  {
    public ADContext(DbContextOptions<ADContext> options) : base(options)
    {
      Database.Migrate();
    }
    public DbSet<Certificates> Certificates { get; set; }
    public DbSet<CompanyProfiles> CompanyProfiles { get; set; }
    public DbSet<FirmDemographics> FirmDemographics { get; set; }
    public DbSet<Firms> Firms { get; set; }
    //public DbSet<Genders> Genders { get; set; }
    public DbSet<JoinedLawyers> JoinedLawyers { get; set; }
    public DbSet<LeadershipDemographics> LeadershipDemographics { get; set; }
    public DbSet<LeftLawyers> LeftLawyers { get; set; }
    public DbSet<PromotionsAssociatePartners> PromotionsAssociatePartners { get; set; }
    public DbSet<ReducedHoursLawyers> ReducedHoursLawyers { get; set; }
    //public DbSet<Regions> Regions { get; set; }
    public DbSet<TopTenHighestCompensations> TopTenHighestCompensations { get; set; }
    public DbSet<UndertakenInitiatives> UndertakenInitiatives { get; set; }
    public DbSet<Audit> AuditTrails { get; set; }

  }
}
