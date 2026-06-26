import { Link } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import parse from 'html-react-parser';
import { getUser, getToken } from "./service/authorize";

function App() {
  const [blogs, setBlogs] = useState([]);

  const fetchdata = async () => {
    axios
    .get(`${process.env.REACT_APP_API}/blogs`)
    .then((response) => {
      setBlogs(response.data);
    })
    .catch((error) => {
      console.error("Error fetching blogs:", error);
      Swal.fire({
        title: "แจ้งเตือน!",
        text: "เกิดข้อผิดพลาดในการดึงข้อมูลบทความ",
        icon: "error"
      });
    });
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const confirmDelete = (slug) => {
    Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: "คุณต้องการลบบทความนี้หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่, ลบเลย!",
      cancelButtonText: "ยกเลิก"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBlog(slug);
      }
    });
  };

  const deleteBlog = async (slug) => {
      try {
          await axios.delete(`${process.env.REACT_APP_API}/blog/${slug}`,
            {headers:
              {authorization:`Bearer ${getToken()}`
            }
          });
          Swal.fire("สำเร็จ!", "ลบบทความเรียบร้อยแล้ว", "success");
          fetchdata(); // Refresh the list of blogs after deletion
      } catch (error) {
          console.error("Error deleting blog:", error);
          Swal.fire({
              title: "แจ้งเตือน!",
              text: error.response?.data?.error || "เกิดข้อผิดพลาดในการลบบทความ",
              icon: "error"
          });
      }
  };

  return (
    <div className="container p-5">
      <NavbarComponent />
      {blogs.map((blog,index) => (
        <div className="row" key={index}>
          <div className="col-pt-3 pb-2">
            <Link to={`/blogs/${blog.slug}`} className="text-decoration-none text-xl font-bold text-blue-600 hover:text-blue-800">
              <h2>{blog.title}</h2>
            </Link>
            {parse(blog.content.substring(0, 200) + "...")}
            <p className="text-muted"> ผู้เขียน: {blog.author}, วันที่โพสต์: {new Date(blog.createdAt).toLocaleDateString()}</p>
            {!getUser() ? null : (
              <>
                <Link className="btn btn-success me-2" to={`/blogs/edit/${blog.slug}`}>
                  แก้ไขบทความ
                </Link>
                <button className="btn btn-danger" onClick={() => confirmDelete(blog.slug)}>
                  ลบ
                </button>              
              </>
            )}
          </div>
          <hr />
        </div>      
      ))}
    </div>
  );
}

export default App;
