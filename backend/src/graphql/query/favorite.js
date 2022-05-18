import { schemaComposer } from "graphql-compose"
import { FavoriteModel, FavoriteTC } from "../../models/favorite"

export const favorites = FavoriteTC.getResolver("findMany")
export const favoriteId = FavoriteTC.getResolver("findById")
export const favoritePagination = FavoriteTC.getResolver("pagination")
