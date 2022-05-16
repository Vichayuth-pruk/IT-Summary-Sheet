import React from "react"
import { Link } from "react-router-dom"
import brand from "../assets/logo.svg"

function Navs() {
  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link className="navbar-brand" to="/">
              <img
                src={brand}
                width={35}
                height={30}
                className="d-inline-block align-text-top"
              />

              <b className="ms-2">IT Summary Sheet</b>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    <span className="badge bg-success">ลงทะเบียน</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signin">
                    เข้าสู่ระบบ
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    <i className="fa-solid fa-house" /> หน้าแรก
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/search">
                    <i className="fa-solid fa-magnifying-glass" /> ค้นหาชีท
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/favorite">
                    <i className="fa-solid fa-star" /> ชีทที่อยากได้
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    <i className="fa-solid fa-cart-shopping" /> ตะกร้า
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}

export default Navs
