import { Logger, MeterRepository, Meter, MeterService } from '../types';

// here: returns a function that calls the repo
export const meterService = (repository: MeterRepository, logger: Logger): MeterService => {
  const getMeter = (id: string): Meter => {
    logger.info('service', `get-meter ${id}`);
    const meter = repository.getMeterFromExternalService(id);

    return meter;
  };

  return {
    getMeter,
  };
};
