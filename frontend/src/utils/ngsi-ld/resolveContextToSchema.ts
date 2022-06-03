import $RefParser from "@apidevtools/json-schema-ref-parser";
import schemas from "./config"

export const resolveContextToSchema = async (context: string, type: string) => {

    //fetch context
    //await get context

    //resolve to URL based on type from context

    //dereference schema    
    return $RefParser.dereference(schemas[`${type}`])
}
