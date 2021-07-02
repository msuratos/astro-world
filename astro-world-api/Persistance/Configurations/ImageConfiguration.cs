using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using astro_world_api.Persistance.Entities;

namespace astro_world_api.Persistance.Configurations
{
    public class ImageConfiguration : IEntityTypeConfiguration<Image>
    {
        public void Configure(EntityTypeBuilder<Image> builder)
        {
          builder.HasKey(key => key.ImageId);
          builder.Property(prop => prop.ImageId).UseIdentityColumn();
          builder.Property(prop => prop.PathStored).IsRequired().HasMaxLength(100).IsUnicode();

          builder.HasOne<User>().WithMany(m => m.Images).HasForeignKey(fk => fk.FkUserId);
        }
    }
}