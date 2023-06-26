import { Logger } from '../../types';
// here: a 'fake' repo (for service testing)
export const fakedUserRepository = (logger: Logger) => {
  const getUserFromDb = (userName: any) => {
    
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
