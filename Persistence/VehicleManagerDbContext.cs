using asp.net_core_angular_vehicle_manager.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace asp.net_core_angular_vehicle_manager.Persistence
{
    public class VehicleManagerDbContext : DbContext
    {
        public DbSet<Make> Makes { get; set; }
        public DbSet<Model> Models { get; set; }
        public DbSet<Feature> Features { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<VehicleFeature> VehicleFeatures { get; set; }
        public DbSet<Photo> Photos { get; set; }

        public VehicleManagerDbContext(DbContextOptions<VehicleManagerDbContext> options)
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<VehicleFeature>()
                .HasKey(vf => new { vf.VehicleId, vf.FeatureId });
        }
    }
}