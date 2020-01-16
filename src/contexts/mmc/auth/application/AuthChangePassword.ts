import UserRepository        from '../../users/domain/UserRepository';
import {User}                from '../../users/domain/entity/User';
import AuthChangePasswordDto from '../domain/dto/AuthChangePasswordDto';

export default class AuthChangePassword
{
    private repository: UserRepository;

    constructor(repository: UserRepository)
    {
        this.repository = repository;
    }

    async run(authChangePasswordDto: AuthChangePasswordDto): Promise<void>
    {
        const user: User = await this.repository.findOneByUsername(authChangePasswordDto.username);
        user.password    = authChangePasswordDto.password;

        user.hashPassword();

        await this.repository.updatePassword(user.id, user);
    }
}
