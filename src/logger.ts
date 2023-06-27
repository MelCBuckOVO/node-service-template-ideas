import { Logger } from './types';

export const logger = (): Logger => {
  const info = (context: string, message: string) => console.log(`${context}: ${message}`);
  const error = (context: string, message: string) => console.log(`${context}: ${message}`);
  return {
    error,
    info,
  };
};
