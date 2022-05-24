import React, { useEffect, useContext, useState } from "react"
import AuthContext from "../contexts/authContext"
import isLoggedIn from "../middlewares/isLoggedIn"
import { useNavigate, Link, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { GET_SHEET_QUERY } from "../graphql/sheetQuery"
import { useQuery, useMutation } from "@apollo/client"
import Swal from "sweetalert2/dist/sweetalert2.all.min.js"
import { UPDATE_SHEET_MUTATION } from "../graphql/sheetMutation"
import { storage } from "../config/firebase"
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import Spinner from "../components/Spinner"

const schema = yup
  .object({
    courseTitle: yup.string().max(100).required(),
    year: yup.string().required(),
    programme: yup.string().required(),
    price: yup.number().min(0).max(9999999).required(),
  })
  .required()

function Sheetedit(props) {
  // Middleware
  const me = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    isLoggedIn(props.meta, me, navigate)
    refetch()
  }, [])

  const { id } = useParams()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  // State
  const [progress, setProgress] = useState(0)
  const [url, setUrl] = useState(null)
  const { loading, error, data, refetch } = useQuery(GET_SHEET_QUERY, {
    variables: {
      sheetId: id,
    },
    skip: !id,
  })

  const [updatesheet] = useMutation(UPDATE_SHEET_MUTATION)
  const onSubmit = async (input) => {
    let { courseTitle, year, programme, price } = input
    let sheetFile = url || data.sheetId.sheetFile
    try {
      await updatesheet({
        variables: {
          sheetId: id,
          record: {
            courseTitle,
            year,
            programme,
            sheetFile,
            price,
          },
        },
      })
      Swal.fire({
        title: "สำเร็จ",
        icon: "success",
        timer: 1500,
      })
      navigate("/sheetsmanage")
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

  const uploadFile = (file) => {
    if (!file) return
    if (file.type !== "application/pdf") {
      Swal.fire({
        title: "ไม่สามารถอัพโหลดไฟล์นี้ได้",
        text: "ไฟล์ต้องเป็นไฟล์ประเภท .pdf",
        icon: "error",
      })
      return
    }
    const storageRef = ref(storage, `/sheets/${new Date().toISOString()}.pdf`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
        setProgress(prog)
      },
      (err) => {
        console.log(err)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => setUrl(url))
      }
    )
  }
  if (loading) return <Spinner />
  return (
    <>
      <div className="h2">แก้ไขชีท</div>
      <hr />
      <br />
      <br />
      <div className="col-lg-6 col-md-8 col-sm-12 m-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">วิชา</label>
            <input
              type="text"
              className="form-control"
              placeholder="วิชา"
              defaultValue={data.sheetId.courseTitle}
              {...register("courseTitle")}
            />
            <div className="mt-1 text-danger">
              {errors.courseTitle && "โปรดกรอกวิชาให้ถูกต้อง"}
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">ชั้นปี</label>
            <select
              className="form-select"
              defaultValue={data.sheetId.year}
              {...register("year")}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
            <div className="mt-1 text-danger">
              {errors.year && "โปรดเลือกชั้นปี"}
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">สาขา</label>
            <select
              className="form-select"
              defaultValue={data.sheetId.programme}
              {...register("programme")}
            >
              <option value="IT">IT</option>
              <option value="DSBA">DSBA</option>
              <option value="BIT">BIT</option>
            </select>
            <div className="mt-1 text-danger">
              {errors.programme && "โปรดเลือกสาขา"}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">
              อัปโหลดชีทใหม่ pdf (Optional)
            </label>
            <input
              className="form-control"
              type="file"
              accept=".pdf"
              id="formFile"
              onChange={(e) => uploadFile(e.target.files[0])}
            />
            {progress > 0 ? (
              <>
                <div className="mt-3 text-end">
                  {progress === 100
                    ? `อัปโหลดชีทสำเร็จ`
                    : `กำลังอัปโหลด ${progress}%`}
                </div>
                <div className="progress">
                  <div
                    className="progress-bar progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    style={{ width: progress + "%" }}
                  />
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <label className="form-label">ตั้งราคา</label>
          <div className="m-auto my-4 col-4">
            <div className="input-group">
              <span className="input-group-text">itcoin</span>
              <input
                type="text"
                className="form-control"
                placeholder="0.00"
                defaultValue={data.sheetId.price}
                {...register("price")}
              />
            </div>
            <div className="mt-1 text-danger mb-3">
              {errors.price && "โปรดตั้งราคาให้ถูกต้อง"}
            </div>
          </div>

          <div className="text-center row mb-3">
            <div>
              <Link to="/sheetsmanage">
                <button className="btn btn-secondary me-3">ยกเลิก</button>
              </Link>
              {progress === 100 || progress === 0 ? (
                <button className="btn btn-primary" type="submit">
                  อัปเดต
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default Sheetedit
