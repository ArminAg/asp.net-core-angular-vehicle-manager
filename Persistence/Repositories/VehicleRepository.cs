using System.Collections.Generic;
using System.Threading.Tasks;
using asp.net_core_angular_vehicle_manager.Core.Models;
using asp.net_core_angular_vehicle_manager.Core.Repositories;
using Microsoft.EntityFrameworkCore;

namespace asp.net_core_angular_vehicle_manager.Persistence.Repositories
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly VehicleManagerDbContext context;
        public VehicleRepository(VehicleManagerDbContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Vehicle>> GetVehicles()
        {
            return await context.Vehicles
                .Include(v => v.Model)
                    .ThenInclude(m => m.Make)
                .Include(v => v.Features)
                    .ThenInclude(vf => vf.Feature)
                .ToListAsync();
        }
        
        public async Task<Vehicle> GetVehicle(int id, bool includeRelated = true)
        {
            if (!includeRelated)
                return await context.Vehicles.FindAsync(id);

            return await context.Vehicles
                .Include(v => v.Features)
                    .ThenInclude(vf => vf.Feature)
                .Include(v => v.Model)
                    .ThenInclude(m => m.Make)
                .SingleOrDefaultAsync(v => v.Id == id);
        }

        public void Add(Vehicle vehicle)
        {
            context.Vehicles.Add(vehicle);
        }

        public void Remove(Vehicle vehicle)
        {
            context.Remove(vehicle);
        }
    }
}