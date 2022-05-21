import { gql } from "@apollo/client"

export const SHEET_MUTATION = gql`
  mutation CreateSheet($record: CreateOneSheetInput!) {
    createSheet(record: $record) {
      recordId
    }
  }
`

export const DELETE_SHEET_MUTATION = gql`
  mutation deleteSheet($sheetId: MongoID!) {
    deleteSheet(sheetId: $sheetId) {
      _id
    }
  }
`
