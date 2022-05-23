import React, { useEffect, useContext, useState } from "react"
import AuthContext from "../contexts/authContext"
import isLoggedIn from "../middlewares/isLoggedIn"
import { useNavigate, Link } from "react-router-dom"
import { Rating } from "@mui/material"

function Mysheets(props) {
  // Middleware
  const me = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    isLoggedIn(props.meta, me, navigate)
    setMines(me.mines)
  }, [])

  const [mines, setMines] = useState([])
  const [srload, setSrload] = useState(false)

  const handleSearch = (e) => {
    setMines([])
    setSrload(true)
    setTimeout(() => {
      if (e === "" || e === undefined) {
        setMines(me.mines)
        setSrload(false)
        return
      }
      let result = me.mines.filter(
        (sheet) => sheet.courseTitle.search(e.toUpperCase()) !== -1
      )
      setMines(result)
      setSrload(false)
    }, 300)
  }

  return (
    <>
      <div className="h2 row justify-content-center">ชีทของฉัน</div>
      <br />
      <div className="row">
        <div className="row mt-5">
          <div className="col-md-5 ">
            <div className="input-group">
              <input
                className="form-control border-end-0 border"
                type="search"
                id="example-search-input"
                placeholder="search"
                onChange={(e) => handleSearch(e.target.value)}
              />
              <span className="input-group-append">
                <button
                  className="btn btn-outline-secondary bg-white border-start-0 border-bottom-0 border ms-n5"
                  type="button"
                >
                  <i className="fa fa-search"></i>
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <hr />
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
          {mines.map((item, index) => {
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
                    <Link
                      to={"/mysheet/" + index + "?pov=buyer"}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="d-grid gap-2">
                        <button type="button" className="btn btn-outline-dark">
                          ดูชีท
                        </button>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      {mines.length === 0 && srload === false ? (
        <div className="text-center">
          <h3>ไม่มีชีท</h3>
        </div>
      ) : null}
      <br />
    </>
  )
}

export default Mysheets
