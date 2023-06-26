import { Logger } from '../../types';
import { Request, Response } from 'express-serve-static-core';
import { localStorage } from '../asyncLocalStorage';

export const userApi = (logger: Logger, userService: any) => {
  const getUserHandler = (_request: Request, response: Response) => {
    try {
      const queryString = localStorage.getStore().get('queryString');
      const traceToken = localStorage.getStore().get('traceToken');

      // here: the traceToken is showing up : )
      console.log(`local storage traceToken: ${traceToken}`);

      // here: the queryString is showing up : )
      console.log(`local storage query: ${queryString}`);

      const userId = queryString.id?.toString() || '';
      console.log(`user id: ${userId}`);
      logger.info('api', 'get-user');

      // get user
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
