import { Controller, Get, Param } from '@nestjs/common';
import { GetOrdersByUserService } from '../service/get-orders-by-user.service';

@Controller('/users/:userId/orders')
export class GetOrdersByUserController {
  constructor(private getOrdersByUserService: GetOrdersByUserService) {}

  @Get()
  async handle(@Param('userId') userId: string) {
    return await this.getOrdersByUserService.execute({ userId });
  }
}
