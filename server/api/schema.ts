import { makeSchema } from "nexus";
import { join } from "path";
import * as types from "./graphql"
 
console.log(types)
export const schema = makeSchema({
  types,
  outputs: {
    typegen: join(__dirname, "..", "nexus-typegen.ts"),
    schema: join(__dirname, "..", "schema.graphql"),
  },
  contextType:{
    export:"Context",
    module:join(__dirname,"./context.ts")
  }
});
