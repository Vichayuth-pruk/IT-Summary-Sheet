import React, { useEffect, useContext } from "react"
import AuthContext from "../contexts/authContext"
import isLoggedIn from "../middlewares/isLoggedIn"
import { useNavigate } from "react-router-dom"
import Rating from "@mui/material/Rating"

function Home(props) {
  // Middleware
  const me = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    isLoggedIn(props.meta, me, navigate)
  }, [])

  //MockData
  let sheetsMock = [
    {
      'courseTitle': 'COMPUTER PROGRAMMING',
      'year': '1',
      'programme': 'IT',
      'sheetFile': '',
      'price': 177.00,
      'userId': '1011',
      '_id': '1',
      'createdAt': '',
      'updatedAt': '',
      'favorite': '',
      'username': 'Bob'
    },
    {
      'courseTitle': 'MULTIMEDIA TECHNOLOGY',
      'year': '1',
      'programme': 'IT',
      'sheetFile': '',
      'price': 100.00,
      'userId': '1012',
      '_id': '2',
      'createdAt': '',
      'updatedAt': '',
      'favorite': '',
      'username': 'Alice'
    },
    {
      'courseTitle': 'DISCRETE MATHEMATICS',
      'year': '1',
      'programme': 'IT',
      'sheetFile': '',
      'price': 120.00,
      'userId': '1013',
      '_id': '1',
      'createdAt': '',
      'updatedAt': '',
      'favorite': '',
      'username': 'Dog'
    },
    {
      'courseTitle': 'SOFTWARE VERIFICATION AND VALIDATION',
      'year': '3',
      'programme': 'IT',
      'sheetFile': '',
      'price': 150.00,
      'userId': '1014',
      '_id': '2',
      'createdAt': '',
      'updatedAt': '',
      'favorite': '',
      'username': 'Cat' 
    }
  ]
  return (
    <>
      <div className="h2">หน้าแรก</div>
      <hr />
      <br />
      <br />
      <div className="container">
        <div className="row">
          {
            sheetsMock.map((item, index) => {
              return (
                <div className="col-lg-4" key={index}>
                  <div className='card mb-3 p-2' style={{ borderRadius: '15px', boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }} key={index}>
                    <div className='card-body'>
                      <h5 className='card-title'>วิชา {item.courseTitle}</h5>
                      <h6 className='card-text'>โดย {item.username}</h6>
                      <h6 className='card-text'>ปี {item.year} สาขา {item.programme}</h6>
                      <div>
                        <Rating
                          name="simple-controlled"
                          defaultValue={item.rating}
                          precision={0.5}
                          readOnly
                        />
                      </div>
                      <div className="d-grid gap-2">
                        <button type="button" className="btn btn-dark">ราคา ฿{item.price}</button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}
export default Home
