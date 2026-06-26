import { Navigate, useLocation } from "react-router-dom";
import { getUser } from "../service/authorize";

const AdminRoute = ({ element }) => {
    const location = useLocation();
    return getUser() ? element : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default AdminRoute;
