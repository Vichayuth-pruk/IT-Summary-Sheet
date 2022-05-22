import React, { useEffect, useContext } from "react"
import AuthContext from "../contexts/authContext"
import isLoggedIn from "../middlewares/isLoggedIn"
import { useNavigate, Link } from "react-router-dom"

function Cart(props) {
  // Middleware
  const me = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    isLoggedIn(props.meta, me, navigate)
  }, [])

  let test_data = [
    {
      _id: "0",
      subject: "computer programming",
      author: "Prakorn TONNY",
      username: "ZIM",
      year: "ปี2เทอม1",
      program: "IT",
      img: "https://cdn.pixabay.com/photo/2016/10/18/21/22/beach-1751455_960_720.jpg",
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
      img: "https://cdn.pixabay.com/photo/2016/10/18/21/22/beach-1751455_960_720.jpg",
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
      img: "https://cdn.pixabay.com/photo/2016/10/18/21/22/beach-1751455_960_720.jpg",
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
      img: "https://cdn.pixabay.com/photo/2016/10/18/21/22/beach-1751455_960_720.jpg",
      rating: 4.5,
      price: 310,
    },
  ]

  return (
    <>
      <div className="h2 text-center">ตะกร้า</div>
      <hr />
      <br />
      <div className="container">
        {test_data.map((item, index) => {
          return (
            <div key={index}>
              <div className="row m-4">
                <div className="col-lg-4 col-md-4 col-sm-12 d-flex justify-content-center m-auto">
                  <i className="fa-solid fa-file-lines fa-3x"></i>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 mt-3">
                  <h5>
                    {item.subject} ({item.username})
                  </h5>
                  <p>
                    {item.year} สาขา {item.program}
                  </p>
                  <p>฿{item.price}</p>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 d-flex justify-content-center m-auto">
                  <button className="btn btn-outline-secondary">ลบ</button>
                </div>
              </div>
              <hr />
            </div>
          )
        })}

        <div className="container d-flex justify-content-center mb-5">
          <Link to="/search">เลือกซื้อหนังสือเล่มอื่นต่อ</Link>
        </div>

        <div className="container d-flex justify-content-center bg-secondary text-white p-2">
          <div className="row d-flex justify-content-center">
            <h5 className=" d-flex justify-content-center mb-3">
              ยอดชำระ ฿720
            </h5>
            <Link to="/checkout" className="btn col-8">
              <button className="btn btn-info">ไปที่หน้าชำระเงิน</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart
