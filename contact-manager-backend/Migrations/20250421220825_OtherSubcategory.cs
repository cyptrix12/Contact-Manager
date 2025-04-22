using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Contact_Manager.Migrations
{
    /// <inheritdoc />
    public partial class OtherSubcategory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "OtherSubcategory",
                table: "Contacts",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OtherSubcategory",
                table: "Contacts");
        }
    }
}
