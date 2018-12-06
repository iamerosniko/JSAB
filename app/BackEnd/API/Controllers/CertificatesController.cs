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
  //[Route("api/Certificates")]
  public class CertificatesController : Controller
  {
    private readonly ADContext _context;

    public CertificatesController(ADContext context)
    {
      _context = context;
    }

    // GET: api/Certificates
    //[HttpGet]
    //public IEnumerable<Certificates> GetCertificates()
    //{
    //    return _context.Certificates;
    //}

    // GET: api/Certificates/5
    [HttpGet("{companyProfileID}")]
    //public IEnumerable<Certificates> GetCertificates([FromRoute] Guid companyProfileID)
    public IEnumerable<Certificates> GetCertificates([FromRoute] Guid companyProfileID)
    {
      if (!ModelState.IsValid)
      {
        return null;
      }

      var certificates = _context.Certificates.Where(m => m.CompanyProfileID == companyProfileID);

      if (certificates == null)
      {
        return new List<Certificates>();
      }

      return certificates;
    }

    // PUT: api/Certificates/5
    //[HttpPut("{id}")]
    //public async Task<IActionResult> PutCertificates([FromRoute] Guid id, [FromBody] Certificates certificates)
    //{
    //  if (!ModelState.IsValid)
    //  {
    //    return BadRequest(ModelState);
    //  }

    //  if (id != certificates.CertificateID)
    //  {
    //    return BadRequest();
    //  }

    //  _context.Entry(certificates).State = EntityState.Modified;

    //  try
    //  {
    //    await _context.SaveChangesAsync();
    //  }
    //  catch (DbUpdateConcurrencyException)
    //  {
    //    if (!CertificatesExists(id))
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

    // POST: api/Certificates
    [HttpPost("{companyProfileID}")]
    public async Task<IActionResult> PostCertificates([FromBody]List<Certificates> certificates, [FromRoute] Guid companyProfileID)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      _context.Certificates.AddRange(certificates);
      await _context.SaveChangesAsync();

      return CreatedAtAction("GetCertificates", new { companyProfileID = companyProfileID }, certificates);
    }

    // DELETE: api/Certificates/5
    //[HttpDelete("{id}")]
    //public async Task<IActionResult> DeleteCertificates([FromRoute] Guid id)
    //{
    //  if (!ModelState.IsValid)
    //  {
    //    return BadRequest(ModelState);
    //  }

    //  var certificates = await _context.Certificates.SingleOrDefaultAsync(m => m.CertificateID == id);
    //  if (certificates == null)
    //  {
    //    return NotFound();
    //  }

    //  _context.Certificates.Remove(certificates);
    //  await _context.SaveChangesAsync();

    //  return Ok(certificates);
    //}

    private bool CertificatesExists(Guid id)
    {
      return _context.Certificates.Any(e => e.CertificateID == id);
    }
  }
}
