import { gql } from "@apollo/client"

export const ADD_ITCOIN_MUTATION = gql`
  mutation AddItcoin($itcoin: Float!) {
    addItcoin(itcoin: $itcoin) {
      _id
    }
  }
`
