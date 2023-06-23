import { Logger } from '../../types';

export const userApi = (logger: Logger, userService: any) => {
  const getUserHandler = (request: any, response: any) => {
    const queryString = new URLSearchParams(request.query);
    const userId = queryString.get('id');
    console.log(`user id: ${userId}`);
    logger.info('api', 'get-user');
    const user = userService.getUser(userId);
    response.json(user);
  };

  return {
    getUserHandler,
  };
};
