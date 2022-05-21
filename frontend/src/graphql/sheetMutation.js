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

export const UPDATE_SHEET_MUTATION = gql`
  mutation UpdateSheet($sheetId: MongoID!, $record: UpdateByIdSheetInput!) {
    updateSheet(_id: $sheetId, record: $record) {
      recordId
    }
  }
`
