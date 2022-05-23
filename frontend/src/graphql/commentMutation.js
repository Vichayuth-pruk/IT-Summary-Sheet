import { gql } from "@apollo/client"

export const COMMENT_MUTATION = gql`
  mutation CreateComment($record: CreateOneCommentInput!) {
    createComment(record: $record) {
      recordId
    }
  }
`
