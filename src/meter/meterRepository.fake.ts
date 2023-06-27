import { Logger, MeterRepository, Meter } from '../types';

// here: a 'fake' repo (so the app can run locally; so its endpoints can be tested)
export const fakedMeterRepository = (logger: Logger): MeterRepository => {
  const getMeterFromExternalService = (id: string): Meter => {
    logger.info('I will become a faked meter repository', `get-meter ${id}`);

    return {
      name: id,
      fuel_type: 'elec',
    };
  };

  return {
    getMeterFromExternalService,
  };
};
