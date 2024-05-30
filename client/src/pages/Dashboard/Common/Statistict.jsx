import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useRole from "../../../hooks/useRole";
import AdminStatistics from "../Admin/AdminStatistict";
import GuestStatistics from "../Guest/GuestStatistics";
import HostStatistics from "../Host/HostStatistics";


const Statistict = () => {
    const [role , isLoading ] = useRole()
    if(isLoading) return <LoadingSpinner />
    return (
        <div>
          {role === "admin" && <AdminStatistics></AdminStatistics>}
          {role === "host" && <HostStatistics></HostStatistics>}
          {role === "guest" && <GuestStatistics></GuestStatistics>}
        </div>
    );
};

export default Statistict;