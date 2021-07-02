using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using astro_world_api.Persistance.Entities;

namespace astro_world_api.Persistance.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
          builder.HasKey(key => key.UserId);
          builder.Property(prop => prop.UserId).UseIdentityColumn();
          builder.Property(prop => prop.FirstName).IsRequired().HasMaxLength(100).IsUnicode();
          builder.Property(prop => prop.LastName).IsRequired().HasMaxLength(100).IsUnicode();
        }
    }
}