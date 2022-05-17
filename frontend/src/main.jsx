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
import { CookiesProvider } from "react-cookie"

const link = createHttpLink({
  uri: "http://localhost:3001/graphql",
  credentials: "include",
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
)
