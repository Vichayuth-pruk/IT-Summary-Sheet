import React, { useEffect, useContext, useState, useCallback } from "react"
import AuthContext from "../contexts/authContext"
import isLoggedIn from "../middlewares/isLoggedIn"
import { useNavigate, Link } from "react-router-dom"
import Rating from "@mui/material/Rating"
import { SHEET_QUERY } from "../graphql/sheetQuery"
import { useQuery } from "@apollo/client"
import Spinner from "../components/Spinner"

function Search(props) {
  // Middleware
  const me = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    isLoggedIn(props.meta, me, navigate)
    refetch()
  }, [])

  // State
  const [srload, setSrload] = useState(false)
  const [sheets, setSheets] = useState([])
  const [input, setInput] = useState("")

  const [srBy, setSrBy] = useState("courseTitle")

  const { loading, error, data, refetch } = useQuery(SHEET_QUERY, {
    onCompleted: (data) => {
      setSheets(data.sheets)
    },
  })

  const handleSearch = async () => {
    let result
    setSheets([])
    setSrload(true)
    if (input === "" || input === undefined) {
      setSheets(data?.sheets)
      setSrload(false)
      return
    }
    setTimeout(() => {
      if (srBy === "courseTitle") {
        result = data?.sheets.filter(
          (sheet) => sheet.courseTitle.search(input.toUpperCase()) !== -1
        )
      } else if (srBy === "year") {
        result = data?.sheets.filter((sheet) => sheet.year.search(input) != -1)
      } else if (srBy === "programme") {
        result = data?.sheets.filter(
          (sheet) => sheet.programme.search(input.toUpperCase()) !== -1
        )
      }
      setSrload(false)
      setSheets(result)
    }, 300)
  }
  useEffect(() => {
    handleSearch()
  }, [input, srBy])

  if (loading) return <Spinner />
  return (
    <>
      <div className="h2">ค้นหาชีท</div>
      <hr />
      <br />
      <br />
      <div className="container d-flex justify-content-center pb-4">
        <div className="col-lg-6 col-md-8 col-sm-12">
          <div className="input-group mb-3 ">
            <input
              type="text"
              className="form-control"
              placeholder="ค้นหาชีท"
              onChange={(e) => setInput(e.target.value)}
            />
            <span className="input-group-text">
              <i className="fas fa-search"></i>
            </span>
          </div>
        </div>
      </div>

      <div className="container">
        <button
          type="button"
          onClick={() => {
            setSrBy("courseTitle")
          }}
          className={
            "btn m-1 col-lg-1 col-md-2 col-sm-4" +
            (srBy === "courseTitle" ? " btn-primary" : " btn-outline-primary")
          }
        >
          วิชา
        </button>
        <button
          type="button"
          onClick={() => {
            setSrBy("year")
          }}
          className={
            "btn m-1 col-lg-1 col-md-2 col-sm-4" +
            (srBy === "year" ? " btn-primary" : " btn-outline-primary")
          }
        >
          ชั้นปี
        </button>
        <button
          type="button"
          onClick={() => {
            setSrBy("programme")
          }}
          className={
            "btn m-1 col-lg-1 col-md-2 col-sm-4" +
            (srBy === "programme" ? " btn-primary" : " btn-outline-primary")
          }
        >
          สาขา
        </button>
      </div>
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
      <div className="container m-4">
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
      </div>
      {sheets.length === 0 && srload === false ? (
        <div className="text-center">
          <h3>ไม่มีชีท</h3>
        </div>
      ) : null}
    </>
  )
}

export default Search
