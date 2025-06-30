import http from "node:http"

const PORT = 8000

const server = http.createServer((request, response) => {

    if(request.url === "/api" && request.method === "GET"){
        response.write("this is a GET request to the API endpoint \n")
    }

    response.write("this is some date \n")
    response.write("this is also some data \n")
    response.end("You are viewing data straight from the server.js file. a GET request has been made and this is the response")
})

server.listen(PORT, () => console.log(`the server is working. its running on port; ${PORT}`))