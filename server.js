import http from "node:http"
import { getDataFromDB } from "./database/db.js"
import { error } from "node:console"
import { sendJSONResponse } from "./utils/sendJSONResponse.js"

import { getDataByPathParams } from "./utils/getDataByPathParams.js"

const PORT = 8000 //specify the port to be used 

const server = http.createServer(async (req, res) => { //create a server, using an async callback function to make a GET request
    const destinations = await getDataFromDB()

    if(req.url === "/api" && req.method === "GET"){
        sendJSONResponse(res, 200, destinations)
    }else if(req.url.startsWith("/api/continent") && req.method === "GET"){ ///api/continent/asia will return an object with all the locations in asia
        const continent = req.url.split('/').pop()
        const filteredData = getDataByPathParams(destinations, "continent", continent)
        sendJSONResponse(res, 200, filteredData)
    }else if(req.url.startsWith("/api/country") && req.method === "GET"){
        const country = req.url.split('/').pop()
        const filteredData = getDataByPathParams(destinations, "country", country)
        sendJSONResponse(res, 200, filteredData)
    }else{
        sendJSONResponse(res, 404, {
            error: "not found", 
            message: "The requested route does not exist"})
        res.setHeader("Content-Type", "application/json")
        res.statusCode = 404
    }
})

server.listen(PORT, () => console.log(`the server is working. its running on port; ${PORT}`))