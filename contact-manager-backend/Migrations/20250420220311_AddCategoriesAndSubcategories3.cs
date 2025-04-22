using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Contact_Manager.Migrations
{
    /// <inheritdoc />
    public partial class AddCategoriesAndSubcategories3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "Contacts");

            migrationBuilder.DropColumn(
                name: "Subcategory",
                table: "Contacts");

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "Contacts",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SubcategoryId",
                table: "Contacts",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Contacts_CategoryId",
                table: "Contacts",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Contacts_SubcategoryId",
                table: "Contacts",
                column: "SubcategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Contacts_Categories_CategoryId",
                table: "Contacts",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Contacts_Subcategories_SubcategoryId",
                table: "Contacts",
                column: "SubcategoryId",
                principalTable: "Subcategories",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contacts_Categories_CategoryId",
                table: "Contacts");

            migrationBuilder.DropForeignKey(
                name: "FK_Contacts_Subcategories_SubcategoryId",
                table: "Contacts");

            migrationBuilder.DropIndex(
                name: "IX_Contacts_CategoryId",
                table: "Contacts");

            migrationBuilder.DropIndex(
                name: "IX_Contacts_SubcategoryId",
                table: "Contacts");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Contacts");

            migrationBuilder.DropColumn(
                name: "SubcategoryId",
                table: "Contacts");

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Contacts",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Subcategory",
                table: "Contacts",
                type: "TEXT",
                nullable: true);
        }
    }
}
