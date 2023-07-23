<div align="center">
<h1 align="center">
<img src="./frontend/public/chatroom.png" width="100" />
<br>
nextjs-13-socketio-boilerplate
</h1>
<h3>◦ A simple chat app with <a href="https://socket.io/">Socket.io</a>, <a href="https://nextjs.org/">Next.js 13</a>, <a href="https://mantine.dev/">Mantine</a> and <a href="https://zustand-demo.pmnd.rs/">Zustand</a>.</h3>
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

English Readme | <a href="./README.tw.md">繁體中文 Readme</a>

</div>

## 📍 Overview

The project is a boilerplate for building real-time chat applications using Next.js 13(app router) and Socket.IO.  
It can automatically switch API based on `npm run prod` or `npm run dev`.  
On the backend, It provides a simple Express server-side setup to simulate a production environment when using `npm run prod`. Or it will use mocked Socket.io API in development enviroment.  
On the frontend, I encasulate Socket.IO hander into a lightweight state management library [Zustand](https://zustand-demo.pmnd.rs/) and invoke them in chatroom components.  
 The project aims to streamline the development of real-time chat applications by providing a foundation with essential features and integrations.

## 🚀 Getting Started

### 🖥 Installation

1. Clone the nextjs-13-socketio-boilerplate repository:

```sh
git clone https://github.com/ttpss930141011/nextjs-13-socketio-boilerplate
```

2. Change to the project directory:

```sh
cd nextjs-13-socketio-boilerplate/frontend
# and
cd nextjs-13-socketio-boilerplate/backend
```

3. Install the dependencies:

```sh
pnpm install
```

### 🤖 Using nextjs-13-socketio-boilerplate

On the backend, you need to customize your enviroment variables certainly based on OS in package.json.
For me, my os is windows, so in the dev command it have a **SET** NODE_ENV=development command but it don't need it Linux/Mac.

#### Development enviroment

In development, frontend will rise a request to its mocked api server but backend server.

> Hint: Or you can use `npm run prod` in frontend and change **NEXT_PUBLIC_SOCKET_URL** as `ws://localhost:3001` in .env.production to rise a request to backend server.

```sh
# frondend
npm run dev
# backend
npm run dev
```

#### Production enviroment

In production, frontend will rise a request to express backend server.

```sh
# frondend
npm run prod
# backend
npm run prod
```

### Deploy nextjs-13-socketio-boilerplate

#### Backend deployment

I deploy the backend project in [Render](https://dashboard.render.com/).  
Render is a cloud application hosting service company designed for developers. It provides a simple and easy-to-use platform that allows developers to quickly and easily deploy their applications to the cloud. Render's services include:

-   Automatic deployment: Render can automatically deploy your application to the cloud without any manual intervention.
-   Automatic scaling: Render can automatically scale your application to meet your needs without any manual management.
-   Automatic monitoring: Render can automatically monitor your application and notify you when problems occur.
-   Automatic backup: Render can automatically backup your application to prevent accidental loss.

The following is the parameters suggestions when setting backend project.

| Type             | Parameter                                  |
| :--------------- | :----------------------------------------- |
| `Name`           | `<your-project-name>`                      |
| `Branch`         | `main`                                     |
| `Root Directory` | `./backend`                                |
| `Build Command`  | `yarn build`                               |
| `Start Command`  | `NODE_ENV=production node build/server.js` |

Finally, you need to set the **CORS_URL** in enviroment variable in Render enviroment varible in project's tab.

#### Frontend deployment

You can just deploy on [Vercel](vercel.com) by clicking the following buttom,and set **NEXT_PUBLIC_SOCKET_URL** as your backend server url on Render.

<a href="https://vercel.com/new/clone?repository-url=https://github.com/ttpss930141011/nextjs-13-socketio-boilerplate&env=NEXT_PUBLIC_SOCKET_URL"><img src="./frontend/public/powered-by-vercel.svg" alt="Powered by Vercel" height="29"/></a>

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/adding-a-license-to-a-repository) file for additional info.
