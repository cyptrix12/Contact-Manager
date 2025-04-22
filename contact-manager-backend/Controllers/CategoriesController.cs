using Microsoft.AspNetCore.Mvc;
using ContactManager.Data;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly AppDbContext _context;

    public CategoriesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetCategories()
    {
        var categories = _context.Categories.ToList();
        return Ok(categories);
    }

    [HttpGet("{categoryId}/subcategories")]
    public IActionResult GetSubcategories(int categoryId)
    {
        var subcategories = _context.Subcategories
            .Where(s => s.CategoryId == categoryId)
            .ToList();
        return Ok(subcategories);
    }
}
