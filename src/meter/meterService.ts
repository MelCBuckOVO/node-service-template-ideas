import { Logger } from '../../types';

// here: returns a function that calls the repo
export const meterService = (repository: any, logger: Logger) => {
  const getMeter = (id: any) => {
    logger.info('service', `get-meter ${id}`);
    const meter = repository.getMeterFromDb(id);

    return meter;
  };

  return {
    getMeter,
  };
};
