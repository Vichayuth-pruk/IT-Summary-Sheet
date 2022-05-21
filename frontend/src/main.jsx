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
import { createNetworkStatusNotifier } from "react-apollo-network-status"
import Nprogress from "nprogress"
import "nprogress/nprogress.css"

const { link, useApolloNetworkStatus } = createNetworkStatusNotifier()

function GlobalLoadingIndicator() {
  const status = useApolloNetworkStatus()

  if (status.numPendingQueries > 0) {
    Nprogress.start()
  } else {
    Nprogress.done()
  }
}

const setAuthorizationLink = setContext((_, { headers }) => {
  const token = Cookies.get("token")
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }
})

const linkUri = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URI,
  credentials: "include",
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link.concat(setAuthorizationLink.concat(linkUri)),
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <GlobalLoadingIndicator />
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
)
