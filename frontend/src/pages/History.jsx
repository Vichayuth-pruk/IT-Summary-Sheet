import React, { useEffect, useContext, Tab, useState } from "react"
import AuthContext from "../contexts/authContext"
import isLoggedIn from "../middlewares/isLoggedIn"
import { useNavigate } from "react-router-dom"

function History(props) {
  // Middleware
  const me = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    isLoggedIn(props.meta, me, navigate)
  }, [])

  const [select, setSelect] = useState("")

  function handleChange(event) {
    setSelect(event.target.value)
  }

  let test_data = [
    {
      _id: "0",
      date_time: "12 มีนาคม 2022 20:13:09",
      purchase_id: "01",
      status: "รายการสำเร็จ",
      total_price: "฿240",
      purchase_way: "itcoin",
      catalouge: [
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
      ],
    },
    {
      _id: "1",
      date_time: "20 มกราคม 2022 12:13:09",
      purchase_id: "02",
      status: "รายการสำเร็จ",
      total_price: "฿170",
      purchase_way: "itcoin",
      catalouge: [
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
      ],
    },
  ]

  return (
    <>
      <div className="h2 text-center">ประวัติการสั่งซื้อของฉัน</div>
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
              <option value="year">1</option>
            </select>
          </div>
        </div>
      </div>
      <hr />
      <br />
      <br />

      <div className="table-responsive-sm d-flex-justify-content-center">
        <table className="table">
          <thead>
            <tr>
              <th className="text-center">วันที่ทำรายการ</th>
              <th className="text-center">หมายเลขคำสั่งซื้อ</th>
              <th className="text-center">สถานะ</th>
              <th className="text-center">ยอดชำระ</th>
              <th className="text-center">ช่องทางชำระเงิน</th>
              <th className="text-center">รายการสั่งซื้อ</th>
            </tr>
          </thead>
          <tbody>
            {test_data.map((item, index) => {
              return (
                <tr key={index}>
                  <td className="text-center">{item.date_time}</td>
                  <td className="text-center">{item.purchase_id}</td>
                  <td className="text-center">{item.status}</td>
                  <td className="text-center">
                    {item.total_price}{" "}
                    <i className="fa-solid fa-sack-dollar"></i>
                  </td>
                  <td className="text-center">{item.purchase_way}</td>
                  <td className="text-center">
                    <a href="#" className="badge bg-info">
                      {item.catalouge.length}
                    </a>
                    <div>
                      {item.catalouge.map((item, index) => {
                        return (
                          <div key={index}>
                            {" "}
                            {item.subject}({item.username}){" "}
                          </div>
                        )
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
  )
}

export default History
