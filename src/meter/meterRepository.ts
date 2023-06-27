import { Logger, MeterRepository } from '../types';

// here: a real repo, for production code
export const meterRepository = (logger: Logger): MeterRepository => {
  const getMeterFromDb = (id: string) => {
    logger.info('real meter repository', `get-meter ${id}`);

    return {
      name: id,
      fuelType: 'gas',
    };
  };

  return {
    getMeterFromDb,
  };
};
