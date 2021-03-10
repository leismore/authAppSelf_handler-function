// A routing handler for Express.js

import { Request, Response, NextFunction } from 'express';
type ExpressHandler = (req:Request, res:Response, next:NextFunction) => void;
export { ExpressHandler };
