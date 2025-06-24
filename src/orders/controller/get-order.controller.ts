import { Controller, Get, Param } from '@nestjs/common';
import { GetOrderByIdService } from '../service/get-order-by-id.service';

@Controller('/orders/:id')
export class GetOrderController {
  constructor(private getOrderByIdService: GetOrderByIdService) {}

  @Get()
  async handle(@Param('id') id: string) {
    return await this.getOrderByIdService.execute({ id });
  }
}
