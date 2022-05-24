import React, { useEffect, useContext, useState } from "react"
import AuthContext from "../contexts/authContext"
import isLoggedIn from "../middlewares/isLoggedIn"
import { useNavigate, Link, useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { SHEET_BY_USERID_QUERY } from "../graphql/sheetQuery"
import { GET_USER_QUERY } from "../graphql/userQuery"
import Rating from "@mui/material/Rating"
import Spinner from "../components/Spinner"

function Shop(props) {
  // Middleware
  const me = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    isLoggedIn(props.meta, me, navigate)
    refetch()
  }, [])

  const { id } = useParams()

  // State
  const [sheets, setSheets] = useState([])
  const [srload, setSrload] = useState(false)
  const { loading, error, data, refetch } = useQuery(SHEET_BY_USERID_QUERY, {
    variables: {
      userId: id,
    },
    skip: !id,
    onCompleted: (data) => {
      setSheets(data.sheets)
    },
  })

  const userRes = useQuery(GET_USER_QUERY, {
    variables: {
      userId: id,
    },
    skip: !id,
  })

  const handleSearch = (e) => {
    setSrload(true)
    setTimeout(() => {
      let result = data.sheets.filter(
        (sheet) => sheet.courseTitle.search(e.toUpperCase()) !== -1
      )
      setSheets(result)
      setSrload(false)
    }, 300)
  }

  if (loading || userRes.loading) return <Spinner />
  return (
    <>
      <div className="h2">
        ชีทโดย{" "}
        <span className="badge rounded-pill bg-primary ">
          {userRes.data.userId.username}
        </span>
      </div>
      <hr />
      <br />

      <div className="row mb-3">
        <div className="col-lg-5 col-md-7 col-sm-12">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="ค้นหา"
              aria-describedby="inputGroup-sizing-default"
              onChange={(e) => handleSearch(e.target.value)}
            />
            <span className="input-group-text" id="inputGroup-sizing-default">
              <i className="fas fa-search" />
            </span>
          </div>
        </div>
      </div>

      <br />
      {srload && (
        <div className="h1 text-center">
          <br />
          <br />
          <br />
          <div className="spinner-grow text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
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
            <h3>ไม่มีชีท</h3>
          </div>
        ) : null}
      </div>
    </>
  )
}

export default Shop
