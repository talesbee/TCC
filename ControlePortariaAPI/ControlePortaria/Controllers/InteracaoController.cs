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

        [HttpGet("{id}")]
        public async Task<ActionResult> GetEntrada(string id)
        {
            try
            {
                
                Identificador tag =  _context.Identificador.Where(t => t.CodTag == id).FirstOrDefault();

                if (tag == null)
                {
                    return Ok(new { sucesso= false, data= "Tag nao registrada!" });
                }
               
                Colaborador colaborador = _context.Colaboradores.Where(x => x.IdIdentificador == tag.Id).FirstOrDefault();

                if (colaborador==null)
                {
                    return Ok(new { sucesso = false, data = "Colaborador nao encontrado!" });
                }

                RegistroHora registro = new();
                registro.IdColaborador = colaborador.Id;
                registro.Data = DateTime.Now;
                _context.RegistroHoras.Add(registro);
                await _context.SaveChangesAsync();

                Object retorno = new
                {
                    data = _context.Pessoas.Where(x => x.Id == colaborador.IdPessoa).FirstOrDefault().Nome,
                    sucesso = true,
                };

                return Ok(retorno);
                    
            }
            catch (DbUpdateConcurrencyException)
            {
                return Ok(new { sucesso = false });
            }
        }

    }
}
