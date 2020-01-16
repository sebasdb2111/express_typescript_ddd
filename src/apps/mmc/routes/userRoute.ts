import {Router}                   from 'express';
import container                  from '../config/dependency-injection';
import {UserGetController}        from '../controllers/user/UserGetController';
import {UserCreateController}     from '../controllers/user/UserCreateController';
import {UserEditController}       from '../controllers/user/UserEditController';
import {UserDeactivateController} from '../controllers/user/UserDeactivateController';
import {checkAuthentication}                 from "../../../contexts/shared/middlewares/checkAuthentication";

const router                                             = Router();
const userCreateController: UserCreateController         = container.get('Apps.mmc.controllers.user.UserCreateController');
const userGetController: UserGetController               = container.get('Apps.mmc.controllers.user.UserGetController');
const userEditController: UserEditController             = container.get('Apps.mmc.controllers.user.UserEditController');
const userDeactivateController: UserDeactivateController = container.get('Apps.mmc.controllers.user.UserDeactivateController');

router
    .post(
        '/',
        userCreateController.run.bind(userCreateController)
    );

router
    .get(
        '/:id',
        checkAuthentication,
        userGetController.run.bind(userGetController)
    )
    .patch(
        '/:id',
        checkAuthentication,
        userEditController.run.bind(userEditController)
    );

router
    .patch(
        '/:id/deactivate',
        checkAuthentication,
        userDeactivateController.run.bind(userDeactivateController)
    );

export default router;
