import { Logger, MeterRepository } from '../../types';

// here: a 'fake / stub' repo (for service testing)
export const stubbedMeterRepository = (logger: Logger): MeterRepository => {
  const getMeterFromDb = (id: string) => {
    logger.info('stubbed meter repository', `get-meter ${id}`);

    return {
      name: id,
      fuelType: 'elec',
    };
  };

  return {
    getMeterFromDb,
  };
};
