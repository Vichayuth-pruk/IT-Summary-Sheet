import React, { useEffect, useContext, useState } from "react"
import AuthContext from "../contexts/authContext"
import isLoggedIn from "../middlewares/isLoggedIn"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2/dist/sweetalert2.all.min.js"
import { CART_BY_USERID_QUERY } from "../graphql/cartQuery"
import { PAYMENT_MUTATION } from "../graphql/paymentMutation"
import { useQuery, useMutation } from "@apollo/client"

function Checkout(props) {
  // Middleware
  const me = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    isLoggedIn(props.meta, me, navigate)
    refetch()
  }, [])

  // State
  const [paymentMethod, setPaymentMethod] = useState("itcoin")

  const { loading, error, data, refetch } = useQuery(CART_BY_USERID_QUERY, {
    variables: {
      userId: me?._id,
    },
    skip: !me?._id,
  })

  function price() {
    return data.carts
      .reduce((a, b) => a + b.sheet.price, 0)
      .toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
  }

  const makeid = (length) => {
    let result = ""
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result.toUpperCase()
  }

  const [createPayment] = useMutation(PAYMENT_MUTATION)
  const payHandler = (price) => {
    const userId = me._id
    Swal.fire({
      title: `ยืนยันการชำระเงิน ยอดชำระ ${price} itcoin`,
      // text: `ยอดชำระ ${price} บาท`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ชำระเงิน",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await createPayment({
            variables: {
              record: {
                paymentId: makeid(5),
                state: "pending",
                amount: data.carts.reduce((a, b) => a + b.sheet.price, 0),
                method: paymentMethod,
                items: data.carts,
                userId: userId,
              },
            },
          })

          await refetch()
          await props.fav()
          await props.cart()
          Swal.fire(
            "ชำระเงินสำเร็จ!",
            "ชำระเงินสำเร็จแล้ว ไฟล์ชีทจะอยูที่หน้าชีทของฉันและอย่าลืมไปรีวิวหน้าชีทด้วยนะจ้ะ",
            "success"
          )
          navigate("/history")
        } catch (error) {
          console.log(error)
          Swal.fire({
            title: "ไม่สำเร็จ",
            text: error.message,
            icon: "error",
            timer: 3000,
          }).then(() => {
            if (error.message === "itcoin ของคุณไม่เพียงพอ") {
              navigate("/itcoin")
            }
          })
        }
      }
    })
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
      <div className="h2">ชำระเงิน</div>
      <hr />
      <br />
      <br />
      {data.carts.length === 0 ? null : (
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
                  defaultChecked={paymentMethod === "itcoin" ? true : false}
                />
                <label className="form-check-label">itcoin</label>
              </div>
            </div>
            <div className="col-lg-7 mx-lg-3 mt-5">
              <div>
                <h4>สรุปรายการที่สั่งซื้อ {data.carts.length} รายการ</h4>
                <hr />
                {data.carts.map((item, index) => {
                  return (
                    <div
                      className="d-flex justify-content-between"
                      key={item._id}
                    >
                      <p>
                        {index + 1}. {item.sheet.courseTitle}
                      </p>
                      <p>
                        {item.sheet.price.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}{" "}
                        itcoin
                      </p>
                    </div>
                  )
                })}
              </div>
              <div className="text-center d-grid gap-2 mt-5">
                <h2 className="fw-bold text-danger">
                  ยอดชำระเงิน {price()} itcoin
                </h2>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => payHandler(price())}
                >
                  ชำระเงิน
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Checkout
