import { Link, useLocation } from "react-router-dom";
import { getUser } from "../service/authorize";

const NavbarComponent = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const linkStyle = (path) => ({
        padding: "8px 18px",
        borderRadius: "8px",
        fontWeight: 600,
        fontSize: "14px",
        textDecoration: "none",
        transition: "all 0.2s",
        background: isActive(path) ? "linear-gradient(135deg, #4f8ef7, #6c63ff)" : "transparent",
        color: isActive(path) ? "#fff" : "#555",
    });

    return (
        <nav style={{
            background: "#fff",
            boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
            padding: "0 32px",
            position: "sticky",
            top: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "64px"
        }}>
            {/* Logo */}
            <Link to="/" style={{ textDecoration: "none" }}>
                <span style={{
                    fontWeight: 800, fontSize: "20px",
                    background: "linear-gradient(135deg, #4f8ef7, #6c63ff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                }}>
                    ✍️ MyBlog
                </span>
            </Link>

            {/* Links */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Link to="/" style={linkStyle("/")}>หน้าแรก</Link>

                {getUser() && (
                    <Link to="/create" style={linkStyle("/create")}>เขียนบทความ</Link>
                )}

                {!getUser() ? (
                    <Link to="/login" style={{
                        ...linkStyle("/login"),
                        background: isActive("/login")
                            ? "linear-gradient(135deg, #4f8ef7, #6c63ff)"
                            : "linear-gradient(135deg, #4f8ef7, #6c63ff)",
                        color: "#fff",
                        padding: "8px 20px",
                        borderRadius: "8px"
                    }}>
                        เข้าสู่ระบบ
                    </Link>
                ) : (
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        {/* Avatar */}
                        <div style={{
                            width: "34px", height: "34px",
                            background: "linear-gradient(135deg, #4f8ef7, #6c63ff)",
                            borderRadius: "50%",
                            display: "flex", alignItems: "center",
                            justifyContent: "center",
                            color: "#fff", fontWeight: 700, fontSize: "14px"
                        }}>
                            {getUser()?.charAt(0).toUpperCase()}
                        </div>
                        <span style={{ fontWeight: 600, color: "#444", fontSize: "14px" }}>
                            {getUser()}
                        </span>
                        <Link to="/logout" style={{
                            padding: "7px 16px", borderRadius: "8px",
                            background: "#fff3f3", color: "#e74c3c",
                            fontWeight: 600, fontSize: "14px",
                            textDecoration: "none", border: "1px solid #ffd0d0",
                            transition: "all 0.2s"
                        }}>
                            ออกจากระบบ
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavbarComponent;
