import React, { useEffect, useContext, useState } from "react"
import AuthContext from "../contexts/authContext"
import isLoggedIn from "../middlewares/isLoggedIn"
import { useNavigate } from "react-router-dom"
import { Rating } from "@mui/material"

function Mysheets(props) {
  // Middleware

  const [searchBox, setSearch] = useState("")
  const me = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    isLoggedIn(props.meta, me, navigate)
  }, [])

  //MockData
  let sheetsMock = [
    {
      courseTitle: "COMPUTER PROGRAMMING",
      year: "1",
      programme: "IT",
      sheetFile: "",
      price: 177.0,
      userId: "1011",
      _id: "1",
      createdAt: "",
      updatedAt: "",
      favorite: "",
      username: "Bob",
    },
    {
      courseTitle: "MULTIMEDIA TECHNOLOGY",
      year: "1",
      programme: "IT",
      sheetFile: "",
      price: 100.0,
      userId: "1012",
      _id: "2",
      createdAt: "",
      updatedAt: "",
      favorite: "",
      username: "Alice",
    },
    {
      courseTitle: "DISCRETE MATHEMATICS",
      year: "1",
      programme: "IT",
      sheetFile: "",
      price: 120.0,
      userId: "1013",
      _id: "1",
      createdAt: "",
      updatedAt: "",
      favorite: "",
      username: "Dog",
    },
    {
      courseTitle: "SOFTWARE VERIFICATION AND VALIDATION",
      year: "3",
      programme: "IT",
      sheetFile: "",
      price: 150.0,
      userId: "1014",
      _id: "2",
      createdAt: "",
      updatedAt: "",
      favorite: "",
      username: "Cat",
    },
  ]

  const [dataList, setDataList] = useState(sheetsMock)
  const [filterDataList, setFilterDataList] = useState(dataList)

  useEffect(() => {
    setFilterDataList(() =>
      dataList.filter((data) =>
        data.courseTitle.toLowerCase().includes(searchBox.toLowerCase())
      )
    )
  }, [searchBox])

  return (
    <>
      <div className="h2 row justify-content-center">ชีทของฉัน</div>
      {console.log(searchBox)}
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
                onChange={(text) => setSearch(text.target.value)}
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

      <div className="container">
        <div className="row">
          {filterDataList.map((item, index) => {
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
                    <h6 className="card-text">โดย {item.username}</h6>
                    <h6 className="card-text">
                      ปี {item.year} สาขา {item.programme}
                    </h6>
                    <h5 className="card-text text-end fw-bold">
                      ราคา ฿{item.price}
                    </h5>
                    <div>
                      <Rating
                        name="simple-controlled"
                        defaultValue={item.rating}
                        precision={0.5}
                        readOnly
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
      <br />
    </>
  )
}

export default Mysheets
