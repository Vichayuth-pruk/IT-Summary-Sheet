import { gql } from "@apollo/client"

export const PAYMENT_QUERY = gql`
  query ($filter: FilterFindManyPaymentInput) {
    payments(filter: $filter) {
      _id
      paymentId
      state
      amount
      method
      items
      dates
      userId
      user {
        _id
        fullname
        username
      }
    }
  }
`
