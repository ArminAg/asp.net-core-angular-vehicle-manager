using System;
using System.Threading.Tasks;
using asp.net_core_angular_vehicle_manager.Controllers.Resources;
using asp.net_core_angular_vehicle_manager.Core.Models;
using asp.net_core_angular_vehicle_manager.Persistence;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace asp.net_core_angular_vehicle_manager.Controllers
{
    [Route("/api/vehicles")]
    public class VehiclesController : Controller
    {
        private readonly IMapper mapper;
        private readonly VehicleManagerDbContext context;
        public VehiclesController(IMapper mapper, VehicleManagerDbContext context)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateVehicle([FromBody] VehicleResource vehicleResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var model = await context.Models.FindAsync(vehicleResource.ModelId);
            if (model == null)
            {
                ModelState.AddModelError("ModelId", "Invalid modelId.");
                return BadRequest(ModelState);
            }

            var vehicle = mapper.Map<VehicleResource, Vehicle>(vehicleResource);
            vehicle.LastUpdate = DateTime.Now;

            context.Vehicles.Add(vehicle);
            await context.SaveChangesAsync();

            var result = mapper.Map<Vehicle, VehicleResource>(vehicle);
            return Ok(result);
        }
    }
}