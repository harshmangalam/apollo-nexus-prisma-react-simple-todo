import {server} from "./server"

async function main() {
    const {url} = await server.listen()
    console.log(`Server listen at ${url}`)
}

main()