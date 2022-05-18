# Taipei Trip 台北一日遊


![](https://i.imgur.com/PzYAbIc.jpg)

Taipei Trip is a travel e-commerce website. With more than 300 attractions information, click on the photos of the attractions to view more information, and make reservations and payment.


台北一日遊是一個旅遊電商網站。擁有數十筆的景點資料，點擊景點資照片可以訊查看看更多資訊，並預約行程、付款。

## Catalog
- [Live Demo](#live-demo)
- [Skills Structure](#skills-structure)
- [RESTful API](#restful-api)
- [Features](#features)
  - #1 Lazy Loading & Infinite Scroll
  - #2 Keyword Search
  - #3 Member System
  - #4 View Attractions
  - #5 Scheduled Route
  - #6 Responsive Web Design


## Live Demo


http://34.200.206.129:3000

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

每週開發完成後，會向 Reviewer 發送 Pull Request，取得同意後將 develop 分支合併到 main 分支，並將程式碼同步到 EC2 的電腦更新網站。


## RESTful API

![RESTful-API](https://user-images.githubusercontent.com/75563062/132503738-f72395fd-fa6c-4e72-bcda-62cf26673d63.png)

The project adopts a development method that separation of front-end and back-end. Through the RESTful API, different data is obtained from the back-end according to the Request method sent by the front-end.

專案採用前後端分離的開發方式，透過 RESTful API，根據前端發送的 Request 方法，向後端取得不同的資料。

⚠️ Developed according to the specification of RESTful API（Not involved in planning)



## Features

### 1️⃣ Infinite Scroll
Use Javascript `Intersection Observer API` to practice **Lazy Loading** and **Infinite Scroll** . By delaying, the required resources are loaded when needed, which reduces the loading burden of the browser and improves the user experience.

使用 Javascript 的 `Intersection Observer API` 實踐 **Lazy Loading** 和 **Infinite Scroll**。透過延遲，在需要時才載入所需資源，降低瀏覽器載入負擔，提升使用者體驗。



https://user-images.githubusercontent.com/92699251/168995570-e3c1d733-8fd4-4523-8a40-fc664fc55e3f.mp4





### 2️⃣ Keyword Search
Use keywords or regions / topic filters can quickly find the attractions you want.

使用關鍵字搜尋可以快速找到想要的景點。



https://user-images.githubusercontent.com/92699251/168995233-aa9bbfd3-9395-45cd-8c1a-28c49a6446e6.mp4




### 3️⃣ Member System
⚠️ The user needs to become a member to use the function of booking itinerary and payment.

⚠️ 使用者需要成為會員才可以使用預約行程與付款的功能。



### 4️⃣ View Attractions
Click on the pictures of attractions on the homepage to see more information.

點選首頁的景點圖片可以看到更多資訊。

- Slide Show 圖片輪播




### 5️⃣ Scheduled Route
Use `TapPay` to connect to a third-party cash flow system. After the credit card is successfully authenticated, the user completes the payment.

使用 `TapPay` 串接第三方金流系統，信用卡認證成功後，使用者完成付款。



### 6️⃣ Responsive Web Design (RWD)
