import { Router } from 'express';

import {
  SessionsController,
  UsersController,
  SkillsController,
} from './app/controllers/api/v1';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionsController.create);
routes.post('/users', UsersController.create);

routes.use(authMiddleware);
routes.get('/skills', SkillsController.index);

export default routes;
