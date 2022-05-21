import React, { useEffect, useContext, useState } from "react"
import AuthContext from "../contexts/authContext"
import isLoggedIn from "../middlewares/isLoggedIn"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2/dist/sweetalert2.all.min.js"

function Checkout(props) {
  // Middleware
  const me = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    isLoggedIn(props.meta, me, navigate)
  }, [])

  const [checked, setChecked] = useState(true)

  //MockData
  let ordersMock = [
    {
      _id: "1",
      orderItem: "COMPUTER PROGRAMMING (akira)",
      price: 177,
    },
    {
      _id: "2",
      orderItem: "MULTIMEDIA TECHNOLOGY (docxed)",
      price: 100,
    },
  ]
  let allPrice = ordersMock.map((item) => {
    return item.price
  })
  let price = allPrice.reduce((a, b) => a + b, 0)
  // console.log('price: ', price);

  function payHandler(price) {
    Swal.fire({
      title: `ยืนยันการชำระเงิน ยอดชำระ ${price} บาท`,
      // text: `ยอดชำระ ${price} บาท`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ชำระเงิน",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "ชำระเงินสำเร็จ!",
          "ชำระเงินสำเร็จแล้วจ้า ไฟล์ชีตจะอยูที่หน้าชีทของฉัน ",
          "success"
        )
      }
    })
  }
  return (
    <>
      <div className="h2">ชำระเงิน</div>
      <hr />
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <h3>เลือกช่องทางชำระเงิน</h3>
            <div
              style={{
                padding: "35px",
                border: "1px solid black",
                borderRadius: "15px",
              }}
              className="form-check bg-light"
            >
              <input
                className="form-check-input"
                type="radio"
                defaultChecked={checked}
              />
              <label className="form-check-label">itcoin</label>
            </div>
          </div>
          <div className="col-lg-7 mx-lg-3 mt-5">
            <div>
              <h4>สรุปรายการที่สั่งซื้อ {ordersMock.length} รายการ</h4>
              <hr />
              {ordersMock.map((item, index) => {
                return (
                  <div className="d-flex justify-content-between" key={index}>
                    <p>
                      {index + 1}. {item.orderItem}
                    </p>
                    <p>฿{item.price}</p>
                  </div>
                )
              })}
            </div>
            <div className="text-center d-grid gap-2 mt-5">
              <h2 className="fw-bold text-danger">ยอดชำระเงิน ฿{price}</h2>
              <button
                type="button"
                className="btn btn-success"
                onClick={() => payHandler(price)}
              >
                ชำระเงิน
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout
