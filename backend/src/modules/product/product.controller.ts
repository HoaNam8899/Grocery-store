import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/createProduct.dto';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) { }

    @Post()
    async createProduct(@Body() body: CreateProductDto) {
        const data = await this.productService.createProduct(body);
        return data;
    }



    @Get('/all')
    async getAllProductForAdmin() {
        const data = await this.productService.getAllProductForAdmin();
        return data;
    }

    @Get()
    async getAllProduct() {
        const data = await this.productService.getAllProduct();
        return data;
    }

    @Get('/:id')
    async getOne(@Param('id') id: string) {
        const data = await this.productService.getOne(id);
        return data;
    }

    @Patch()
    async update(@Body() body) {
        const data = await this.productService.update(body);
        return data;
    }

    @Delete()
    async softDelete(@Body() body) {
        const data = await this.productService.softDelete(body);
        return data;
    }
}
