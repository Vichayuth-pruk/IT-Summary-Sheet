import React, { useEffect, useContext, useState } from "react"
import AuthContext from "../contexts/authContext"
import isLoggedIn from "../middlewares/isLoggedIn"
import { useNavigate, Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Swal from "sweetalert2/dist/sweetalert2.all.min.js"
import { useMutation, useQuery } from "@apollo/client"
import { ME_MUTATION } from "../graphql/meMutation"
import { ME_QUERY } from "../graphql/meQuery"
import Spinner from "../components/Spinner"

const schema = yup
  .object({
    firstname: yup.string().max(100).required(),
    lastname: yup.string().max(100).required(),
    username: yup.string().max(100).required(),
  })
  .required()

function Account(props) {
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
    refetch()
  }, [data])

  const [updateUser] = useMutation(ME_MUTATION)
  const onSubmit = async (input) => {
    let { meId, firstname, lastname, username } = input
    try {
      await updateUser({
        variables: {
          userId: meId,
          record: {
            firstname,
            lastname,
            username,
          },
        },
      })
      Swal.fire({
        title: "สำเร็จ",
        icon: "success",
        timer: 1500,
      })
    } catch (errors) {
      console.log(errors)
      Swal.fire({
        title: "ไม่สำเร็จ",
        text: errors.message,
        icon: "error",
        timer: 1500,
      })
    }
  }

  if (loading) return <Spinner />
  return (
    <>
      <div className="h2">จัดการบัญชี</div>
      <hr />
      <br />
      <br />
      <div className="col-lg-6 col-md-8 col-sm-12 m-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">อีเมล</label>
            <div>{data.me.email}</div>
          </div>
          <div className="row mb-3 g-2">
            <div className="col">
              <label className="form-label">ชื่อ</label>
              <input
                type="text"
                className="form-control"
                placeholder="ชื่อ"
                defaultValue={data.me.firstname}
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
                  defaultValue={data.me.lastname}
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
              defaultValue={data.me.username}
              {...register("username")}
            />
            <div className="mt-1 text-danger">
              {errors.username && "โปรดกรอกชื่อที่ใช้แสดงให้ถูกต้อง"}
            </div>
          </div>
          <input type="hidden" value={data.me._id} {...register("meId")} />
          <div className="text-center mb-3">
            <button className="btn btn-primary" type="submit">
              อัปเดตข้อมูล
            </button>
            <div className="my-2">
              เปลี่ยนรหัสผ่าน <Link to="/changepassword">คลิกที่นี่</Link>
            </div>
          </div>
        </form>
      </div>
      <br />
    </>
  )
}

export default Account
