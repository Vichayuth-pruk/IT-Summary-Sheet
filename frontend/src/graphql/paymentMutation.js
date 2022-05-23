import { gql } from "@apollo/client"

export const PAYMENT_MUTATION = gql`
  mutation CreatePayment($record: PaymentInput!) {
    createPayment(record: $record) {
      _id
    }
  }
`
