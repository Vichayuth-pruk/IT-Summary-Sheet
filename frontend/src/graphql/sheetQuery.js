import { gql } from "@apollo/client"

export const SHEET_QUERY = gql`
  query {
    sheets {
      _id
      courseTitle
      year
      programme
      sheetFile
      price
      userId
      createdAt
    }
  }
`

export const GET_SHEET_QUERY = gql`
  query SheetId($sheetId: MongoID!) {
    sheetId(_id: $sheetId) {
      _id
      courseTitle
      year
      programme
      sheetFile
      price
      user {
        username
        fullname
      }
      favorite(filter: { sheetId: $sheetId }) {
        _id
        sheetId
        userId
      }
      userId
      createdAt
    }
  }
`

export const SHEET_BY_USERID_QUERY = gql`
  query Sheets($userId: MongoID!) {
    sheets(filter: { userId: $userId }) {
      _id
      courseTitle
      year
      programme
      sheetFile
      price
      userId
      createdAt
    }
  }
`
