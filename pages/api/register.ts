// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import logger from '../../utils/logger';
import { getInstitutions, registerInstitute, validateSheet } from '../../utils/utils'

type Data = string;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data | null>) {
    const { instituteId, sheetId } = req.body;
    try {
        if(req.body.instituteId && req.body.sheetId){
            const institutions = await getInstitutions();
            if(institutions !== null){
                if( institutions.includes(String(instituteId)) ){
                    res.status(400).send(`institute Id (${instituteId}) taken.`)
                } else {
                    await validateSheet(sheetId)
                    const resp = registerInstitute([instituteId, sheetId])
                    if(resp !== null){
                        res.status(201).send("created")
                    } else {
                        logger.error('Error in check-institute')
                        res.status(500).send("Error Idk :(")
                    }
                }
            } else {
                logger.error('Error in check-institute')
                res.status(500).send('Idk :(')
            }
        } else {
            res.status(400).send('Bad Request. Check instituteId and sheetId')
        }
    } catch (error: any) {
        logger.error(`Error occured while registering institute`)
        res.status(error.code).send(error.message)
    }
}