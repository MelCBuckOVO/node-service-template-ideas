import { Logger } from '../types';
import { localStorage } from '../asyncLocalStorage';
import { Request, Response } from 'express-serve-static-core';
// here: returns a handler function that calls the meter service
export const meterApi = (logger: Logger, meterService: any) => {
  const getMeterHandler = (_request: Request, response: Response) => {
    const queryString = localStorage.getStore().get('queryString');
    const traceToken = localStorage.getStore().get('traceToken');

    // here: the traceToken is showing up : )
    console.log(`local storage traceToken: ${traceToken}`);

    // here: the queryString is showing up : )
    console.log(`local storage query: ${queryString}`);

    const meterId = queryString.id?.toString() || '';
    console.log(`meter id: ${meterId}`);
    logger.info('api', 'get-meter');

    // get meter
    const meter = meterService.getMeter(meterId);
    response.json(meter);
  };

  return {
    getMeterHandler,
  };
};
