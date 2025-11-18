// import express from "express";
import dotenv from 'dotenv';
import http from 'http';
import { app } from './app';

import { connectDB } from './database/db';

dotenv.config();

// eslint-disable-next-line n/no-process-env
const port = process.env.PORT;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => {
  // eslint-disable-next-line n/no-process-env
  console.log(`Express server listening on ${process.env.BASE_URL}:${port}`);
  connectDB();
});
