import {Request, Response, NextFunction} from "express";

export default function errorHandler (error: any, req: Request, res: Response, next: NextFunction) {
  console.log(error);
  if (error.response) {
    return res.sendStatus(error.response.status);
  }

  res.status(500).json({ error: error.message });
}