# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- Install MongoDB
- `npm start` to start the local server

## Application Structure

- `app.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application also contains the route definitions for our API..
- `config/` - This folder contains configuration for passport as well as a central location for configuration/environment variables.
- `api` - This folder contains the api's.
