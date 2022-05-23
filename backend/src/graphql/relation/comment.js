import { CommentTC } from "../../models/comment"
import { UserTC } from "../../models/user"
import { SheetTC } from "../../models/sheet"
import moment from "moment"
moment.locale("th")

CommentTC.addRelation("user", {
  resolver: UserTC.getResolver("findById"),
  projection: { userId: true },
  prepareArgs: {
    _id: (comment) => comment.userId,
  },
})
CommentTC.addRelation("sheet", {
  resolver: SheetTC.getResolver("findById"),
  projection: { sheetId: true },
  prepareArgs: {
    _id: (comment) => comment.sheetId,
  },
})
CommentTC.addFields({
  dates: {
    type: "String",
    projection: { createdAt: true },
    resolve: (comment) => `${moment(comment.createdAt).format("LLLL")}`,
  },
})
