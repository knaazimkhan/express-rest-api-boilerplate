import express from 'express';

import config from '#config/config';

import docsRoute from './docs.route';

// import authRoute from './auth.route';
// import userRoute from './user.route';

const router = express.Router();

if (config.env === 'development') {
  router.use('/api/docs', docsRoute);
}

export default router;
