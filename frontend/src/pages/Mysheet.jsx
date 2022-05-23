import React, { useEffect, useContext } from "react"
import AuthContext from "../contexts/authContext"
import isLoggedIn from "../middlewares/isLoggedIn"
import { useNavigate, useParams, useSearchParams, Link } from "react-router-dom"
import { GET_SHEET_QUERY } from "../graphql/sheetQuery"
import { useQuery } from "@apollo/client"

function Mysheet(props) {
  // Middleware
  const me = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    isLoggedIn(props.meta, me, navigate)
  }, [])

  const { id } = useParams()
  const [searchParams] = useSearchParams()

  // State
  if (searchParams.get("pov") === "seller") {
    const { loading, error, data, refetch } = useQuery(GET_SHEET_QUERY, {
      variables: {
        sheetId: id,
      },
      skip: !id,
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
        <div className="h2 text-center">วิชา {data.sheetId.courseTitle}</div>
        <br />
        <br />
        {/* Section body */}
        <div className="row">
          <div className="col-lg-9 col-md-12 col-sm-12 mb-3">
            <iframe
              src={data.sheetId.sheetFile}
              className="w-100"
              height={600}
            ></iframe>
          </div>
          <div className="col-lg-3 col-md-12 col-sm-12 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="h5 mb-3">ชั้นปี {data.sheetId.year}</div>
                <div className="h5 mb-3">สาขา {data.sheetId.programme}</div>
                <div className="h5 mb-3">
                  โดย{" "}
                  <Link to={"/shop/" + data.sheetId.userId}>
                    <span className="badge rounded-pill bg-primary ">
                      {data.sheetId.user.username}
                    </span>
                  </Link>
                </div>
                <div className="h5 mb-3">
                  เปิดโดยลิงก์{" "}
                  <a href={data.sheetId.sheetFile} target="_blank">
                    คลิกที่นี่
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Mysheet
