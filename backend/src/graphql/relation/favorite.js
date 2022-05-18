import { FavoriteTC } from "../../models/favorite"
import { UserTC } from "../../models/user"
import { SheetTC } from "../../models/sheet"

FavoriteTC.addRelation("user", {
  resolver: UserTC.getResolver("findById"),
  projection: { userId: true },
  prepareArgs: {
    _id: (favorite) => favorite.userId,
  },
})
FavoriteTC.addRelation("sheet", {
  resolver: SheetTC.getResolver("findById"),
  projection: { sheetId: true },
  prepareArgs: {
    _id: (favorite) => favorite.sheetId,
  },
})
