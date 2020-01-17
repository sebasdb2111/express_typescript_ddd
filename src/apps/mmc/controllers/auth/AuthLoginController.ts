import {Request, Response}         from 'express';
import * as httpStatus             from 'http-status';
import Controller                  from '../Controller';
import AuthLogin                   from '../../../../contexts/mmc/auth/application/AuthLogin';
import AuthLoginDto                from '../../../../contexts/mmc/auth/domain/dto/AuthLoginDto';
import PasswordIsNotValidException from '../../../../contexts/mmc/auth/domain/exceptions/PasswordIsNotValidException';


export class AuthLoginController implements Controller
{
	constructor(private authLogin: AuthLogin)
	{
	}

	async run(req: Request, res: Response)
	{
		return new Promise(async (resolve, reject) =>
		{
			const authLoginDto: AuthLoginDto = new AuthLoginDto(
				req.body.username,
				req.body.password,
			);

			try {
				const token = await this.authLogin.run(authLoginDto);
				resolve(res.status(httpStatus.ACCEPTED).send(token));
			}
			catch (error) {
				let httpStatusError = httpStatus.INTERNAL_SERVER_ERROR;

				if (error instanceof PasswordIsNotValidException) {
					httpStatusError = httpStatus.UNAUTHORIZED;
				}

				reject(res.status(httpStatusError).send(error.message));
			}
		});
	}
}
