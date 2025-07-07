import http from "node:http"
import { getDataFromDB } from "./database/db.js"
import { error } from "node:console"

const PORT = 8000 //specify the port to be used 

const server = http.createServer(async (req, res) => { //create a server, using an async callback function to make a GET request
    const destinations = await getDataFromDB()

    if(req.url === "/api" && req.method === "GET"){
        res.setHeader("Content-Type", "application/json")
        res.statusCode = 200
        res.end(JSON.stringify(destinations))

    }else if(req.url.startsWith("/api/continent") && req.method === "GET"){ ///api/continent/asia will return an object with all the locations in asia
        const continent = req.url.split('/').pop()
        //console.log(continent)
        const filteredData = destinations.filter((destinations) => {
            return destinations.continent.toLowerCase() === continent.toLowerCase()
        })
        res.setHeader("Content-Type", "application/json")
        res.statusCode = 200
        res.end(JSON.stringify(filteredData))

    }else{
        res.setHeader("Content-Type", "application/json")
        res.statusCode = 404
        res.end(JSON.stringify({error: "not found", message: "The requested route does not exist"}))
    }
})

server.listen(PORT, () => console.log(`the server is working. its running on port; ${PORT}`))