import { localStorage } from '../asyncLocalStorage';
import { UserRepository, User, UserService } from '../types';
export const userService = (repository: UserRepository, emailSender: any): UserService => {
  const getUser = (userName: string): User => {
    const logger = localStorage.getStore().get('logger');

    logger.info('service', `get-user ${userName}`);
    const userAccount = repository.getUserAccountFromExternalService(userName);
    const userFinancials = repository.getUserFinancialsFromExternalService(userName);

    emailSender.sendEmail(userAccount.email);

    return { ...userAccount, bank_name: userFinancials.bank_name };
  };

  return {
    getUser,
  };
};
