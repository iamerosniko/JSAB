using API.Tables;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
  [Authorize]

  [Produces("application/json")]
  [Route("api/Firms")]
  public class FirmsController : Controller
  {
    private readonly ADContext _context;

    public FirmsController(ADContext context)
    {
      _context = context;
    }

    // GET: api/Firms
    [HttpGet]
    public IEnumerable<Firms> GetFirms()
    {
      return _context.Firms.OrderBy(x => x.FirmName);
    }

    // GET: api/Firms/5
    //[HttpGet("{id}")]
    //public async Task<IActionResult> GetFirms([FromRoute] Guid id)
    //{
    //  if (!ModelState.IsValid)
    //  {
    //    return BadRequest(ModelState);
    //  }

    //  var firms = await _context.Firms.SingleOrDefaultAsync(m => m.FirmID == id);

    //  if (firms == null)
    //  {
    //    return NotFound();
    //  }

    //  return Ok(firms);
    //}

    // PUT: api/Firms/5
    //[HttpPut("{id}")]
    //public async Task<IActionResult> PutFirms([FromRoute] Guid id, [FromBody] Firms firms)
    //{
    //  if (!ModelState.IsValid)
    //  {
    //    return BadRequest(ModelState);
    //  }

    //  if (id != firms.FirmID)
    //  {
    //    return BadRequest();
    //  }

    //  _context.Entry(firms).State = EntityState.Modified;

    //  try
    //  {
    //    await _context.SaveChangesAsync();
    //  }
    //  catch (DbUpdateConcurrencyException)
    //  {
    //    if (!FirmsExists(id))
    //    {
    //      return NotFound();
    //    }
    //    else
    //    {
    //      throw;
    //    }
    //  }

    //  return NoContent();
    //}

    // POST: api/Firms
    [HttpPost]
    public async Task<IActionResult> PostFirms([FromBody] Firms firms)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      _context.Firms.Add(firms);
      await _context.SaveChangesAsync();

      return CreatedAtAction("GetFirms", new { id = firms.FirmID }, firms);
    }

    // DELETE: api/Firms/5
    //[HttpDelete("{id}")]
    //public async Task<IActionResult> DeleteFirms([FromRoute] Guid id)
    //{
    //  if (!ModelState.IsValid)
    //  {
    //    return BadRequest(ModelState);
    //  }

    //  var firms = await _context.Firms.SingleOrDefaultAsync(m => m.FirmID == id);
    //  if (firms == null)
    //  {
    //    return NotFound();
    //  }

    //  _context.Firms.Remove(firms);
    //  await _context.SaveChangesAsync();

    //  return Ok(firms);
    //}

    private bool FirmsExists(Guid id)
    {
      return _context.Firms.Any(e => e.FirmID == id);
    }
  }
}
