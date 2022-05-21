import React, { useEffect, useContext } from "react"
import AuthContext from "../contexts/authContext"
import isLoggedIn from "../middlewares/isLoggedIn"
import { useNavigate, Link, useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { SHEET_BY_USERID_QUERY } from "../graphql/sheetQuery"
import { GET_USER_QUERY } from "../graphql/userQuery"

function Shop(props) {
  // Middleware
  const me = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    isLoggedIn(props.meta, me, navigate)
    refetch()
  }, [])

  const { id } = useParams()

  // State
  const { loading, error, data, refetch } = useQuery(SHEET_BY_USERID_QUERY, {
    variables: {
      userId: id,
    },
    skip: !id,
  })

  const userRes = useQuery(GET_USER_QUERY, {
    variables: {
      userId: id,
    },
    skip: !id,
  })

  console.log(userRes.data)

  if (loading || userRes.loading)
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
        ชีทโดย{" "}
        <span className="badge rounded-pill bg-primary ">
          {userRes.data.userId.username}
        </span>
      </div>
      <hr />
      <br />
    </>
  )
}

export default Shop
