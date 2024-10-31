import Auth from "auth-google-grossremolques";
import dayjs from "dayjs";
import { getDataInJSON, getDataInArray } from "../utils/functions";
import { convertGroupDates } from "../utils/daysFnc";

const apiKey = import.meta.env.VITE_API_KEY;
const clientId = import.meta.env.VITE_CLIENT_ID;
export const authGoogle = async () => {
  const auth = await Auth(apiKey, clientId);
  return auth;
};
export class GoogleSheet {
  constructor(props) {
    this.sheetId = props.sheetId;
    this.range = props.range;
    this.rowHead = props.rowHead;
    this.nameSheet = props.nameSheet;
  }
  async getResponse() {
    try {
      const { result } = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: this.sheetId,
        range: this.range,
        valueRenderOption: "FORMULA",
      });
      if (result.error) {
        throw new Error(
          `Code: ${result.error.code} | Message: ${result.error.message}`
        );
      }
      return result;
    } catch (e) {
      console.log(e);
    }
  }
  async getData() {
    try {
      const result = await this.getResponse();
      return getDataInJSON(result.values);
    } catch (e) {
      console.log(e);
    }
  }
  async getHeaders() {
    try {
      const result = await this.getResponse();
      const headers = result.values[0];
      return headers.map((item) => item.toLocaleLowerCase());
    } catch (e) {
      console.error("Problems with getHeaders", e);
    }
  }
  async postData(data) {
    data.fecha_creacion = dayjs(new Date(), "YYYY-DD-MM").format("YYYY-MM-DD");
    convertGroupDates(data, "en-es");
    const headers = await this.getHeaders();
    const newData = getDataInArray(data, headers);
    try {
      let { result, status } =
        await gapi.client.sheets.spreadsheets.values.append({
          spreadsheetId: this.sheetId,
          range: this.range,
          includeValuesInResponse: true,
          insertDataOption: "INSERT_ROWS",
          responseDateTimeRenderOption: "FORMATTED_STRING",
          responseValueRenderOption: "FORMATTED_VALUE",
          valueInputOption: "USER_ENTERED",
          resource: {
            majorDimension: "ROWS",
            range: "",
            values: [newData],
          },
        });
      if (result.error) {
        throw new Error(
          `Code: ${result.error.code} | Message: ${result.error.message}`
        );
      }
      return { result, status };
    } catch (e) {
      console.log("Problems with postData", e);
    }
  }
  async updateData({ colName, id, values }) {
    convertGroupDates(values, "en-es");
    let dataUpdate = [];
    try {
      const data = await this.getData();
      const index = data.findIndex((item) => item[colName] === id);
      console.log("index", index);
      if (index >= 0) {
        const row = index + this.rowHead + 1;
        for (let item in values) {
          dataUpdate.push({
            row: row,
            column: this.getNumCol(item, data),
            value: values[item],
          });
        }
        const dataPost = new Array();
        for (let item of dataUpdate) {
          if (item.column > 0) {
            dataPost.push({
              majorDimension: "ROWS",
              range: `${this.nameSheet}!R${item.row}C${item.column}`,
              values: [[item.value]],
            });
          }
        }
        try {
          const {result} =
            await gapi.client.sheets.spreadsheets.values.batchUpdate({
              spreadsheetId: this.sheetId,
              resource: {
                data: dataPost,
                includeValuesInResponse: false,
                responseDateTimeRenderOption: "FORMATTED_STRING",
                responseValueRenderOption: "FORMATTED_VALUE",
                valueInputOption: "USER_ENTERED",
              },
            });
            if (result.error) {
              throw new Error(
                `Code: ${result.error.code} | Message: ${result.error.message}`
              );
            }
          return result;
        } catch (e) {
          console.log(e);
        }
      } else {
        console.error("No se encontró la fila");
      }
    } catch (e) {
      console.log(e);
    }
  }
  getNumCol(key, array) {
    let newArray = array[0];
    newArray = Object.keys(newArray);
    return newArray.indexOf(key) + 1;
  }
}
