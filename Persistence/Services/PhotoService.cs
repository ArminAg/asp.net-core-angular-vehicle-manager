using System;
using System.IO;
using System.Threading.Tasks;
using asp.net_core_angular_vehicle_manager.Core;
using asp.net_core_angular_vehicle_manager.Core.Models;
using asp.net_core_angular_vehicle_manager.Core.Services;
using Microsoft.AspNetCore.Http;

namespace asp.net_core_angular_vehicle_manager.Persistence.Services
{
    public class PhotoService : IPhotoService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IPhotoStorage photoStorage;
        public PhotoService(IUnitOfWork unitOfWork, IPhotoStorage photoStorage)
        {
            this.photoStorage = photoStorage;
            this.unitOfWork = unitOfWork;
        }
        public async Task<Photo> UploadPhoto(Vehicle vehicle, IFormFile file, string uploadsFolderPath)
        {
            var fileName = await photoStorage.StorePhoto(file, uploadsFolderPath);

            var photo = new Photo { FileName = fileName };
            vehicle.Photos.Add(photo);
            await unitOfWork.CompleteAsync();

            return photo;
        }
    }
}