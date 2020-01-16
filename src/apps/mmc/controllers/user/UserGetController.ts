import {Request, Response}    from 'express';
import UserGet                from '../../../../contexts/mmc/users/application/UserGet';
import * as httpStatus        from 'http-status';
import Controller             from '../Controller';
import UserNotExistsException from '../../../../contexts/mmc/shared/domain/exceptions/UserNotExistsException';


export class UserGetController implements Controller
{
    constructor(private userGet: UserGet)
    {
    }

    async run(req: Request, res: Response)
    {
        const id: number = Number(req.params.id);

        try {
            const user = await this.userGet.run(id);
            res.status(httpStatus.CREATED).send(user);
        }
        catch (error) {
            if (error instanceof UserNotExistsException) {
                res.status(httpStatus.BAD_REQUEST).send(error.message);
            } else {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
            }
        }
    }
}
