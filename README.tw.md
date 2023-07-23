<div align="center">
<h1 align="center">
<img src="./frontend/public/chatroom.png" width="100" />
<br>
nextjs-13-socketio-boilerplate
</h1>
<h3>◦ 一個使用 <a href="https://socket.io/">Socket.io</a>、<a href="https://nextjs.org/">Next.js 13</a>、<a href="https://mantine.dev/">Mantine</a> 和 <a href="https://zustand-demo.pmnd.rs/">Zustand</a> 的簡單聊天應用程序。
<hr/>
<p align="center">

<img src="https://img.shields.io/badge/React-61DAFB.svg?style&logo=React&logoColor=black" alt="React" />
<img src="https://img.shields.io/badge/Nextjs13-FFFFFF.svg?style&logo=nextdotjs&logoColor=black" alt="Nextjs13" />
<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style&logo=ESLint&logoColor=white" alt="ESLint" /><img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style&logo=ESLint&logoColor=white" alt="ESLint" />
<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style&logo=TypeScript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Socket.io-010101.svg?style&logo=socketdotio&logoColor=white" alt="Socket.io" />
<img src="https://img.shields.io/badge/Express-000000.svg?style&logo=Express&logoColor=white" alt="Express" />
</p>

![GitHub top language](https://img.shields.io/github/languages/top/ttpss930141011/nextjs-13-socketio-boilerplate?style&color=5D6D7E)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/ttpss930141011/nextjs-13-socketio-boilerplate?style&color=5D6D7E)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/ttpss930141011/nextjs-13-socketio-boilerplate?style&color=5D6D7E)
![GitHub license](https://img.shields.io/github/license/ttpss930141011/nextjs-13-socketio-boilerplate?style&color=5D6D7E)

<a href="./README.md">English Readme</a> | 繁體中文 Readme

</div>

## 📍 Overview

該項目是使用 Next.js 13（應用程序路由器）和 Socket.IO 構建實時聊天應用程序的樣板。
它可以根據`npm run prod`或`npm run dev`自動切換 API。

在後端，它提供了一個簡單的 Express 服務器端設置，以在使用“npm run prod”時模擬生產環境。 或者在開發環境中使用模擬的 Socket.io API。

在前端，我將 Socket.IO 處理程序封裝到輕量級狀態管理庫 [Zustand](https://zustand-demo.pmnd.rs/) 中，並在聊天室組件中調用它們。

該項目旨在通過提供基本功能和集成的基礎來簡化實時聊天應用程序的開發。

## 🚀 Getting Started

### 🖥 安裝

1. Clone 此專案:

```sh
git clone https://github.com/ttpss930141011/nextjs-13-socketio-boilerplate
```

2. cd 此專案目錄:

```sh
cd nextjs-13-socketio-boilerplate/frontend
# and
cd nextjs-13-socketio-boilerplate/backend
```

3. 安裝相依套件:

```sh
pnpm install
```

### 🤖 使用 nextjs-13-socketio-boilerplate

在後端，您需要根據 package.json 中的操作系統自定義環境變量。  
對我來說，我的操作系統是 Windows，因此在 dev 命令中它有一個 **SET** NODE_ENV=development 命令，但 Linux/Mac 不需要它。

#### Development 環境

在 Development 環境中，前端會向其模擬的 api 服務器而不是後端服務器發出請求。

> Hint：或者您可以在前端使用 `npm run prod` 並在 .env.production 中將 **NEXT_PUBLIC_SOCKET_URL** 更改為 `ws://localhost:3001` 以向後端服務器發出請求。

```sh
# frondend
npm run dev
# backend
npm run dev
```

#### Production 環境

在 Production 環境中，前端會向後端服務器發出請求。

```sh
# frondend
npm run prod
# backend
npm run prod
```

### 部屬 nextjs-13-socketio-boilerplate

#### 後端部屬

我在 [Render](https://dashboard.render.com/) 中部署後端項目。
Render 是一家專為開發者設計的雲應用託管服務公司。 它提供了一個簡單易用的平台，使開發人員能夠快速輕鬆地將其應用程序部署到雲端。 渲染器的服務包括：

-   自動部署：Render 可以自動將您的應用程序部署到雲端，無需任何手動干預。
-   自動縮放：Render 可以自動縮放您的應用程序以滿足您的需求，無需任何手動管理。
-   自動監控：Render 可以自動監控您的應用程序並在出現問題時通知您。
-   自動備份：Render 可以自動備份您的應用程序以防止意外丟失。

以下是設置後端專案時的參數建議。

| Type             | Parameter                                  |
| :--------------- | :----------------------------------------- |
| `Name`           | `<your-project-name>`                      |
| `Branch`         | `main`                                     |
| `Root Directory` | `./backend`                                |
| `Build Command`  | `yarn build`                               |
| `Start Command`  | `NODE_ENV=production node build/server.js` |


最後，您需要在 Render 的 enviroment variable 選項 中設置 **CORS URL**。
#### 前端部屬

您只需單擊以下按鈕即可在 [Vercel](vercel.com) 上進行部署，並將 **NEXT_PUBLIC_SOCKET_URL** 設置為渲染上的後端服務器 URL。

<a href="https://vercel.com/new/clone?repository-url=https://github.com/ttpss930141011/nextjs-13-socketio-boilerplate&env=NEXT_PUBLIC_SOCKET_URL"><img src="./frontend/public/powered-by-vercel.svg" alt="Powered by Vercel" height="29"/></a>

## 📄 License

該項目已獲得 MIT 許可證的許可。 有關其他信息，請參閱 [LICENSE](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/adding-a-license-to-a-repository) 文件。
