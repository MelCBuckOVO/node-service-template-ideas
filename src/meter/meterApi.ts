import { Logger } from '../../types';

// here: returns a handler function that calls the meter service
export const meterApi = (logger: Logger, meterService: any) => {
  const getMeterHandler = (request: any, response: any) => {
    const queryString = new URLSearchParams(request.query);
    const meterId = queryString.get('id');
    console.log(`meter id: ${meterId}`);
    logger.info('api', 'get-meter');
    const meter = meterService.getMeter(meterId);
    response.json(meter);
  };

  return {
    getMeterHandler,
  };
};
