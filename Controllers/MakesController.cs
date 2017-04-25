using System.Collections.Generic;
using System.Threading.Tasks;
using asp.net_core_angular_vehicle_manager.Controllers.Resources;
using asp.net_core_angular_vehicle_manager.Core.Models;
using asp.net_core_angular_vehicle_manager.Persistence;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace asp.net_core_angular_vehicle_manager.Controllers
{
    public class MakesController : Controller
    {
        private readonly VehicleManagerDbContext context;
        private readonly IMapper mapper;
        public MakesController(VehicleManagerDbContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;
        }

        [HttpGet("/api/makes")]
        public async Task<IEnumerable<MakeResource>> GetMakes()
        {
            var makes = await context.Makes.Include(m => m.Models).ToListAsync(); 
            return mapper.Map<List<Make>, List<MakeResource>>(makes);
        }
    }
}