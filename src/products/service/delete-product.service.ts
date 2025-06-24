import { Injectable, NotFoundException } from "@nestjs/common";
import { ProductsRepository } from "../repository/products.repository";

interface DeleteProductServiceRequest {
  id: string;
}

@Injectable()
export class DeleteProductService {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({ id }: DeleteProductServiceRequest): Promise<void> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new NotFoundException("Produto não encontrado.");
    }

    await this.productsRepository.delete(id);
  }
}
