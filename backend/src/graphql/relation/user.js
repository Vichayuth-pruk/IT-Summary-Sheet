import { SheetTC } from "../../models/sheet"
import { UserTC } from "../../models/user"
import { FavoriteTC } from "../../models/favorite"

UserTC.addRelation("sheet", {
  resolver: SheetTC.getResolver("findById"),
  projection: { _id: true },
  prepareArgs: {
    filter: (user) => ({ userId: user._id }),
  },
})
UserTC.addFields({
  fullname: {
    type: "String",
    projection: { firstname: true, lastname: true },
    resolve: (user) => `${user.firstname} ${user.lastname}`,
  },
})
UserTC.addRelation("favorite", {
  resolver: FavoriteTC.getResolver("findMany"),
  projection: { _id: true },
  prepareArgs: {
    filter: (user) => ({ userId: user._id }),
  },
})
