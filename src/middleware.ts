import Context from 'node-execution-context';
import * as uuid from 'uuid';
// import { Response } from 'express-serve-static-core';
import { IRequest } from '../types';
export const ContextMiddleware = (req: any, _res: any, next: () => unknown) => {
  // set some request objects into the Context
  const { url, traceToken = uuid.v4(), method } = req as IRequest;
  // here is where the magic happens and the context is inserted
  Context.run(next, { url, traceToken, method });
};

// export const LoggingMiddleware = (req, res, next) => {
//   logger.info(`request started ${req.url}`);
//   res.on('finish', () => {
//     logger.info(`request finished ${req.url}`);
//   });
//   next();
// };
