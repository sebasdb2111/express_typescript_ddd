import {Request, Response}   from 'express';
import AuthChangePassword    from '../../../../contexts/mmc/auth/application/AuthChangePassword';
import * as httpStatus       from 'http-status';
import Controller            from '../Controller';
import AuthChangePasswordDto from '../../../../contexts/mmc/auth/domain/dto/AuthChangePasswordDto';


export class AuthChangePasswordController implements Controller
{
    constructor(private authChangePassword: AuthChangePassword)
    {
    }

    async run(req: Request, res: Response)
    {
        const authChangePasswordDto: AuthChangePasswordDto = new AuthChangePasswordDto(
            req.body.username,
            req.body.password,
        );

        try {
            await this.authChangePassword.run(authChangePasswordDto);
            res.status(httpStatus.OK).send(`Password for the username ${req.body.username} has been changed successfully`);
        }
        catch (e) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json(e);

        }
    }
}
