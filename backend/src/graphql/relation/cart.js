import { CartTC } from "../../models/cart"
import { UserTC } from "../../models/user"
import { SheetTC } from "../../models/sheet"

CartTC.addRelation("user", {
  resolver: UserTC.getResolver("findById"),
  projection: { userId: true },
  prepareArgs: {
    _id: (cart) => cart.userId,
  },
})
CartTC.addRelation("sheet", {
  resolver: SheetTC.getResolver("findById"),
  projection: { sheetId: true },
  prepareArgs: {
    _id: (cart) => cart.sheetId,
  },
})
