// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getInstitutions } from '../../utils/utils'

type Data = string[];

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data| null>) {
    const instituteDetails = await getInstitutions();
    if(instituteDetails !== null){
        res.send(instituteDetails)
    } else {
        res.status(404).send(null)
    }
}
