import { sendJSONResponse } from "./sendJSONResponse.js"

export default function continentRoute(destinations){
    const continent = req.url.split('/').pop()
    const filteredData = destinations.filter((destinations) => {
        return destinations.continent.toLowerCase() === continent.toLowerCase()
    })
    sendJSONResponse(res, 200, filteredData)
}