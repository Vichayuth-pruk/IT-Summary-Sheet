import { schemaComposer } from "graphql-compose"
import { CartModel, CartTC } from "../../models/cart"

export const createCart = CartTC.getResolver("createOne")
export const deleteCart = CartTC.getResolver("removeById")
