import IUserMySqlRepository from '../../users/domain/IUserMySqlRepository';
import * as jwt       from 'jsonwebtoken';
import {UserMySqlEntity}         from '../../users/domain/entity/UserMySqlEntity';
import config         from '../../../../apps/mmc/config/config';
import AuthLoginDto   from '../domain/dto/AuthLoginDto';

export default class AuthLogin
{
    private repository: IUserMySqlRepository;

    constructor(repository: IUserMySqlRepository)
    {
        this.repository = repository;
    }

    async run(authLoginDto: AuthLoginDto): Promise<string>
    {
        const user: UserMySqlEntity = await this.repository.findOneByUsername(authLoginDto.username);

        user.checkIfUnencryptedPasswordIsValid(authLoginDto.password);

        return this.createJwt(user);
    }

    async createJwt(user: UserMySqlEntity): Promise<string>
    {
        return jwt.sign(
            {userId: user.id, username: user.username},
            config.jwtSecret,
            {expiresIn: '1h'}
        );
    }
}
