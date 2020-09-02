import IUserMySqlRepository        from '../../users/domain/IUserMySqlRepository';
import {UserMySqlEntity}                from '../../users/domain/entity/UserMySqlEntity';
import AuthChangePasswordDto from '../domain/dto/AuthChangePasswordDto';

export default class AuthChangePassword
{
    private repository: IUserMySqlRepository;

    constructor(repository: IUserMySqlRepository)
    {
        this.repository = repository;
    }

    async run(authChangePasswordDto: AuthChangePasswordDto): Promise<void>
    {
        const user: UserMySqlEntity = await this.repository.findOneByUsername(authChangePasswordDto.username);
        user.password    = authChangePasswordDto.password;

        user.hashPassword();

        await this.repository.updatePassword(user.id, user);
    }
}
