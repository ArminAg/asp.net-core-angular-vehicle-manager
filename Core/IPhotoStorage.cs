using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace asp.net_core_angular_vehicle_manager.Core
{
    public interface IPhotoStorage
    {
         Task<string> StorePhoto(IFormFile file, string uploadsFolderPath);
    }
}