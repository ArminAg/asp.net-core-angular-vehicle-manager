using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using asp.net_core_angular_vehicle_manager.Core.Models;
using asp.net_core_angular_vehicle_manager.Core.Repositories;
using asp.net_core_angular_vehicle_manager.Extensions;
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

        public async Task<QueryResult<Vehicle>> GetVehicles(VehicleQuery queryObj)
        {
            var result = new QueryResult<Vehicle>();

            var query = context.Vehicles
                .Include(v => v.Model)
                    .ThenInclude(m => m.Make)
                .AsQueryable();
            
            query = query.ApplyFiltering(queryObj);
            
            var columnsMap = new Dictionary<string, Expression<Func<Vehicle, object>>>()
            {
                ["make"] = v => v.Model.Make.Name,
                ["model"] = v => v.Model.Name,
                ["contactName"] = v => v.ContactName
            };
            query = query.ApplyOrdering(queryObj, columnsMap);

            result.TotalItems = await query.CountAsync();

            query = query.ApplyPaging(queryObj);

            result.Items = await query.ToListAsync();

            return result;
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