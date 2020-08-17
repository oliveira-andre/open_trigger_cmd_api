import { Router } from 'express';

import SessionsController from './app/controllers/SessionsController';
import UsersController from './app/controllers/UsersController';

const routes = new Router();

routes.post('/sessions', SessionsController.create);
routes.post('/users', UsersController.create);

export default routes;
