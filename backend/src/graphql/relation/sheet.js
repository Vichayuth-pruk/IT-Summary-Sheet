import { SheetTC } from "../../models/sheet"
import { UserTC } from "../../models/user"
import { FavoriteTC } from "../../models/favorite"
import { CartTC } from "../../models/cart"

SheetTC.addRelation("user", {
  resolver: UserTC.getResolver("findById"),
  projection: { userId: true },
  prepareArgs: {
    _id: (sheet) => sheet.userId,
  },
})
SheetTC.addRelation("favorite", {
  resolver: FavoriteTC.getResolver("findMany"),
  projection: { favorites: true },
  prepareArgs: {
    sheetId: (sheet) => sheet._id,
  },
})
SheetTC.addRelation("cart", {
  resolver: CartTC.getResolver("findMany"),
  projection: { favorites: true },
  prepareArgs: {
    sheetId: (sheet) => sheet._id,
  },
})
