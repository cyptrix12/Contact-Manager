using Microsoft.AspNetCore.Mvc;
using ContactManager.Data;
using ContactManager.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace ContactManager.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ContactsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/contacts
        [AllowAnonymous]
        [HttpGet]
        public ActionResult<IEnumerable<Contact>> GetAllContacts()
        {
            return Ok(_context.Contacts.ToList());
        }

        // GET: api/contacts/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public ActionResult<Contact> GetContact(int id)
        {
            var contact = _context.Contacts.Find(id);
            if (contact == null)
                return NotFound();

            return Ok(contact);
        }

        // POST: api/contacts
        [Authorize]
        [HttpPost]
        public IActionResult CreateContact(Contact contact)
        {
            _context.Contacts.Add(contact);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetContact), new { id = contact.Id }, contact);
        }

        // PUT: api/contacts/5
        [Authorize]
        [HttpPut("{id}")]
        public IActionResult UpdateContact(int id, Contact updated)
        {
            var contact = _context.Contacts.Find(id);
            if (contact == null)
                return NotFound();

            contact.FirstName = updated.FirstName;
            contact.LastName = updated.LastName;
            contact.Email = updated.Email;
            contact.Password = updated.Password;
            contact.Category = updated.Category;
            contact.Subcategory = updated.Subcategory;
            contact.CategoryId = updated.CategoryId;
            contact.SubcategoryId = updated.SubcategoryId;
            contact.OtherSubcategory = updated.OtherSubcategory;
            contact.Phone = updated.Phone;
            contact.BirthDate = updated.BirthDate;

            _context.SaveChanges();
            return NoContent();
        }

        // DELETE: api/contacts/5
        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult DeleteContact(int id)
        {
            var contact = _context.Contacts.Find(id);
            if (contact == null)
                return NotFound();

            _context.Contacts.Remove(contact);
            _context.SaveChanges();
            return NoContent();
        }

        //[HttpGet("categories")]
        //public ActionResult<IEnumerable<Category>> GetCategories()
        //{
        //    return _context.Categories.Include(c => c.Subcategories).ToList();
        //}

        //[HttpGet("subcategories/{categoryId}")]
        //public ActionResult<IEnumerable<Subcategory>> GetSubcategories(int categoryId)
        //{
        //    return _context.Subcategories.Where(s => s.CategoryId == categoryId).ToList();
        //}
    }
}
