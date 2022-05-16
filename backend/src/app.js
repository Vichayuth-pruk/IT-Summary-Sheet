import { createServer } from "http"
import jsonwebtoken from "jsonwebtoken"
import cors from "cors"
import express from "express"
import { ApolloServer } from "apollo-server-express"
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
  gql,
} from "apollo-server-core"

import "./mongoose-connect"
import schema from "./graphql"

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(cors({ origin: ['http://localhost:3000'] }))
app.use(cors())

app.get("/", (req, res) => {
  res.json({ message: "Hello This is IT Summary Sheet API" })
})

const startApolloServer = async () => {
  const httpServer = createServer(app)
  const apolloServer = new ApolloServer({
    schema,
    introspection: true,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
    context: ({ req }) => {
      const { cookies, headers } = req
      let token = null
      if (cookies?.token) {
        token = cookies?.token
      }
      if (headers?.authorization?.split(" ")?.[0] === "Bearer") {
        token = headers?.authorization.split(" ")?.[1]
      }
      if (token) {
        const payload = jsonwebtoken.verify(token, process.env.JWT_SECRET)
        return { userId: payload.userId }
      }
      return { userId: null }
    },
  })

  await apolloServer.start()
  apolloServer.applyMiddleware({
    app,
    path: "/graphql",
    // cors: { origin: ["*"] },
  })
  const PORT = process.env.PORT || 3001
  httpServer.listen({ port: PORT })
  console.log(`🚀 Server ready at http://localhost:${PORT}`)
}
startApolloServer()
