using System.ComponentModel.DataAnnotations;

namespace asp.net_core_angular_vehicle_manager.Core.Models
{
    public class Photo
    {
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string FileName { get; set; }
        public int VehicleId { get; set; }
    }
}