using System.Threading.Tasks;

namespace asp.net_core_angular_vehicle_manager.Core
{
    public interface IUnitOfWork
    {
        Task CompleteAsync();
    }
}