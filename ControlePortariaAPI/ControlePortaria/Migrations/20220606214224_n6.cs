using Microsoft.EntityFrameworkCore.Migrations;

namespace ControlePortaria.Migrations
{
    public partial class n6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "NomePerfil",
                table: "Permissao",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NomePerfil",
                table: "Permissao");
        }
    }
}
