// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getInstitutions } from '../../utils/utils';
import InMemoryCache from '../../utils/cache';



export default async function handler(req: NextApiRequest, res: NextApiResponse<Object| null>) {
    let institutions = InMemoryCache.get('institutions');
    if(institutions == null){
        institutions = await getInstitutions();
        InMemoryCache.set('institutions', institutions)
    }
    res.json({'institutions': institutions})
}
