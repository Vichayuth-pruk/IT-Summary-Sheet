import React from "react"
import { Link } from "react-router-dom"
import brand from "../assets/favicon.svg"

function Navs(props) {
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
                {props.me ? (
                  <></>
                ) : (
                  <>
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
                  </>
                )}
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
                    <i className="fa-solid fa-heart" /> ชีทที่อยากได้{" "}
                    {props.fav?.favorites?.length === 0 ? (
                      <></>
                    ) : (
                      <span className="badge rounded-pill bg-danger">
                        {props.fav?.favorites?.length ?? ""}
                      </span>
                    )}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    <i className="fa-solid fa-cart-shopping" /> ตะกร้า
                  </Link>
                </li>
                {props.me ? (
                  <>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="navbarDropdownMenuLink"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {props.me.email}
                      </a>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdownMenuLink"
                      >
                        <li>
                          <Link className="dropdown-item" to="/account">
                            บัญชี
                          </Link>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <div className="dropdown-item">
                            itcoin{" "}
                            {props.me.itcoin.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}{" "}
                            <Link to="/itcoin">
                              <span className="badge badge-sm bg-primary">
                                เติม coin
                              </span>
                            </Link>
                          </div>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <Link to="/history" className="dropdown-item">
                            ประวัติการสั่งซื้อ
                          </Link>
                        </li>
                        <li>
                          <Link to="/mysheets" className="dropdown-item">
                            ชีทของฉัน
                          </Link>
                        </li>
                        <li>
                          <Link to="/myreview" className="dropdown-item">
                            รีวิวของฉัน
                          </Link>
                        </li>
                        <li>
                          <Link to="/sheetsmanage" className="dropdown-item">
                            ฉันต้องการขายชีท
                          </Link>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <span
                            style={{ cursor: "pointer" }}
                            className="dropdown-item text-danger"
                            onClick={props.logout}
                          >
                            ออกจากระบบ
                          </span>
                        </li>
                      </ul>
                    </li>
                  </>
                ) : (
                  <></>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}

export default Navs
