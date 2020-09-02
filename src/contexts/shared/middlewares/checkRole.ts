import {Request, Response, NextFunction} from 'express';
import {getRepository}                   from 'typeorm';

import {UserMySqlEntity} from '../../mmc/users/domain/entity/UserMySqlEntity';

export const checkRole = (roles: Array<string>) =>
{
    return async (req: Request, res: Response, next: NextFunction) =>
    {
        const id = res.locals.jwtPayload.userId;

        const userRepository = getRepository(UserMySqlEntity);
        let user: UserMySqlEntity;

        try {
            user = await userRepository.findOneOrFail(id);
        }
        catch (id) {
            res.status(401).send();
        }

        if (roles.indexOf(user.role) > -1) {
            next();
        } else {
            res.status(401).send();
        }
    };
};
