import { gql } from "@apollo/client"

export const CART_MUTATION = gql`
  mutation CreateCart($record: CreateOneCartInput!) {
    createCart(record: $record) {
      recordId
    }
  }
`

export const DELETE_CART_MUTATION = gql`
  mutation DeleteCart($cartId: MongoID!) {
    deleteCart(_id: $cartId) {
      recordId
    }
  }
`
