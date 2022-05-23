import { gql } from "@apollo/client"

export const CART_QUERY = gql`
  query {
    carts {
      _id
      sheet {
        _id
        courseTitle
        year
        programme
        sheetFile
        price
        user {
          _id
          username
          fullname
        }
        createdAt
      }
      user {
        _id
        username
        fullname
      }
    }
  }
`

export const CART_BY_USERID_QUERY = gql`
  query Carts($userId: MongoID!) {
    carts(filter: { userId: $userId }) {
      _id
      sheet {
        _id
        courseTitle
        year
        programme
        sheetFile
        price
        user {
          _id
          username
          fullname
        }
        createdAt
      }
      user {
        _id
        username
        fullname
      }
    }
  }
`
