import { schemaComposer } from "graphql-compose"
import { UserModel, UserTC } from "../../models/user"
import { generateUserToken } from "../../lib/generateUserToken"

export const createUser = UserTC.getResolver("createOne")
const LoginPayloadOTC = schemaComposer.createObjectTC({
  name: "LoginPayloadOTC",
  fields: {
    status: "String!",
    message: "String",
    token: "String",
  },
})
export const login = schemaComposer.createResolver({
  name: "login",
  kind: "mutation",
  type: LoginPayloadOTC,
  args: {
    email: "String!",
    password: "String!",
  },
  resolve: async ({ args }) => {
    const { email, password } = args
    const user = await UserModel.findOne({ email: email })
    if (!user) {
      return {
        status: "failed",
        message: "Email not found",
        token: null,
      }
    }
    const validPassword = await user.verifyPassword(password)
    if (!validPassword) {
      return {
        status: "failed",
        message: "Invalid password",
        token: null,
      }
    }
    const token = generateUserToken(user)
    return {
      status: "success",
      message: "Login success",
      token,
    }
  },
})
