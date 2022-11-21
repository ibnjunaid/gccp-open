import { GoogleAuth } from 'google-auth-library';
import { google, sheets_v4 } from 'googleapis';
import logger from './logger';
import { exit } from 'node:process';

let credentials;

let cred = process.env.CRED
if (cred === undefined){
    logger.error("Cannot find credentials in environment")
    exit(-1)
}
credentials = JSON.parse(cred);
credentials.private_key = credentials.private_key.replace(/\\n/gm, '\n')

const auth = new google.auth.GoogleAuth({
    scopes: "https://www.googleapis.com/auth/spreadsheets",
    credentials: credentials
});


/**
 *Returns the data contained in the spreadsheet.
 * @param spreadsheetId
 * @param tableTitle
 * @returns sheets_v4.Schema$ValueRange
 */
export async function getDataFromSheet(spreadsheetId: string, tableTitle: string): Promise<any> {
    try {
        //Auth client Object
        const authClientObject = await auth.getClient();

        //Google sheet instance
        const googleSheetInstance = google.sheets({ version: "v4", auth: authClientObject });

        //Get metadata about sheet
        const sheetInfo = await googleSheetInstance.spreadsheets.get({
            auth,
            spreadsheetId
        });

        const sheetData = await readDataFromSheetTitles(googleSheetInstance, auth, spreadsheetId, `${tableTitle}!1:1000`);

        return sheetValueToObject(sheetData);
    } catch (error: any) {
        logger.error(error.message)
        throw error;
    }
}

export async function getSheetTitles(spreadsheetId: string) {
    try {
        const authClientObject = await auth.getClient();

        //Google sheet instance
        const googleSheetInstance = google.sheets({ version: "v4", auth: authClientObject });

        //Get metadata about sheet
        const sheetInfo = await googleSheetInstance.spreadsheets.get({
            auth,
            spreadsheetId
        });

        return extractSheetTitles(sheetInfo?.data?.sheets!);
    } catch (error) {
        logger.error(`Error occured while gettins sheet titles`);
        throw error;
    }
}

function extractSheetTitles(sheets: sheets_v4.Schema$Sheet[]): Array<string> {
    const sheetTitles: Array<string> = [];
    for (let sheet of sheets) {
        if (sheet.properties?.title) {
            sheetTitles.push(sheet.properties.title);
        } else {
            throw new Error("Every Sheet should have a title")
        }
    }
    return sheetTitles;
}

async function readDataFromSheetTitles(googleSheetInstance: sheets_v4.Sheets, auth: GoogleAuth, spreadsheetId: string, range?: string): Promise<sheets_v4.Schema$ValueRange> {
    const readData = await googleSheetInstance.spreadsheets.values.get({
        auth, //auth object
        spreadsheetId, // spreadsheet id,
        range //range of cells to read from
    })
    return readData.data;
}

function sheetValueToObject(sheetValue: sheets_v4.Schema$ValueRange) {
    let sheetValueObjects = new Array<Object>();
    if (sheetValue.values) {
        let index = 0;
        for (let i = 1; i < sheetValue.values.length; i++) {
            const sValue: { [key: string]: string } = {};
            for (let j = 0; j < sheetValue.values[i].length; j++) {
                const keyName: string = sheetValue.values[0][index++];
                sValue[keyName] = sheetValue.values[i][j];
            }
            sheetValueObjects.push(sValue);
            index = 0;
        }
    }
    return sheetValueObjects;
}

export async function addDataTosheet(spreadsheetId: string, sheetTitle: string, data: any) {
    try {
        //Auth client Object
        const authClientObject = await auth.getClient();

        //Google sheet instance
        const googleSheetInstance = google.sheets({ version: "v4", auth: authClientObject });

        //Get metadata about sheet
        const sheetAppendInfo = await googleSheetInstance.spreadsheets.values.append({
            spreadsheetId: spreadsheetId,
            range: sheetTitle,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                range: sheetTitle,
                majorDimension: 'ROWS',
                values: data
            },
            includeValuesInResponse: true
        });
        return sheetAppendInfo;
    } catch(error){
        logger.error(error);
        throw error;
    }
}