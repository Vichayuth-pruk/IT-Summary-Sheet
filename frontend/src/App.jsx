import { Route, Routes } from "react-router-dom"
import { useQuery } from "@apollo/client"
import AuthContext from "./contexts/authContext"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import { ME_QUERY } from "./graphql/meQuery"
import { FAVORITE_BY_USERID_QUERY } from "./graphql/favoriteQuery"

// Use routes
import Navs from "./components/Navs"
import Home from "./pages/Home"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Search from "./pages/Search"
import Favorite from "./pages/Favorite"
import Cart from "./pages/Cart"
import Account from "./pages/Account"
import Changepassword from "./pages/Changepassword"
import Itcoin from "./pages/Itcoin"
import History from "./pages/History"
import Mysheets from "./pages/Mysheets"
import Myreview from "./pages/Myreview"
import Sheetsmanage from "./pages/Sheetsmanage"
import Createsheet from "./pages/Createsheet"
import Sheet from "./pages/Sheet"
import Checkout from "./pages/Checkout"
import Sheetedit from "./pages/Sheetedit"
import Mysheet from "./pages/Mysheet"

function App() {
  const navigate = useNavigate()
  const { loading, error, data, refetch } = useQuery(ME_QUERY)
  const logout = async () => {
    Cookies.remove("token")
    await refetch()
    navigate("/signin")
  }
  const favoriteByUserId = useQuery(FAVORITE_BY_USERID_QUERY, {
    variables: {
      userId: data?.me?._id,
    },
    skip: !data?.me?._id,
  })

  if (loading || favoriteByUserId.loading)
    return (
      <div className="text-end">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  return (
    <>
      <AuthContext.Provider value={data?.me}>
        <Navs me={data?.me} logout={logout} fav={favoriteByUserId.data} />
        <div className="my-5 container">
          <Routes>
            <Route path="/" element={<Home meta={""} />} />
            <Route
              path="/signin"
              element={<Signin meta={"guest"} refetch={refetch} />}
            />
            <Route path="/signup" element={<Signup meta={"guest"} />} />
            <Route path="/search" element={<Search meta={""} />} />
            <Route path="/favorite" element={<Favorite meta={"login"} />} />
            <Route path="/cart" element={<Cart meta={"login"} />} />
            <Route path="/account" element={<Account meta={"login"} />} />
            <Route
              path="/changepassword"
              element={<Changepassword meta={"login"} logout={logout} />}
            />
            <Route path="/itcoin" element={<Itcoin meta={"login"} />} />
            <Route path="/history" element={<History meta={"login"} />} />
            <Route path="/mysheets" element={<Mysheets meta={"login"} />} />
            <Route path="/myreview" element={<Myreview meta={"login"} />} />
            <Route
              path="/sheetsmanage"
              element={
                <Sheetsmanage meta={"login"} fav={favoriteByUserId.refetch} />
              }
            />
            <Route
              path="/createsheet"
              element={<Createsheet meta={"login"} />}
            />
            <Route
              path="/sheet/:id"
              element={<Sheet meta={"login"} fav={favoriteByUserId.refetch} />}
            />
            <Route path="/checkout" element={<Checkout meta={"login"} />} />
            <Route
              path="/sheetedit/:id"
              element={<Sheetedit meta={"login"} />}
            />
            <Route path="/mysheet/:id" element={<Mysheet meta={"login"} />} />
          </Routes>
        </div>
      </AuthContext.Provider>
    </>
  )
}

export default App
