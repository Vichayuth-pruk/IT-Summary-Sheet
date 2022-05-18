import { schemaComposer } from "graphql-compose"
import { SheetModel, SheetTC } from "../../models/sheet"

export const sheets = SheetTC.getResolver("findMany")
export const sheetId = SheetTC.getResolver("findById")
export const sheetPagination = SheetTC.getResolver("pagination")
