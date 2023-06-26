import Context from 'node-execution-context';
import * as uuid from 'uuid';
import { Request, Response } from 'express-serve-static-core';

export const ContextMiddleware = (req: Request, _res: Response, next: () => unknown) => {
  // can put request objects into the Context
  // here is where the magic happens and the context is inserted
  Context.run(next, { query: req.query, traceToken: uuid.v4() });
};

export const LocalTestContextMiddleware = (req: Request, _res: Response, next: () => unknown) => {
  // can put request objects into the Context
  // here is where the magic happens and the context is inserted
  Context.run(next, { query: req.query, traceToken: uuid.v4() });
};

// export const LoggingMiddleware = (req, res, next) => {
//   logger.info(`request started ${req.url}`);
//   res.on('finish', () => {
//     logger.info(`request finished ${req.url}`);
//   });
//   next();
// };
