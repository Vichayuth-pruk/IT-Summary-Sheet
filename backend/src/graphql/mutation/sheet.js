import { schemaComposer } from "graphql-compose"
import { SheetModel, SheetTC } from "../../models/sheet"

export const createSheet = SheetTC.getResolver("createOne")
export const deleteSheet = SheetTC.getResolver("removeById")
