using System;

namespace ControlePortaria.Models
{
    public class Permissao
    {
        public int Id { get; set; }
        public bool Adm { get; set; }
        public string NomePerfil { get; set; }
        public DateTime Entrada1 { get; set; }
        public DateTime Saida1 { get; set; }
        public DateTime Entrada2 { get; set; }
        public DateTime Saida2 { get; set; }
    }
}
