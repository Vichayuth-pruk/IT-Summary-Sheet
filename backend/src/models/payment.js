import { composeWithMongoose } from "graphql-compose-mongoose"
import { model, Schema } from "mongoose"

const PaymentSchema = new Schema(
  {
    paymentId: {
      type: String,
      required: true,
      index: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    state: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    dates: {
      type: Date,
      default: Date.now,
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
export const PaymentModel = model("Payment", PaymentSchema)

export const PaymentTC = composeWithMongoose(PaymentModel)
