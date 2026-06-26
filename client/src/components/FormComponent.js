import { useState, useRef } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import { getUser, getToken } from "../service/authorize";
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'

// ---- MenuBar ----
const MenuBar = ({ editor }) => {
    const fileInputRef = useRef(null)
    if (!editor) return null

    const addImage = (e) => {
        const file = e.target.files[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = (event) => {
            editor.chain().focus().setImage({ src: event.target.result }).run()
        }
        reader.readAsDataURL(file)
        e.target.value = ""
    }

    const btn = (active) => ({
        padding: "5px 10px", margin: "2px",
        borderRadius: "6px", border: "1px solid #ddd",
        background: active ? "#4f8ef7" : "#fff",
        color: active ? "#fff" : "#333",
        cursor: "pointer", fontSize: "13px",
        fontWeight: active ? 700 : 400,
        transition: "all 0.15s"
    })

    return (
        <div style={{
            display: "flex", flexWrap: "wrap", alignItems: "center",
            padding: "8px 10px", background: "#f8f9fa",
            borderBottom: "2px solid #e8e8e8",
            borderRadius: "10px 10px 0 0"
        }}>
            <button type="button" style={btn(editor.isActive('bold'))}
                onClick={() => editor.chain().focus().toggleBold().run()}><b>B</b></button>
            <button type="button" style={btn(editor.isActive('italic'))}
                onClick={() => editor.chain().focus().toggleItalic().run()}><i>I</i></button>
            <button type="button" style={btn(editor.isActive('underline'))}
                onClick={() => editor.chain().focus().toggleUnderline().run()}><u>U</u></button>
            <button type="button" style={btn(editor.isActive('strike'))}
                onClick={() => editor.chain().focus().toggleStrike().run()}><s>S</s></button>

            <span style={{ borderLeft: "1px solid #ddd", margin: "0 6px", height: "24px" }} />

            {[1, 2, 3].map(level => (
                <button key={level} type="button"
                    style={btn(editor.isActive('heading', { level }))}
                    onClick={() => editor.chain().focus().toggleHeading({ level }).run()}>
                    H{level}
                </button>
            ))}

            <span style={{ borderLeft: "1px solid #ddd", margin: "0 6px", height: "24px" }} />

            <button type="button" style={btn(editor.isActive({ textAlign: 'left' }))}
                onClick={() => editor.chain().focus().setTextAlign('left').run()}>◀</button>
            <button type="button" style={btn(editor.isActive({ textAlign: 'center' }))}
                onClick={() => editor.chain().focus().setTextAlign('center').run()}>▶◀</button>
            <button type="button" style={btn(editor.isActive({ textAlign: 'right' }))}
                onClick={() => editor.chain().focus().setTextAlign('right').run()}>▶</button>

            <span style={{ borderLeft: "1px solid #ddd", margin: "0 6px", height: "24px" }} />

            <button type="button" style={btn(editor.isActive('bulletList'))}
                onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</button>
            <button type="button" style={btn(editor.isActive('orderedList'))}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</button>
            <button type="button" style={btn(editor.isActive('blockquote'))}
                onClick={() => editor.chain().focus().toggleBlockquote().run()}>" Quote</button>
            <button type="button" style={btn(editor.isActive('codeBlock'))}
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}>&lt;/&gt;</button>

            <span style={{ borderLeft: "1px solid #ddd", margin: "0 6px", height: "24px" }} />

            {/* Image Upload */}
            <button type="button"
                onClick={() => fileInputRef.current.click()}
                style={{
                    ...btn(false),
                    background: "#e8f4fd", color: "#4f8ef7",
                    border: "1px solid #4f8ef7", fontWeight: 600
                }}>
                🖼 แทรกรูป
            </button>
            <input type="file" accept="image/*" ref={fileInputRef}
                onChange={addImage} style={{ display: "none" }} />

            <span style={{ borderLeft: "1px solid #ddd", margin: "0 6px", height: "24px" }} />

            <button type="button" style={btn(false)}
                onClick={() => editor.chain().focus().undo().run()}>↩ Undo</button>
            <button type="button" style={btn(false)}
                onClick={() => editor.chain().focus().redo().run()}>↪ Redo</button>
        </div>
    )
}

// ---- FormComponent ----
const FormComponent = () => {
    const [state, setState] = useState({
        title: "",
        author: getUser()
    })
    const { title, author } = state
    const [content, setContent] = useState("")

    const inputValue = name => event => {
        setState({ ...state, [name]: event.target.value })
    }

    const editor = useEditor({
        extensions: [
            StarterKit,
            Image.configure({ inline: false, allowBase64: true }),
            Underline,
            Link,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        content: content,
        onUpdate: ({ editor }) => {
            setContent(editor.getHTML())
        },
    })

    const submitForm = (e) => {
        e.preventDefault()
        console.table({ title, content, author })
        axios
            .post(`${process.env.REACT_APP_API}/create`,
                { title, content, author },
                { headers: { authorization: `Bearer ${getToken()}` } }
            )
            .then(response => {
                Swal.fire({
                    title: "แจ้งเตือน!",
                    text: "บันทึกบทความเรียบร้อยแล้ว",
                    icon: "success"
                })
                setState({ title: "", author: getUser() })
                setContent("")
                editor.commands.clearContent()
            })
            .catch(err => {
                Swal.fire({
                    title: "แจ้งเตือน!",
                    text: err.response.data.error,
                    icon: "error"
                })
            })
    }

    const inputStyle = {
        width: "100%", padding: "12px 16px",
        border: "2px solid #e8e8e8", borderRadius: "10px",
        fontSize: "15px", outline: "none",
        transition: "border-color 0.2s",
        boxSizing: "border-box"
    }

    return (
        <div style={{ minHeight: "100vh", background: "#f0f4ff" }}>
            <NavbarComponent />

            <div className="d-flex justify-content-center" style={{ padding: "40px 20px" }}>
                <div style={{
                    background: "#fff", borderRadius: "16px",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
                    padding: "40px", width: "100%", maxWidth: "900px"
                }}>
                    <h2 style={{ fontWeight: 700, color: "#1a1a2e", marginBottom: "28px" }}>
                        ✏️ เขียนบทความ
                    </h2>

                    <form onSubmit={submitForm}>
                        {/* ชื่อบทความ */}
                        <div className="mb-4">
                            <label style={{ fontWeight: 600, color: "#444", fontSize: "14px", marginBottom: "6px", display: "block" }}>
                                ชื่อบทความ
                            </label>
                            <input type="text" value={title}
                                onChange={inputValue('title')}
                                placeholder="กรอกชื่อบทความ..."
                                style={inputStyle}
                                onFocus={e => e.target.style.borderColor = "#4f8ef7"}
                                onBlur={e => e.target.style.borderColor = "#e8e8e8"}
                            />
                        </div>

                        {/* TipTap Editor */}
                        <div className="mb-4">
                            <label style={{ fontWeight: 600, color: "#444", fontSize: "14px", marginBottom: "6px", display: "block" }}>
                                รายละเอียด
                            </label>
                            <div style={{
                                border: "2px solid #e8e8e8", borderRadius: "10px",
                                overflow: "hidden", minHeight: "380px"
                            }}>
                                <MenuBar editor={editor} />
                                <EditorContent
                                    editor={editor}
                                    style={{ padding: "16px", minHeight: "320px", fontSize: "15px", lineHeight: "1.7" }}
                                />
                            </div>
                        </div>

                        {/* ผู้เขียน */}
                        <div className="mb-4">
                            <label style={{ fontWeight: 600, color: "#444", fontSize: "14px", marginBottom: "6px", display: "block" }}>
                                ผู้เขียน
                            </label>
                            <input type="text" value={author}
                                onChange={inputValue('author')}
                                style={inputStyle}
                                onFocus={e => e.target.style.borderColor = "#4f8ef7"}
                                onBlur={e => e.target.style.borderColor = "#e8e8e8"}
                            />
                        </div>

                        <button type="submit" style={{
                            padding: "12px 36px",
                            background: "linear-gradient(135deg, #4f8ef7, #6c63ff)",
                            color: "#fff", border: "none", borderRadius: "10px",
                            fontSize: "16px", fontWeight: 700, cursor: "pointer",
                            boxShadow: "0 4px 15px rgba(79,142,247,0.4)"
                        }}>
                            💾 บันทึกบทความ
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default FormComponent;