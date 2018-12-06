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
  [Route("api/Audits")]
  public class AuditsController : Controller
  {
    private readonly ADContext _context;

    public AuditsController(ADContext context)
    {
      _context = context;
    }

    // GET: api/Audits
    [HttpGet]
    public IEnumerable<Audit> GetAuditTrails()
    {
      return _context.AuditTrails;
    }

    // GET: api/Audits/5
    [HttpGet("{id}")]
    public async Task<IActionResult> GetAudit([FromRoute] Guid id)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var audit = await _context.AuditTrails.SingleOrDefaultAsync(m => m.AuditID == id);

      if (audit == null)
      {
        return NotFound();
      }

      return Ok(audit);
    }

    // POST: api/Audits
    [HttpPost]
    public async Task<IActionResult> PostAudit([FromBody] Audit audit)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      audit.AuditID = Guid.NewGuid();
      audit.DateModified = DateTime.Now;

      _context.AuditTrails.Add(audit);
      await _context.SaveChangesAsync();

      return CreatedAtAction("GetAudit", new { id = audit.AuditID }, audit);
    }

    private bool AuditExists(Guid id)
    {
      return _context.AuditTrails.Any(e => e.AuditID == id);
    }
  }
}
