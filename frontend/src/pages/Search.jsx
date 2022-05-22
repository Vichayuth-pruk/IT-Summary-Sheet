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

      <div className="m-4">
        <div className="row">
          {test_data.map((item, index) => {
            return (
              <div className="col-lg-3 col-md-6 col-sm-12" key={index}>
                <div className="card  mb-4">
                  <div className="card-body">
                    <p className="card-title">
                      วิชา: {item.subject} ({item.username})
                    </p>
                    <p className="card-text">ชั้นปี: {item.year}</p>
                    <p className="card-text">หลักสูตร: {item.program}</p>
                    <p className="card-text">โดย: {item.author}</p>
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12">
                      <Rating
                        name="simple-controlled"
                        defaultValue={item.rating}
                        precision={0.5}
                        readOnly
                        className="mb-2"
                        size="small"
                      />
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center">
                        <span>
                          <button className="btn btn-outline-dark ml-10 ">
                            ฿{item.price}
                          </button>
                        </span>
                      </div>
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
