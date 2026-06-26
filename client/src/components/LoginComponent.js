import NavbarComponent from "./NavbarComponent";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { authenticate } from "../service/authorize";
import { useNavigate } from "react-router-dom";
import { getUser } from "../service/authorize";

const LoginComponent = () => {
    const navigate = useNavigate();
    const [state, setState] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState(false);
    const { username, password } = state;

    const inputValue = name => event => {
        setState({ ...state, [name]: event.target.value });
    };

    const submitForm = (e) => {
        e.preventDefault();
        setLoading(true);
        axios
            .post(`${process.env.REACT_APP_API}/login`, { username, password })
            .then(response => {
                authenticate(response, () => navigate("/create"));
            })
            .catch(err => {
                Swal.fire({
                    title: "แจ้งเตือน!",
                    text: err.response.data.error,
                    icon: "error"
                });
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        if (getUser()) navigate("/");
    }, [navigate]);

    return (
        <div style={{ minHeight: "100vh", background: "#f0f4ff" }}>
            <NavbarComponent />

            <div className="d-flex justify-content-center align-items-center" 
                 style={{ minHeight: "calc(100vh - 60px)", padding: "20px" }}>
                
                <div style={{
                    background: "#fff",
                    borderRadius: "16px",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
                    padding: "48px 40px",
                    width: "100%",
                    maxWidth: "420px"
                }}>
                    {/* Icon */}
                    <div className="text-center mb-4">
                        <div style={{
                            width: "64px", height: "64px",
                            background: "linear-gradient(135deg, #4f8ef7, #6c63ff)",
                            borderRadius: "16px",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: "16px"
                        }}>
                            <svg width="32" height="32" fill="white" viewBox="0 0 24 24">
                                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                            </svg>
                        </div>
                        <h2 style={{ fontWeight: 700, color: "#1a1a2e", marginBottom: "4px" }}>
                            เข้าสู่ระบบ
                        </h2>
                        <p style={{ color: "#888", fontSize: "14px" }}>
                            กรุณากรอกข้อมูลเพื่อเข้าใช้งาน
                        </p>
                    </div>

                    <form onSubmit={submitForm}>
                        {/* Username */}
                        <div className="mb-3">
                            <label style={{ fontWeight: 600, color: "#444", fontSize: "14px", marginBottom: "6px" }}>
                                ชื่อผู้ใช้
                            </label>
                            <div style={{ position: "relative" }}>
                                <span style={{
                                    position: "absolute", left: "12px", top: "50%",
                                    transform: "translateY(-50%)", color: "#aaa"
                                }}>
                                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={inputValue('username')}
                                    placeholder="กรอกชื่อผู้ใช้"
                                    style={{
                                        width: "100%", padding: "12px 12px 12px 40px",
                                        border: "2px solid #e8e8e8", borderRadius: "10px",
                                        fontSize: "15px", outline: "none",
                                        transition: "border-color 0.2s",
                                    }}
                                    onFocus={e => e.target.style.borderColor = "#4f8ef7"}
                                    onBlur={e => e.target.style.borderColor = "#e8e8e8"}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="mb-4">
                            <label style={{ fontWeight: 600, color: "#444", fontSize: "14px", marginBottom: "6px" }}>
                                รหัสผ่าน
                            </label>
                            <div style={{ position: "relative" }}>
                                <span style={{
                                    position: "absolute", left: "12px", top: "50%",
                                    transform: "translateY(-50%)", color: "#aaa"
                                }}>
                                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18 8h-1V6c0-2.8-2.2-5-5-5S7 3.2 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.7 1.4-3.1 3.1-3.1 1.7 0 3.1 1.4 3.1 3.1v2z"/>
                                    </svg>
                                </span>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={inputValue('password')}
                                    placeholder="กรอกรหัสผ่าน"
                                    style={{
                                        width: "100%", padding: "12px 12px 12px 40px",
                                        border: "2px solid #e8e8e8", borderRadius: "10px",
                                        fontSize: "15px", outline: "none",
                                        transition: "border-color 0.2s",
                                    }}
                                    onFocus={e => e.target.style.borderColor = "#4f8ef7"}
                                    onBlur={e => e.target.style.borderColor = "#e8e8e8"}
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: "100%", padding: "13px",
                                background: loading ? "#a0b4f0" : "linear-gradient(135deg, #4f8ef7, #6c63ff)",
                                color: "#fff", border: "none",
                                borderRadius: "10px", fontSize: "16px",
                                fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
                                transition: "opacity 0.2s",
                                letterSpacing: "0.5px"
                            }}
                        >
                            {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;