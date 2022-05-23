import { schemaComposer } from "graphql-compose"
import { PaymentModel, PaymentTC } from "../../models/payment"

export const payments = PaymentTC.getResolver("findMany")
export const paymentId = PaymentTC.getResolver("findById")
export const paymentPagination = PaymentTC.getResolver("pagination")
