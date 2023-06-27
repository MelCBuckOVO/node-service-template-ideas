import { localStorage } from '../asyncLocalStorage';
export const userRepository = () => {
  const getUserFromDb = (userName: any) => {
    const logger = localStorage.getStore().get('logger');
    logger.info('real user repository', `get-user ${userName}`);

    return {
      name: userName,
      email: `${userName}@gmail.com`,
    };
  };

  return {
    getUserFromDb,
  };
};
