import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import "./styles/index.css"
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import Cookies from "js-cookie"

const setAuthorizationLink = setContext((_, { headers }) => {
  const token = Cookies.get("token")
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }
})

const link = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URI,
  credentials: "include",
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: setAuthorizationLink.concat(link),
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
)
