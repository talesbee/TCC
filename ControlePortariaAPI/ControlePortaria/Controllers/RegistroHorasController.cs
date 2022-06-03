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
    public class RegistroHorasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RegistroHorasController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/RegistroHoras
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RegistroHora>>> GetRegistroHoras()
        {
            return await _context.RegistroHoras.ToListAsync();
        }

        // GET: api/RegistroHoras/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RegistroHora>> GetRegistroHora(int id)
        {
            var registroHora = await _context.RegistroHoras.FindAsync(id);

            if (registroHora == null)
            {
                return NotFound();
            }

            return registroHora;
        }

        // PUT: api/RegistroHoras/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRegistroHora(int id, RegistroHora registroHora)
        {
            if (id != registroHora.Id)
            {
                return BadRequest();
            }

            _context.Entry(registroHora).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RegistroHoraExists(id))
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

        // POST: api/RegistroHoras
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RegistroHora>> PostRegistroHora(RegistroHora registroHora)
        {
            _context.RegistroHoras.Add(registroHora);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRegistroHora", new { id = registroHora.Id }, registroHora);
        }

        // DELETE: api/RegistroHoras/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRegistroHora(int id)
        {
            var registroHora = await _context.RegistroHoras.FindAsync(id);
            if (registroHora == null)
            {
                return NotFound();
            }

            _context.RegistroHoras.Remove(registroHora);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RegistroHoraExists(int id)
        {
            return _context.RegistroHoras.Any(e => e.Id == id);
        }
    }
}
