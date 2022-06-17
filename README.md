# Groupomania | Openclassrooms P7 - Fullstack project

Fullstack implementation of an corporate social network

## Getting started

### 1- Pre requisites

- You will need to have Node and [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed locally on your machine.
- Clone or download this repository

### 2- Backend installation

From the _server_ directory:

- create your MySQL database
- Remove the .sample extension from the .env file and fill the `DB_NAME` `DB_USERNAME` and `DB_PASSWORD` fields with your MySQL login infos.
- Run `npm install` command to install the backend dependencies.
- Run `npm start` command to launch the API

At this point the server should be running on port 3000 and the following messages should be displayed in your terminal :

```bash
Listening on port 3000
...
connected to database...
```

### 3- Frontend installation

From the _client_ directory:

- Run `npm install` command to install the frontend dependencies.
- Run `npm start` to launch the frontend server in development mode.

At this point, the application should automatically start running in your web browser.

## Project Overview

### Built with

Backend

- Node JS / Express
- MySQL / Sequelize

Frontend

- React
- Bootstrap / React Boostrap / Styled Components
