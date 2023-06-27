import { localStorage } from '../asyncLocalStorage';
export const userService = (repository: any, emailSender: any) => {
  const getUser = (userName: any) => {
    const logger = localStorage.getStore().get('logger');
    logger.info('service', `get-user ${userName}`);
    const user = repository.getUserFromDb(userName);
    emailSender.sendEmail(user.email);

    return user;
  };

  return {
    getUser,
  };
};
