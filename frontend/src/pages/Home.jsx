import React, { useEffect, useContext, useState } from "react"
import AuthContext from "../contexts/authContext"
import isLoggedIn from "../middlewares/isLoggedIn"
import { useNavigate, Link } from "react-router-dom"
import Rating from "@mui/material/Rating"
import { SHEET_QUERY } from "../graphql/sheetQuery"
import { useQuery } from "@apollo/client"

function Home(props) {
  // Middleware
  const me = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    isLoggedIn(props.meta, me, navigate)
    refetch()
  }, [])

  // State
  const [order, setOrder] = useState("มาใหม่")
  const [sheets, setSheets] = useState([])
  const [orderby, setOrderBy] = useState("_ID_DESC")
  const { loading, error, data, refetch } = useQuery(SHEET_QUERY, {
    variables: {
      sort: orderby,
    },
    skip: !orderby,
    onCompleted: (data) => {
      setSheets(data.sheets)
    },
  })

  const onChangeOrder = (e) => {
    console.log(e.target.value)
    switch (e.target.value) {
      case "มาใหม่":
        setOrderBy("_ID_DESC")
        setOrder("มาใหม่")
        refetch()
        setSheets(data.sheets)
        break
      case "นิยม":
        setOrder("นิยม")
        let raw = data.sheets.slice().sort((a, b) => {
          return b.totalRating - a.totalRating
        })
        setSheets(raw)
        break
      case "ราคาน้อยไปมาก":
        setOrderBy("PRICE_ASC")
        setOrder("ราคาน้อยไปมาก")
        refetch()
        setSheets(data.sheets)
        break
      default:
        setOrderBy("_ID_DESC")
        setOrder("มาใหม่")
        refetch()
        setSheets(data.sheets)
        break
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
      <div className="h2">หน้าแรก </div>
      <hr />
      <br />
      <div className="row mb-3">
        <div className="col">
          <button
            type="button"
            value="มาใหม่"
            onClick={(e) => onChangeOrder(e)}
            className={
              order === "มาใหม่"
                ? "btn btn-primary me-2 btn-sm"
                : "btn btn-outline-primary me-2 btn-sm"
            }
          >
            มาใหม่
          </button>
          <button
            type="button"
            value="นิยม"
            onClick={(e) => onChangeOrder(e)}
            className={
              order === "นิยม"
                ? "btn btn-primary me-2 btn-sm"
                : "btn btn-outline-primary me-2 btn-sm"
            }
          >
            นิยม
          </button>

          <button
            type="button"
            value="ราคาน้อยไปมาก"
            onClick={(e) => onChangeOrder(e)}
            className={
              order === "ราคาน้อยไปมาก"
                ? "btn btn-primary me-2 btn-sm"
                : "btn btn-outline-primary me-2 btn-sm"
            }
          >
            ราคาน้อยไปมาก
          </button>
        </div>
      </div>
      <br />
      <div className="container">
        <div className="row">
          {sheets.map((item, index) => {
            return (
              <div className="col-lg-4" key={index}>
                <div
                  className="card mb-3 p-2"
                  style={{
                    borderRadius: "15px",
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  }}
                  key={index}
                >
                  <div className="card-body">
                    <h5 className="card-title">วิชา {item.courseTitle}</h5>
                    <h6 className="card-text">
                      โดย{" "}
                      <Link to={"/shop/" + item.user._id}>
                        <span className="badge rounded-pill bg-primary ">
                          {item.user.username}
                        </span>
                      </Link>
                    </h6>
                    <h6 className="card-text">
                      ปี {item.year} สาขา {item.programme}
                    </h6>
                    <h5 className="card-text text-end fw-bold">
                      ราคา{" "}
                      <span className="text-success">
                        {item.price === 0
                          ? "Free"
                          : item.price.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                      </span>{" "}
                      itcoin
                    </h5>
                    <div>
                      <Rating
                        name="read-only"
                        value={
                          item.comment.reduce((a, b) => a + b.rating, 0) /
                          item.comment.length
                        }
                        readOnly
                        precision={0.5}
                      />
                    </div>
                    <div className="d-grid gap-2">
                      <Link to={"/sheet/" + item._id}>
                        <button type="button" className="btn btn-outline-dark">
                          รายละเอียด
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        {data.sheets.length === 0 ? (
          <div className="text-center">
            <h3>ว่างเปล่า</h3>
          </div>
        ) : null}
      </div>
    </>
  )
}
export default Home
