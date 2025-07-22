import { sendJSONResponse } from "./sendJSONResponse.js"

export default function countryRoute(destinations){
    const country = req.url.split('/').pop()
    const filteredData = destinations.filter((destination) => {
        return destination.country.toLowerCase() === country.toLowerCase()
    })
    sendJSONResponse(res, 200, filteredData)
}