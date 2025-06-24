import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from '../repository/products.repository';
import { Product } from '@prisma/client';

interface GetProductByIdRequest {
  id: string;
}

@Injectable()
export class GetProductByIdService {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({ id }: GetProductByIdRequest): Promise<Product> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    return product;
  }
}
