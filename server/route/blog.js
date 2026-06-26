const express = require("express")
const router = express.Router()
const {create, getallblogs, singleBlog, remove, update} = require("../controller/blogController")
const {requireLogin} = require("../controller/authcontroller")


//หากapiที่ได้จากserverส่งมามี /create ก้จะวิ่งเข้าที่ตัวนี้ เช่น /api/create
router.post('/create',requireLogin, create)                   //หลักจากนั้นก็จะวิ่งต่อไป ../controller/blogController
router.get('/blogs', getallblogs) //หลักจากนั้นก็จะวิ่งต่อไป ../controller/blogController
router.get('/blog/:slug', singleBlog)           //หลักจากนั้นก็จะวิ่งต่อไป ../controller/blogController
router.delete('/blog/:slug', requireLogin, remove)            //หลักจากนั้นก็จะวิ่งต่อไป ../controller/blogController
router.put('/blog/:slug', requireLogin, update)               //หลักจากนั้นก็จะวิ่งต่อไป ../controller/blogController

module.exports=router