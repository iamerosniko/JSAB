using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace API.Migrations
{
    public partial class m002 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AD_Audit",
                columns: table => new
                {
                    AuditID = table.Column<Guid>(nullable: false),
                    Action = table.Column<string>(nullable: true),
                    DateModified = table.Column<DateTime>(nullable: false),
                    Module = table.Column<string>(nullable: true),
                    Username = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AD_Audit", x => x.AuditID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AD_Audit");
        }
    }
}
