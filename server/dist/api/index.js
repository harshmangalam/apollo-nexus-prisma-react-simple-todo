"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
async function main() {
    const { url } = await server_1.server.listen();
    console.log(`Server listen at ${url}`);
}
main();
//# sourceMappingURL=index.js.map