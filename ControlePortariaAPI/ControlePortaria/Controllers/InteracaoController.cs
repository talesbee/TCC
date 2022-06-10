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
    [Route("api/[controller]/")]
    [ApiController]
    public class InteracaoController : ControllerBase
    {
        private readonly AppDbContext _context;

        public class colab
        {
            public string Nome {get; set;}
            public string Telefone {get; set;}
            public string Endereco {get; set;}
            public string CodTag {get; set;}
            public string UserMobile { get; set; }
            public string PasswordMobile { get; set; }
            public int Permissao { get; set; }
        }
        
        public InteracaoController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("GetEntrada/{id}")]
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
        [HttpGet("GetLogin/")]
        public async Task<ActionResult<AcessoMobile>> GetLogin(String user, String pass)
        {
            AcessoMobile login = _context.AcessoMobile.Where(x => x.UserMobile == user).FirstOrDefault();
            if(login != null && login.PasswordMobile == pass)
            {
                Colaborador colaborador = _context.Colaboradores.Where(x => x.IdAcessoMobile == login.Id).FirstOrDefault();
                Object retorno = new
                {
                    nome = _context.Pessoas.Where(x => x.Id == colaborador.IdPessoa).FirstOrDefault().Nome,
                    admin = _context.Permissao.Where(x => x.Id == colaborador.IdPermissao).FirstOrDefault().Adm,
                    idColaborador = colaborador.Id,
                };
                return Ok(new { sucesso = true, data = retorno });
            }
            return Ok(new { sucesso = false });
        }
        [HttpGet("GetHoras/")]
        public async Task<ActionResult<AcessoMobile>> GetHoras(int id)
        {
            var horas = _context.RegistroHoras.Where(x => x.IdColaborador == id);
            if (horas != null)
            {
                return Ok(new { sucesso = true, data = horas });
            }
            
            return Ok(new { sucesso = false });
        }
        [HttpPost("PostColaborador/")]
        public async Task<ActionResult> PostColaborador(colab colab)
        {
            Colaborador colaborador = new();
            colaborador.IdPermissao = colab.Permissao;

            AcessoMobile acesso = new();
            acesso.UserMobile = colab.UserMobile;
            acesso.PasswordMobile = colab.PasswordMobile;
            _context.AcessoMobile.Add(acesso);
            var lt = _context.AcessoMobile.ToListAsync().Result.LastOrDefault().Id+1;
            colaborador.IdAcessoMobile = lt;

            Pessoa pessoa = new();
            pessoa.Nome = colab.Nome;
            pessoa.Telefone = colab.Telefone;
            pessoa.Endereco = colab.Endereco;
            _context.Pessoas.Add(pessoa);
            colaborador.IdPessoa = _context.Pessoas.ToListAsync().Result.LastOrDefault().Id+1;

            Identificador tag = new();
            tag.CodTag = colab.CodTag;
            _context.Identificador.Add(tag);
            colaborador.IdIdentificador = _context.Identificador.ToListAsync().Result.LastOrDefault().Id + 1; ;

            _context.Colaboradores.Add(colaborador);
            await _context.SaveChangesAsync();

            return Ok(new { sucesso = true });
        }
    }
}
