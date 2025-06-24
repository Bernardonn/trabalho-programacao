import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateOrderService } from '../service/create-order.service';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

const orderItemSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().positive(),
});

const createOrderSchema = z.object({
  userId: z.string().uuid(),
  orderItems: z.array(orderItemSchema).nonempty(),
});

@Controller('/orders')
export class CreateOrderController {
  constructor(private createOrderService: CreateOrderService) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(new ZodValidationPipe(createOrderSchema)) body: { userId: string; orderItems: { productId: string; quantity: number }[] }) {
    await this.createOrderService.execute(body);
  }
}
