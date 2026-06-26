const jwt = require("jsonwebtoken");
const { expressjwt: expressJWT } = require("express-jwt"); 

// ฟังก์ชัน Login สำหรับสร้าง Token
exports.login = (req, res) => {
    const { username, password } = req.body;
    if (username === "Admin" && password === process.env.PASSWORD) {
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return res.json({ token, username }); 
    } else {
        return res.status(401).json({ error: "รหัสผ่านไม่ถูกต้อง" });
    }
};

// Middleware สำหรับตรวจสอบ Token (แก้ไขชื่อตัวแปรเพื่อไม่ให้ซ้ำกับ jsonwebtoken)
exports.requireLogin = expressJWT({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"]
});
