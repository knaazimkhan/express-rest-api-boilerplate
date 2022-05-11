import { readFile } from 'fs/promises';

// import pkg from '../../package.json' assert { type: 'json' };
import config from '#config/config';

const { version } = JSON.parse(await readFile(new URL('../../package.json', import.meta.url)));

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'express-rest-api-boilerplate API documentation',
    version,
    license: {
      name: 'MIT',
      url: 'https://github.com/knaazimkhan/express-rest-api-boilerplate.git',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/api/v1`,
    },
  ],
};

export default swaggerDef;
