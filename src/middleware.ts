import * as uuid from 'uuid';
import { Request, Response } from 'express-serve-static-core';
import { localStorage } from './asyncLocalStorage';

export const setUpLocalStorageMiddleware = (req: Request, _res: Response, next: () => unknown) => {
  localStorage.run(new Map(), () => {
    localStorage.getStore().set('traceToken', uuid.v4());
    localStorage.getStore().set('queryString', req.query);

    // todo: put logger here?
    // todo: put external services here?

    next();
  });
};

export const setUpLocalStorageMiddlewareForTesting = (
  req: Request,
  _res: Response,
  next: () => unknown,
) => {
  localStorage.run(new Map(), () => {
    localStorage.getStore().set('traceToken', uuid.v4());
    localStorage.getStore().set('queryString', req.query);

    // todo: put logger here?
    // todo: put external services here?

    next();
  });
};

// export const LoggingMiddleware = (req, res, next) => {
//   logger.info(`request started ${req.url}`);
//   res.on('finish', () => {
//     logger.info(`request finished ${req.url}`);
//   });
//   next();
// };
