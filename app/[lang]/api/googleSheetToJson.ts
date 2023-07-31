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
      const read: { key: string; 'zh-TW': string; 'zh-CN': string; 'en-US': string }[] = [
        ...data[sheet],
      ];

      interface result {
        key: string;
        'zh-TW': string;
        'zh-CN': string;
        'en-US': string;
      }

      const result_tw = {} as result;
      const result_cn = {} as result;
      const result_en = {} as result;

      interface files {
        'zh-TW': object;
        'zh-CN': object;
        'en-US': object;
      }

      const files: files = {
        'zh-TW': result_tw,
        'zh-CN': result_cn,
        'en-US': result_en,
      };

      read.forEach((el) => {
        result_tw[el['key'] as keyof result] = el['zh-TW'] ? el['zh-TW'] : '';
        result_cn[el['key'] as keyof result] = el['zh-CN'] ? el['zh-CN'] : '';
        result_en[el['key'] as keyof result] = el['en-US'] ? el['en-US'] : '';
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
