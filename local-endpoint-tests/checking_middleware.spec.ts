export {};

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

const PORT = 8081;
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

describe('hit endpoint in parallel to check correct user id is preserved by the middleware implementation of AsyncLocalStorage', () => {
  // don't run these serially, leave them as default (i.e. running in parallel)
  const users = [
    ['1', { name: '1', email: '1@gmail.com', bank_name: "1's bank" }],
    ['2', { name: '2', email: '2@gmail.com', bank_name: "2's bank" }],
    ['3', { name: '3', email: '3@gmail.com', bank_name: "3's bank" }],
    ['4', { name: '4', email: '4@gmail.com', bank_name: "4's bank" }],
    ['5', { name: '5', email: '5@gmail.com', bank_name: "5's bank" }],
    ['6', { name: '6', email: '6@gmail.com', bank_name: "6's bank" }],
    ['7', { name: '7', email: '7@gmail.com', bank_name: "7's bank" }],
    ['8', { name: '8', email: '8@gmail.com', bank_name: "8's bank" }],
    ['9', { name: '9', email: '9@gmail.com', bank_name: "9's bank" }],
    ['10', { name: '10', email: '10@gmail.com', bank_name: "10's bank" }],
    ['11', { name: '11', email: '11@gmail.com', bank_name: "11's bank" }],
    ['12', { name: '12', email: '12@gmail.com', bank_name: "12's bank" }],
    ['13', { name: '13', email: '13@gmail.com', bank_name: "13's bank" }],
    ['14', { name: '14', email: '14@gmail.com', bank_name: "14's bank" }],
    ['15', { name: '15', email: '15@gmail.com', bank_name: "15's bank" }],
    ['16', { name: '16', email: '16@gmail.com', bank_name: "16's bank" }],
    ['17', { name: '17', email: '17@gmail.com', bank_name: "17's bank" }],
    ['18', { name: '18', email: '18@gmail.com', bank_name: "18's bank" }],
    ['19', { name: '19', email: '19@gmail.com', bank_name: "19's bank" }],
    ['20', { name: '20', email: '20@gmail.com', bank_name: "20's bank" }],
  ];
  it('when id is 1 it is preserved', async () => {
    // http://localhost:8080/users?id=1
    const result = await axiosInstance.get(`${baseURL}/users?id=1`);
    expect(result.status).toBe(200);
    expect(result.data).toStrictEqual(users[0][1]);
  });
  it('when id is 2 it is preserved', async () => {
    const result = await axiosInstance.get(`${baseURL}/users?id=2`);
    expect(result.status).toBe(200);
    expect(result.data).toStrictEqual(users[1][1]);
  });
  it('when id is 3 it is preserved', async () => {
    const result = await axiosInstance.get(`${baseURL}/users?id=3`);
    expect(result.status).toBe(200);
    expect(result.data).toStrictEqual(users[2][1]);
  });
  it('when id is 4 it is preserved', async () => {
    const result = await axiosInstance.get(`${baseURL}/users?id=4`);
    expect(result.status).toBe(200);
    expect(result.data).toStrictEqual(users[3][1]);
  });
  it('when id is 5 it is preserved', async () => {
    const result = await axiosInstance.get(`${baseURL}/users?id=5`);
    expect(result.status).toBe(200);
    expect(result.data).toStrictEqual(users[4][1]);
  });
  it('when id is 6 it is preserved', async () => {
    const result = await axiosInstance.get(`${baseURL}/users?id=6`);
    expect(result.status).toBe(200);
    expect(result.data).toStrictEqual(users[5][1]);
  });
  it('when id is 7 it is preserved', async () => {
    const result = await axiosInstance.get(`${baseURL}/users?id=7`);
    expect(result.status).toBe(200);
    expect(result.data).toStrictEqual(users[6][1]);
  });
  it('when id is 8 it is preserved', async () => {
    const result = await axiosInstance.get(`${baseURL}/users?id=8`);
    expect(result.status).toBe(200);
    expect(result.data).toStrictEqual(users[7][1]);
  });
  it('when id is 9 it is preserved', async () => {
    const result = await axiosInstance.get(`${baseURL}/users?id=9`);
    expect(result.status).toBe(200);
    expect(result.data).toStrictEqual(users[8][1]);
  });
  it('when id is 10 it is preserved', async () => {
    const result = await axiosInstance.get(`${baseURL}/users?id=10`);
    expect(result.status).toBe(200);
    expect(result.data).toStrictEqual(users[9][1]);
  });
  it('when id is 11 it is preserved', async () => {
    const result = await axiosInstance.get(`${baseURL}/users?id=11`);
    expect(result.status).toBe(200);
    expect(result.data).toStrictEqual(users[10][1]);
  });
  it('when id is 12 it is preserved', async () => {
    const result = await axiosInstance.get(`${baseURL}/users?id=12`);
    expect(result.status).toBe(200);
    expect(result.data).toStrictEqual(users[11][1]);
  });
  it('when id is 13 it is preserved', async () => {
    const result = await axiosInstance.get(`${baseURL}/users?id=13`);
    expect(result.status).toBe(200);
    expect(result.data).toStrictEqual(users[12][1]);
  });
  it('when id is 14 it is preserved', async () => {
    const result = await axiosInstance.get(`${baseURL}/users?id=14`);
    expect(result.status).toBe(200);
    expect(result.data).toStrictEqual(users[13][1]);
  });
  it('when id is 15 it is preserved', async () => {
    const result = await axiosInstance.get(`${baseURL}/users?id=15`);
    expect(result.status).toBe(200);
    expect(result.data).toStrictEqual(users[14][1]);
  });
  it('when id is 16 it is preserved', async () => {
    const result = await axiosInstance.get(`${baseURL}/users?id=16`);
    expect(result.status).toBe(200);
    expect(result.data).toStrictEqual(users[15][1]);
  });
  it('when id is 17 it is preserved', async () => {
    const result = await axiosInstance.get(`${baseURL}/users?id=17`);
    expect(result.status).toBe(200);
    expect(result.data).toStrictEqual(users[16][1]);
  });
  it('when id is 18 it is preserved', async () => {
    const result = await axiosInstance.get(`${baseURL}/users?id=18`);
    expect(result.status).toBe(200);
    expect(result.data).toStrictEqual(users[17][1]);
  });
  it('when id is 19 it is preserved', async () => {
    const result = await axiosInstance.get(`${baseURL}/users?id=19`);
    expect(result.status).toBe(200);
    expect(result.data).toStrictEqual(users[18][1]);
  });
  it('when id is 20 it is preserved', async () => {
    const result = await axiosInstance.get(`${baseURL}/users?id=20`);
    expect(result.status).toBe(200);
    expect(result.data).toStrictEqual(users[19][1]);
  });
});
