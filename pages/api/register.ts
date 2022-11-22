// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import logger from "../../utils/logger";
import {
  getInstitutions,
  registerInstitute,
  validateSheet,
} from "../../utils/utils";
import InMemoryCache from '../../utils/cache';

type Data = Object;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | null>
) {
  const { instituteId, sheetId, instituteName} = req.body;
  try {
    if (req.body.instituteId && req.body.sheetId && req.body.instituteName) {
      let institutions = await getInstitutions();
      if (institutions !== null) {
        if (institutions.includes(String(instituteId))) {
          res.status(400).json({message: `institute Id (${instituteId}) taken.`});
        } else {
          await validateSheet(sheetId);
          const resp = registerInstitute([instituteId, sheetId, instituteName]);
          if (resp !== null) {
            institutions.push(instituteId)
            res.status(201).json({message: "created"});
          } else {
            logger.error("Error in check-institute");
            res.status(500).json({message: "Error Idk :("});
          }
        }
      } else {
        logger.error("Error in check-institute");
        res.status(500).json({message: "Idk :("});
      }
    } else {
      res.status(400).json({message: "Bad Request. Check instituteId and sheetId"});
    }
  } catch (error: any) {
    logger.error(`Error occured while registering institute`);
    res.status(error.code).json({'message': error.message});
  }
}
