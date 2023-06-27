import * as uuid from 'uuid';
import { Request, Response } from 'express-serve-static-core';
import { localStorage } from './asyncLocalStorage';
import { logger } from './logger';

export const setUpLocalStorageMiddleware = (req: Request, _res: Response, next: () => unknown) => {
  localStorage.run(new Map(), () => {
    localStorage.getStore().set('traceToken', uuid.v4());
    localStorage.getStore().set('queryString', req.query);
    localStorage.getStore().set('logger', logger()), next();
  });
};
