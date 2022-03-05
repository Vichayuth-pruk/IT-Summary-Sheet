const bcrypt = require("bcryptjs");
const express = require("express");
const Router = express.Router();
const jwt = require("jsonwebtoken");
const config = process.env;

const auth = require("../middleware/auth");
const Users = require("../models/Users");

Router.get("/signout", async (req, res) => {
  try {
    const token_current = req.headers.token;
    const decoded = jwt.verify(token_current, config.TOKEN_KEY);
    const userId_decoded = decoded.user._id;
    const user = await Users.findById(userId_decoded);
    const { token, ...user_detoken } = user._doc;
    const user_final = await Users.updateOne(
      { _id: user_detoken._id },
      { $unset: { token } }
    );
    if (user_final) {
      res.status(200).json({
        status: true,
        alert: "ลงชื่อออกจากระบบสำเร็จ",
      });
    } else {
      res.status(200).json({
        status: false,
        alert: "ลงชื่อออกจากระบบไม่สำเร็จ",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

Router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(200).json({
        status: false,
        alert: "โปรดกรอกข้อมูลทั้งหมด",
      });
    } else {
      const user = await Users.findOne({ email });
      if (user) {
        if (await bcrypt.compare(password, user.password)) {
          const token = jwt.sign({ user }, process.env.TOKEN_KEY, {
            expiresIn: "365d",
          });
          if (!user.token) {
            user.token = token;
          }
          await Users.findByIdAndUpdate(user._id, { $set: user });
          const info = await Users.findById(user._id);
          if (info) {
            res.status(200).json({
              status: true,
              alert: "ลงชื่อเข้าสู่ระบบสำเร็จ",
              user: info,
            });
          } else {
            res.status(200).json({
              status: false,
              alert: "ลงชื่อเข้าสู่ระบบไม่สำเร็จ",
              user: info,
            });
          }
        } else {
          res.status(203).json({
            status: false,
            alert: "รหัสผ่านไม่ถูกต้อง",
          });
        }
      } else {
        res.status(200).json({
          status: false,
          alert: "ไม่มีผู้ใช้นี้ในระบบ",
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

Router.post("/signup", async (req, res) => {
  try {
    const { email, fname, lname, password, c_password } = req.body;
    if (!(email && fname && lname && password && c_password)) {
      res.status(200).json({
        status: false,
        alert: "โปรดกรอกข้อมูลทั้งหมด",
      });
    } else if (password !== c_password) {
      res.status(200).json({
        status: false,
        alert: "รหัสผ่านและยืนยันรหัสผ่าน ไม่ตรงกัน",
      });
    } else {
      const old_user = await Users.findOne({ email });
      if (old_user) {
        res.status(200).json({
          status: false,
          alert: "อีเมลนี้มีอยู่แล้วในระบบ",
        });
      } else {
        password_encrypted = await bcrypt.hash(password, 10);
        const user = await Users.create({
          email,
          fname,
          lname,
          password: password_encrypted,
        });

        if (user) {
          res.status(201).json({
            status: true,
            alert: "ลงทะเบียนสำเร็จ",
          });
        } else {
          res.status(200).json({
            status: false,
            alert: "ลงทะเบียนไม่สำเร็จ",
          });
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
});

Router.get("/users", async (req, res) => {
  try {
    const users = await Users.find();
    if (users) {
      res.status(200).json({ users });
    }
  } catch (err) {
    console.log(err);
  }
});

Router.get("/authentication", async (req, res) => {
  try {
    const token_current = req.headers.token;
    if (token_current !== "null") {
      const decoded = jwt.verify(token_current, config.TOKEN_KEY);
      const userId_decoded = decoded.user._id;
      const info = await Users.findById(userId_decoded);
      if (info) {
        res.status(200).json({
          status: true,
          alert: "Authorization Successfully",
          info: info,
        });
      } else {
        res.status(200).json({
          status: false,
          alert: "Authorization failed",
        });
      }
    } else {
      res.status(200).json({
        status: false,
        alert: "Authorization failed",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = Router;
