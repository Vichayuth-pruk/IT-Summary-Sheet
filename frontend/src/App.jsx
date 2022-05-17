import { Route, Routes } from "react-router-dom"
import { gql, useQuery } from "@apollo/client"
import AuthContext from "./contexts/authContext"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import { ME_QUERY } from "./graphql/meQuery"

// Use routes
import Navs from "./components/Navs"
import Home from "./pages/Home"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Search from "./pages/Search"
import Favorite from "./pages/Favorite"
import Cart from "./pages/Cart"
import Account from "./pages/Account"

function App() {
  const navigate = useNavigate()
  const { loading, error, data, refetch } = useQuery(ME_QUERY)
  const logout = async () => {
    Cookies.remove("token")
    await refetch()
    navigate("/signin")
  }
  if (loading) return <div>Loading...</div>
  return (
    <>
      <AuthContext.Provider value={data?.me}>
        <Navs me={data?.me} logout={logout} />
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
          </Routes>
        </div>
      </AuthContext.Provider>
    </>
  )
}

export default App
