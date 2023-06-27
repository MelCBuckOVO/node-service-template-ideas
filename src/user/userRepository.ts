import { localStorage } from '../asyncLocalStorage';
import { UserAccount, UserFinancials, UserRepository } from '../types';

export const userRepository = (): UserRepository => {
  const getUserAccountFromExternalService = (userName: string): UserAccount => {
    const logger = localStorage.getStore().get('logger');
    logger.info('I will become a real user account repository', `get-user ${userName}`);

    return {
      name: userName,
      email: `${userName}@gmail.com`,
    };
  };

  const getUserFinancialsFromExternalService = (userName: string): UserFinancials => {
    const logger = localStorage.getStore().get('logger');
    logger.info('I will become a real user financials repository', `get-user ${userName}`);

    return {
      user_name: userName,
      bank_name: `${userName}'s bank`,
    };
  };

  return {
    getUserAccountFromExternalService,
    getUserFinancialsFromExternalService,
  };
};
