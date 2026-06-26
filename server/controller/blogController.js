//หน้านี้ใช้ติดต่อกับฐานข้อมูล และเกี่ยวกับการคำนวนหรือกิจกรรมใดๆ ก่อนติดต่อกับฐานข้อมูล
const slugify = require("slugify")
const Blogs = require("../models/blogs")
const {v4: uuidv4} = require("uuid")

//เมื่อมีข้อมูลจาก route/blogs มา ก็จะวิ่งเข้ามาทำงานที่นี้
exports.create=(req,res)=>{
    const {title,content,author}=req.body
    let slug = slugify(title) 

    //ตรวจสอบข้อมูลว่าเป็นค่าว่างหรือไม่ ก่อนส่งออก
    if(!slug) slug = uuidv4() //หากไม่มีชื่อบทความก็จะสร้างชื่อบทความแบบสุ่ม

    switch(true){
        case !title:
            return res.status(400).json({error:"กรุณาป้อนชื่อบทความ"})
            break
        case !content:
            return res.status(400).json({error:"กรุณาป้อนเนื่อหาบทความ"})
    }

    //บันทึกข้อมูล
    Blogs.create({ title, content, author, slug })
        .then((blog) => {
            res.json(blog)
        })
        .catch((err) => {
            res.status(400).json({ error: "มีข้อมูลซ้ำในระบบ" })
        })
}

exports.getallblogs = (req, res) => {
    Blogs.find({})
        .then((blogs) => {
            res.json(blogs)
        })
        .catch((err) => {
            res.status(400).json({ error: "ไม่สามารถดึงข้อมูลบทความได้" })
        })
}

exports.singleBlog = (req, res) => {
    const { slug } = req.params
    Blogs.findOne({ slug })
        .then((blog) => {
            if (!blog) {
                return res.status(404).json({ error: "ไม่พบบทความที่ค้นหา" })
            }
            res.json(blog)
        })
        .catch((err) => {
            res.status(400).json({ error: "ไม่สามารถดึงข้อมูลบทความได้" })
        })
}

exports.remove = (req, res) => {
    const { slug } = req.params
    Blogs.findOneAndDelete({ slug })
        .then((blog) => {
            if (!blog) {
                return res.status(404).json({ error: "ไม่พบบทความที่ต้องการลบ" })
            }
            res.json({ message: "ลบบทความเรียบร้อยแล้ว" })
        })
        .catch((err) => {
            res.status(400).json({ error: "ไม่สามารถลบบทความได้" })
        })
}


exports.update = (req, res) => {
    const { slug } = req.params
    // ส่งข้อมูลที่ต้องการอัปเดตมาจาก body ของ request
    const { title, content, author } = req.body
    Blogs.findOneAndUpdate(
        { slug },
        { title, content, author },
        { returnDocument: 'after' } // คืนค่าเอกสารหลังจากอัปเดต
    )
    .then((blog) => {
        if (!blog) {
            return res.status(404).json({ error: "ไม่พบบทความที่ต้องการอัปเดต" })
        }
        res.json(blog)
    })
    .catch((err) => {
        res.status(400).json({ error: "ไม่สามารถอัปเดตบทความได้" })
    })
}
