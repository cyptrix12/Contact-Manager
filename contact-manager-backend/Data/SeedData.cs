using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;
using ContactManager.Data;
using ContactManager.Models;

namespace ContactManagerBackend.Data
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new AppDbContext(
                serviceProvider.GetRequiredService<DbContextOptions<AppDbContext>>()))
            {
                // Seed Category
                if (!context.Categories.Any())
                {
                    var business = new Category { Name = "business" };
                    var privateCat = new Category { Name = "private" };
                    var other = new Category { Name = "other" };

                    context.Categories.AddRange(business, privateCat, other);
                    context.SaveChanges();

                    // Seed Subcategories only for "business"
                    context.Subcategories.AddRange(
                        new Subcategory { Name = "boss", CategoryId = business.Id },
                        new Subcategory { Name = "client", CategoryId = business.Id }
                    );

                    context.SaveChanges();
                }
            }
        }
    }
}