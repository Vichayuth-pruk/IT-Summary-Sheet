import { gql } from "@apollo/client"

export const ME_MUTATION = gql`
  mutation UpdateUser($userId: MongoID!, $record: UpdateByIdUserInput!) {
    updateUser(_id: $userId, record: $record) {
      recordId
    }
  }
`

export const CHANGEPASSWORD_MUTATION = gql`
  mutation ChangePassword($oldPassword: String!, $newPassword: String!) {
    changePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
      status
      message
    }
  }
`
