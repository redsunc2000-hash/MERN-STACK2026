//ชื่อบทความ(title), เนื่อหาบทความ(content), ผู้เขียน(author), slug(url)
const mongoose = require("mongoose")


const blogSchema=mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    content:{
        type:{},
        required:true
    },
    author:{
        type:String,
        default:"Admin"
    },
    slug:{
        type:String,
        lowercase:true, //ตัวพิมพ์ใหญ่ปนกับตัวพิมพ์เล็กมันจะช่วยทำให้เป้นตัวเล็กทั้งหมด
        uniqie:true     //ไม่ซ้ำกัน

    }
},{timestamps:true})
//ส่งออก
module.exports = mongoose.model("Blogs",blogSchema)