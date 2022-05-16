import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import "./styles/index.css"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import { CookiesProvider } from "react-cookie"

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
  // credentials: "include",
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
