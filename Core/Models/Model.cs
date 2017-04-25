using System.ComponentModel.DataAnnotations;

namespace asp.net_core_angular_vehicle_manager.Core.Models
{
    public class Model
    {
        public int Id { get; set; }
        [Required]
        [StringLength(255)]
        public string Name { get; set; }
        public Make Make { get; set; }
        public int MakeId { get; set; }
    }
}