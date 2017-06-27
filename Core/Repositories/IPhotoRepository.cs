using System.Collections.Generic;
using System.Threading.Tasks;
using asp.net_core_angular_vehicle_manager.Core.Models;

namespace asp.net_core_angular_vehicle_manager.Core.Repositories
{
    public interface IPhotoRepository
    {
         Task<IEnumerable<Photo>> GetPhotos(int vehicleId);
    }
}