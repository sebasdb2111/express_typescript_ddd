import {Router} from 'express';
import auth     from './authRoute';
import user     from './userRoute';

const routes = Router();

routes.use('/auth', auth);
routes.use('/users', user);

export default routes;
