import { composeWithMongoose } from "graphql-compose-mongoose"
import { model, Schema } from "mongoose"

const FavoriteSchema = new Schema(
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
export const FavoriteModel = model("Favorite", FavoriteSchema)

export const FavoriteTC = composeWithMongoose(FavoriteModel)
