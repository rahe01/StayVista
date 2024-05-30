import useRole from "../../../hooks/useRole";
import AdminStatistics from "../Admin/AdminStatistict";


const Statistict = () => {
    const [role ] = useRole()
    return (
        <div>
          {role === "admin" && <AdminStatistics></AdminStatistics>}
        </div>
    );
};

export default Statistict;