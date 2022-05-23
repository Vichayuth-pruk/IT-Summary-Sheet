import { gql } from "@apollo/client"

export const GET_USER_QUERY = gql`
  query UserId($userId: MongoID!) {
    userId(_id: $userId) {
      _id
      email
      firstname
      lastname
      username
      role
      itcoin
      mines
    }
  }
`
