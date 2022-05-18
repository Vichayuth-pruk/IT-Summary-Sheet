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

function Sheet(props) {
  // Middleware
  const me = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    isLoggedIn(props.meta, me, navigate)
  }, [])

  const { id } = useParams()

  // State
  const { loading, error, data, refetch } = useQuery(GET_SHEET_QUERY, {
    variables: {
      sheetId: id,
    },
    skip: !id,
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
    }
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
              className="fa-solid text-danger fa-lg fa-heart"
              onClick={submitFavorite}
            />
          ) : (
            <i className="fa-regular fa-lg fa-heart" onClick={submitFavorite} />
          )}
        </div>
        <div className="row m-auto">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="mb-3">ชั้นปี {data.sheetId.year}</div>
            <div className="mb-3">หลักสูตร {data.sheetId.programme}</div>
            <div className="mb-3">โดย {data.sheetId.user.username}</div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 mt-auto">
            <div className="row">
              <div className="mb-3 col text-end">
                <button className="btn btn-success">
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

      <div className="text-center" style={{ fontSize: 24 }}>
        <Rating name="read-only" value={3.6} readOnly />
      </div>
      <div className="text-center mb-5" style={{ fontSize: 24 }}>
        No Rating
      </div>
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
          <form>
            <div className="mb-3">
              <textarea
                className="form-control"
                rows={2}
                placeholder="เขียนรีวิว"
              />
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
}

export default Sheet
