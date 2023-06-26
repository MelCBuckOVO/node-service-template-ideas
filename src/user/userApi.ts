import { Logger } from '../../types';
import Context from 'node-execution-context';
import { RequestContext } from '../../types';
import { Request, Response } from 'express-serve-static-core';

export const userApi = (logger: Logger, userService: any) => {
  const getUserHandler = (_request: Request, response: Response) => {
    try {
      const { traceToken, query } = Context.get() as RequestContext;
      console.log(Context.get() as RequestContext);
      // here: the traceToken is showing up : )
      console.log(`traceToken: ${traceToken}`);

      // here: the query is showing up : )
      console.log(`query: ${query}`);

      // here: the querystring is working
      const userId = query.id?.toString() || '';
      //const userId = request.query.id?.toString() || '';
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
