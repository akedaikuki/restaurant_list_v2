# 餐廳清單
此份作業是 Alphacamp 學期 2-3 我的餐廳清單 CRUD

## 網站功能
- 查看所有餐廳
- 瀏覽餐廳的詳細資訊
- 連結餐廳的地址到 Google 地圖
- 搜尋特定餐廳
- 新增餐廳
- 編輯餐廳
- 刪除餐廳

### 專案開發環境
- node.js 環境
- express 框架
- express-handlebars 樣板引擎

#### 操作
- Step1. 確認安裝  node.js 與 npm
- Step2. git clone https://github.com/akedaikuki/restaurant_list_v2.git
- Step3. 終端機輸入  npm install
- Step4. 安裝 nodemon (如果已有可跳過)  npm install -g nodemon
- Step5. 使用 MongoDB cloud 獲得你的 connection string  
- Step6. 在專案內創造一個 .env 檔案，並在其輸入你的 MongoDB connection string，
         <br />並更改你 MongoDB 的 `username`、`password`、`database name`  可參閱 .envexample
- Step7. 產生種子資料  npm run seed      
- Step8. 啟動伺服器 (這會使用 nodemon 啟動專案)  npm run dev
- Step9. 確認訊息是否如下 Express is listening on localhost:3000 mongodb connected!
- Step10. 瀏覽器輸入 http://localhost:3000
- Step11. 如欲暫停伺服器，請切換至終端機並且ctrl+c

##### 開發工具
- Node.js v14.16.0
- Express 4.16.4
- Express-Handlebars @3.0.0
- Bootstrap v5.3.0
- MongoDB
- mongoose 5.9.7
