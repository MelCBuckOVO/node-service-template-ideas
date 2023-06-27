import { localStorage } from '../asyncLocalStorage';
// here: a 'fake' repo (for service testing)
export const fakedUserRepository = () => {
  const getUserFromDb = (userName: any) => {
    const logger = localStorage.getStore().get('logger');

    logger.info('I will become a faked user repository', `get-user ${userName}`);

    return {
      name: userName,
      email: `${userName}@gmail.com`,
    };
  };

  return {
    getUserFromDb,
  };
};
