import { gql } from "@apollo/client"

export const SHEET_QUERY = gql`
  query Sheets($sort: SortFindManySheetInput) {
    sheets(sort: $sort) {
      _id
      courseTitle
      year
      programme
      sheetFile
      price
      userId
      user {
        _id
        username
        fullname
      }
      totalRating
      comment {
        _id
        description
        rating
        dates
        userId
        sheetId
        user {
          _id
          username
          fullname
        }
      }
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
        _id
        username
        fullname
      }
      favorite(filter: { sheetId: $sheetId }) {
        _id
        sheetId
        userId
      }
      cart(filter: { sheetId: $sheetId }) {
        _id
        sheetId
        userId
      }
      totalRating
      comment {
        _id
        description
        rating
        dates
        userId
        sheetId
        user {
          _id
          username
          fullname
        }
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
      user {
        _id
        username
        fullname
      }
      totalRating
      comment {
        _id
        description
        rating
        dates
        userId
        sheetId
        user {
          _id
          username
          fullname
        }
      }
      userId
      createdAt
    }
  }
`
