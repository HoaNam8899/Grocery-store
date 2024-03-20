import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './database/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/createProduct.dto';
import { ProductDtoForReturn } from './dtos/getProduct.dto';
import { plainToInstance } from 'class-transformer';
import { CategoryEntity } from '../category/database/category.entity';
import { ProductDtoForAdmin } from './dtos/getProductForAdmin.dto';
import { ProductDtoForGetOne } from './dtos/getOne.dto';


@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>,
        @InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>
    ) { }

    async createProduct(body: CreateProductDto) {
        let result = await this.productRepository.findOneBy({ product_name: body.product_name });
        if (result) {
            return 'Tên sản phẩm đã tồn tại'
        } else {
            let returnProduct = await this.productRepository.save(body);
            let category = await this.categoryRepository.find({
                relations: {
                    products: true,
                },
                where: {
                    category_id: body.category_id,
                },
            });
            // console.log(category)
            if (category.length != 0) {
                category[0].products.push(returnProduct)
                await this.categoryRepository.save(category);
                return 'Tạo sản phẩm thành công';
                // return category
            } else {
                throw {
                    message: "category không tồn tại"
                }
            }

        }
    }

    async getAllProductForAdmin(): Promise<ProductDtoForAdmin[]> {
        let result = await this.productRepository.find({
            relations: {
                orderProducts: false,
                category: true
            }
        });
        // console.log(result);
        return plainToInstance(ProductDtoForAdmin, result, { excludeExtraneousValues: true });
    }

    async getAllProduct(): Promise<ProductDtoForReturn[]> {
        let result = await this.productRepository.find();
        return plainToInstance(ProductDtoForReturn, result, { excludeExtraneousValues: true });
    }
    async update(body): Promise<string> {
        if (body.status === "true") {
            body.status = Boolean('true');
        } else {
            body.status = Boolean(null)
        }
        await this.productRepository.update(body.product_id, body);// update cần primaryKey
        return 'Cập nhật thành công'
    }

    async softDelete(body) {
        let result = await this.productRepository.update(body.product_id, { status: false });
        return result;
    }

    async getOne(id: string) {
        let result = await this.productRepository.findOneBy({ product_id: +id })
        return plainToInstance(ProductDtoForGetOne, result, { excludeExtraneousValues: true });
    }
}
