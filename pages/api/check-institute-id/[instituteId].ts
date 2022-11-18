// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import logger from '../../../utils/logger';
import { getInstitutions } from '../../../utils/utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse<string| null>) {
    const instituteId = req.query.instituteId;
    const institutions = await getInstitutions();
    if(institutions !== null){
        if( !institutions.includes(String(instituteId)) ){
            res.send(`institute Id (${instituteId}) is available.`)
        } else {
            res.send(`institute Id (${instituteId}) taken.`)
        }
    } else {
        logger.error('Error in check-institute')
        res.status(500).send('Idk')
    }

}
