import { schemaComposer } from "graphql-compose"
import { FavoriteModel, FavoriteTC } from "../../models/favorite"

export const createFavorite = FavoriteTC.getResolver("createOne")
export const deleteFavorite = FavoriteTC.getResolver("removeById")
