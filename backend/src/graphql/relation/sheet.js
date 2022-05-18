import { SheetTC } from "../../models/sheet"
import { UserTC } from "../../models/user"
import { FavoriteTC } from "../../models/favorite"

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
