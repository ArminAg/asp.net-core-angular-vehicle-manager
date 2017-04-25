using asp.net_core_angular_vehicle_manager.Controllers.Resources;
using asp.net_core_angular_vehicle_manager.Core.Models;
using AutoMapper;

namespace asp.net_core_angular_vehicle_manager.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Make, MakeResource>();
            CreateMap<Model, ModelResource>();
        }
    }
}