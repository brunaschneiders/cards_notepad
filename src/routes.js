import { Router } from 'express';
import cors from 'cors';

import UserController from './app/controllers/UserController';
import CardController from './app/controllers/CardController';
import AuthController from './app/controllers/AuthController';

import authMiddleware from './app/middlewares/auth';

const routes = Router();
routes.use(cors());

routes.get('/', (req, res) => res.json({ result: 'TEST-API' }));

// ROUTES PARA USER
routes.post('/users', UserController.store);
routes.get('/users', UserController.index);
routes.get('/users/:uid', UserController.show);

// // ROUTES PARA AUTH
routes.post('/login', AuthController.store);

routes.use(authMiddleware);

// ROUTES PARA USER(auth)
routes.put('/users/:uid', UserController.update);

// ROUTES PARA CARD(auth)
routes.post('/cards', CardController.store);
routes.get('/cards', CardController.index);
routes.get('/cards/:uid', CardController.show);
routes.put('/cards/:uid', CardController.update);
routes.delete('/cards/:uid', CardController.update);

export default routes;
