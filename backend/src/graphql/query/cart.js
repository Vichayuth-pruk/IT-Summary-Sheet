import { schemaComposer } from "graphql-compose"
import { CartModel, CartTC } from "../../models/cart"

export const carts = CartTC.getResolver("findMany")
export const cartId = CartTC.getResolver("findById")
export const cartPagination = CartTC.getResolver("pagination")
