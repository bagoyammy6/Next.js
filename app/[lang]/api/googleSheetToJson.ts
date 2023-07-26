/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs-extra');
const unflatten = require('flat').unflatten;
const { extractSheets } = require('spreadsheet-to-json');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

extractSheets(
  {
    spreadsheetKey: process.env.SPREADSHEET_KEY,
    credentials: require(process.env.CREDENTIALS as string),
    sheetsToExtract: ['common', 'index', 'about', 'contact', 'info'],
  },
  (err: Error, data: { [x: string]: [] }) => {
    if (err) throw err;
    const sheets = ['common', 'index', 'about', 'contact', 'info'];

    sheets.forEach((sheet) => {
      const read: { key: string; tw: string; cn: string; en: string }[] = [...data[sheet]];

      interface result {
        key: string;
        tw: string;
        cn: string;
        en: string;
      }

      const result_tw = {} as result;
      const result_cn = {} as result;
      const result_en = {} as result;

      interface files {
        tw: object;
        cn: object;
        en: object;
      }

      const files: files = {
        tw: result_tw,
        cn: result_cn,
        en: result_en,
      };

      read.forEach((el) => {
        result_tw[el['key'] as keyof result] = el['tw'] ? el['tw'] : '';
        result_cn[el['key'] as keyof result] = el['cn'] ? el['cn'] : '';
        result_en[el['key'] as keyof result] = el['en'] ? el['en'] : '';
      });

      Object.keys(files).forEach((key) => {
        fs.ensureDirSync(
          path.dirname(path.resolve(__dirname, `../../../locales/${key}`, `${sheet}.json`))
        );
        fs.writeJSONSync(
          path.resolve(__dirname, `../../../locales/${key}`, `${sheet}.json`),
          unflatten(files[key as keyof files], { object: true }),
          { spaces: 2 }
        );
      });
    });
  }
);
