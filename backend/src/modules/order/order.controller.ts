import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dtos/createOrder.dto';
import { updateStatusDto } from './dtos/updateStatus.dto';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Post()
    async createOrder(@Body() body: CreateOrderDto): Promise<string> {
        const data = await this.orderService.createOrder(body);
        return data;
    }

    @Get()
    async getAllOrder() {
        const data = await this.orderService.getAllOrder();
        return data;
    }

    @Patch()
    async update(@Body() body: updateStatusDto) {
        const data = await this.orderService.update(body);
        return data;
    }

    @Get('/:id')
    async getOneOrder(@Param('id') id: string) {
        const data = await this.orderService.getOneOrder(id);
        return data;
    }
}
