using System;
using System.Threading.Tasks;
using asp.net_core_angular_vehicle_manager.Core;

namespace asp.net_core_angular_vehicle_manager.Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly VehicleManagerDbContext context;
        public UnitOfWork(VehicleManagerDbContext context)
        {
            this.context = context;
        }

        public async Task CompleteAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}