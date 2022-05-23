import { schemaComposer } from "graphql-compose"
import { SheetModel, SheetTC } from "../../models/sheet"
import { FavoriteModel } from "../../models/favorite"
import { CartModel } from "../../models/cart"
import { CommentModel } from "../../models/comment"

export const createSheet = SheetTC.getResolver("createOne")
export const updateSheet = SheetTC.getResolver("updateById")
export const deleteSheet = schemaComposer.createResolver({
  name: "deleteSheet",
  type: SheetTC,
  args: {
    sheetId: "MongoID!",
  },
  resolve: async ({ context, args }) => {
    const { sheetId } = args
    const sheet = await SheetModel.findById(sheetId)
    if (!sheet) {
      return null
    }
    await sheet.remove()
    await FavoriteModel.deleteMany({ sheetId: sheetId })
    await CartModel.deleteMany({ sheetId: sheetId })
    await CommentModel.deleteMany({ sheetId: sheetId })

    return sheet
  },
})
