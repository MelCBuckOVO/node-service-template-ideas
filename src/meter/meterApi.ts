import { Logger } from '../../types';
import Context from 'node-execution-context';
import { RequestContext } from '../../types';
import { Request, Response } from 'express-serve-static-core';
// here: returns a handler function that calls the meter service
export const meterApi = (logger: Logger, meterService: any) => {
  const getMeterHandler = (request: Request, response: Response) => {
    console.log(Context.get() as RequestContext);
    const meterId = request.query.id?.toString() || '';
    console.log(`meter id from request: ${meterId}`);
    logger.info('api', 'get-meter');
    const meter = meterService.getMeter(meterId);
    response.json(meter);
  };

  return {
    getMeterHandler,
  };
};
