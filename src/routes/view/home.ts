import express, { Request, Response } from 'express';

export const homeRouter = express.Router();

homeRouter.get('/', (_req: Request, res: Response) => {
  res.render('home');
});
