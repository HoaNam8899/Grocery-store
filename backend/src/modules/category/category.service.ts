import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './database/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dtos/createCategory.dto';
import { CategoryDtoForReturn } from './dtos/returnCategory.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateCategoryDto } from './dtos/updateCategory.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>
    ) { }

    async getAllCategory() {
        let result = await this.categoryRepository.find();
        return result;
    }

    async createCategory(body) {
        let checkName = await this.categoryRepository.findOneBy({ category_name: body.category_name });
        if (checkName) {
            return 'Tên danh mục đã tồn tại!'
        } else {
            if (body.status === "true") {
                body.status = true;
            } else {
                body.status = false;
            }
            await this.categoryRepository.save(body);
            return 'Tạo danh mục thành công.'
        }
    }

    async getOneCategory(id: string): Promise<CategoryDtoForReturn[]> {
        let result = await this.categoryRepository.find({
            relations: {
                products: true,
            },
            where: {
                category_id: +id,
                status: true
            },
        });

        if (result.length !== 0) {
            return plainToInstance(CategoryDtoForReturn, result, { excludeExtraneousValues: true });
        } else {
            throw {
                message: "Danh mục đã bị xóa hoặc không có sản phẩm nào"
            }
        }
    }

    async deleteCategory(id: string) {
        await this.categoryRepository.update(+id, { status: false })
        return 'Đã xóa danh mục'
    }

    async updateCategory(body) {
        let returnCategory = await this.categoryRepository.findOneBy({ category_id: body.category_id });
        if (returnCategory) {
            if (body.status === "true") {
                body.status = true
            } else {
                body.status = false
            }
            let result = await this.categoryRepository.update({ category_id: body.category_id }, body);
            return 'update thành công'

        }

    }
}
