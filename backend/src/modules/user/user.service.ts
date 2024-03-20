import { Injectable, Options } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './database/user.entity';
import { Repository } from 'typeorm';
import { UserDtoForReturn } from './dtos/userDtoForReturndto';

import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from './dtos/userDtoForCreate.dto';
import { Bcrypt } from 'src/constant/bcrypt/bcrypt';
import { UpdateUserDto } from './dtos/userDtoForUpdate.dto';
import { LoginUserDto } from './dtos/userDtoForLogin.dto';
import { UpdatePasswordDto } from './dtos/updatePassword.dto';
import { UserDtoForAdmin } from './dtos/userForAdmin.sto';
import { UserOrderReturnDto } from './dtos/userOrderReturn.dto';


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) { }

    // async getAll(): Promise<UserDtoForGetAll[]> {
    //     let data = await this.userRepository.find();
    //     return plainToInstance(UserDtoForGetAll, data, { excludeExtraneousValues: true }); // ok, khong can them opions: 
    // }
    async createUser(body: CreateUserDto): Promise<string> { // register
        let { password, email } = body;
        let checkEmail = await this.userRepository.find({
            where: {
                email: email
            }
        });
        if (checkEmail.length != 0) {
            return "0"
        } else {
            let hashPasswordUser = new Bcrypt();
            const passwordHashed = await hashPasswordUser.hashPassword(10, password);
            body.password = passwordHashed;
            await this.userRepository.save(body);
            return "1" // chi tra ve user vua dc tao
        }

    }

    async update(body: UpdateUserDto, id: string): Promise<UserDtoForReturn> {
        await this.userRepository.update({ user_id: +id }, body);
        const data = await this.userRepository.findOneBy({ user_id: +id })
        return plainToInstance(UserDtoForReturn, data, { excludeExtraneousValues: true });
    }

    async findOne(body: LoginUserDto): Promise<UserDtoForReturn> { // login
        let { email, password } = body;
        const result = await this.userRepository.find({
            where: {
                email: email
            }
        });
        if (result[0]) {
            const checkEmail = new Bcrypt();
            let isEmail = await checkEmail.comparePassword(password, result[0].password)
            if (isEmail) {
                return plainToInstance(UserDtoForReturn, result[0], { excludeExtraneousValues: true });
            } else {
                throw {
                    message: 'Sai tài khoản hoặc mật khẩu'
                }
            }
        } else {
            throw {
                message: "Tài khoản không tồn tại"
            }
        }
    }
    // update password ??
    async updatePassword(body: UpdatePasswordDto, id: string) {
        const returnUser = await this.userRepository.find({
            relations: {
                orders: false,
            },
            where: {
                user_id: +id
            }
        });
        if (returnUser.length != 0) {
            const checkPass = new Bcrypt();
            let isPass = await checkPass.comparePassword(body.oldPassword, returnUser[0].password)
            if (isPass) {
                let hashPasswordUser = new Bcrypt();
                const passwordHashed = await hashPasswordUser.hashPassword(10, body.password);

                await this.userRepository.update(+id, { password: passwordHashed })

                return "1"
            } else return "0"

        }
    }

    async softDelete(id: string) {
        await this.userRepository.update({ user_id: +id }, { status: false })
        return "Xóa mềm thành công"
    }

    async softUpdate(id: string) {
        await this.userRepository.update({ user_id: +id }, { status: true })
        return "Mở lại thành công"
    }

    async getAll(): Promise<UserDtoForAdmin[]> {
        const data = await this.userRepository.find()
        return plainToInstance(UserDtoForAdmin, data, { excludeExtraneousValues: true });
    }

    async getById(id: string): Promise<UserDtoForReturn> {
        const data = await this.userRepository.findOneBy({ user_id: +id })
        return plainToInstance(UserDtoForReturn, data, { excludeExtraneousValues: true });
    }

    async getUserOrder(id: string) {
        const returnUser = await this.userRepository.find({
            relations: {
                orders: true,
            },
            where: {
                user_id: +id
            }
        });

        return returnUser
    }
}
