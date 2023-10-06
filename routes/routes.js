import { Router } from 'express';
import { toHomePage } from '../controllers/home.js';
import { toSubscribePage, subscribeUser, toLoginPage, loginUser, logoutUser, toDashboard } from '../controllers/user.js';
import { mustBeLoggedIn, mustBeLoggedOut } from '../middlewares/sessions.js';

const appRouter = Router()

appRouter.get('/', toHomePage);
appRouter.get('/dashboard', mustBeLoggedIn, toDashboard);
appRouter.get('/subscribe', mustBeLoggedOut, toSubscribePage);
appRouter.post('/subscribe', mustBeLoggedOut, subscribeUser);
appRouter.get('/login', mustBeLoggedOut, toLoginPage);
appRouter.post('/login', mustBeLoggedOut, loginUser);
appRouter.get('/logout', mustBeLoggedIn, logoutUser);

export default appRouter;
