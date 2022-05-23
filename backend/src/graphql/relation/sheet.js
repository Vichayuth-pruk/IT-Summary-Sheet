import { SheetTC } from "../../models/sheet"
import { UserTC } from "../../models/user"
import { FavoriteTC } from "../../models/favorite"
import { CartTC } from "../../models/cart"
import { CommentTC } from "../../models/comment"

SheetTC.addRelation("user", {
  resolver: UserTC.getResolver("findById"),
  projection: { userId: true },
  prepareArgs: {
    _id: (sheet) => sheet.userId,
  },
})
// Not refactored
SheetTC.addRelation("favorite", {
  resolver: FavoriteTC.getResolver("findMany"),
  prepareArgs: {
    sheetId: (sheet) => sheet._id,
  },
})
// Not refactored
SheetTC.addRelation("cart", {
  resolver: CartTC.getResolver("findMany"),
  prepareArgs: {
    sheetId: (sheet) => sheet._id,
  },
})
SheetTC.addRelation("comment", {
  resolver: CommentTC.getResolver("findMany"),
  projection: { sheetId: true },
  prepareArgs: {
    filter: (sheet) => ({ sheetId: sheet._id }),
  },
})
SheetTC.addFields({
  totalRating: {
    type: "Int",
    resolve: async (sheet) => {
      const comments = await CommentTC.getResolver("findMany").resolve({
        source: sheet,
        args: {
          filter: { sheetId: sheet._id },
        },
      })
      const rating = comments.reduce((acc, comment) => {
        return acc + comment.rating
      }, 0)
      return rating
    },
  },
})
