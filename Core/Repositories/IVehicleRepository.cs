using System.Collections.Generic;
using System.Threading.Tasks;
using asp.net_core_angular_vehicle_manager.Core.Models;

namespace asp.net_core_angular_vehicle_manager.Core.Repositories
{
    public interface IVehicleRepository
    {
        Task<IEnumerable<Vehicle>> GetVehicles();
        Task<Vehicle> GetVehicle(int id, bool includeRelated = true);
        void Add(Vehicle vehicle);
        void Remove(Vehicle vehicle);
    }
}