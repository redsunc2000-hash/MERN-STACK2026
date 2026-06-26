# MERN Blog CMS

ระบบจัดการบทความ (Blog CMS) แบบ full-stack ด้วย MERN Stack รองรับการสมัคร login สำหรับผู้ดูแลระบบในการสร้าง/แก้ไข/ลบบทความ พร้อม rich-text editor และระบบป้องกันเส้นทาง (protected routes) ด้วย JWT — ผู้เข้าชมทั่วไปอ่านบทความได้โดยไม่ต้อง login

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white&labelColor=20232a)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-black?logo=jsonwebtokens)

**Live Demo:** https://mern-blog-client-1jdx.onrender.com/

## Features

- ระบบ Login ด้วย JWT พร้อม route guard (`AdminRoute`) กันไม่ให้ผู้ที่ไม่ได้ login เข้าหน้าสร้าง/แก้ไขบทความ
-  เขียน/แก้ไขบทความด้วย Rich Text Editor (React Quill)
-  แสดงรายการบทความทั้งหมด พร้อมหน้าอ่านบทความเดี่ยว
-  ลบบทความพร้อม dialog ยืนยันก่อนลบ (SweetAlert2)
-  สร้าง URL slug จากชื่อบทความอัตโนมัติ
-  Responsive UI ด้วย Bootstrap

## Tech Stack

| ส่วน | เทคโนโลยีที่ใช้ |
|---|---|
| Frontend | React, React Router, Axios, React Quill, SweetAlert2, Bootstrap |
| Backend | Node.js, Express, JWT (express-jwt, jsonwebtoken) |
| Database | MongoDB (Mongoose) |
| Deployment | Render |

## โครงสร้างโปรเจกต์

```
.
├── client/   # React (Create React App)
└── server/   # Express + MongoDB (Mongoose)
```

### server/
```
server/
├── server.js              # entry point, เชื่อมต่อ MongoDB, ตั้งค่า middleware
├── route/                  # กำหนด endpoint แต่ละเส้น
│   ├── auth.js             # /api/login
│   └── blog.js             # /api/create, /api/blogs, /api/blog/:slug
├── controller/             # logic การทำงานของแต่ละ route
│   ├── authcontroller.js   # ตรวจสอบ login, ออก JWT
│   └── blogController.js   # CRUD บทความ
└── models/
    └── blogs.js            # Mongoose schema ของบทความ
```

### client/src/
```
client/src/
├── MyRoute.js              # ประกาศ route ทั้งหมดของแอป
├── App.js                  # หน้าแรก แสดงรายการบทความ
├── service/
│   └── authorize.js        # จัดการ token/user ใน sessionStorage (login/logout)
└── components/
    ├── AdminRoute.js        # guard route สำหรับหน้าที่ต้อง login (create/edit)
    ├── NavbarComponent.js
    ├── LoginComponent.js
    ├── LogoutComponent.js
    ├── FormComponent.js     # หน้าเขียนบทความใหม่
    ├── EditComponent.js     # หน้าแก้ไขบทความ
    └── SingleComponent.js   # หน้าอ่านบทความเดี่ยว
```

## วิธีรันโปรเจกต์

### 1. Server

```bash
cd server
npm install
```

สร้างไฟล์ `server/.env`:

```
PORT=5500
DATABASE=<mongodb connection string>
JWT_SECRET=<ตั้งค่าความลับสำหรับเซ็น JWT>
PASSWORD=<password สำหรับ login ด้วย username "Admin">
```

รันเซิร์ฟเวอร์:

```bash
npm start
```

### 2. Client

```bash
cd client
npm install
```

สร้างไฟล์ `client/.env`:

```
REACT_APP_API=http://localhost:5500/api
```

รันฝั่ง client:

```bash
npm start
```

## การ Login

ใช้ username `Admin` กับ password ตามที่ตั้งไว้ใน `server/.env` (`PASSWORD`) เท่านั้น — ระบบนี้รองรับ admin คนเดียว ไม่มีระบบสมัครสมาชิก

## ผู้พัฒนา
    มานพ   แสงวัน

โปรเจกต์นี้พัฒนาขึ้นเพื่อฝึกฝนการพัฒนาเว็บแอปพลิเคชันแบบ full-stack ด้วย MERN Stack
