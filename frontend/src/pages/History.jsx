import React, { useEffect, useContext, Tab, useState } from "react"
import AuthContext from "../contexts/authContext"
import isLoggedIn from "../middlewares/isLoggedIn"
import { useNavigate } from "react-router-dom"
import { PAYMENT_QUERY } from "../graphql/paymentQuery"
import { useQuery } from "@apollo/client"
import moment from "moment"
import Spinner from "../components/Spinner"

function History(props) {
  // Middleware
  const me = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    isLoggedIn(props.meta, me, navigate)
    refetch()
  }, [])

  const [select, setSelect] = useState("all")

  // State
  const [payments, setPayments] = useState([])
  const { loading, error, data, refetch } = useQuery(PAYMENT_QUERY, {
    variables: {
      filter: {
        userId: me?._id,
      },
    },
    skip: !me?._id,
    onCompleted: (data) => {
      setPayments(data.payments)
    },
  })

  function handleChange(event) {
    setSelect(event.target.value)
    if (event.target.value === "all") {
      refetch()
      setPayments(data.payments)
    } else if (event.target.value === "week") {
      setPayments(
        payments.filter((payment) => {
          return moment(payment.dates).isAfter(moment().subtract(7, "days"))
        })
      )
    } else if (event.target.value === "1month") {
      setPayments(
        payments.filter((payment) => {
          return moment(payment.dates).isAfter(moment().subtract(30, "days"))
        })
      )
    } else if (event.target.value === "3month") {
      setPayments(
        payments.filter((payment) => {
          return moment(payment.dates).isAfter(moment().subtract(90, "days"))
        })
      )
    } else if (event.target.value === "6month") {
      setPayments(
        payments.filter((payment) => {
          return moment(payment.dates).isAfter(moment().subtract(180, "days"))
        })
      )
    } else if (event.target.value === "year") {
      setPayments(
        payments.filter((payment) => {
          return moment(payment.dates).isAfter(moment().subtract(365, "days"))
        })
      )
    }
  }

  if (loading) return <Spinner />
  return (
    <>
      <div className="h2 text-center">ประวัติการสั่งซื้อของฉัน</div>
      {data.payments.length === 0 ? (
        <div className="text-center h4">
          <hr />
          <br />
          ไม่มี
        </div>
      ) : (
        <>
          <div className="container d-flex justify-content-start">
            <div className="row d-flex justify-content-centers">
              <div className="container">
                <p>ช่วงเวลา</p>
              </div>
              <div className="container">
                <select defaultValue={"all"} onChange={handleChange}>
                  <option value="all">ทั้งหมด</option>
                  <option value="week">7 วันล่าสุด</option>
                  <option value="1month">1 เดือน</option>
                  <option value="3month">3 เดือน</option>
                  <option value="6month">6 เดือน</option>
                  <option value="year">1 ปี</option>
                </select>
              </div>
            </div>
          </div>
          <hr />
          <br />
          <br />

          <div className="table-responsive-sm  ">
            <table className="table  align-middle ">
              <thead>
                <tr className="text-center" style={{ whiteSpace: "nowrap" }}>
                  <th className="text-center th-sm">วันที่ทำรายการ</th>
                  <th className="text-center th-sm">หมายเลขคำสั่งซื้อ</th>
                  <th className="text-center th-sm">สถานะ</th>
                  <th className="text-center th-sm">ยอดชำระ</th>
                  <th className="text-center th-sm">ช่องทางชำระเงิน</th>
                  <th className="text-center th-sm">รายการสั่งซื้อ</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((item) => {
                  return (
                    <tr key={item._id} className=" text-center ">
                      <td className="text-center">
                        {moment(item.dates).format("LLLL")}
                      </td>
                      <td className="text-center">{item.paymentId}</td>
                      <td className="text-center">{item.state}</td>
                      <td className="text-center">
                        {item.amount.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}{" "}
                        <i className="fa-solid fa-sack-dollar"></i>
                      </td>
                      <td className="text-center">{item.method}</td>
                      <td className="text-center">
                        <span className="badge bg-info">
                          {item.items.length}
                        </span>
                        <div>
                          {item.items.map((i, index) => {
                            return <div key={index}> {i} </div>
                          })}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  )
}

export default History
