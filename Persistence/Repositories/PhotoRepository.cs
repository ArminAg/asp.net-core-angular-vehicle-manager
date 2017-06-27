using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using asp.net_core_angular_vehicle_manager.Core.Models;
using asp.net_core_angular_vehicle_manager.Core.Repositories;
using Microsoft.EntityFrameworkCore;

namespace asp.net_core_angular_vehicle_manager.Persistence.Repositories
{
    public class PhotoRepository : IPhotoRepository
    {
        private readonly VehicleManagerDbContext context;
        public PhotoRepository(VehicleManagerDbContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Photo>> GetPhotos(int vehicleId)
        {
            return await context.Photos
                .Where(p => p.VehicleId == vehicleId)
                .ToListAsync();
        }
    }
}