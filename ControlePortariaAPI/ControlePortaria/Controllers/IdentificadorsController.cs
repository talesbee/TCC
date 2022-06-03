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
    public class IdentificadorsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public IdentificadorsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Identificadors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Identificador>>> GetIdentificador()
        {
            return await _context.Identificador.ToListAsync();
        }

        // GET: api/Identificadors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Identificador>> GetIdentificador(int id)
        {
            var identificador = await _context.Identificador.FindAsync(id);

            if (identificador == null)
            {
                return NotFound();
            }

            return identificador;
        }

        // PUT: api/Identificadors/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutIdentificador(int id, Identificador identificador)
        {
            if (id != identificador.Id)
            {
                return BadRequest();
            }

            _context.Entry(identificador).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IdentificadorExists(id))
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

        // POST: api/Identificadors
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Identificador>> PostIdentificador(Identificador identificador)
        {
            _context.Identificador.Add(identificador);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetIdentificador", new { id = identificador.Id }, identificador);
        }

        // DELETE: api/Identificadors/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIdentificador(int id)
        {
            var identificador = await _context.Identificador.FindAsync(id);
            if (identificador == null)
            {
                return NotFound();
            }

            _context.Identificador.Remove(identificador);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool IdentificadorExists(int id)
        {
            return _context.Identificador.Any(e => e.Id == id);
        }
    }
}
