import React, { useEffect, useContext, useCallback } from "react"
import AuthContext from "../contexts/authContext"
import isLoggedIn from "../middlewares/isLoggedIn"
import { useNavigate, Link } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { FAVORITE_BY_USERID_QUERY } from "../graphql/favoriteQuery"
import moment from "moment"

function Favorite(props) {
  // Middleware
  const me = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    isLoggedIn(props.meta, me, navigate)
    refetch()
  }, [])

  // State
  const { loading, error, data, refetch } = useQuery(FAVORITE_BY_USERID_QUERY, {
    variables: {
      userId: me?._id,
    },
    skip: !me?._id,
  })

  if (loading || data === undefined)
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
        ชีทที่อยากได้{" "}
        <span className="badge badge-sm rounded-pill bg-danger ">
          {data.favorites.length}
        </span>{" "}
        รายการ
      </div>
      <hr />
      <br />
      <div className="row">
        {data.favorites.map((f) => (
          <div key={f.sheet._id} className="col-lg-3 col-md-4 col-sm-12 mb-3">
            <Link
              to={"/sheet/" + f.sheet._id}
              style={{ textDecoration: "none" }}
            >
              <div
                className="border p-3 h-100 w-100 text-dark"
                style={{ borderRadius: "10px" }}
              >
                <div className="h5">{f.sheet.courseTitle}</div>

                <div>ชั้นปี {f.sheet.year}</div>
                <div>หลักสูตร {f.sheet.programme}</div>
                <div className="text-center h5 my-3">
                  <b>
                    itcoin{" "}
                    <span className="text-success">
                      {f.sheet.price === 0
                        ? "Free"
                        : f.sheet.price.toLocaleString(undefined, {
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
                  ขายเมื่อ {moment(f.sheet.createAt).format("DD/MM/YYYY HH:mm")}{" "}
                  น.
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      {data.favorites.length === 0 && (
        <div className="text-center h4">ไม่มี</div>
      )}
    </>
  )
}

export default Favorite
