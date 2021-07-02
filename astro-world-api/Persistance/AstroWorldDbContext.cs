using System;
using Microsoft.EntityFrameworkCore;
using astro_world_api.Persistance.Entities;
using astro_world_api.Persistance.Configurations;

namespace astro_world_api.Persistance
{
    public class AstroWorldDbContext : DbContext 
    {
      public AstroWorldDbContext() {}
      public AstroWorldDbContext(DbContextOptions options) : base(options) {}

      public DbSet<Image> Images { get; set; }
      public DbSet<User> Users { get; set; }

      protected override void OnConfiguring(DbContextOptionsBuilder options)
      {
        if (!options.IsConfigured)
        {
          options.UseSqlServer("Name=AstroWorldDbContext");
        }
      }

      protected override void OnModelCreating(ModelBuilder builder)
      {
        builder.ApplyConfigurationsFromAssembly(typeof(ImageConfiguration).Assembly);
      }
    }
}