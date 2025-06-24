import { Controller, Get, Param, NotFoundException } from "@nestjs/common";
import { GetProductByIdService } from "../service/get-product-by-id.service";

@Controller('/products')
export class GetProductByIdController {
  constructor(private getProductById: GetProductByIdService) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const product = await this.getProductById.execute({ id });

    if (!product) {
      throw new NotFoundException('Produto não encontrado.');
    }

    return { product };
  }
}
