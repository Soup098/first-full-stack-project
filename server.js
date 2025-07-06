import http from "node:http"
import { getDataFromDB } from "./database/db.js"

const PORT = 8000

const server = http.createServer(async (request, response) => {
    const destinations = await getDataFromDB()

    if(request.url === "/api" && request.method === "GET"){
        response.end(JSON.stringify(destinations))
    }

})

server.listen(PORT, () => console.log(`the server is working. its running on port; ${PORT}`))