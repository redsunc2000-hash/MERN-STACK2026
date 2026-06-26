import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getToken } from "../service/authorize";

const EditComponent=()=>{
    const { slug } = useParams();
    const [state, setState]=useState({
        title:"",
        author:"",
        slug:""
    })
    const {title, author}=state;
    const [content, setContent]=useState("");
    const submitContent=(e)=>{
        setContent(e)
    }
    // ดึงข้อมมูลที่ต้องการแก้ไขจาก backend โดยใช้ slug จาก URL
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/blog/${slug}`,
            {headers:{
                authorization:`Bearer ${getToken()}`
            }
        })
            .then((response) => {
                const { title, content, author, slug } = response.data;
                setContent(content)
                setState((prevState) => ({
                    ...prevState, 
                    title, 
                    author, 
                    slug 
                }));
            })
            .catch((err) => {
                console.error(err);
                Swal.fire({
                    title: "แจ้งเตือน!",
                    text: err.response?.data?.error || "เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์",
                    icon: "error"
                });
            });
    }, [slug]);


    const showUpdateForm=()=>(
        <form onSubmit={submitForm}>
            <div className="form-group py-2">
                <label>ชื่อบทความ</label>
                <input type="text" className="form-control" 
                value={title} 
                onChange={inputValue('title')}/>
            </div>
            <div className="form-group mb-3">
                <label>รายละเอียด</label>
                <div className="vh-50">
                    <ReactQuill className="pb-5 mb-3" 
                        value={content} 
                        onChange={submitContent}
                        theme="snow"
                        styles={{ border: "1px solid #666" }}
                    ></ReactQuill>                    
                </div>
            </div>     
            <div className="form-group">
                <label>ผู้เขียน</label>
                <input type="text" className="form-control" 
                value={author} 
                onChange={inputValue('author')}/>
            </div>
            <br/>
            <input type="submit" className="btn btn-primary mt-3" value="อัพเดต"/>
        </form>
    )
    // กำหนดค่าให้กับ state ของฟอร์มเมื่อมีการเปลี่ยนแปลงค่าใน input fields
    const inputValue=name=>event=>{
        console.log(name)
        setState({...state, [name]:event.target.value})
    }
    const submitForm=(e)=>{
        e.preventDefault();

        axios.put(`${process.env.REACT_APP_API}/blog/${slug}`, {title, content, author},
            {headers:{
                authorization:`Bearer ${getToken()}`
            }
        })
        .then(response=>{
            Swal.fire({
            title: "แจ้งเตือน!",
            text: "อัพเดตบทความเรียบร้อยแล้ว",
            icon: "success"
            });
            const { title, content, author, slug } = response.data;
            setState({...state, title, content, author, slug }); // กำหนดค่าให้กับ state ของฟอร์ม 
        })
        .catch(err=>{
            console.log(err.response)
            Swal.fire({
            title: "แจ้งเตือน!",
            text: err.response.data.error,
            icon: "error"
            });
        })  
    }


    return(
        <div className="container p-5">
            <NavbarComponent />
            <h1>แก้ไขบทความ</h1>
            {showUpdateForm()}

        </div>
    )
}


export default EditComponent;