<div align="center">
<h1 align="center">
<img src="./frontend/public/chatroom.png" width="100" />
<br>
nextjs-13-socketio-boilerplate
</h1>
<h3>◦ A simple chat app with <a href="https://socket.io/">Socket.io</a>, <a href="https://nextjs.org/">Next.js 13</a>, <a href="https://mantine.dev/">Mantine</a> and <a href="https://zustand-demo.pmnd.rs/">Zustand</a>.</h3>
<h3>◦ Developed with the software and tools listed below.</h3>

<p align="center">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style&logo=JavaScript&logoColor=black" alt="JavaScript" />
<img src="https://img.shields.io/badge/Prettier-F7B93E.svg?style&logo=Prettier&logoColor=black" alt="Prettier" />
<img src="https://img.shields.io/badge/PostCSS-DD3A0A.svg?style&logo=PostCSS&logoColor=white" alt="PostCSS" />
<img src="https://img.shields.io/badge/Autoprefixer-DD3735.svg?style&logo=Autoprefixer&logoColor=white" alt="Autoprefixer" />
<img src="https://img.shields.io/badge/Redis-DC382D.svg?style&logo=Redis&logoColor=white" alt="Redis" />
<img src="https://img.shields.io/badge/Nodemon-76D04B.svg?style&logo=Nodemon&logoColor=white" alt="Nodemon" />
<img src="https://img.shields.io/badge/React-61DAFB.svg?style&logo=React&logoColor=black" alt="React" />
<img src="https://img.shields.io/badge/Axios-5A29E4.svg?style&logo=Axios&logoColor=white" alt="Axios" />

<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style&logo=ESLint&logoColor=white" alt="ESLint" />
<img src="https://img.shields.io/badge/SemVer-3F4551.svg?style&logo=SemVer&logoColor=white" alt="SemVer" />
<img src="https://img.shields.io/badge/tsnode-3178C6.svg?style&logo=ts-node&logoColor=white" alt="tsnode" />
<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style&logo=TypeScript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Socket.io-010101.svg?style&logo=socketdotio&logoColor=white" alt="Socket.io" />
<img src="https://img.shields.io/badge/Express-000000.svg?style&logo=Express&logoColor=white" alt="Express" />
<img src="https://img.shields.io/badge/JSON-000000.svg?style&logo=JSON&logoColor=white" alt="JSON" />
<img src="https://img.shields.io/badge/Markdown-000000.svg?style&logo=Markdown&logoColor=white" alt="Markdown" />
</p>

![GitHub top language](https://img.shields.io/github/languages/top/ttpss930141011/nextjs-13-socketio-boilerplate?style&color=5D6D7E)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/ttpss930141011/nextjs-13-socketio-boilerplate?style&color=5D6D7E)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/ttpss930141011/nextjs-13-socketio-boilerplate?style&color=5D6D7E)
![GitHub license](https://img.shields.io/github/license/ttpss930141011/nextjs-13-socketio-boilerplate?style&color=5D6D7E)

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
| `Name`           | `------`                                   |
| `Branch`         | `main`                                     |
| `Root Directory` | `./backend`                                |
| `Build Command`  | `yarn build`                               |
| `Start Command`  | `NODE_ENV=production node build/server.js` |

Finally, you need to set the **CORS_URL** in enviroment varible in Render enviroment varible in project's tab.

#### Frontend deployment
You can just deploy on [Vercel](vercel.com) by clicking the following buttom,and set **NEXT_PUBLIC_SOCKET_URL** as your backend server url on Render.

<a href="https://vercel.com/new/clone?repository-url=https://github.com/ttpss930141011/nextjs-13-socketio-boilerplate&env=NEXT_PUBLIC_SOCKET_URL"><img src="./frontend/public/powered-by-vercel.svg" alt="Powered by Vercel" height="29"/></a>


## 📄 License

This project is licensed under the MIT License. See the [LICENSE](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/adding-a-license-to-a-repository) file for additional info.
