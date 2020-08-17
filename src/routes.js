import { Router } from 'express';

import {
  SessionsController,
  UsersController,
} from './app/controllers/api/v1';

const routes = new Router();

routes.post('/sessions', SessionsController.create);
routes.post('/users', UsersController.create);

export default routes;
