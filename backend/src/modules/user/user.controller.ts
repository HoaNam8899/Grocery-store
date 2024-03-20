import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/userDtoForCreate.dto';
import { LoginUserDto } from './dtos/userDtoForLogin.dto';
import { UpdateUserDto } from './dtos/userDtoForUpdate.dto';
import { UpdatePasswordDto } from './dtos/updatePassword.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    // @Get()
    // async getAll() {
    //     const data = await this.userService.getAll();
    //     return data;
    // }

    @Post('/register')
    async createUser(@Body() body: CreateUserDto) {
        const data = await this.userService.createUser(body);
        return data;
    }

    @Get()
    async getAll() {
        const data = await this.userService.getAll();
        return data;
    }

    @Get('/:id')
    async getById(@Param('id') id: string) {

        const data = await this.userService.getById(id);
        return data;
    }

    @Get('/userOrder/:id')
    async getUserOrder(@Param('id') id: string) {
        const data = await this.userService.getUserOrder(id);
        const newData = [{
            user_id: data[0].user_id,
            orders: data[0].orders
        }];
        return newData;
    }

    @Post('/login')
    async getOne(@Body() body: LoginUserDto) {
        // console.log(body)
        const data = await this.userService.findOne(body);
        return data;
    }

    @Patch('/update/:id')
    async update(@Body() body: UpdateUserDto, @Param('id') id: string) {
        const data = await this.userService.update(body, id);
        return data;
    }

    @Patch('/updatePass/:id')
    async updatePassword(@Body() body: UpdatePasswordDto, @Param('id') id: string) {
        const data = await this.userService.updatePassword(body, id);
        return data;
    }

    @Patch('/softDelete/:id')
    async softDelete(@Param('id') id: string) {
        const data = await this.userService.softDelete(id);
        return data;
    }
    @Patch('/softUpdate/:id')
    async softUpdate(@Param('id') id: string) {
        const data = await this.userService.softUpdate(id);
        return data;
    }
}
