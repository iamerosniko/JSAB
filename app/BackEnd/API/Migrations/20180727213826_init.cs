using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace API.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AD_Certificates",
                columns: table => new
                {
                    CertificateID = table.Column<Guid>(nullable: false),
                    CompanyProfileID = table.Column<Guid>(nullable: false),
                    DateCert = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AD_Certificates", x => x.CertificateID);
                });

            migrationBuilder.CreateTable(
                name: "AD_CompanyProfiles",
                columns: table => new
                {
                    CompanyProfileID = table.Column<Guid>(nullable: false),
                    Catown = table.Column<string>(nullable: true),
                    Datecomp = table.Column<DateTime>(nullable: false),
                    FirmID = table.Column<Guid>(nullable: false),
                    Firmcert = table.Column<string>(nullable: true),
                    Firmhead = table.Column<string>(nullable: true),
                    Firmname = table.Column<string>(nullable: true),
                    Firmown = table.Column<string>(nullable: true),
                    Sizecat = table.Column<int>(nullable: false),
                    Srcemail = table.Column<string>(nullable: true),
                    Srcname = table.Column<string>(nullable: true),
                    Srctitle = table.Column<string>(nullable: true),
                    Totalfw = table.Column<int>(nullable: false),
                    Totalusfw = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AD_CompanyProfiles", x => x.CompanyProfileID);
                });

            migrationBuilder.CreateTable(
                name: "AD_FirmDemographics",
                columns: table => new
                {
                    FirmDemographicID = table.Column<Guid>(nullable: false),
                    Associates = table.Column<string>(nullable: true),
                    CompanyProfileID = table.Column<Guid>(nullable: false),
                    Counsel = table.Column<string>(nullable: true),
                    EquityPartners = table.Column<string>(nullable: true),
                    NonEquityPartners = table.Column<string>(nullable: true),
                    OtherLawyers = table.Column<string>(nullable: true),
                    RegionName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AD_FirmDemographics", x => x.FirmDemographicID);
                });

            migrationBuilder.CreateTable(
                name: "AD_Firms",
                columns: table => new
                {
                    FirmID = table.Column<Guid>(nullable: false),
                    FirmName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AD_Firms", x => x.FirmID);
                });

            migrationBuilder.CreateTable(
                name: "AD_JoinedLawyers",
                columns: table => new
                {
                    JoinedLawyerID = table.Column<Guid>(nullable: false),
                    Associates = table.Column<string>(nullable: true),
                    CompanyProfileID = table.Column<Guid>(nullable: false),
                    Counsel = table.Column<string>(nullable: true),
                    EquityPartners = table.Column<string>(nullable: true),
                    NonEquityPartners = table.Column<string>(nullable: true),
                    OtherLawyers = table.Column<string>(nullable: true),
                    RegionName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AD_JoinedLawyers", x => x.JoinedLawyerID);
                });

            migrationBuilder.CreateTable(
                name: "AD_LeadershipDemographics",
                columns: table => new
                {
                    LeadershipDemographicID = table.Column<Guid>(nullable: false),
                    CompanyProfileID = table.Column<Guid>(nullable: false),
                    Disabled = table.Column<string>(nullable: true),
                    LGBT = table.Column<string>(nullable: true),
                    MinorityFemale = table.Column<string>(nullable: true),
                    MinorityMale = table.Column<string>(nullable: true),
                    NumberQuestion = table.Column<string>(nullable: true),
                    WhiteFemale = table.Column<string>(nullable: true),
                    WhiteMale = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AD_LeadershipDemographics", x => x.LeadershipDemographicID);
                });

            migrationBuilder.CreateTable(
                name: "AD_LeftLawyers",
                columns: table => new
                {
                    LeftLawyerID = table.Column<Guid>(nullable: false),
                    Associates = table.Column<string>(nullable: true),
                    CompanyProfileID = table.Column<Guid>(nullable: false),
                    Counsel = table.Column<string>(nullable: true),
                    EquityPartners = table.Column<string>(nullable: true),
                    NonEquityPartners = table.Column<string>(nullable: true),
                    OtherLawyers = table.Column<string>(nullable: true),
                    RegionName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AD_LeftLawyers", x => x.LeftLawyerID);
                });

            migrationBuilder.CreateTable(
                name: "AD_PromotionsAssociatePartners",
                columns: table => new
                {
                    PromotionsAssociatePartnerID = table.Column<Guid>(nullable: false),
                    Associates = table.Column<string>(nullable: true),
                    CompanyProfileID = table.Column<Guid>(nullable: false),
                    Counsel = table.Column<string>(nullable: true),
                    EquityPartners = table.Column<string>(nullable: true),
                    NonEquityPartners = table.Column<string>(nullable: true),
                    OtherLawyers = table.Column<string>(nullable: true),
                    RegionName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AD_PromotionsAssociatePartners", x => x.PromotionsAssociatePartnerID);
                });

            migrationBuilder.CreateTable(
                name: "AD_ReducedHoursLawyers",
                columns: table => new
                {
                    ReducedHoursLawyerID = table.Column<Guid>(nullable: false),
                    Associates = table.Column<string>(nullable: true),
                    CompanyProfileID = table.Column<Guid>(nullable: false),
                    Counsel = table.Column<string>(nullable: true),
                    EquityPartners = table.Column<string>(nullable: true),
                    NonEquityPartners = table.Column<string>(nullable: true),
                    OtherLawyers = table.Column<string>(nullable: true),
                    RegionName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AD_ReducedHoursLawyers", x => x.ReducedHoursLawyerID);
                });

            migrationBuilder.CreateTable(
                name: "AD_TopTenHighestCompensations",
                columns: table => new
                {
                    TopTenHighestCompensationID = table.Column<Guid>(nullable: false),
                    Associates = table.Column<string>(nullable: true),
                    CompanyProfileID = table.Column<Guid>(nullable: false),
                    Counsel = table.Column<string>(nullable: true),
                    EquityPartners = table.Column<string>(nullable: true),
                    NonEquityPartners = table.Column<string>(nullable: true),
                    OtherLawyers = table.Column<string>(nullable: true),
                    RegionName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AD_TopTenHighestCompensations", x => x.TopTenHighestCompensationID);
                });

            migrationBuilder.CreateTable(
                name: "AD_UntertakenInitiatives",
                columns: table => new
                {
                    UndertakenInitiativeID = table.Column<Guid>(nullable: false),
                    Answer1 = table.Column<string>(nullable: true),
                    Answer10 = table.Column<string>(nullable: true),
                    Answer11 = table.Column<string>(nullable: true),
                    Answer12 = table.Column<string>(nullable: true),
                    Answer13 = table.Column<string>(nullable: true),
                    Answer14 = table.Column<string>(nullable: true),
                    Answer15 = table.Column<string>(nullable: true),
                    Answer16 = table.Column<string>(nullable: true),
                    Answer17 = table.Column<string>(nullable: true),
                    Answer2 = table.Column<string>(nullable: true),
                    Answer3 = table.Column<string>(nullable: true),
                    Answer4 = table.Column<string>(nullable: true),
                    Answer5 = table.Column<string>(nullable: true),
                    Answer6 = table.Column<string>(nullable: true),
                    Answer7 = table.Column<string>(nullable: true),
                    Answer8 = table.Column<string>(nullable: true),
                    Answer9 = table.Column<string>(nullable: true),
                    Comment1 = table.Column<string>(nullable: true),
                    Comment10 = table.Column<string>(nullable: true),
                    Comment11 = table.Column<string>(nullable: true),
                    Comment12 = table.Column<string>(nullable: true),
                    Comment13 = table.Column<string>(nullable: true),
                    Comment14 = table.Column<string>(nullable: true),
                    Comment15 = table.Column<string>(nullable: true),
                    Comment16 = table.Column<string>(nullable: true),
                    Comment17 = table.Column<string>(nullable: true),
                    Comment2 = table.Column<string>(nullable: true),
                    Comment3 = table.Column<string>(nullable: true),
                    Comment4 = table.Column<string>(nullable: true),
                    Comment5 = table.Column<string>(nullable: true),
                    Comment6 = table.Column<string>(nullable: true),
                    Comment7 = table.Column<string>(nullable: true),
                    Comment8 = table.Column<string>(nullable: true),
                    Comment9 = table.Column<string>(nullable: true),
                    CompanyProfileID = table.Column<Guid>(nullable: false),
                    MainComment = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AD_UntertakenInitiatives", x => x.UndertakenInitiativeID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AD_Certificates");

            migrationBuilder.DropTable(
                name: "AD_CompanyProfiles");

            migrationBuilder.DropTable(
                name: "AD_FirmDemographics");

            migrationBuilder.DropTable(
                name: "AD_Firms");

            migrationBuilder.DropTable(
                name: "AD_JoinedLawyers");

            migrationBuilder.DropTable(
                name: "AD_LeadershipDemographics");

            migrationBuilder.DropTable(
                name: "AD_LeftLawyers");

            migrationBuilder.DropTable(
                name: "AD_PromotionsAssociatePartners");

            migrationBuilder.DropTable(
                name: "AD_ReducedHoursLawyers");

            migrationBuilder.DropTable(
                name: "AD_TopTenHighestCompensations");

            migrationBuilder.DropTable(
                name: "AD_UntertakenInitiatives");
        }
    }
}
