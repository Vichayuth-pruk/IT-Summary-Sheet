import React, { useEffect, useContext } from "react"
import AuthContext from "../contexts/authContext"
import isLoggedIn from "../middlewares/isLoggedIn"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Swal from "sweetalert2/dist/sweetalert2.all.min.js"
import { useMutation } from "@apollo/client"
import { LOGIN_MUTATION } from "../graphql/loginMutation"
import Cookies from "js-cookie"

const schema = yup
  .object({
    email: yup.string().max(100).email().required(),
    password: yup.string().min(8).max(30).required(),
  })
  .required()

function Signin(props) {
  // Middleware
  const me = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    isLoggedIn(props.meta, me, navigate)
  }, [])

  const [login] = useMutation(LOGIN_MUTATION)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = async (data) => {
    let { email, password } = data
    try {
      const response = await login({ variables: { email, password } })
      if (response.data.login.status === "success") {
        Cookies.set("token", response.data.login.token)
        await props.refetch()
        navigate("/")
      } else {
        Swal.fire({
          title: "ไม่สำเร็จ",
          text: response.data.login.message,
          icon: "error",
        })
      }
    } catch (errors) {
      console.log(errors)
      Swal.fire({
        title: "ไม่สำเร็จ",
        text: errors.message,
        icon: "error",
      })
    }
  }
  return (
    <>
      <div className="h2">เข้าสู่ระบบ</div>
      <hr />
      <br />
      <br />
      <div className="col-lg-6 col-md-8 col-sm-12 m-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <div className="text-center mb-3">
            <button className="btn btn-primary" type="submit">
              เข้าสู่ระบบ
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Signin
