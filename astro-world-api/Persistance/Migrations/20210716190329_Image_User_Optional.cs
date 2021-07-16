using Microsoft.EntityFrameworkCore.Migrations;

namespace astro_world_api.Persistance.Migrations
{
    public partial class Image_User_Optional : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_Users_FkUserId",
                table: "Images");

            migrationBuilder.DropForeignKey(
                name: "FK_Images_Users_UserId1",
                table: "Images");

            migrationBuilder.DropIndex(
                name: "IX_Images_UserId1",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "Images");

            migrationBuilder.AlterColumn<int>(
                name: "FkUserId",
                table: "Images",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Users_FkUserId",
                table: "Images",
                column: "FkUserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_Users_FkUserId",
                table: "Images");

            migrationBuilder.AlterColumn<int>(
                name: "FkUserId",
                table: "Images",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserId1",
                table: "Images",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Images_UserId1",
                table: "Images",
                column: "UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Users_FkUserId",
                table: "Images",
                column: "FkUserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Users_UserId1",
                table: "Images",
                column: "UserId1",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
