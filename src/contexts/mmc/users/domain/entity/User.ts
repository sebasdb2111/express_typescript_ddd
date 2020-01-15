import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn
}                                  from 'typeorm';
import {Length, IsNotEmpty}        from 'class-validator';
import * as bcrypt                 from 'bcryptjs';
import PasswordIsNotValidException from '../../../auth/domain/exceptions/PasswordIsNotValidException';

@Entity()
@Unique(['username'])
export class User
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(4, 20)
    username: string;

    @Column()
    @Length(4, 100)
    password: string;

    @Column()
    @IsNotEmpty()
    role: string;

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
        if (isValid) {
            return true;
        } else {
            throw new PasswordIsNotValidException();
        }
    }
}
