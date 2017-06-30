using System.Threading.Tasks;
using asp.net_core_angular_vehicle_manager.Core.Models;
using Microsoft.AspNetCore.Http;

namespace asp.net_core_angular_vehicle_manager.Core.Services
{
    public interface IPhotoService
    {
        Task<Photo> UploadPhoto(Vehicle vehicle, IFormFile file, string uploadsFolderPath);
    }
}