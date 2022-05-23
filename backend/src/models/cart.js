import { composeWithMongoose } from "graphql-compose-mongoose"
import { model, Schema } from "mongoose"

const CartSchema = new Schema(
  {
    sheetId: {
      type: Schema.Types.ObjectId,
      ref: "Sheet",
      required: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
)
export const CartModel = model("Cart", CartSchema)

export const CartTC = composeWithMongoose(CartModel)
