import { getHeaderMappings } from './db'


export function filterSensitiveData(rawData: any[]){
    const headers = getHeaderMappings()
    const data = rawData.map((entry) => {
        return Object.keys(headers).map(header_key => entry[header_key])
    })
    return {
        'headers': Object.values(headers),
        'data': data
    }
}