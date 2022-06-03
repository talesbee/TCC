using Microsoft.EntityFrameworkCore.Migrations;

namespace ControlePortaria.Migrations
{
    public partial class Update : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CodTag",
                table: "Funcionarios");

            migrationBuilder.RenameColumn(
                name: "IdFuncionario",
                table: "RegistroHoras",
                newName: "IdColaborador");

            migrationBuilder.RenameColumn(
                name: "DataHora",
                table: "RegistroHoras",
                newName: "Data");

            migrationBuilder.RenameColumn(
                name: "IdDigital",
                table: "Funcionarios",
                newName: "IdPermissao");

            migrationBuilder.AddColumn<int>(
                name: "IdIdentificador",
                table: "Funcionarios",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Identificador",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CodTag = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Identificador", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Permissao",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Adm = table.Column<bool>(type: "bit", nullable: false),
                    Entrada1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Saida1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Entrada2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Saida2 = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Permissao", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Identificador");

            migrationBuilder.DropTable(
                name: "Permissao");

            migrationBuilder.DropColumn(
                name: "IdIdentificador",
                table: "Funcionarios");

            migrationBuilder.RenameColumn(
                name: "IdColaborador",
                table: "RegistroHoras",
                newName: "IdFuncionario");

            migrationBuilder.RenameColumn(
                name: "Data",
                table: "RegistroHoras",
                newName: "DataHora");

            migrationBuilder.RenameColumn(
                name: "IdPermissao",
                table: "Funcionarios",
                newName: "IdDigital");

            migrationBuilder.AddColumn<string>(
                name: "CodTag",
                table: "Funcionarios",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
