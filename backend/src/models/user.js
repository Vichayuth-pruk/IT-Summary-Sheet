import { composeWithMongoose } from "graphql-compose-mongoose"
import { model, Schema } from "mongoose"
import mongooseBcrypt from "mongoose-bcrypt"

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
      trim: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      bcrypt: true,
    },
    role: {
      type: String,
      default: "user",
    },
    itcoin: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)
UserSchema.plugin(mongooseBcrypt)
export const UserModel = model("User", UserSchema)

export const UserTC = composeWithMongoose(UserModel)
