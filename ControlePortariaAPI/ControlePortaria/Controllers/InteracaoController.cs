using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ControlePortaria.Context;
using ControlePortaria.Models;

namespace ControlePortaria.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InteracaoController : ControllerBase
    {
        private readonly AppDbContext _context;

        public InteracaoController(AppDbContext context)
        {
            _context = context;
        }

        [Route("RegistroEntrada")]
        [HttpGet]
        public async Task<ActionResult> PostRegistroEntrada(string id)
        {
            try
            {
                Identificador tag = _context.Identificador.Where(t => t.CodTag == id).FirstOrDefault();

                
                Colaborador colaborador = _context.Colaboradores.Where(x => x.IdIdentificador == tag.Id).FirstOrDefault();

                if (colaborador != null) { 
                    RegistroHora registro = new();
                    registro.IdColaborador = colaborador.Id;
                    registro.Data = DateTime.Now;
                    _context.RegistroHoras.Add(registro);
                    await _context.SaveChangesAsync();

                    var horaFull = registro.Data.ToString().Split(' ')[1].Split(':');
                    var horaRegistro = horaFull[0] + ':' + horaFull[1];
                    var dataFull = registro.Data.ToString().Split(' ')[0].Split('-');
                    var data = dataFull[2] + '/' + dataFull[1] + '/' + dataFull[0];
                    Object returno = new
                    {
                        nome = _context.Pessoas.Where(x => x.Id == colaborador.IdPessoa).FirstOrDefault().Nome,
                        dia = data,
                        hora = horaRegistro,
                    };

                    return Ok(new{sucesso = true,data=returno});

                }
                else
                {
                    return Ok(new {sucesso=false});
                }
            }
            catch (DbUpdateConcurrencyException)
            {
                return Ok(new { sucesso = false });
            }
        }

    }
}
