import { gql } from "@apollo/client"

export const FAVORITE_MUTATION = gql`
  mutation CreateFavorite($record: CreateOneFavoriteInput!) {
    createFavorite(record: $record) {
      recordId
    }
  }
`

export const DELETE_FAVORITE_MUTATION = gql`
  mutation DeleteFavorite($favoriteId: MongoID!) {
    deleteFavorite(_id: $favoriteId) {
      recordId
    }
  }
`
