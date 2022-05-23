import React, { useEffect, useContext, useState } from "react"
import AuthContext from "../contexts/authContext"
import isLoggedIn from "../middlewares/isLoggedIn"
import { useNavigate, Link, useParams } from "react-router-dom"
import { GET_SHEET_QUERY } from "../graphql/sheetQuery"
import { useQuery, useMutation } from "@apollo/client"
import moment from "moment"
import {
  FAVORITE_MUTATION,
  DELETE_FAVORITE_MUTATION,
} from "../graphql/favoriteMutation"
import Rating from "@mui/material/Rating"
import { CART_MUTATION, DELETE_CART_MUTATION } from "../graphql/cartMutation"
import Swal from "sweetalert2/dist/sweetalert2.all.min.js"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { COMMENT_MUTATION } from "../graphql/commentMutation"

const schema = yup
  .object({
    description: yup.string().required(),
  })
  .required()

function Sheet(props) {
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
  const [isCommented, setIsCommented] = useState(false)
  const { loading, error, data, refetch } = useQuery(GET_SHEET_QUERY, {
    variables: {
      sheetId: id,
    },
    skip: !id,
    onCompleted: (data) => {
      setIsCommented(
        data.sheetId.comment.some(
          (c) => c.userId === me._id && c.sheetId === id
        )
      )
    },
  })

  const [rateValue, setRateValue] = useState(0)

  const [createFavorite] = useMutation(FAVORITE_MUTATION)
  const [deleteFavorite] = useMutation(DELETE_FAVORITE_MUTATION)
  const submitFavorite = async () => {
    try {
      const userId = me._id
      const sheetId = data.sheetId._id
      const { favorite } = data.sheetId
      if (favorite.some((f) => f.userId === userId)) {
        let favoriteId = favorite.find(
          (f) => f.sheetId === sheetId && f.userId === userId
        )._id
        await deleteFavorite({
          variables: {
            favoriteId: favoriteId,
          },
        })
      } else {
        await createFavorite({
          variables: {
            record: {
              sheetId,
              userId,
            },
          },
        })
      }
      await props.fav()
      await refetch()
    } catch (error) {
      console.log(error)
      Swal.fire({
        title: "ไม่สำเร็จ",
        text: error.message,
        icon: "error",
        time: 1500,
      })
    }
  }

  const [createCart] = useMutation(CART_MUTATION)
  const submitCart = async () => {
    try {
      const userId = me._id
      const sheetId = data.sheetId._id
      if (
        data.sheetId.cart.some(
          (c) => c.userId === userId && c.sheetId === sheetId
        )
      ) {
        Swal.fire({
          title: "คุณได้เพิ่มรายการนี้ลงในตะกร้าแล้ว",
          icon: "warning",
          confirmButtonText: "ตกลง",
        })
        return
      }
      await createCart({
        variables: {
          record: {
            sheetId,
            userId,
          },
        },
      })
      Swal.fire({
        title: "บันทึกลงในตะกร้าแล้ว",
        icon: "success",
        timer: 1000,
      })
      await props.cart()
      await refetch()
    } catch (error) {
      console.log(error)
      Swal.fire({
        title: "ไม่สำเร็จ",
        text: error.message,
        icon: "error",
        time: 1500,
      })
    }
  }

  const isBuyed = () => me.mines.some((m) => m._id === id)

  const [createComment] = useMutation(COMMENT_MUTATION)
  const onSubmit = async (input) => {
    if (rateValue < 1) {
      Swal.fire({
        title: "กรุณาให้คะแนนก่อน",
        icon: "warning",
        confirmButtonText: "ตกลง",
      })
      return
    }
    const { description } = input
    const rate = rateValue
    try {
      await createComment({
        variables: {
          record: {
            sheetId: id,
            userId: me._id,
            description,
            rating: rate,
          },
        },
      })
      Swal.fire({
        title: "รีวิวสำเร็จ",
        icon: "success",
        timer: 1000,
      })
      await refetch()
    } catch (error) {
      console.log(error)
      Swal.fire({
        title: "ไม่สำเร็จ",
        text: error.message,
        icon: "error",
        time: 1500,
      })
    }
  }

  const getLengthofRatings = (comment, number) => {
    return (
      (comment.filter((c) => c.rating === number).length / comment.length) * 100
    )
  }

  const RatingProgress = ({ comment, number }) => {
    return (
      <div className="mb-3">
        <div className="me-3 " style={{ float: "left" }}>
          {number}
        </div>
        <div className="progress">
          <div
            className="progress-bar bg-warning"
            role="progressbar"
            style={{
              width: getLengthofRatings(comment, number) + "%",
            }}
            aria-valuenow={getLengthofRatings(comment, number)}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>
    )
  }

  if (loading)
    return (
      <div className="text-end">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  return (
    <>
      <div className="h2 text-center mb-3">วิชา {data.sheetId.courseTitle}</div>
      <br />
      <div
        className="border py-5 px-3 col-lg-8 col-md-8 col-sm-12 m-auto mb-3"
        style={{ borderRadius: 10 }}
      >
        <div className="text-end me-3" style={{ fontSize: 24 }}>
          {data.sheetId.favorite.some((f) => f.userId === me._id) ? (
            <i
              className={
                "fa-solid text-danger fa-lg fa-heart" +
                (data.sheetId.userId === me?._id || isBuyed() ? "d-none" : "")
              }
              onClick={submitFavorite}
              style={{ cursor: "pointer" }}
            />
          ) : (
            <i
              className={
                "fa-regular fa-lg fa-heart" +
                (data.sheetId.userId === me?._id || isBuyed() ? "d-none" : "")
              }
              style={{ cursor: "pointer" }}
              onClick={submitFavorite}
            />
          )}
        </div>
        <div className="row m-auto">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="mb-3">ชั้นปี {data.sheetId.year}</div>
            <div className="mb-3">สาขา {data.sheetId.programme}</div>
            <div className="mb-3">
              โดย{" "}
              <Link to={"/shop/" + data.sheetId.user._id}>
                <span className="badge rounded-pill bg-primary ">
                  {data.sheetId.user.username}
                </span>
              </Link>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 mt-auto">
            <div className="row">
              <div className="mb-3 col text-end">
                {isBuyed() ? (
                  <button className="btn btn-success disabled">มีแล้ว</button>
                ) : (
                  <button
                    className={
                      "btn btn-success " +
                      (data.sheetId.userId === me?._id ? "disabled" : "")
                    }
                    onClick={() => submitCart()}
                  >
                    <b>
                      ซื้อ itcoin{" "}
                      <span className="badge bg-light text-dark">
                        {data.sheetId.price === 0
                          ? "Free"
                          : data.sheetId.price.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                      </span>{" "}
                    </b>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="px-3 mb-5 col-lg-8 col-md-8 col-sm-12 m-auto text-secondary"
        style={{ fontSize: 13 }}
      >
        วันที่วางขาย {moment(data.sheetId.createdAt).format("DD/MM/YYYY")}
      </div>
      <div className="col-lg-4 col-md-4 col-sm-12 m-auto mb-5">
        <div className="row">
          <div className="col ms-auto my-auto">
            <div className="text-center" style={{ fontSize: 24 }}>
              {data.sheetId.comment.length > 0 &&
                data.sheetId.comment.reduce((a, b) => a + b.rating, 0) /
                  data.sheetId.comment.length.toFixed(1)}
            </div>
            <div className="text-center" style={{ fontSize: 24 }}>
              <Rating
                name="read-only"
                value={
                  data.sheetId.comment.reduce((a, b) => a + b.rating, 0) /
                  data.sheetId.comment.length
                }
                readOnly
                precision={0.5}
              />
            </div>
            <div
              className="text-center text-secondary"
              style={{ fontSize: 18 }}
            >
              {data.sheetId.comment.reduce((a, b) => a + b.rating, 0)} เรตติ้ง
            </div>
          </div>
          <div className="col">
            <RatingProgress comment={data.sheetId.comment} number={5} />
            <RatingProgress comment={data.sheetId.comment} number={4} />
            <RatingProgress comment={data.sheetId.comment} number={3} />
            <RatingProgress comment={data.sheetId.comment} number={2} />
            <RatingProgress comment={data.sheetId.comment} number={1} />
          </div>
        </div>
      </div>

      {isBuyed() ? (
        isCommented ? null : (
          <>
            <div className="h4">เขียนรีวิวและให้ Rating</div>
            <div className="text-secondary">ชื่อที่แสดงเมื่อคุณรีวิว</div>
            <div className="mb-3">{me.username}</div>
            <div className="text-center">
              <div className="mb-3">
                <Rating
                  name="simple-controlled"
                  value={rateValue}
                  onChange={(event, newValue) => {
                    setRateValue(newValue)
                  }}
                />
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 m-auto">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      rows={2}
                      placeholder="เขียนรีวิว"
                      {...register("description")}
                    />
                    <div className="mt-1 text-danger">
                      {errors.description && "โปรดเขียนรีวิว"}
                    </div>
                  </div>
                  <div className="mb-3">
                    <button className="btn btn-primary" type="submit">
                      รีวิว
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )
      ) : null}
      <div className="h4">รีวิวทั้งหมด</div>
      {data.sheetId.comment.length === 0 ? (
        <div className="text-center mt-5 h4 ">ไม่มีการรีวิว</div>
      ) : (
        data.sheetId.comment.map((c) => (
          <div
            className="border py-3 px-3 col-lg-8 col-md-8 col-sm-12 m-auto mb-2"
            style={{ borderRadius: 10 }}
            key={c._id}
          >
            <div className="h5">{c.description}</div>
            <div className=" text-end">มีแล้ว - {c.user.username}</div>
            <div className="text-end">
              <Rating name="read-only" value={c.rating} readOnly />
            </div>
            <div className="text-end text-secondary">{c.dates}</div>
          </div>
        ))
      )}
    </>
  )
}

export default Sheet
