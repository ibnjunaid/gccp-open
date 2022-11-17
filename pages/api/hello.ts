// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSheetId } from '../../utils/db';
import { getDataFromSheet, getSheetTitles } from '../../utils/sheets'
import { filterSensitiveData } from '../../utils/utils'

type Data = {
  headers: string[];
  data: any[][];
}

export default async function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {
  const sheetId = getSheetId()
  const sheetTitles = await getSheetTitles(sheetId)
  const latestTableTitle = sheetTitles.at(-1)
  if(latestTableTitle){
    const data = await getDataFromSheet(sheetId, latestTableTitle)
    const filteredData = filterSensitiveData(data);
    res.json(filteredData)
  }
  else {
    res.status(500).send({data:[], headers:[]})
  }
}
