import {Router}               from 'express';
import container              from '../config/dependency-injection';
import {UserCreateController} from '../controllers/user/UserCreateController';

const router = Router();

const userCreateController: UserCreateController = container.get(
    'Apps.mmc.controllers.user.UserCreateController'
);
router.post('/', userCreateController.run.bind(userCreateController));

export default router;
