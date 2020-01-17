import {Request, Response}   from 'express';
import * as httpStatus       from 'http-status';
import Controller            from '../Controller';
import UserEdit              from '../../../../contexts/mmc/users/application/UserEdit';
import UserEditDto           from '../../../../contexts/mmc/users/domain/dto/UserEditDto';
import UserNotExistException from '../../../../contexts/mmc/shared/domain/exceptions/UserNotExistsException';

export class UserEditController implements Controller
{
	constructor(private userEdit: UserEdit)
	{
	}

	async run(req: Request, res: Response)
	{
		return new Promise(async (resolve, reject) =>
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
				resolve(res.status(httpStatus.CREATED).send(user));
			}
			catch (error) {
				let httpStatusError = httpStatus.INTERNAL_SERVER_ERROR;

				if (error instanceof UserNotExistException) {
					httpStatusError = httpStatus.BAD_REQUEST;
				}

				reject(res.status(httpStatusError).send(error.message));
			}
		});
	}
}
