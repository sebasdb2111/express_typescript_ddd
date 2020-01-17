import {Request, Response}        from 'express';
import * as httpStatus            from 'http-status';
import Controller                 from '../Controller';
import UserCreate                 from '../../../../contexts/mmc/users/application/UserCreate';
import UserCreateDto              from '../../../../contexts/mmc/users/domain/dto/UserCreateDto';
import UserAlreadyExistsException from '../../../../contexts/mmc/users/domain/exceptions/UserAlreadyExistsException';

export class UserCreateController implements Controller
{
	constructor(private userCreate: UserCreate)
	{
	}

	async run(req: Request, res: Response)
	{
		return new Promise(async (resolve, reject) =>
		{
			const userCreateDto: UserCreateDto = new UserCreateDto(
				req.body.username,
				req.body.password,
				req.body.role,
				req.body.email,
				req.body.firstName,
				req.body.lastName,
				Boolean(req.body.isActive)
			);

			try {
				const user = await this.userCreate.run(userCreateDto);
				resolve(res.status(httpStatus.CREATED).send(user));
			}
			catch (error) {
				let httpStatusError = httpStatus.INTERNAL_SERVER_ERROR;

				if (error instanceof UserAlreadyExistsException) {
					httpStatusError = httpStatus.BAD_REQUEST;
				}

				reject(res.status(httpStatusError).send(error.message));
			}
		});
	}
}
