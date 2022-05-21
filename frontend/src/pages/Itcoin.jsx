import React, { useEffect, useContext } from "react"
import AuthContext from "../contexts/authContext"
import isLoggedIn from "../middlewares/isLoggedIn"
import { useNavigate } from "react-router-dom"

function Itcoin(props) {
  // Middleware
  const me = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    isLoggedIn(props.meta, me, navigate)
  }, [])

  return (
    <>
      <div className="h2">itcoin</div>
      <hr />
      <br />

      <div className="row justify-content-center">
        <div className='card shadow p-3 mb-3 bg-white rounded ' style={{ height: "80px", width: "280px", textAlign: "center"}}>
          <div className='card-body'>
            <div className='row '>
              <div className='col-8'>
                <h5 className='card-title'>My Coin :  0.00</h5>
              </div>
              <div className='col-4 justify-content-center pb-5 my-auto'>
                <img src="https://cdn-icons-png.flaticon.com/512/1490/1490853.png" style={{ height: "32px", width: "32px", }}></img>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />
      <div className="row justify-content-center">
        <div className='row '>
          <h5 className='card-title '>กรุณาเลือกจํานวน coin ที่ต้องการเติม</h5>
        </div>
      </div>

      <br /><br />
      <div className="row justify-content-around">

        <div className='card shadow p-3 mb-3 bg-white rounded ' style={{ height: "180px", width: "190px", textAlign: "center"}}>
          <div className='card-body'>
            <div className='row '>
              <div className='row rounded mx-auto d-block'>
                <img src="http://surl.li/cakyh" style={{ height: "50px", width: "90px", }}></img>
              </div>
              <div className='row justify-content-center pt-3 pl-5'>
                <div className="col-8 ">
                  <h5 className='card-title text-end'>20</h5>
                </div>
                <div className="col-4 ">
                  <img src="https://cdn-icons-png.flaticon.com/512/1490/1490853.png" style={{ height: "25px", width: "25px", }}></img>
                </div>
              </div>
              <div className='row justify-content-center mx-auto d-block'>
                <div className="col-12">
                  <p className='card-text text-center pl-5'>   (20 บาท)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 50 */}
        <div className='card shadow p-3 mb-3 bg-white rounded ' style={{ height: "180px", width: "190px", textAlign: "center"}}>
          <div className='card-body'>
            <div className='row '>
              <div className='row rounded mx-auto d-block'>
                <img src="http://surl.li/cakyh" style={{ height: "50px", width: "90px", }}></img>
              </div>
              <div className='row justify-content-center pt-3 pl-5'>
                <div className="col-8 ">
                  <h5 className='card-title text-end'>50</h5>
                </div>
                <div className="col-4 ">
                  <img src="https://cdn-icons-png.flaticon.com/512/1490/1490853.png" style={{ height: "25px", width: "25px", }}></img>
                </div>
              </div>
              <div className='row justify-content-center mx-auto d-block'>
                <div className="col-12">
                  <p className='card-text text-center pl-5'>   (50 บาท)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 100 */}
        <div className='card shadow p-3 mb-3 bg-white rounded ' style={{ height: "180px", width: "190px", textAlign: "center"}}>
          <div className='card-body'>
            <div className='row '>
              <div className='row rounded mx-auto d-block'>
                <img src="http://surl.li/cakyh" style={{ height: "50px", width: "90px", }}></img>
              </div>
              <div className='row justify-content-center pt-3 pl-5'>
                <div className="col-8 ">
                  <h5 className='card-title text-end'>100</h5>
                </div>
                <div className="col-4 ">
                  <img src="https://cdn-icons-png.flaticon.com/512/1490/1490853.png" style={{ height: "25px", width: "25px", }}></img>
                </div>
              </div>
              <div className='row justify-content-center mx-auto d-block'>
                <div className="col-12">
                  <p className='card-text text-center pl-5'>   (100 บาท)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 250 */}
        <div className='card shadow p-3 mb-3 bg-white rounded ' style={{ height: "180px", width: "190px", textAlign: "center"}}>
          <div className='card-body'>
            <div className='row '>
              <div className='row rounded mx-auto d-block'>
                <img src="http://surl.li/cakyh" style={{ height: "50px", width: "90px", }}></img>
              </div>
              <div className='row justify-content-center pt-3 pl-5'>
                <div className="col-8 ">
                  <h5 className='card-title text-end'>250</h5>
                </div>
                <div className="col-4 ">
                  <img src="https://cdn-icons-png.flaticon.com/512/1490/1490853.png" style={{ height: "25px", width: "25px", }}></img>
                </div>
              </div>
              <div className='row justify-content-center mx-auto d-block'>
                <div className="col-12">
                  <p className='card-text text-center pl-5'>   (250 บาท)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 500 */}
        <div className='card shadow p-3 mb-3 bg-white rounded ' style={{ height: "180px", width: "190px", textAlign: "center"}}>
          <div className='card-body'>
            <div className='row '>
              <div className='row rounded mx-auto d-block'>
                <img src="http://surl.li/cakyh" style={{ height: "50px", width: "90px", }}></img>
              </div>
              <div className='row justify-content-center pt-3 pl-5'>
                <div className="col-8 ">
                  <h5 className='card-title text-end'>500</h5>
                </div>
                <div className="col-4 ">
                  <img src="https://cdn-icons-png.flaticon.com/512/1490/1490853.png" style={{ height: "25px", width: "25px", }}></img>
                </div>
              </div>
              <div className='row justify-content-center mx-auto d-block'>
                <div className="col-12">
                  <p className='card-text  pl-5'>   (500 บาท)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Itcoin
