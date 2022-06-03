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
    public class AcessoMobilesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AcessoMobilesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/AcessoMobiles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AcessoMobile>>> GetAcessoMobile()
        {
            return await _context.AcessoMobile.ToListAsync();
        }

        // GET: api/AcessoMobiles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AcessoMobile>> GetAcessoMobile(int id)
        {
            var acessoMobile = await _context.AcessoMobile.FindAsync(id);

            if (acessoMobile == null)
            {
                return NotFound();
            }

            return acessoMobile;
        }

        // PUT: api/AcessoMobiles/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAcessoMobile(int id, AcessoMobile acessoMobile)
        {
            if (id != acessoMobile.Id)
            {
                return BadRequest();
            }

            _context.Entry(acessoMobile).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AcessoMobileExists(id))
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

        // POST: api/AcessoMobiles
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AcessoMobile>> PostAcessoMobile(AcessoMobile acessoMobile)
        {
            _context.AcessoMobile.Add(acessoMobile);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAcessoMobile", new { id = acessoMobile.Id }, acessoMobile);
        }

        // DELETE: api/AcessoMobiles/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAcessoMobile(int id)
        {
            var acessoMobile = await _context.AcessoMobile.FindAsync(id);
            if (acessoMobile == null)
            {
                return NotFound();
            }

            _context.AcessoMobile.Remove(acessoMobile);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AcessoMobileExists(int id)
        {
            return _context.AcessoMobile.Any(e => e.Id == id);
        }
    }
}
