import {Request, Response}   from 'express';
import * as httpStatus       from 'http-status';
import Controller            from '../Controller';
import AuthChangePassword    from '../../../../contexts/mmc/auth/application/AuthChangePassword';
import AuthChangePasswordDto from '../../../../contexts/mmc/auth/domain/dto/AuthChangePasswordDto';


export class AuthChangePasswordController implements Controller
{
	constructor(private authChangePassword: AuthChangePassword)
	{
	}

	async run(req: Request, res: Response)
	{
		return new Promise(async (resolve, reject) =>
		{
			const authChangePasswordDto: AuthChangePasswordDto = new AuthChangePasswordDto(
				req.body.username,
				req.body.password,
			);

			try {
				await this.authChangePassword.run(authChangePasswordDto);
				resolve(res.status(httpStatus.OK).send(`Password for the username ${req.body.username} has been changed successfully`));
			}
			catch (e) {
				reject(res.status(httpStatus.INTERNAL_SERVER_ERROR).json(e));
			}
		});
	}
}
