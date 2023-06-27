import express from 'express';
import { Express as ExpressApp } from 'express-serve-static-core';
import { userApi } from './user/userApi';
import { userService } from './user/userService';
import { userRepository } from './user/userRepository';
import { meterApi } from './meter/meterApi';
import { meterService } from './meter/meterService';
import { meterRepository } from './meter/meterRepository';
import { emailSender } from './emailSender';
import { logger } from './logger';
import { setUpLocalStorageMiddleware } from './middleware';

const app: ExpressApp = express();
// here: applying node AsyncLocalStorage hook in the middleware
app.use(setUpLocalStorageMiddleware);

// here: imagine these are external services e.g. customer, smets2 ...
// ##############################################################################
// here: myUserService is using the middleware logger (rather than passing a logger in)
const myUserService = userService(userRepository(), emailSender());
const myUserApi = userApi(myUserService);
// ##############################################################################

const myLogger = logger();
const myMeterService = meterService(meterRepository(myLogger), myLogger);
const myMeterApi = meterApi(myLogger, myMeterService);

// http://localhost:8000/users?id=1000
// here: calls a handler function that calls a service function that calls repo functions and returns data
app.get('/users', myUserApi.getUserHandler);

// http://localhost:8000/meters?id=1000
// here: calls a handler function that calls a service function that calls a repo function and returns data
app.get('/meters', myMeterApi.getMeterHandler);

const PORT = 8000;
app.listen(PORT, () => console.log(`listening to port: ${PORT}`));
