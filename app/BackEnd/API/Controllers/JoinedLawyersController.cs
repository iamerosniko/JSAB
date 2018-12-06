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
  //[Route("api/JoinedLawyers")]
  public class JoinedLawyersController : Controller
  {
    private readonly ADContext _context;

    public JoinedLawyersController(ADContext context)
    {
      _context = context;
    }

    // GET: api/JoinedLawyers
    //[HttpGet]
    //public IEnumerable<JoinedLawyers> GetJoinedLawyers()
    //{
    //    return _context.JoinedLawyers;
    //}

    // GET: api/JoinedLawyers/5
    [HttpGet("{companyProfileID}")]
    public IEnumerable<JoinedLawyers> GetJoinedLawyers([FromRoute] Guid companyProfileID)
    {
      if (!ModelState.IsValid)
      {
        return null;
      }

      var joinedLawyers = _context.JoinedLawyers.Where(m => m.CompanyProfileID == companyProfileID);

      if (joinedLawyers == null)
      {
        return new List<JoinedLawyers>();
      }

      return joinedLawyers;
    }

    // PUT: api/JoinedLawyers/5
    //[HttpPut("{id}")]
    //public async Task<IActionResult> PutJoinedLawyers([FromRoute] Guid id, [FromBody] JoinedLawyers joinedLawyers)
    //{
    //    if (!ModelState.IsValid)
    //    {
    //        return BadRequest(ModelState);
    //    }

    //    if (id != joinedLawyers.JoinedLawyerID)
    //    {
    //        return BadRequest();
    //    }

    //    _context.Entry(joinedLawyers).State = EntityState.Modified;

    //    try
    //    {
    //        await _context.SaveChangesAsync();
    //    }
    //    catch (DbUpdateConcurrencyException)
    //    {
    //        if (!JoinedLawyersExists(id))
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

    // POST: api/JoinedLawyers
    [HttpPost("{companyProfileID}")]
    public async Task<IActionResult> PostJoinedLawyers([FromBody] List<JoinedLawyers> joinedLawyers, [FromRoute] Guid companyProfileID)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      _context.JoinedLawyers.AddRange(joinedLawyers);
      await _context.SaveChangesAsync();

      return CreatedAtAction("GetJoinedLawyers", new { companyProfileID = companyProfileID }, joinedLawyers);
    }

    // DELETE: api/JoinedLawyers/5
    //[HttpDelete("{id}")]
    //public async Task<IActionResult> DeleteJoinedLawyers([FromRoute] Guid id)
    //{
    //    if (!ModelState.IsValid)
    //    {
    //        return BadRequest(ModelState);
    //    }

    //    var joinedLawyers = await _context.JoinedLawyers.SingleOrDefaultAsync(m => m.JoinedLawyerID == id);
    //    if (joinedLawyers == null)
    //    {
    //        return NotFound();
    //    }

    //    _context.JoinedLawyers.Remove(joinedLawyers);
    //    await _context.SaveChangesAsync();

    //    return Ok(joinedLawyers);
    //}

    private bool JoinedLawyersExists(Guid id)
    {
      return _context.JoinedLawyers.Any(e => e.JoinedLawyerID == id);
    }
  }
}
