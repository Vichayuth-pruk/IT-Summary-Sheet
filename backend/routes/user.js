const express = require("express");
const pool = require("../config/database");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/token");
const { isLoggedIn } = require('../middlewares')

router = express.Router();

const emailValidator = async (value, helpers) => {
  const [rows, _] = await pool.query(
    "SELECT user_email FROM users WHERE user_email = ?",
    [value]
  );
  if (rows.length > 0) {
    const message = "อีเมลนี้ถูกใช้งานแล้ว";
    throw new Joi.ValidationError(message, { message });
  }
  return value;
};

const signupSchema = Joi.object({
  email: Joi.string().required().email().max(50).external(emailValidator),
  fname: Joi.string().required().max(50),
  lname: Joi.string().required().max(50),
  password: Joi.string().required().min(5).max(18),
  c_password: Joi.string().required().valid(Joi.ref("password")),
});

router.post("/user/signup", async (req, res, next) => {
  try {
    await signupSchema.validateAsync(req.body, { abortEarly: false });
  } catch (err) {
    return res.json({ status: false, message: err.message });
  }

  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    const { email, fname, lname, password } = req.body;
    const password_encrypted = await bcrypt.hash(password, 5);
    await conn.query(
      "INSERT INTO users(user_email, user_fname, user_lname, user_password) VALUES (?, ?, ?, ?)",
      [email, fname, lname, password_encrypted]
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

const signinSchema = Joi.object({
  email: Joi.string().required().email().max(50),
  password: Joi.string().required(),
});

router.post("/user/signin", async (req, res, next) => {
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
      "SELECT * FROM users WHERE user_email = ?",
      [email]
    );
    if (!user) {
      res.json({ status: false, message: "ไม่มีอีเมลนี้ในระบบ" });
    } else {
      if (!(await bcrypt.compare(password, user.user_password))) {
        res.json({ status: false, message: "รหัสผ่านไม่ถูกต้อง" });
      } else {
        const [tokens] = await conn.query(
          "SELECT * FROM tokens WHERE user_id = ?",
          [user.user_id]
        );
        let token = tokens[0]?.token_token;
        if (!token) {
          token = generateToken();
          await conn.query(
            "INSERT INTO tokens(token_token, user_id) VALUES (?, ?)",
            [token, user.user_id]
          );
        }
        conn.commit();
        res.json({
          status: true,
          message: "ลงชื่อเข้าสู่ระบบสำเร็จ",
          token: token,
        });
      }
    }
  } catch (err) {
    conn.rollback();
    res.status(400).json(err.toString());
  } finally {
    conn.release();
  }
});

router.get('/user/me', isLoggedIn, async (req, res, next) => {
  res.json(req.user)
})

router.post('/user/logout', isLoggedIn, async (req, res, next) => {
  await pool.query('DELETE FROM tokens WHERE user_id = ? ', [req.user.user_id])
  res.status(200).send()
})
exports.router = router;
