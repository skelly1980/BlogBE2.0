// import express from "express";
import dotenv from "dotenv";
import http from 'http';
import { app } from './app';


import { connectDB } from "./database/db";

dotenv.config();

// const app = express();
const port = process.env.PORT;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Express server listening on ${process.env.BASE_URL}:${port}`);
  connectDB();
});
