import { getHeaderMappings, getMasterSheetId } from "./db";
import logger from "./logger";
import { addDataTosheet, getDataFromSheet, getSheetTitles } from "./sheets";

type instituteDetails = {
  instituteId: string;
  sheetId: string;
};

export function filterSensitiveData(rawData: any[]) {
  const headers = getHeaderMappings();

  const sortedData = rawData.sort((a, b) => {
    const min =
      parseInt(a["# of Courses Completed"]) +
      parseInt(a["# of Skill Badges Completed"]);
    const max =
      parseInt(b["# of Courses Completed"]) +
      parseInt(b["# of Skill Badges Completed"]);

    if (min < max) {
      return 1;
    } else if (min == max) {
      return 0;
    } else {
      return -1;
    }
  });

  const data = sortedData.map((entry) => {
    return Object.keys(headers).map((header_key) => entry[header_key] ?? '');
  });
  return {
    headers: Object.values(headers),
    data: data,
  };
}

export async function getInstituteDetails(
  instituteId: string
): Promise<instituteDetails | null> {
  const sheetId = getMasterSheetId();
  const sheetTitles = await getSheetTitles(sheetId);
  const latestTableTitle = sheetTitles.at(0);

  if (latestTableTitle) {
    const data = await getDataFromSheet(sheetId, latestTableTitle);
    const instituteDetails = data.filter(
      (institute: any) => institute.instituteId == instituteId
    );
    if (instituteDetails.length === 1) {
      return instituteDetails[0];
    } else {
      return null;
    }
  } else {
    return null;
  }
}

export async function getInstitutions(): Promise<string[] | null> {
  const sheetId = getMasterSheetId();
  const sheetTitles = await getSheetTitles(sheetId);
  const latestTableTitle = sheetTitles.at(0);

  if (latestTableTitle) {
    const data = await getDataFromSheet(sheetId, latestTableTitle);
    const Institutions = data.map((institute: any) => institute.instituteId);
    if (Institutions.length >= 1) {
      return Institutions;
    } else {
      return [];
    }
  } else {
    return null;
  }
}

type registerInstituteData = string[];

export async function registerInstitute(data: registerInstituteData) {
  const sheetId = getMasterSheetId();
  const sheetTitles = await getSheetTitles(sheetId);
  const latestTableTitle = sheetTitles.at(0);

  if (latestTableTitle) {
    const res = addDataTosheet(sheetId, latestTableTitle, [data]);
    return res;
  } else {
    return null;
  }
}

export async function validateSheet(sheetId: string) {
  try {
    const sheetTitles = await getSheetTitles(sheetId);
    const latestTableTitle = sheetTitles.at(0);
    if (latestTableTitle) {
      return "OK";
    } else {
      throw new Error("No sheet found");
    }
  } catch (error) {
    logger.error(error);
    throw error;
  }
}
