import { schemaComposer } from "graphql-compose"
import { CommentModel, CommentTC } from "../../models/comment"

export const comments = CommentTC.getResolver("findMany")
export const commentId = CommentTC.getResolver("findById")
export const commentPagination = CommentTC.getResolver("pagination")
