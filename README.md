# icon-browser

`leverate-icon-browser` is a React application (port **3000**) that allows you to browse icons from The Noun Project. You can configure the target API URLs via a **.env** file.

Both the NestJS and Node.js servers provide identical functionality as backends. They load credentials and settings from environment variables.

---

## Table of Contents

* [Features](#features)
* [Prerequisites](#prerequisites)
* [Getting Started](#getting-started)
* [Environment Variables](#environment-variables)
* [Running the Servers](#running-the-servers)
* [Usage](#usage)

---

## Features

* React frontend on port **3000**
* Two interchangeable backends (NestJS and Node.js) on ports **3001** and **3002**
* Configurable API URLs and credentials via `.env`
* Browses and fetches icons from The Noun Project API

---

## Prerequisites

* Node.js (>=14.x)
* npm (>=6.x)

---

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/mengeshaster/icon-browser.git
   cd icon-browser
   ```

2. **Install dependencies** in each project folder:

   ```bash
   cd leverate-icon-browser
   npm install

   cd ../leverate-server-nest-js
   npm install

   cd ../leverate-server-node-js
   npm install
   ```

---

## Environment Variables

Create a `.env` file in each project root (React, NestJS, Node.js) with the following keys:

```dotenv
# Icon Browser (React)
REACT_APP_API_URL=http://localhost:3001   # or 3002 for Node.js backend

# Common API credentials for both backends:
API_KEY=your_noun_project_api_key
API_SECRET=your_noun_project_api_secret

# Additional for NestJS backend:
NOUN_PROJECT_BASE_URL=https://api.thenounproject.com/v2/icon
```

> **Note:** React reads `REACT_APP_API_URL`. The servers read the other keys directly.

---

## Running the Servers

### 1. React Frontend (Icon Browser)

```bash
cd leverate-icon-browser
npm start
```

* Runs on **[http://localhost:3000/](http://localhost:3000/)**

### 2. NestJS Backend

```bash
cd leverate-server-nest-js
npm start
```

* Runs on **[http://localhost:3001/](http://localhost:3001/)**
* API endpoints served under `/api`

### 3. Node.js Backend

```bash
cd leverate-server-node-js
npm start
```

* Runs on **[http://localhost:3002/](http://localhost:3002/)**
* API endpoints served under `/api`

---

## Usage

1. Open your browser to **[http://localhost:3000](http://localhost:3000)**.
2. Browse and search icons powered by The Noun Project API.
3. Switch backend by changing `REACT_APP_API_URL` in the React `.env` to `http://localhost:3002/api` and restart the React app.

---

**Happy browsing!**
