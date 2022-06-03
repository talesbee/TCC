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
    public class PermissaosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PermissaosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Permissaos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Permissao>>> GetPermissao()
        {
            return await _context.Permissao.ToListAsync();
        }

        // GET: api/Permissaos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Permissao>> GetPermissao(int id)
        {
            var permissao = await _context.Permissao.FindAsync(id);

            if (permissao == null)
            {
                return NotFound();
            }

            return permissao;
        }

        // PUT: api/Permissaos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPermissao(int id, Permissao permissao)
        {
            if (id != permissao.Id)
            {
                return BadRequest();
            }

            _context.Entry(permissao).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PermissaoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Permissaos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Permissao>> PostPermissao(Permissao permissao)
        {
            _context.Permissao.Add(permissao);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPermissao", new { id = permissao.Id }, permissao);
        }

        // DELETE: api/Permissaos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePermissao(int id)
        {
            var permissao = await _context.Permissao.FindAsync(id);
            if (permissao == null)
            {
                return NotFound();
            }

            _context.Permissao.Remove(permissao);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PermissaoExists(int id)
        {
            return _context.Permissao.Any(e => e.Id == id);
        }
    }
}
