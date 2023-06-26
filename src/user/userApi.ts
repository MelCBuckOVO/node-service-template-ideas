import { Logger } from '../../types';
import Context from 'node-execution-context';
import { RequestContext, IRequest } from '../../types';

export const userApi = (logger: Logger, userService: any) => {
  const getUserHandler = (request: IRequest, response: any) => {
    try {
      const { traceToken } = Context.get() as RequestContext;

      // here: the traceToken is showing up : )
      console.log(`traceToken: ${traceToken}`);

      console.log(request.query);
      // here: the querystring is working
      const userId = request.query.id?.toString() || '';
      console.log(`user id: ${userId}`);
      logger.info('api', 'get-user');
      const user = userService.getUser(userId);
      response.json(user);
    } catch (error) {
      throw new Error(`Error getting user: ${error.message}`);
    }
  };

  return {
    getUserHandler,
  };
};
