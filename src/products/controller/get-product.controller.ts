import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { GetProductByIdService } from '../service/get-product-by-id.service';

@Controller('/products')
export class GetProductController {
  constructor(private readonly getProductByIdService: GetProductByIdService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const product = await this.getProductByIdService.execute({ id });

    if (!product) {
      throw new NotFoundException('Produto não encontrado.');
    }

    return { product };
  }
}
