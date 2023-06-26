import * as express from 'express';
import { Express as ExpressApp } from 'express-serve-static-core';
import { meterApi } from '../src/meter/meterApi';
import { meterService } from '../src/meter/meterService';
import { fakedMeterRepository } from '../src/meter/meterRepository.fake';
import { userApi } from '../src/user/userApi';
import { userService } from '../src/user/userService';
import { fakedUserRepository } from '../src/user/userRepository.fake';
import { emailSender } from '../emailSender';
import { logger } from '../logger';
import axios from 'axios';
import { createServer, Server } from 'http';

const PORT = 8080;
const baseURL = `http://localhost:${PORT}`;

const app: ExpressApp = express();
const myLogger = logger();

const myMeterService = meterService(fakedMeterRepository(myLogger), myLogger);
const myMeterApi = meterApi(myLogger, myMeterService);

const myUserService = userService(fakedUserRepository(myLogger), emailSender, myLogger);
const myUserApi = userApi(myLogger, myUserService);

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let service: Server;
beforeAll(() => {
  app.get('/meters', myMeterApi.getMeterHandler);
  app.get('/users', myUserApi.getUserHandler);
  service = createServer(app);

  service.listen(PORT, () => console.log(`listening to port: ${PORT}`));
});

afterAll(() => {
  service.close();
});

describe('local app behavioural tests', () => {
  it('exercises the whole service right up until the point of an external meter-service call (at which point, a fake is used instead)', async () => {
    // http://localhost:8080/meters?id=1000
    const result = await axiosInstance.get(`${baseURL}/meters?id=1200`);
    expect(result.status).toBe(200);
    expect(result.data).toStrictEqual({ name: '1200', fuelType: 'elec' });
  });

  it('exercises the whole service right up until the point of an external user-service call (at which point, a fake is used instead)', async () => {
    // http://localhost:8080/users?id=1000
    const result = await axiosInstance.get(`${baseURL}/users?id=1300`);
    expect(result.status).toBe(200);
    expect(result.data).toStrictEqual({ name: '1300' });
  });
});
