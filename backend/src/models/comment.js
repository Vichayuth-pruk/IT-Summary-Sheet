import { composeWithMongoose } from "graphql-compose-mongoose"
import { model, Schema } from "mongoose"

const CommentSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      index: true,
    },
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
export const CommentModel = model("Comment", CommentSchema)

export const CommentTC = composeWithMongoose(CommentModel)
