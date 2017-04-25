using Microsoft.EntityFrameworkCore;

namespace asp.net_core_angular_vehicle_manager.Persistence
{
    public class VehicleManagerDbContext : DbContext
    {
        public VehicleManagerDbContext(DbContextOptions<VehicleManagerDbContext> options)
            : base(options)
        {
            
        }   
    }
}