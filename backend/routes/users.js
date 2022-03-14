const config = process.env;
const express = require("express");
const pool = require("../config/database");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isLoggedIn } = require("../middlewares");

router = express.Router();

router.post("/users/logout", isLoggedIn, async (req, res, next) => {
  await pool.query("DELETE FROM tokens WHERE user_id = ? ", [req.user.id]);
  res.json({ status: true, message: "ลงชื่อออกสำเร็จ" });
});

router.get("/users/me", isLoggedIn, async (req, res, next) => {
  res.json(req.user);
});

const signinSchema = Joi.object({
  email: Joi.string().required().max(100).email(),
  password: Joi.string().required().min(5).max(20),
});

router.post("/users/signin", async (req, res, next) => {
  try {
    await signinSchema.validateAsync(req.body, { abortEarly: false });
  } catch (err) {
    return res.json({ status: false, message: err.message });
  }

  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    const { email, password } = req.body;
    const [[user]] = await conn.query(
      "SELECT id, email, password FROM users WHERE email = ?",
      [email]
    );
    if (!user?.email) {
      res.json({ status: false, message: "ไม่มีอีเมลนี้ในระบบ" });
    } else if (!(await bcrypt.compare(password, user.password))) {
      res.json({ status: false, message: "รหัสผ่านผิด" });
    } else {
      const [[tokens]] = await conn.query(
        "SELECT token FROM tokens WHERE user_id = ?",
        [user.id]
      );
      let token = tokens?.token;
      if (!token) {
        token = jwt.sign(user.email, process.env.TOKEN_KEY);
        await conn.query("INSERT INTO tokens(token, user_id) VALUES (?, ?)", [
          token,
          user.id,
        ]);
      }

      conn.commit();
      res.json({
        status: true,
        message: "ลงชื่อเข้าใช้งานสำเร็จ",
        token: token,
      });
    }
    return;
  } catch (err) {
    conn.rollback();
    res.status(400).json(err.toString());
  } finally {
    conn.release();
  }
});

const emailValidator = async (value, helpers) => {
  const [rows, _] = await pool.query(
    "SELECT email FROM users WHERE email = ?",
    [value]
  );
  if (rows.length > 0) {
    const message = "อีเมลนี้ถูกใช้งานแล้ว";
    throw new Joi.ValidationError(message, { message });
  }
  return value;
};

const signupSchema = Joi.object({
  email: Joi.string().required().max(100).email().external(emailValidator),
  firstname: Joi.string().max(100),
  lastname: Joi.string().max(100),
  username: Joi.string().required().max(100),
  password: Joi.string().required().min(5).max(20),
  c_password: Joi.string().required().valid(Joi.ref("password")),
});

router.post("/users/signup", async (req, res, next) => {
  try {
    await signupSchema.validateAsync(req.body, { abortEarly: false });
  } catch (err) {
    return res.json({ status: false, message: err.message });
  }

  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    const { email, firstname, lastname, username, password } = req.body;
    const password_encrypted = await bcrypt.hash(password, 5);
    await conn.query(
      "INSERT INTO users(email, firstname, lastname, username, password) VALUES (?, ?, ?, ?, ?)",
      [email, firstname, lastname, username, password_encrypted]
    );
    conn.commit();
    res.json({ status: true, message: "ลงทะเบียนสำเร็จ" });
  } catch (err) {
    conn.rollback();
    res.status(400).json(err.toString());
  } finally {
    conn.release();
  }
});

exports.router = router;
