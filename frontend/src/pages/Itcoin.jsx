import React, { useEffect, useContext, useState } from "react"
import AuthContext from "../contexts/authContext"
import isLoggedIn from "../middlewares/isLoggedIn"
import { useNavigate, Link } from "react-router-dom"
import coins from "../assets/coins.jpg"
import Swal, { swal } from "sweetalert2/dist/sweetalert2.all.min.js"
import { ADD_ITCOIN_MUTATION } from "../graphql/userMutation"
import { useMutation } from "@apollo/client"

function Itcoin(props) {
  // Middleware
  const me = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    isLoggedIn(props.meta, me, navigate)
  }, [])

  // State
  const [price, setPrice] = useState([20, 50, 100, 250, 500])

  const [additcoin] = useMutation(ADD_ITCOIN_MUTATION)
  const onSubmitCoin = (coin) => {
    try {
      Swal.fire({
        title: "คุณต้องการซื้อ itcoin ใช่หรือไม่?",
        text: `คุณจะได้รับ itcoin เพิ่มขึ้น ${coin.toLocaleString()} ทันที`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ใช่",
        cancelButtonText: "ไม่ใช่",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await additcoin({
            variables: {
              itcoin: coin,
            },
          })
          Swal.fire({
            title: "บันทึกสำเร็จ",
            icon: "success",
          })
          props.refetch()
        }
      })
    } catch (errors) {
      console.log(errors)
      Swal.fire({
        title: "บันทึกไม่สำเร็จ",
        text: errors.message,
        icon: "error",
        timer: 1500,
      })
    }
  }

  return (
    <>
      <div className="h2">เติม itcoin</div>
      <hr />
      <br />

      <div className="row justify-content-center">
        <div
          className="card shadow p-3 mb-3 bg-white rounded "
          style={{ height: "80px", width: "430px", textAlign: "center" }}
        >
          <div className="card-body">
            <div className="row ">
              <div className="col-8">
                <h5 className="card-title">
                  My itcoin :{" "}
                  {me.itcoin.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </h5>
              </div>
              <div className="col-4 justify-content-center pb-5 my-auto">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1490/1490853.png"
                  style={{ height: "32px", width: "32px" }}
                ></img>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />
      <div className="row justify-content-center">
        <div className="row ">
          <h5 className="card-title ">กรุณาเลือกจํานวน coin ที่ต้องการเติม</h5>
        </div>
      </div>

      <br />
      <br />

      <div className="row justify-content-around">
        {price.map((item, index) => (
          <div
            className="card shadow p-3 mb-3 bg-white rounded"
            style={{
              height: "180px",
              width: "190px",
              textAlign: "center",
              cursor: "pointer",
            }}
            key={index}
            onClick={() => onSubmitCoin(item)}
          >
            <div className="card-body">
              <div className="row ">
                <div className="row rounded mx-auto d-block">
                  <img
                    src={coins}
                    style={{ height: "50px", width: "90px" }}
                  ></img>
                </div>
                <div className="row justify-content-center pt-3 pl-5">
                  <div className="col-8 ">
                    <h5 className="card-title text-end">
                      {item.toLocaleString()}
                    </h5>
                  </div>
                  <div className="col-4 ">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1490/1490853.png"
                      style={{ height: "25px", width: "25px" }}
                    ></img>
                  </div>
                </div>
                <div className="row justify-content-center mx-auto d-block">
                  <div className="col-12">
                    <p className="card-text text-center pl-5">
                      {" "}
                      ({item.toLocaleString()} บาท)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Itcoin
