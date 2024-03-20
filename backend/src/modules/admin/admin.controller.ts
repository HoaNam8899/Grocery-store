import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dtos/getAdmin.dto';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Post()
    async getAdmin(@Body() body: CreateAdminDto) {
        const data = await this.adminService.getAdmin(body);
        return data;
    }
}
