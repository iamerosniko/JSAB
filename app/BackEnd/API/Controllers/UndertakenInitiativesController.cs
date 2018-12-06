using API.Tables;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
  [Authorize]
  [Produces("application/json")]
  //[Route("api/UndertakenInitiatives")]
  public class UndertakenInitiativesController : Controller
  {
    private readonly ADContext _context;

    public UndertakenInitiativesController(ADContext context)
    {
      _context = context;
    }

    // GET: api/UndertakenInitiatives
    [HttpGet]
    public IEnumerable<UndertakenInitiatives> GetUndertakenInitiatives()
    {
      return _context.UndertakenInitiatives;
    }

    // GET: api/UndertakenInitiatives/5
    [HttpGet("{id}")]
    public async Task<UndertakenInitiatives> GetUndertakenInitiatives([FromRoute] Guid id)
    {
      if (!ModelState.IsValid)
      {
        return null;
      }

      var undertakenInitiatives = await _context.UndertakenInitiatives.SingleOrDefaultAsync(m => m.CompanyProfileID == id);

      if (undertakenInitiatives == null)
      {
        return null;
      }

      return undertakenInitiatives;
    }

    // PUT: api/UndertakenInitiatives/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutUndertakenInitiatives([FromRoute] Guid id, [FromBody] UndertakenInitiatives undertakenInitiatives)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      if (id != undertakenInitiatives.UndertakenInitiativeID)
      {
        return BadRequest();
      }

      _context.Entry(undertakenInitiatives).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!UndertakenInitiativesExists(id))
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

    // POST: api/UndertakenInitiatives
    [HttpPost]
    public async Task<IActionResult> PostUndertakenInitiatives([FromBody] UndertakenInitiatives undertakenInitiatives)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      _context.UndertakenInitiatives.Add(undertakenInitiatives);
      await _context.SaveChangesAsync();

      return CreatedAtAction("GetUndertakenInitiatives", new { id = undertakenInitiatives.UndertakenInitiativeID }, undertakenInitiatives);
    }

    // DELETE: api/UndertakenInitiatives/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUndertakenInitiatives([FromRoute] Guid id)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var undertakenInitiatives = await _context.UndertakenInitiatives.SingleOrDefaultAsync(m => m.UndertakenInitiativeID == id);
      if (undertakenInitiatives == null)
      {
        return NotFound();
      }

      _context.UndertakenInitiatives.Remove(undertakenInitiatives);
      await _context.SaveChangesAsync();

      return Ok(undertakenInitiatives);
    }

    private bool UndertakenInitiativesExists(Guid id)
    {
      return _context.UndertakenInitiatives.Any(e => e.UndertakenInitiativeID == id);
    }
  }
}
