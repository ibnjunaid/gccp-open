// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import logger from "../../../utils/logger";
import { getDataFromSheet, getSheetTitles } from "../../../utils/sheets";
import { filterSensitiveData, getInstituteDetails } from "../../../utils/utils";

type Data = {
  headers: string[];
  data: any[][];
  instituteDetails: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Object>
) {
  const instituteId = req.query.instituteId;
  const instituteDetails = await getInstituteDetails(String(instituteId));
  if (instituteDetails === null) {
    logger.error("Institute Details not found");
    res.status(404).json({ message: "invalid institution id" });
  } else {
    const sheetTitles = await getSheetTitles(instituteDetails.sheetId);
    const latestTableTitle = sheetTitles.at(-1);
    if (latestTableTitle) {
      const data = await getDataFromSheet(
        instituteDetails.sheetId,
        latestTableTitle
      );
      const filteredData = filterSensitiveData(data);
      res.json({
        ...filteredData,
        instituteDetails: { ...instituteDetails, sheetId: null },
      });
    } else {
      logger.error("latestTableTitle details not found");
      res.status(404).json({ message: "invalid institution id" });
    }
  }
}
