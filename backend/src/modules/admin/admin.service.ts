import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from './database/admin.entity';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dtos/getAdmin.dto';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(AdminEntity) private readonly adminRepository: Repository<AdminEntity>
    ) { }

    async getAdmin(body: CreateAdminDto) {

        const returnData = await this.adminRepository.findOneBy({ admin: body.admin });
        if (returnData === null) {
            return 0;
        } else if (returnData.password === body.password) {
            return 1;
        } else return 0
    }
}
