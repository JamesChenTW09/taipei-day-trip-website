# Taipei Trip 台北一日遊


![](https://i.imgur.com/PzYAbIc.jpg)

Taipei Trip is a travel e-commerce website. With many attractions information, click on the photos of the attractions to view more information, and make reservations and payment.


台北一日遊是一個旅遊電商網站。擁有數十筆的景點資料，點擊景點資照片可以訊查看看更多資訊，並預約行程、付款。


#### Test Account
| - | - |
| -------- | -------- |
| Account | test@test.com |
| Password | test |


#### Credit Card for test
| - | - |
| -------- | -------- |
| Card Number	 | 4242424242424242 |
| Valid Date	 | 01 / 23 |
| CVV	 | 123 |

## Skills Structure
![台北一日遊-技術架構](https://user-images.githubusercontent.com/75563062/133192590-4eb4a1bd-8b64-436f-8c07-e8c1a2cede1d.png)

After the weekly development is completed, will sent `Pull Request` to the Reviewer, and after obtaining consent, the develop branch will be `merged` into the main branch, and the code will be synchronized to the EC2 computer update website.

每週開發完成後，會向 Reviewer 發送 Pull Request，取得同意後將 develop 分支合併到 main 分支，並將程式碼同步到 AWS EC2 的電腦更新網站。


## RESTful API

![RESTful-API](https://user-images.githubusercontent.com/75563062/132503738-f72395fd-fa6c-4e72-bcda-62cf26673d63.png)

The project adopts a development method that separation of front-end and back-end. Through the RESTful API, different data is obtained from the back-end according to the Request method sent by the front-end.

專案採用前後端分離的開發方式，透過 RESTful API，根據前端發送的 Request 方法，向後端取得不同的資料。

⚠️ Developed according to the specification of RESTful API（Not involved in planning)



## Features

### 1️⃣ Infinite Scroll
Use `getBoundingClientRect and debounce` to practice  **Infinite Scroll** . By delaying, the required resources are loaded when needed, which reduces the loading burden of the browser and improves the user experience.

使用 `getBoundingClientRect and debounce` 實踐 **Infinite Scroll**。透過延遲，在需要時才載入所需資源，降低瀏覽器載入負擔，提升使用者體驗。


![ezgif-2-b43d405619](https://user-images.githubusercontent.com/92699251/169023608-3e32c378-5916-4eea-bcc7-556a791f1e4d.gif)



### 2️⃣ Keyword Search
Use keywords filters can quickly find the attractions you want.

使用關鍵字搜尋可以快速找到想要的景點。


![ezgif-2-66196706cd](https://user-images.githubusercontent.com/92699251/169029054-9eb102ac-ec90-4df4-83fe-2a11872d2023.gif)




### 3️⃣ Member System
⚠️ The user needs to become a member to use the function of booking itinerary and payment.

⚠️ 使用者需要成為會員才可以使用預約行程與付款的功能。


![ezgif-2-bb6fe49451](https://user-images.githubusercontent.com/92699251/169029437-ddc51090-a1cb-4481-ba03-4a3191a889c3.gif)

### 4️⃣ View Attractions
Click on the pictures of attractions on the homepage to see more information.

點選首頁的景點圖片可以看到更多資訊。

- Slide Show 圖片輪播

![ezgif-2-093c9bb53a](https://user-images.githubusercontent.com/92699251/169029740-9959fd04-c1c2-475b-9434-c454f3e69b3f.gif)



### 5️⃣ Scheduled Route
Use `TapPay` to connect to a third-party cash flow system. After the credit card is successfully authenticated, the user completes the payment.

使用 `TapPay` 串接第三方金流系統，信用卡認證成功後，使用者完成付款。
![ezgif-2-2907515d0d](https://user-images.githubusercontent.com/92699251/169029980-1977cd29-aab7-4b27-99e7-8324ff1743fa.gif)



### 6️⃣ Responsive Web Design (RWD)


![ezgif-2-9778d263e2](https://user-images.githubusercontent.com/92699251/169189279-fbfff30b-f910-458c-8f02-907dc841bf34.gif)

