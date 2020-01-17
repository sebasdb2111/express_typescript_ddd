import {Request, Response}    from 'express';
import * as httpStatus        from 'http-status';
import Controller             from '../Controller';
import UserGet                from '../../../../contexts/mmc/users/application/UserGet';
import UserNotExistsException from '../../../../contexts/mmc/shared/domain/exceptions/UserNotExistsException';


export class UserGetController implements Controller
{
	constructor(private userGet: UserGet)
	{
	}

	async run(req: Request, res: Response)
	{
		return new Promise(async (resolve, reject) =>
		{
			const id: number = Number(req.params.id);

			try {
				const user = await this.userGet.run(id);
				resolve(res.status(httpStatus.CREATED).send(user));
			}
			catch (error) {
				let httpStatusError = httpStatus.INTERNAL_SERVER_ERROR;

				if (error instanceof UserNotExistsException) {
					httpStatusError = httpStatus.BAD_REQUEST;
				}

				reject(res.status(httpStatusError).send(error.message));
			}
		});
	}
}
