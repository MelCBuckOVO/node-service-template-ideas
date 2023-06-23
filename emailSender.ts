import { Logger } from './types';

export const emailSender = (logger: Logger) => {
  const sendEmail = (email: any) => logger.info('email-sender', `send-email ${email}`);

  return {
    sendEmail,
  };
};
