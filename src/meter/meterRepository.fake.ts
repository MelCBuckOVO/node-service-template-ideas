import { Logger, MeterRepository } from '../../types';

// here: a 'fake' repo (for service testing)
export const fakedMeterRepository = (logger: Logger): MeterRepository => {
  const getMeterFromDb = (id: string) => {
    logger.info('I will become a faked meter repository', `get-meter ${id}`);

    return {
      name: id,
      fuelType: 'elec',
    };
  };

  return {
    getMeterFromDb,
  };
};
