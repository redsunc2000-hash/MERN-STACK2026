import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../service/authorize";

const LogoutComponent = () => {
    const navigate = useNavigate();

    useEffect(() => {
        logout(() => navigate("/login"));
    }, [navigate]);

    return null;
}

export default LogoutComponent;
