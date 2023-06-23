import * as express from 'express';
import { Express as ExpressApp } from 'express-serve-static-core';
import { meterApi } from '../src/meter/meterApi';
import { meterService } from '../src/meter/meterService';
import { stubbedMeterRepository } from '../src/meter/meterRepository.stub';
import { logger } from '../logger';
import axios from 'axios';
import { createServer, Server } from 'http';

const PORT = 8080;
const baseURL = `http://localhost:${PORT}`;

const app: ExpressApp = express();
const myLogger = logger();

const myMeterService = meterService(stubbedMeterRepository(myLogger), myLogger);
const myMeterApi = meterApi(myLogger, myMeterService);

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let service: Server;
beforeAll(() => {
  app.get('/meters', myMeterApi.getMeterHandler);
  service = createServer(app);

  service.listen(PORT, () => console.log(`listening to port: ${PORT}`));
});

afterAll(() => {
  service.close();
});

it('exercises the whole service right up until the point of an external service call (at which point, a stub is used instead)', async () => {
  // http://localhost:8080/meters?id=1000
  const result = await axiosInstance.get(`${baseURL}/meters?id=1200`);
  expect(result.status).toBe(200);
  expect(result.data).toStrictEqual({ name: '1200', fuelType: 'elec' });
});
