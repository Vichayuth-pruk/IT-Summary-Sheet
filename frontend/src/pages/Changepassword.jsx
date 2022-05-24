import React, { useEffect, useContext } from "react"
import AuthContext from "../contexts/authContext"
import isLoggedIn from "../middlewares/isLoggedIn"
import { useNavigate, Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Swal from "sweetalert2/dist/sweetalert2.all.min.js"
import { useMutation, useQuery } from "@apollo/client"
import { ME_QUERY } from "../graphql/meQuery"
import { CHANGEPASSWORD_MUTATION } from "../graphql/meMutation"
import Spinner from "../components/Spinner"

const schema = yup
  .object({
    oldPassword: yup.string().min(8).max(30).required(),
    newPassword: yup.string().min(8).max(30).required(),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref("newPassword")], "รหัสผ่านใหม่ไม่ตรงกัน"),
  })
  .required()

function Changepassword(props) {
  // Middleware
  const me = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    isLoggedIn(props.meta, me, navigate)
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  })

  // State
  const { loading, error, data, refetch } = useQuery(ME_QUERY)

  useEffect(() => {
    reset(data.me)
  }, [data])

  const [changePassword] = useMutation(CHANGEPASSWORD_MUTATION)
  const onSubmit = async (input) => {
    let { oldPassword, newPassword } = input
    try {
      const res = await changePassword({
        variables: {
          oldPassword,
          newPassword,
        },
      })
      if (res.data.changePassword.status === "error") {
        Swal.fire({
          icon: "error",
          title: "เปลี่ยนรหัสผ่านไม่สำเร็จ",
          text: res.data.changePassword.message,
          showConfirmButton: false,
          timer: 1500,
        })
      } else {
        props.logout()
        Swal.fire({
          icon: "success",
          title: "เปลี่ยนรหัสผ่านสำเร็จ",
          text: "เข้าสู่ระบบอีกครั้ง",
          timer: 1500,
        })
      }
    } catch (errors) {
      Swal.fire({
        icon: "error",
        title: "เปลี่ยนรหัสผ่านไม่สำเร็จ",
        text: errors.message,
        showConfirmButton: false,
        timer: 1500,
      })
    }
  }
  if (loading) return <Spinner />
  return (
    <>
      <div className="h2">เปลี่ยนรหัสผ่าน</div>
      <hr />
      <br />
      <br />
      <div className="col-lg-6 col-md-8 col-sm-12 m-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">รหัสผ่านเดิม</label>
            <input
              type="password"
              className="form-control"
              placeholder="รหัสผ่านเดิม"
              {...register("oldPassword")}
            />
            <div className="mt-1 text-danger">
              {errors.oldPassword &&
                "โปรดกรอกรหัสผ่านเดิมให้ถูกต้อง (8 - 30 ตัวอักษร)"}
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">รหัสผ่านใหม่</label>
            <input
              type="password"
              className="form-control"
              placeholder="รหัสผ่านใหม่"
              {...register("newPassword")}
            />
            <div className="mt-1 text-danger">
              {errors.newPassword &&
                "โปรดกรอกรหัสผ่านใหม่ให้ถูกต้อง (8 - 30 ตัวอักษร)"}
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">ยืนยันรหัสผ่านใหม่</label>
            <input
              type="password"
              className="form-control"
              placeholder="ยืนยันรหัสผ่านใหม่"
              {...register("confirmNewPassword")}
            />
            <div className="mt-1 text-danger">
              {errors.confirmNewPassword?.message}
            </div>
          </div>
          <div className="text-center mb-3">
            <button className="btn btn-warning" type="submit">
              เปลี่ยนรหัสผ่าน
            </button>
            <div className="my-2">
              ย้อนกลับบัญชี <Link to="/account">คลิกที่นี่</Link>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default Changepassword
