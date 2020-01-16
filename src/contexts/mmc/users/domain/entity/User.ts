import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn
}                                                       from 'typeorm';
import {Length, IsNotEmpty, IsEmail, IsEnum, IsBoolean} from 'class-validator';
import * as bcrypt                                      from 'bcryptjs';
import PasswordIsNotValidException                      from '../../../auth/domain/exceptions/PasswordIsNotValidException';
import {UserRoleEnum}                                   from '../UserRoleEnum';

@Entity()
@Unique(['username', 'email'])
export class User
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(4, 20)
    @IsNotEmpty()
    username: string;

    @Column()
    @Length(4, 100)
    @IsNotEmpty()
    password: string;

    @Column()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Column()
    @IsEnum(UserRoleEnum)
    role: string;

    @Column()
    @Length(2, 100)
    @IsNotEmpty()
    firstName: string;

    @Column()
    @Length(2, 100)
    @IsNotEmpty()
    lastName: string;

    @Column()
    @CreateDateColumn()
    lastLogin: Date;

    @Column()
    @IsBoolean()
    isActive: boolean;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    hashPassword(): any
    {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string): boolean
    {
        const isValid: boolean = bcrypt.compareSync(unencryptedPassword, this.password);
        if (!isValid) {
            throw new PasswordIsNotValidException(this.username);
        }

        return true;
    }
}
