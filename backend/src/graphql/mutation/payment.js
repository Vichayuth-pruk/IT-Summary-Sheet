import { schemaComposer } from "graphql-compose"
import { PaymentModel, PaymentTC } from "../../models/payment"
import { CartModel, CartTC } from "../../models/cart"
import { FavoriteModel, FavoriteTC } from "../../models/favorite"
import { UserModel, UserTC } from "../../models/user"

export const createPayment = schemaComposer.createResolver({
  name: "createPayment",
  kind: "mutation",
  type: PaymentTC,
  args: {
    record: "PaymentInput!",
  },
  resolve: async ({ source, args, context, info }) => {
    const { userId: _id } = context
    if (!_id) {
      throw new Error("Unauthorized")
    }

    // Step check can buy
    const user = await UserModel.findOne({ _id })
    if (user.itcoin < args.record.amount) {
      throw new Error("itcoin ของคุณไม่เพียงพอ")
    }

    // Step decrease itcoin
    user.itcoin -= args.record.amount
    await user.save()

    // Step create payment
    const payment = await PaymentModel.create({
      ...args.record,
      items: args.record.items.map(
        (item) => `${item.sheet.courseTitle} (${item.user.username})`
      ),
      userId: _id,
      state: "success",
    })

    // Step add sheet to user
    const oldMines = await UserModel.findOne({ _id }).select("mines")
    const newMines = oldMines.mines.concat(
      args.record.items.map((item) => item.sheet)
    )
    await UserModel.findOneAndUpdate({ _id }, { mines: newMines })

    // Step remove favorites
    const favToRemove = args.record.items.map((item) => item.sheet._id)
    await FavoriteModel.deleteMany({
      userId: _id,
      sheetId: { $in: favToRemove },
    })

    // Step remove carts
    await CartModel.deleteMany({ userId: _id })

    return payment
  },
})
