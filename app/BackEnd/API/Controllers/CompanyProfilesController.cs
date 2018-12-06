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
  [Route("api/CompanyProfiles")]
  public class CompanyProfilesController : Controller
  {
    private readonly ADContext _context;

    public CompanyProfilesController(ADContext context)
    {
      _context = context;
    }

    // GET: api/CompanyProfiles
    [HttpGet]
    public IEnumerable<CompanyProfiles> GetCompanyProfiles()
    {
      return _context.CompanyProfiles;
    }

    // GET: api/CompanyProfiles/5
    [HttpGet("{firmID}")]
    public IEnumerable<CompanyProfiles> GetCompanyProfiles([FromRoute] Guid firmID)
    {
      if (!ModelState.IsValid)
      {
        return null;
      }

      var companyProfiles = _context.CompanyProfiles.Where(m => m.FirmID == firmID);

      if (companyProfiles == null)
      {
        return new List<CompanyProfiles>();
      }

      return companyProfiles;
    }

    // PUT: api/CompanyProfiles/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutCompanyProfiles([FromRoute] Guid id, [FromBody] CompanyProfiles companyProfiles)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      if (id != companyProfiles.CompanyProfileID)
      {
        return BadRequest();
      }

      _context.Entry(companyProfiles).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!CompanyProfilesExists(id))
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

    // POST: api/CompanyProfiles
    [HttpPost]
    public async Task<IActionResult> PostCompanyProfiles([FromBody] CompanyProfiles companyProfiles)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      _context.CompanyProfiles.Add(companyProfiles);
      await _context.SaveChangesAsync();

      return CreatedAtAction("GetCompanyProfiles", new { id = companyProfiles.CompanyProfileID }, companyProfiles);
    }

    // DELETE: api/CompanyProfiles/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCompanyProfiles([FromRoute] Guid id)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var companyProfiles = await _context.CompanyProfiles.SingleOrDefaultAsync(m => m.CompanyProfileID == id);
      if (companyProfiles == null)
      {
        return NotFound();
      }

      _context.CompanyProfiles.Remove(companyProfiles);
      await _context.SaveChangesAsync();

      return Ok(companyProfiles);
    }

    private bool CompanyProfilesExists(Guid id)
    {
      return _context.CompanyProfiles.Any(e => e.CompanyProfileID == id);
    }
  }
}
