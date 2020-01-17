import {Request, Response}    from 'express';
import * as httpStatus        from 'http-status';
import Controller             from '../Controller';
import UserDeactivate         from '../../../../contexts/mmc/users/application/UserDeactivate';
import UserDeactivateDto      from '../../../../contexts/mmc/users/domain/dto/UserDeactivateDto';
import UserNotExistsException from '../../../../contexts/mmc/shared/domain/exceptions/UserNotExistsException';

export class UserDeactivateController implements Controller
{
	constructor(private userDeactivate: UserDeactivate)
	{
	}

	async run(req: Request, res: Response)
	{
		return new Promise(async (resolve, reject) =>
		{
			const userDeactivateDto: UserDeactivateDto = new UserDeactivateDto(
				Number(req.params.id),
				Boolean(req.body.isActive)
			);

			try {
				await this.userDeactivate.run(userDeactivateDto);
				resolve(res.status(httpStatus.OK).send(`User ${req.params.id} has been deactivated successfully`));
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
