import { schemaComposer } from "graphql-compose"
import { CommentModel, CommentTC } from "../../models/comment"

export const createComment = CommentTC.getResolver("createOne")
export const deleteComment = CommentTC.getResolver("removeById")
