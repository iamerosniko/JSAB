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
  //[Route("api/FirmDemographics")]
  public class FirmDemographicsController : Controller
  {
    private readonly ADContext _context;

    public FirmDemographicsController(ADContext context)
    {
      _context = context;
    }

    // GET: api/FirmDemographics
    //[HttpGet]
    //public IEnumerable<FirmDemographics> GetFirmDemographics()
    //{
    //    return _context.FirmDemographics;
    //}

    // GET: api/FirmDemographics/5
    [HttpGet("{companyProfileID}")]
    public IEnumerable<FirmDemographics> GetFirmDemographics([FromRoute] Guid companyProfileID)
    {
      if (!ModelState.IsValid)
      {
        return null;
      }

      var firmDemographics = _context.FirmDemographics.Where(m => m.CompanyProfileID == companyProfileID);

      if (firmDemographics == null)
      {
        return new List<FirmDemographics>();
      }

      return firmDemographics;
    }

    // PUT: api/FirmDemographics/5
    //[HttpPut("{id}")]
    //public async Task<IActionResult> PutFirmDemographics([FromRoute] Guid id, [FromBody] FirmDemographics firmDemographics)
    //{
    //    if (!ModelState.IsValid)
    //    {
    //        return BadRequest(ModelState);
    //    }

    //    if (id != firmDemographics.FirmDemographicID)
    //    {
    //        return BadRequest();
    //    }

    //    _context.Entry(firmDemographics).State = EntityState.Modified;

    //    try
    //    {
    //        await _context.SaveChangesAsync();
    //    }
    //    catch (DbUpdateConcurrencyException)
    //    {
    //        if (!FirmDemographicsExists(id))
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

    // POST: api/FirmDemographics
    [HttpPost("{companyProfileID}")]
    public async Task<IActionResult> PostFirmDemographics([FromBody] List<FirmDemographics> firmDemographics, [FromRoute] Guid companyProfileID)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      _context.FirmDemographics.AddRange(firmDemographics);
      await _context.SaveChangesAsync();

      return CreatedAtAction("GetFirmDemographics", new { companyProfileID = companyProfileID }, firmDemographics);
    }

    // DELETE: api/FirmDemographics/5
    //[HttpDelete("{id}")]
    //public async Task<IActionResult> DeleteFirmDemographics([FromRoute] Guid id)
    //{
    //    if (!ModelState.IsValid)
    //    {
    //        return BadRequest(ModelState);
    //    }

    //    var firmDemographics = await _context.FirmDemographics.SingleOrDefaultAsync(m => m.FirmDemographicID == id);
    //    if (firmDemographics == null)
    //    {
    //        return NotFound();
    //    }

    //    _context.FirmDemographics.Remove(firmDemographics);
    //    await _context.SaveChangesAsync();

    //    return Ok(firmDemographics);
    //}

    private bool FirmDemographicsExists(Guid id)
    {
      return _context.FirmDemographics.Any(e => e.FirmDemographicID == id);
    }
  }
}
