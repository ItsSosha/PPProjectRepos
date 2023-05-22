using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataLayer.Migrations
{
    /// <inheritdoc />
    public partial class AddSetNullToCategories : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RawCategories_Categories_CategoryId",
                table: "RawCategories");

            migrationBuilder.AddForeignKey(
                name: "FK_RawCategories_Categories_CategoryId",
                table: "RawCategories",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RawCategories_Categories_CategoryId",
                table: "RawCategories");

            migrationBuilder.AddForeignKey(
                name: "FK_RawCategories_Categories_CategoryId",
                table: "RawCategories",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id");
        }
    }
}
