import { gql } from "@apollo/client"

export const SHEET_MUTATION = gql`
  mutation CreateSheet($record: CreateOneSheetInput!) {
    createSheet(record: $record) {
      recordId
    }
  }
`
