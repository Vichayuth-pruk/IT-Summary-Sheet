import { composeWithMongoose } from "graphql-compose-mongoose"
import { model, Schema } from "mongoose"

const SheetSchema = new Schema(
  {
    courseTitle: {
      type: String,
      required: true,
      uppercase: true,
    },
    year: {
      type: String,
      required: true,
    },
    programme: {
      type: String,
      required: true,
      uppercase: true,
    },
    sheetFile: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
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
export const SheetModel = model("Sheet", SheetSchema)

export const SheetTC = composeWithMongoose(SheetModel)
