import { json } from 'stream/consumers';
import logger from './logger';

type Value = {
    data: any;
    expiresOn: number
}

class InMemoryCache {
    private cache: Map<string, Value>;
    constructor() {
        this.cache = new Map<string, Value>()
    }

    public get(key: string): any | null {
        const res = this.cache.get(key);
        if (res == undefined) {
            return null
        }
        if (Date.now() > res.expiresOn) {
            return null
        } else {
            logger.info(`${key}, ${JSON.stringify(res)}`)
            return res.data
        }
    }

    public set(key: string, data:any): void{
        const expiresOn = Date.now() + 36E5 // set an hour Expiry date
        this.cache.set(key, {data: data, expiresOn: expiresOn})
    }
}

export default new InMemoryCache()