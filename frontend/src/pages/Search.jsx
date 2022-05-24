import React, { useEffect, useContext, useState } from "react"
import AuthContext from "../contexts/authContext"
import isLoggedIn from "../middlewares/isLoggedIn"
import { useNavigate } from "react-router-dom"
import Rating from "@mui/material/Rating"

function Search(props) {
  // Middleware
  const me = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    isLoggedIn(props.meta, me, navigate)
  }, [])

  const [search, setSearch] = useState("")

  function handleChange(event) {
    setSearch(event.target.value)
  }

  let test_data = [
    {
      _id: "0",
      subject: "computer programming",
      author: "Prakorn TONNY",
      username: "ZIM",
      year: "ปี2เทอม1",
      program: "IT",
      rating: 5,
      price: 240,
    },
    {
      _id: "1",
      subject: "Computer Organization",
      author: "GUMMY TOKKI",
      username: "ZAM",
      year: "ปี2เทอม1",
      program: "IT",
      rating: 4.3,
      price: 170,
    },
    {
      _id: "2",
      subject: "COMPUTER Vision",
      author: "DEMMY BASS",
      username: "DRUM",
      year: "วิชาเลือก",
      program: "-",
      rating: 3.8,
      price: 210,
    },
    {
      _id: "3",
      subject: "Requirement Engineer",
      author: "DEMMY SOURCE",
      username: "LEAP",
      year: "ปี2เทอม2",
      program: "SE",
      rating: 4.5,
      price: 310,
    },
  ]

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
              onChange={handleChange}
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
          className="btn btn-outline-dark m-1 col-lg-1 col-md-2 col-sm-4"
        >
          ทั้งหมด
        </button>
        <button
          type="button"
          className="btn btn-outline-dark m-1 col-lg-1 col-md-2 col-sm-4"
        >
          วิชา
        </button>
        <button
          type="button"
          className="btn btn-outline-dark m-1 col-lg-1 col-md-2 col-sm-4"
        >
          ชั้นปี
        </button>
        <button
          type="button"
          className="btn btn-outline-dark m-1 col-lg-1 col-md-2 col-sm-4"
        >
          หลักสูตร
        </button>
      </div>

      <div className="container m-4">
        <div className="row">
          {test_data.map((item, index) => {
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
                    <h5 className="card-title">วิชา {item.subject}</h5>
                    <h6 className="card-text">
                      โดย{" "}
                        <span className="badge rounded-pill bg-primary ">
                          {item.username}
                        </span>
                    </h6>
                    <h6 className="card-text">
                      ปี {item.year} สาขา {item.program}
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
                        name="simple-controlled"
                        defaultValue={3}
                        precision={item.rating}
                        readOnly
                        className="mb-3"
                      />
                    </div>
                    <div className="d-grid gap-2">
                        <button type="button" className="btn btn-outline-dark">
                          รายละเอียด
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </>
  )
}

export default Search
