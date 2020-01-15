import UserRepository from '../../users/domain/UserRepository';
import * as jwt       from 'jsonwebtoken';
import {User}         from '../../users/domain/entity/User';
import config         from '../../../../apps/mmc/config/config';
import AuthLoginDto   from '../domain/AuthLoginDto';

export default class AuthLogin
{
    private repository: UserRepository;

    constructor(repository: UserRepository)
    {
        this.repository = repository;
    }

    async run(authLoginDto: AuthLoginDto): Promise<string>
    {
        const user: User = await this.repository.findOneByUsername(authLoginDto.username);

        user.checkIfUnencryptedPasswordIsValid(authLoginDto.password);

        return this.createJwt(user);
    }

    async createJwt(user: User): Promise<string>
    {
        return jwt.sign(
            {userId: user.id, username: user.username},
            config.jwtSecret,
            {expiresIn: '1h'}
        );
    }
}
