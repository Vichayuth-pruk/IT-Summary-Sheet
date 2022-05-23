import { PaymentTC } from "../../models/payment"
import { UserTC } from "../../models/user"
import moment from "moment"

PaymentTC.addRelation("user", {
  resolver: UserTC.getResolver("findById"),
  projection: { userId: true },
  prepareArgs: {
    _id: (payment) => payment.userId,
  },
})
