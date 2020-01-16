import {Request, Response}    from 'express';
import UserDeactivate         from '../../../../contexts/mmc/users/application/UserDeactivate';
import * as httpStatus        from 'http-status';
import Controller             from '../Controller';
import UserDeactivateDto      from '../../../../contexts/mmc/users/domain/dto/UserDeactivateDto';
import UserNotExistsException from "../../../../contexts/mmc/shared/domain/exceptions/UserNotExistsException";

export class UserDeactivateController implements Controller
{
    constructor(private userDeactivate: UserDeactivate)
    {
    }

    async run(req: Request, res: Response)
    {
        const userDeactivateDto: UserDeactivateDto = new UserDeactivateDto(
            Number(req.params.id),
            req.body.isActive
        );

        try {
            await this.userDeactivate.run(userDeactivateDto);
            res.status(httpStatus.OK).send(`User ${req.params.id} has been deactivated successfully`);
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
