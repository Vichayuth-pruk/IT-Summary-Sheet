import { gql } from "@apollo/client"

export const LOGIN_MUTATION = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      status
      message
      token
    }
  }
`
