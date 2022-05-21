import React, { useEffect, useContext } from "react"
import AuthContext from "../contexts/authContext"
import isLoggedIn from "../middlewares/isLoggedIn"
import { useNavigate, Link } from "react-router-dom"
import { SHEET_BY_USERID_QUERY } from "../graphql/sheetQuery"
import { DELETE_SHEET_MUTATION } from "../graphql/sheetMutation"
import { useQuery, useMutation } from "@apollo/client"
import moment from "moment"
import Swal from "sweetalert2/dist/sweetalert2.all.min.js"

function Sheetsmanage(props) {
  // Middleware
  const me = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    isLoggedIn(props.meta, me, navigate)
    refetch()
  }, [])

  // State
  const { loading, error, data, refetch } = useQuery(SHEET_BY_USERID_QUERY, {
    variables: {
      userId: me._id,
    },
    skip: !me._id,
  })

  const [deleteSheet] = useMutation(DELETE_SHEET_MUTATION)
  const onSubmitDeleteSheet = async (sheetId) => {
    Swal.fire({
      title: "คุณต้องการลบไฟล์ชีทนี้หรือไม่?",
      text: "การลบไฟล์ชีทนี้จะไม่สามารถกู้คืนได้",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#DC3545",
      cancelButtonColor: "#6E7881",
      confirmButtonText: "ลบ",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteSheet({
            variables: {
              sheetId,
            },
          })
          await refetch()
          await props.fav()
        } catch (error) {
          console.log(error)
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
      <div className="h2">
        จัดการชีทที่ลงขาย{" "}
        <span className="badge rounded-pill bg-primary ">
          {data.sheets.length}
        </span>
      </div>
      <div className="text-end">
        <Link to="/createsheet">
          <button className="btn btn-primary">ลงชีทขาย</button>
        </Link>
      </div>
      <hr />
      <div className="row">
        {data.sheets.map((sheet) => (
          <div key={sheet._id} className="col-lg-3 col-md-4 col-sm-12 mb-3">
            <div
              className="border p-3 h-100 w-100 text-dark"
              style={{ borderRadius: "10px" }}
            >
              <div className="text-end">
                <div className="dropdown">
                  <button
                    className="btn"
                    type="button"
                    id={"dropdownMenuButton" + sheet._id}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa-solid fa-lg fa-ellipsis" />
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby={"dropdownMenuButton" + sheet._id}
                  >
                    <li>
                      <Link
                        className="dropdown-item"
                        to={"/mysheet/" + sheet._id + "?pov=seller"}
                      >
                        ดูชีท pdf
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        to={"/sheetedit/" + sheet._id}
                      >
                        แก้ไข
                      </Link>
                    </li>
                    <li>
                      <a
                        className="dropdown-item text-danger"
                        onClick={() => onSubmitDeleteSheet(sheet._id)}
                      >
                        ลบ
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <Link
                to={"/sheet/" + sheet._id}
                style={{ textDecoration: "none" }}
                className="text-dark"
              >
                <div className="h5">{sheet.courseTitle}</div>

                <div>ชั้นปี {sheet.year}</div>
                <div>หลักสูตร {sheet.programme}</div>
                <div className="text-center h5 my-3">
                  <b>
                    itcoin{" "}
                    <span className="text-success">
                      {sheet.price === 0
                        ? "Free"
                        : sheet.price.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}{" "}
                    </span>{" "}
                  </b>
                </div>
                <div
                  className="text-end text-secondary"
                  style={{ fontSize: 13 }}
                >
                  ขายเมื่อ {moment(sheet.createAt).format("DD/MM/YYYY HH:mm")}{" "}
                  น.
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
      {data.sheets.length === 0 && (
        <div className="text-center h4">ยังไม่มีการลงชีทขาย</div>
      )}
    </>
  )
}

export default Sheetsmanage
