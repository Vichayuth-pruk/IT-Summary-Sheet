import React, { useEffect, useContext } from "react"
import AuthContext from "../contexts/authContext"
import isLoggedIn from "../middlewares/isLoggedIn"
import { useNavigate, Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Swal from "sweetalert2/dist/sweetalert2.all.min.js"
import { useMutation } from "@apollo/client"
import { REGISTER_MUTATION } from "../graphql/registerMutation"

const schema = yup
  .object({
    email: yup.string().max(100).email().required(),
    firstname: yup.string().max(100).required(),
    lastname: yup.string().max(100).required(),
    username: yup.string().max(100).required(),
    password: yup.string().min(8).max(30).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "รหัสผ่านไม่ตรงกัน"),
  })
  .required()

function Signup(props) {
  // Middleware
  const me = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    isLoggedIn(props.meta, me, navigate)
  }, [])

  const [registerUser] = useMutation(REGISTER_MUTATION)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = (data) => {
    Swal.fire({
      title: "ยืนยันข้อมูลถูกต้องหรือไม่",
      text: "คุณต้องการสมัครสมาชิกหรือไม่",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#6E7881",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let { email, firstname, lastname, username, password } = data
        try {
          await registerUser({
            variables: {
              record: {
                email,
                firstname,
                lastname,
                username,
                password,
              },
            },
          })
          Swal.fire({
            title: "สำเร็จ",
            icon: "success",
            timer: 3000,
          }).then(() => {
            navigate("/signin")
          })
        } catch (errors) {
          console.log(errors)
          Swal.fire({
            title: "ไม่สำเร็จ",
            text: errors.message,
            icon: "error",
          })
        }
      }
    })
  }
  return (
    <>
      <div className="h2">ลงทะเบียนเข้าสู่ระบบ</div>
      <hr />
      <br />
      <br />
      <div className="col-lg-6 col-md-8 col-sm-12 m-auto">
        <form data-testid="signup-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">อีเมล</label>
            <input
              type="text"
              className="form-control"
              placeholder="อีเมล"
              {...register("email")}
            />
            <div className="mt-1 text-danger">
              {errors.email && "โปรดกรอกอีเมลให้ถูกต้อง"}
            </div>
          </div>
          <div className="row mb-3 g-2">
            <div className="col">
              <label className="form-label">ชื่อ</label>
              <input
                type="text"
                className="form-control"
                placeholder="ชื่อ"
                {...register("firstname")}
              />
              <div className="mt-1 text-danger">
                {errors.firstname && "โปรดกรอกชื่อให้ถูกต้อง"}
              </div>
            </div>
            <div className="col">
              <div className="col">
                <label className="form-label">นามสกุล</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="นามสกุล"
                  {...register("lastname")}
                />
                <div className="mt-1 text-danger">
                  {errors.lastname && "โปรดกรอกนามสกุลให้ถูกต้อง"}
                </div>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">ชื่อที่ใช้แสดง</label>
            <input
              type="text"
              className="form-control"
              placeholder="ชื่อที่ใช้แสดง"
              {...register("username")}
            />
            <div className="mt-1 text-danger">
              {errors.username && "โปรดกรอกชื่อที่ใช้แสดงให้ถูกต้อง"}
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">รหัสผ่าน</label>
            <input
              type="password"
              className="form-control"
              placeholder="รหัสผ่าน"
              {...register("password")}
            />
            <div className="mt-1 text-danger">
              {errors.password &&
                "โปรดกรอกรหัสผ่านให้ถูกต้อง (8 - 30 ตัวอักษร)"}
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">ยืนยันรหัสผ่าน</label>
            <input
              type="password"
              className="form-control"
              placeholder="ยืนยันรหัสผ่าน"
              {...register("confirmPassword")}
            />
            <div className="mt-1 text-danger">
              {errors.confirmPassword?.message}
            </div>
          </div>
          <div className="text-center mb-3">
            <button className="btn btn-success" type="submit">
              ลงทะเบียน
            </button>
            <div className="my-2">
              เป็นสมาชิกแล้วใช่ไหม คลิกที่นี่เพื่อ{" "}
              <Link to="/signin">เข้าสู่ระบบ</Link>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default Signup
