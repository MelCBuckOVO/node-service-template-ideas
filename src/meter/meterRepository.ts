import { Logger, Meter, MeterRepository } from '../types';

// here: a real repo, for production code
export const meterRepository = (logger: Logger): MeterRepository => {
  const getMeterFromExternalService = (id: string): Meter => {
    logger.info('I will become a real meter repository', `get-meter ${id}`);

    return {
      name: id,
      fuel_type: 'gas',
    };
  };

  return {
    getMeterFromExternalService,
  };
};
