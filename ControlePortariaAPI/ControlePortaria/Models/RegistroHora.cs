using System;

namespace ControlePortaria.Models
{
    public class RegistroHora
    {
        public int Id { get; set; }
        public int IdColaborador { get; set; }
        public DateTime Data { get; set; }
    }
}
