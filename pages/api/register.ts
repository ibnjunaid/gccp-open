import type { NextApiRequest, NextApiResponse } from "next";
import logger from "../../utils/logger";
import {
  getInstitutions,
  registerInstitute,
  validateSheet,
} from "../../utils/utils";

type Data = Object;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | null>
) {
  const { instituteId, sheetId, instituteName } = req.body;
  try {
    if (req.body.instituteId && req.body.sheetId && req.body.instituteName) {
      let institutions = await getInstitutions();
      if (institutions !== null) {
        if (institutions.includes(String(instituteId))) {
          res
            .status(400)
            .json({ message: `institute Id (${instituteId}) taken.` });
        } else {
          await validateSheet(sheetId);
          const resp = await registerInstitute([
            instituteId,
            sheetId,
            instituteName,
          ]);
          if (resp !== null) {
            institutions.push(instituteId);
            const { activationId } = await registerDataSync(req.body);
            logger.info(`New schedule created for ${instituteId}. ActivationId: ${activationId}`)
            res.status(201).json({ message: "created" });
          } else {
            logger.error("Error in check-institute");
            res.status(500).json({ message: "Error Idk :(" });
          }
        }
      } else {
        logger.error("Error in check-institute");
        res.status(500).json({ message: "Idk :(" });
      }
    } else {
      res
        .status(400)
        .json({ message: "Bad Request. Check instituteId and sheetId" });
    }
  } catch (error: any) {
    logger.error(`Error occured while registering institute`);
    res.status(error.code).json({ message: error.message });
  }
}

type instituteDetails = {
  instituteId: string;
  sheetId: string;
  instituteName: string
}


async function registerDataSync(params: instituteDetails) {
  const headers = new Headers();
  headers.append('Authorization', process.env.ACTION_AUTH_TOKEN!)
  headers.append('content-type', 'application/json')
  const res = await fetch('https://eu-gb.functions.cloud.ibm.com/api/v1/namespaces/Oibm_dev/actions/scheduler', {
    method: 'POST',
    body: JSON.stringify(
      {
        ...params,
        token: process.env.TOKEN
      }
    ),
    headers: headers
  });

  return await res.json()
}