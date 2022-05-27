import React, { useEffect, useContext } from "react"
import AuthContext from "../contexts/authContext"
import isLoggedIn from "../middlewares/isLoggedIn"
import { useNavigate, Link } from "react-router-dom"
import { CART_BY_USERID_QUERY } from "../graphql/cartQuery"
import { DELETE_CART_MUTATION } from "../graphql/cartMutation"
import { useQuery, useMutation } from "@apollo/client"
import Spinner from "../components/Spinner"

function Cart(props) {
  // Middleware
  const me = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    isLoggedIn(props.meta, me, navigate)
    refetch()
  }, [])

  // State
  const { loading, error, data, refetch } = useQuery(CART_BY_USERID_QUERY, {
    variables: {
      userId: me?._id,
    },
    skip: !me?._id,
  })

  const [deleteCart] = useMutation(DELETE_CART_MUTATION)
  const submitDeleteCart = async (cartId) => {
    try {
      await deleteCart({
        variables: {
          cartId: cartId,
        },
      })
      await refetch()
    } catch (error) {
      console.log(error)
    }
  }

  if (loading) return <Spinner />
  return (
    <>
      <div className="h2">
        ตะกร้า{" "}
        <span className="badge rounded-pill bg-danger ">
          {data.carts.length}
        </span>{" "}
        รายการ
      </div>
      <hr />
      <br />

      {data.carts.length === 0 ? (
        <div className="text-center h4">ไม่มี</div>
      ) : (
        <div className="container">
          {data.carts.map((cart, index) => {
            return (
              <div key={cart._id}>
                <div className="row m-4">
                  <div className="col-lg-10 col-md-12 col-sm-12  m-auto">
                    <Link
                      to={"/sheet/" + cart.sheet._id}
                      className="text-dark"
                      style={{ textDecoration: "none" }}
                    >
                      <div className="row m-1">
                        <div className="col-lg-1 col-md-12 col-sm-12 d-flex justify-content-center  m-auto">
                          <i className="fa-solid fa-file-lines fa-3x"></i>
                        </div>
                        <div className="col-lg-7 col-md-12 col-sm-12  mt-3   m-auto ">
                          <div className="row">
                            <p className="col-lg-5 col-md-12 col-sm-12 d-flex justify-content-center text-center  m-auto">
                              {cart.sheet.courseTitle} (
                              {cart.sheet.user.username})
                            </p>

                            <p className="col-lg-3 col-md-12 col-sm-12 d-flex justify-content-center text-center  m-auto">
                              ปี {cart.sheet.year} สาขา {cart.sheet.programme}
                            </p>

                            <p className="col-lg-4 col-md-12 col-sm-12 d-flex justify-content-center text-center  m-auto">
                              ราคา{" "}
                              {cart.sheet.price.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}{" "}
                              itcoin
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="col-lg-2 col-md-12 col-sm-12 d-flex justify-content-center m-auto">
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => submitDeleteCart(cart._id)}
                    >
                      ลบ
                    </button>
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
                ยอดชำระ{" "}
                {data.carts
                  .reduce((a, b) => a + b.sheet.price, 0)
                  .toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                itcoin
              </h5>
              <Link to="/checkout" className="btn col-8">
                <button className="btn btn-info">ไปที่หน้าชำระเงิน</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Cart
