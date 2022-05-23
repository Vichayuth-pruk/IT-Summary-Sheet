import { gql } from "@apollo/client"

export const COMMENT_QUERY = gql`
  query ($filter: FilterFindManyCommentInput) {
    comments(filter: $filter) {
      _id
      description
      rating
      dates
      sheetId
      userId
      user {
        _id
        username
        fullname
      }
      sheet {
        _id
        courseTitle
        user {
          _id
          username
          fullname
        }
      }
    }
  }
`
