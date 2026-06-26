import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NavbarComponent from "./NavbarComponent";
import Swal from "sweetalert2";
import axios from "axios";
import parse from 'html-react-parser';

const SingleComponent = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/blog/${slug}`)
            .then((response) => setBlog(response.data))
            .catch((err) => {
                Swal.fire({
                    title: "แจ้งเตือน!",
                    text: err.response?.data?.error || "เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์",
                    icon: "error"
                });
            })
            .finally(() => setLoading(false));
    }, [slug]);

    return (
        <div style={{ minHeight: "100vh", background: "#f0f4ff" }}>
            <NavbarComponent />

            <div className="d-flex justify-content-center" style={{ padding: "40px 20px" }}>
                <div style={{
                    background: "#fff", borderRadius: "16px",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
                    padding: "48px", width: "100%", maxWidth: "860px"
                }}>
                    {loading ? (
                        /* Loading Skeleton */
                        <div>
                            <div style={{
                                height: "36px", background: "#f0f0f0",
                                borderRadius: "8px", marginBottom: "16px",
                                animation: "pulse 1.5s infinite"
                            }} />
                            <div style={{
                                height: "16px", background: "#f0f0f0",
                                borderRadius: "8px", width: "40%", marginBottom: "32px",
                                animation: "pulse 1.5s infinite"
                            }} />
                            {[100, 90, 95, 80].map((w, i) => (
                                <div key={i} style={{
                                    height: "14px", background: "#f0f0f0",
                                    borderRadius: "6px", width: `${w}%`,
                                    marginBottom: "12px",
                                    animation: "pulse 1.5s infinite"
                                }} />
                            ))}
                        </div>
                    ) : blog ? (
                        <div>
                            {/* Title */}
                            <h1 style={{
                                fontSize: "2rem", fontWeight: 800,
                                color: "#1a1a2e", lineHeight: 1.3,
                                marginBottom: "16px"
                            }}>
                                {blog.title}
                            </h1>

                            {/* Meta */}
                            <div style={{
                                display: "flex", alignItems: "center", gap: "16px",
                                marginBottom: "32px", flexWrap: "wrap"
                            }}>
                                <div style={{
                                    display: "flex", alignItems: "center", gap: "8px"
                                }}>
                                    <div style={{
                                        width: "36px", height: "36px",
                                        background: "linear-gradient(135deg, #4f8ef7, #6c63ff)",
                                        borderRadius: "50%",
                                        display: "flex", alignItems: "center",
                                        justifyContent: "center",
                                        color: "#fff", fontWeight: 700, fontSize: "14px"
                                    }}>
                                        {blog.author?.charAt(0).toUpperCase()}
                                    </div>
                                    <span style={{ fontWeight: 600, color: "#444" }}>
                                        {blog.author}
                                    </span>
                                </div>
                                <span style={{
                                    color: "#999", fontSize: "14px",
                                    display: "flex", alignItems: "center", gap: "4px"
                                }}>
                                    📅 {new Date(blog.createdAt).toLocaleDateString('th-TH', {
                                        year: 'numeric', month: 'long', day: 'numeric'
                                    })}
                                </span>
                            </div>

                            {/* Divider */}
                            <div style={{
                                height: "3px", marginBottom: "32px",
                                background: "linear-gradient(135deg, #4f8ef7, #6c63ff)",
                                borderRadius: "2px"
                            }} />

                            {/* Content */}
                            <div style={{
                                fontSize: "16px", lineHeight: "1.9",
                                color: "#333"
                            }}
                                className="blog-content"
                            >
                                {parse(blog.content)}
                            </div>
                        </div>
                    ) : (
                        <div style={{ textAlign: "center", padding: "60px 0" }}>
                            <div style={{ fontSize: "48px", marginBottom: "16px" }}>📭</div>
                            <p style={{ color: "#888", fontSize: "16px" }}>ไม่พบบทความนี้</p>
                        </div>
                    )}
                </div>
            </div>

            {/* CSS for content & skeleton */}
            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.4; }
                }
                .blog-content h1, .blog-content h2, .blog-content h3 {
                    color: #1a1a2e;
                    margin-top: 28px;
                    margin-bottom: 12px;
                    font-weight: 700;
                }
                .blog-content p {
                    margin-bottom: 16px;
                }
                .blog-content img {
                    max-width: 100%;
                    border-radius: 10px;
                    margin: 16px 0;
                    box-shadow: 0 4px 16px rgba(0,0,0,0.10);
                }
                .blog-content blockquote {
                    border-left: 4px solid #4f8ef7;
                    margin: 16px 0;
                    padding: 8px 16px;
                    color: #666;
                    background: #f8f9ff;
                    border-radius: 0 8px 8px 0;
                }
                .blog-content pre {
                    background: #1a1a2e;
                    color: #fff;
                    padding: 20px;
                    border-radius: 10px;
                    overflow-x: auto;
                    font-size: 14px;
                }
                .blog-content code {
                    background: #f1f3f5;
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-family: monospace;
                    font-size: 14px;
                    color: #e83e8c;
                }
                .blog-content ul, .blog-content ol {
                    padding-left: 24px;
                    margin-bottom: 16px;
                }
                .blog-content li {
                    margin-bottom: 6px;
                }
                .blog-content a {
                    color: #4f8ef7;
                    text-decoration: underline;
                }
            `}</style>
        </div>
    );
};

export default SingleComponent;