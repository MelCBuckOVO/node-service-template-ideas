import { Logger } from '../../types';
export const userRepository = (logger: Logger) => {
  const getUserFromDb = (userName: any) => {
    logger.info('repository', `get-user ${userName}`);

    return {
      name: userName,
      email: `${userName}@gmail.com`,
    };
  };

  return {
    getUserFromDb,
  };
};
