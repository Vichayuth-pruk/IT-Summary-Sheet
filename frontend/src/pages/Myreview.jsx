import React, { useEffect, useContext } from "react"
import AuthContext from "../contexts/authContext"
import isLoggedIn from "../middlewares/isLoggedIn"
import { useNavigate, Link } from "react-router-dom"
import Rating from "@mui/material/Rating"
import { useQuery } from "@apollo/client"
import { COMMENT_QUERY } from "../graphql/commentQuery"

function Myreview(props) {
  // Middleware
  const me = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    isLoggedIn(props.meta, me, navigate)
    refetch()
  }, [])

  // State
  const { loading, error, data, refetch } = useQuery(COMMENT_QUERY, {
    variables: {
      filter: {
        userId: me._id,
      },
    },
    skip: !me?._id,
  })

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
      <div className="h2">รีวิวของฉัน</div>
      <hr />
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {data.comments.map((item) => {
              return (
                <div
                  className="card mb-3 p-2"
                  style={{
                    borderRadius: "15px",
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  }}
                  key={item._id}
                >
                  <Link
                    className="text-dark"
                    to={"/sheet/" + item.sheet._id}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">
                        {item.sheet.courseTitle} ({item.sheet.user.username})
                      </h5>
                      <div>
                        <Rating
                          name="read-only"
                          value={
                            data.comments.reduce((a, b) => a + b.rating, 0) /
                            data.comments.length
                          }
                          readOnly
                          precision={0.5}
                        />
                      </div>
                      <p className="card-text">{item.description}</p>
                      <p className="card-text text-end">{item.dates}</p>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      {data.comments.length === 0 ? (
        <div className="text-center">
          <h3>ไม่มีรีวิว</h3>
        </div>
      ) : null}
    </>
  )
}

export default Myreview
