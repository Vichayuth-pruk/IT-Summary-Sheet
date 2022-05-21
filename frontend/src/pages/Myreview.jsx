import React, { useEffect, useContext } from "react"
import AuthContext from "../contexts/authContext"
import isLoggedIn from "../middlewares/isLoggedIn"
import { useNavigate } from "react-router-dom"
import Rating from "@mui/material/Rating"

function Myreview(props) {
  // Middleware
  const me = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    isLoggedIn(props.meta, me, navigate)
  }, [])

  //MockData
  let reviewMock = [
    {
      _id: "1",
      sheetName: "COMPUTER PROGRAMMING (akira)",
      review: "ดีมากกกกกกกกกกก",
      createdAt: "12 มีนาคม 2022 23:47:07",
      rating: 5,
    },
    {
      _id: "2",
      sheetName: "MULTIMEDIA TECHNOLOGY (docxed)",
      review: "ดีโครตตตตตตตตตต",
      createdAt: "13 มีนาคม 2022 22:22:22",
      rating: 4.5,
    },
  ]
  return (
    <>
      <div className="h2">รีวิวของฉัน</div>
      <hr />
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {reviewMock.map((item, index) => {
              return (
                <div
                  className="card mb-3 p-2"
                  style={{
                    borderRadius: "15px",
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  }}
                  key={index}
                >
                  <div className="card-body">
                    <h5 className="card-title">{item.sheetName}</h5>
                    <div>
                      <Rating
                        name="simple-controlled"
                        defaultValue={item.rating}
                        precision={0.5}
                        readOnly
                      />
                    </div>
                    <p className="card-text">{item.review}</p>
                    <p className="card-text text-end">{item.createdAt}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Myreview
