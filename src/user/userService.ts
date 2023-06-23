import { Logger } from '../../types';

export const userService = (repository: any, emailSender: any, logger: Logger) => {
  const getUser = (userName: any) => {
    logger.info('service', `get-user ${userName}`);
    const user = repository.getUserFromDb(userName);
    emailSender.sendEmail(user.email);

    return user;
  };

  return {
    getUser,
  };
};
