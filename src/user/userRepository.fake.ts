import { localStorage } from '../asyncLocalStorage';
import { UserAccount, UserFinancials, UserRepository } from '../types';
// here: a 'fake' repo (so the app can run locally; so its endpoints can be tested)
export const fakedUserRepository = (): UserRepository => {
  const getUserFromExternalService = (userName: any): UserAccount => {
    const logger = localStorage.getStore().get('logger');

    logger.info('I will become a faked user repository', `get-user ${userName}`);

    return {
      name: userName,
      email: `${userName}@gmail.com`,
    };
  };

  const getUserFinancialsFromExternalService = (userName: any): UserFinancials => {
    const logger = localStorage.getStore().get('logger');
    logger.info('I will become a faked user financials repository', `get-user ${userName}`);

    return {
      user_name: userName,
      bank_name: `${userName}'s bank`,
    };
  };

  return {
    getUserFromExternalService,
    getUserFinancialsFromExternalService,
  };
};
