require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

const express = require("express")
const morgan = require("morgan")
const cors  = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()
const blogRoute = require('./route/blog')
const authRoute = require('./route/auth')
const app = express()

//connect cloud database
mongoose.connect(process.env.DATABASE)
    .then(() => console.log("เชื่อมต่อ MongoDB สำเร็จ!"))
    .catch((err) => console.error("เชื่อมต่อฐานข้อมูลล้มเหลว:", err));

//middleware
app.use(express.json({ limit: "50mb" }))        // ✅ เพิ่ม limit
app.use(express.urlencoded({ limit: "50mb", extended: true }))  // ✅ เพิ่มบรรทัดนี้
app.use(cors())
app.use(morgan("dev"))

//route
app.use('/api', blogRoute)
app.use('/api', authRoute)

const port = process.env.PORT || 8080
const server = app.listen(port, () => console.log(`start server on port ${port}`))