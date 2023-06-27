import { localStorage } from './asyncLocalStorage';

export const emailSender = () => {
  const sendEmail = (email: any) => {
    const logger = localStorage.getStore().get('logger');
    logger.info('email-sender', `send-email ${email}`);
  };

  return {
    sendEmail,
  };
};
