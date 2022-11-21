// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import logger from '../../../utils/logger';
import { getInstitutions } from '../../../utils/utils';
import InMemoryCache from '../../../utils/cache';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Object| null>) {
    const instituteId = req.query.instituteId;
    const institutions = await getInstitutions();
    if(institutions !== null){
        if( !institutions.includes(String(instituteId)) ){
            res.json({'message': `institute Id (${instituteId}) is available.`, available: true})
        } else {
            res.json({'message': `institute Id (${instituteId}) taken.`, available: false})
        }
    } else {
        logger.error('Error in check-institute')
        res.status(500).json({'message': 'Idk', available: false})
    }

}
