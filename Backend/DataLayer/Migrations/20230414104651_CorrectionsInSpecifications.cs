using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataLayer.Migrations
{
    /// <inheritdoc />
    public partial class CorrectionsInSpecifications : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Specifications_Items_ItemId",
                table: "Specifications");

            migrationBuilder.RenameColumn(
                name: "ItemId",
                table: "Specifications",
                newName: "RawItemId");

            migrationBuilder.RenameIndex(
                name: "IX_Specifications_ItemId",
                table: "Specifications",
                newName: "IX_Specifications_RawItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_Specifications_RawItems_RawItemId",
                table: "Specifications",
                column: "RawItemId",
                principalTable: "RawItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Specifications_RawItems_RawItemId",
                table: "Specifications");

            migrationBuilder.RenameColumn(
                name: "RawItemId",
                table: "Specifications",
                newName: "ItemId");

            migrationBuilder.RenameIndex(
                name: "IX_Specifications_RawItemId",
                table: "Specifications",
                newName: "IX_Specifications_ItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_Specifications_Items_ItemId",
                table: "Specifications",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
