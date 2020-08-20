import { Router } from 'express';

import {
  SessionsController,
  UsersController,
  TriggersController,
} from './app/controllers/api/v1';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionsController.create);
routes.post('/users', UsersController.create);

routes.use(authMiddleware);

routes.get('/triggers', TriggersController.index);
routes.post('/triggers', TriggersController.create);

export default routes;
