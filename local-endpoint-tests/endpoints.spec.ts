import * as express from 'express';
import { Express as ExpressApp } from 'express-serve-static-core';
import { meterApi } from '../src/meter/meterApi';
import { meterService } from '../src/meter/meterService';
import { fakedMeterRepository } from '../src/meter/meterRepository.fake';
import { userApi } from '../src/user/userApi';
import { userService } from '../src/user/userService';
import { fakedUserRepository } from '../src/user/userRepository.fake';
import { emailSender } from '../src/emailSender';
import { logger } from '../src/logger';
import axios, { AxiosInstance } from 'axios';
import { createServer, Server } from 'http';
import { setUpLocalStorageMiddleware } from '../src/middleware'; // LoggingMiddleware

const PORT = 8080;
const baseURL = `http://localhost:${PORT}`;
let service: Server;
let axiosInstance: AxiosInstance;

const app: ExpressApp = express();
// here: applying asyncLocalStorage in the middleware
app.use(setUpLocalStorageMiddleware);
const myLogger = logger();

const myUserService = userService(fakedUserRepository(), emailSender());
const myUserApi = userApi(myUserService);

const myMeterService = meterService(fakedMeterRepository(myLogger), myLogger);
const myMeterApi = meterApi(myLogger, myMeterService);

app.get('/users', myUserApi.getUserHandler);
app.get('/meters', myMeterApi.getMeterHandler);

beforeAll(() => {
  service = createServer(app);
  service.listen(PORT, () => console.log(`listening to port: ${PORT}`));
  axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });
});

afterAll(() => {
  service.close();
});

describe('local app endpoint tests', () => {
  it('exercises the whole local app right up until the point of an external meter-service call (at which point, a fake meters repo is used instead)', async () => {
    // http://localhost:8080/meters?id=1000
    const result = await axiosInstance.get(`${baseURL}/meters?id=1200`);
    expect(result.status).toBe(200);
    expect(result.data).toStrictEqual({ name: '1200', fuel_type: 'elec' });
  });

  it('exercises the whole local app right up until the point of an external user-service call (at which point, a fake users repo is used instead)', async () => {
    // http://localhost:8080/users?id=1000
    const result = await axiosInstance.get(`${baseURL}/users?id=1300`);
    expect(result.status).toBe(200);
    expect(result.data).toStrictEqual({
      name: '1300',
      email: '1300@gmail.com',
      bank_name: "1300's bank",
    });
  });
});