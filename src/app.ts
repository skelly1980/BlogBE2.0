import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import apiRouter from './routes/apiRouter';
import viewRouter from './routes/viewRouter';
import { ApiError } from './error/ApiError';

const BASE_API_PATH = '/api';

export const app = express();

const logger = morgan('combined', {
  skip: () => process.env.NODE_ENV === 'test',
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(helmet());
app.use(cors());
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(BASE_API_PATH, apiRouter);
app.use('/', viewRouter);

const isApiRequest = (req: Request) => {
  return req.url.startsWith(`${BASE_API_PATH}/`);
};

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404);

  if (isApiRequest(req)) {
    res.json({ message: 'Not found' });
    return;
  }

  res.render('404');
});

// api error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    console.error(err.statusCode, err.message);
    res.status(err.statusCode).json({ message: err.message });
    return;
  }
  if (isApiRequest(req)) {
    console.error(err);
    res.status(500).json({ message: err.message });
    return;
  }
  next(err);
});

// view error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).render('500', { error: err.message });
});
