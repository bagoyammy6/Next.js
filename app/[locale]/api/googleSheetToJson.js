const fs = require('fs-extra'); // 檔案系統模組
const unflatten = require('flat').unflatten; // 將扁平化的物件轉換為巢狀結構的物件模組
const { extractSheets } = require('spreadsheet-to-json'); // 從試算表中提取資料的模組
const path = require('path'); // 路徑模組
const dotenv = require('dotenv'); // 載入環境變數的模組
dotenv.config(); // 載入環境變數

// 提取試算表中的資料
extractSheets(
  {
    spreadsheetKey: process.env.SPREADSHEET_KEY, // 使用環境變數中的試算表金鑰
    credentials: require(process.env.CREDENTIALS), // 使用環境變數中的認證憑證
    sheetsToExtract: ['common', 'index', 'about', 'contact', 'info'], // 指定要提取的試算表工作表
  },
  (err, data) => {
    if (err) throw err;

    const sheets = ['common', 'index', 'about', 'contact', 'info']; // 指定要處理的工作表

    let result_en = {}; // 儲存英文翻譯結果的物件
    let result_tw = {}; // 儲存繁體中文翻譯結果的物件
    let result_cn = {}; // 儲存簡體中文翻譯結果的物件

    // 對每個工作表進行處理
    sheets.forEach((s) => {
      const read = [...data[s]]; // 從提取的資料中取出特定工作表的資料
      read.forEach((d) => {
        // 如果尚未建立該工作表的翻譯結果物件，則建立空物件
        if (!result_en[s] && !result_tw[s] && !result_cn[s]) {
          result_en[s] = {};
          result_tw[s] = {};
          result_cn[s] = {};
        }

        // 將資料按照鍵值分別儲存在對應的翻譯結果物件中
        result_en[s][d.key] = d.en;
        result_tw[s][d.key] = d.tw;
        result_cn[s][d.key] = d.cn;
      });
    });

    const fileNames = [
      { locale: 'en', data: result_en }, // 英文翻譯結果的物件
      { locale: 'tw', data: result_tw }, // 繁體中文翻譯結果的物件
      { locale: 'cn', data: result_cn }, // 簡體中文翻譯結果的物件
    ];

    // 對每個語言版本的翻譯結果進行處理
    fileNames.forEach(({ locale, data }) => {
      fs.writeJSONSync(
        path.resolve(__dirname, '../../../messages', `${locale}.json`), // 寫入的 JSON 檔案路徑
        unflatten(data, { object: true }), // 轉換為巢狀結構的物件
        { spaces: 2 } // 指定縮排的空格數
      );
    });
  }
);
