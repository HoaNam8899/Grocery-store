import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos/createCategory.dto';
import { UpdateCategoryDto } from './dtos/updateCategory.dto';

@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) { }

    @Get()
    async getAllCategory() {
        const data = await this.categoryService.getAllCategory();
        return data;
    }

    @Post()
    async createCategory(@Body() body) {
        const data = await this.categoryService.createCategory(body);
        return data;
    }

    @Get('/:id')
    async getOneCategory(@Param('id') id: string) {
        const data = await this.categoryService.getOneCategory(id);
        return data;
    }

    @Delete('/:id')
    async deleteCategory(@Param('id') id: string) {
        const data = await this.categoryService.deleteCategory(id);
        return data;
    }

    @Patch('/update')
    async updateCategory(@Body() body) {
        const data = await this.categoryService.updateCategory(body);
        return data;
    }
}
