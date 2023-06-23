import express from 'express';
import { Express as ExpressApp } from 'express-serve-static-core';
import { userApi } from './user/userApi';
import { userService } from './user/userService';
import { userRepository } from './user/userRepository';
import { meterApi } from './meter/meterApi';
import { meterService } from './meter/meterService';
import { meterRepository } from './meter/meterRepository';
import { emailSender } from '../emailSender';
import { logger } from '../logger';

const app: ExpressApp = express();
const myLogger = logger();
// here: looking at how the logger works
console.log('error: ' + myLogger.error);
console.log('info: ' + myLogger.info);
myLogger.info('x', 'y');
myLogger.error('a', 'b');

// here: imagine these are external services ...
const myUserService = userService(userRepository(myLogger), emailSender(myLogger), myLogger);
const myUserApi = userApi(myLogger, myUserService);

const myMeterService = meterService(meterRepository(myLogger), myLogger);
const myMeterApi = meterApi(myLogger, myMeterService);

// http://localhost:8000/users?id=1000
// here: calls a function that calls a service that calls a repo and fires an email
app.get('/users', myUserApi.getUserHandler);

// http://localhost:8000/meters?id=1000
// here: calls a function that calls a service that calls a repo
app.get('/meters', myMeterApi.getMeterHandler);

const PORT = 8000;
app.listen(PORT, () => console.log(`listening to port: ${PORT}`));
