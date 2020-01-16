import {Request, Response}   from 'express';
import UserEdit              from '../../../../contexts/mmc/users/application/UserEdit';
import * as httpStatus       from 'http-status';
import Controller            from '../Controller';
import UserEditDto           from '../../../../contexts/mmc/users/domain/dto/UserEditDto';
import UserNotExistException from '../../../../contexts/mmc/shared/domain/exceptions/UserNotExistsException';

export class UserEditController implements Controller
{
    constructor(private userEdit: UserEdit)
    {
    }

    async run(req: Request, res: Response)
    {
        const userDto: UserEditDto = new UserEditDto(
            Number(req.params.id),
            req.body.role,
            req.body.email,
            req.body.firstName,
            req.body.lastName
        );

        try {
            const user = await this.userEdit.run(userDto);
            res.status(httpStatus.CREATED).send(user);
        }
        catch (error) {
            if (error instanceof UserNotExistException) {
                res.status(httpStatus.BAD_REQUEST).send(error.message);
            } else {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
            }
        }
    }
}
