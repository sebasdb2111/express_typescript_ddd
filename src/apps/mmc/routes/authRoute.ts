import container             from '../config/dependency-injection';
import {Router}              from 'express';
import {AuthLoginController} from '../controllers/auth/AuthLoginController';

const router = Router();

const authLoginController: AuthLoginController = container.get('Apps.mmc.controllers.auth.AuthLoginController');
router.post('/login', authLoginController.run.bind(authLoginController));

export default router;
