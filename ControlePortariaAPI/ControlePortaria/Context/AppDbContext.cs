using ControlePortaria.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace ControlePortaria.Context
{
    public class AppDbContext : DbContext
    {

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        public DbSet<Pessoa> Pessoas { get; set; }
        public DbSet<Colaborador> Funcionarios { get; set; }
        public DbSet<RegistroHora> RegistroHoras { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            IConfiguration configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", false, true)
                .Build();

            optionsBuilder.UseSqlServer(configuration.GetConnectionString("ServerConnection"));
        }


        public DbSet<ControlePortaria.Models.Identificador> Identificador { get; set; }


        public DbSet<ControlePortaria.Models.Permissao> Permissao { get; set; }


        public DbSet<ControlePortaria.Models.AcessoMobile> AcessoMobile { get; set; }
    }
}
