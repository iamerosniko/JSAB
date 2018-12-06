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
  //[Route("api/LeftLawyers")]
  public class LeftLawyersController : Controller
  {
    private readonly ADContext _context;

    public LeftLawyersController(ADContext context)
    {
      _context = context;
    }

    // GET: api/LeftLawyers
    //[HttpGet]
    //public IEnumerable<LeftLawyers> GetLeftLawyers()
    //{
    //    return _context.LeftLawyers;
    //}

    // GET: api/LeftLawyers/5
    [HttpGet("{companyProfileID}")]
    public IEnumerable<LeftLawyers> GetLeftLawyers([FromRoute] Guid companyProfileID)
    {
      if (!ModelState.IsValid)
      {
        return null;
      }

      var leftLawyers = _context.LeftLawyers.Where(m => m.CompanyProfileID == companyProfileID);

      if (leftLawyers == null)
      {
        return new List<LeftLawyers>();
      }

      return leftLawyers;
    }

    // PUT: api/LeftLawyers/5
    //[HttpPut("{id}")]
    //public async Task<IActionResult> PutLeftLawyers([FromRoute] Guid id, [FromBody] LeftLawyers leftLawyers)
    //{
    //    if (!ModelState.IsValid)
    //    {
    //        return BadRequest(ModelState);
    //    }

    //    if (id != leftLawyers.LeftLawyerID)
    //    {
    //        return BadRequest();
    //    }

    //    _context.Entry(leftLawyers).State = EntityState.Modified;

    //    try
    //    {
    //        await _context.SaveChangesAsync();
    //    }
    //    catch (DbUpdateConcurrencyException)
    //    {
    //        if (!LeftLawyersExists(id))
    //        {
    //            return NotFound();
    //        }
    //        else
    //        {
    //            throw;
    //        }
    //    }

    //    return NoContent();
    //}

    // POST: api/LeftLawyers
    [HttpPost("{companyProfileID}")]
    public async Task<IActionResult> PostLeftLawyers([FromBody] List<LeftLawyers> leftLawyers, [FromRoute] Guid companyProfileID)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      _context.LeftLawyers.AddRange(leftLawyers);
      await _context.SaveChangesAsync();

      return CreatedAtAction("GetLeftLawyers", new { companyProfileID = companyProfileID }, leftLawyers);
    }

    // DELETE: api/LeftLawyers/5
    //[HttpDelete("{id}")]
    //public async Task<IActionResult> DeleteLeftLawyers([FromRoute] Guid id)
    //{
    //  if (!ModelState.IsValid)
    //  {
    //    return BadRequest(ModelState);
    //  }

    //  var leftLawyers = await _context.LeftLawyers.SingleOrDefaultAsync(m => m.LeftLawyerID == id);
    //  if (leftLawyers == null)
    //  {
    //    return NotFound();
    //  }

    //  _context.LeftLawyers.Remove(leftLawyers);
    //  await _context.SaveChangesAsync();

    //  return Ok(leftLawyers);
    //}



    private bool LeftLawyersExists(Guid id)
    {
      return _context.LeftLawyers.Any(e => e.LeftLawyerID == id);
    }
  }
}
