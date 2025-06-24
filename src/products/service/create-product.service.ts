import { BadRequestException, Injectable } from "@nestjs/common";
import { ProductsRepository } from "../repository/products.repository";
import { Category } from "@prisma/client";

interface CreateProductServiceRequest {
  name: string;
  description?: string;
  price: number;
  inStock: number;
  isAvailable: boolean;
  category: Category;
  tags: string[];
  modelId?: string;
}

@Injectable()
export class CreateProductService {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    name,
    description,
    price,
    inStock,
    isAvailable,
    category,
    tags,
    modelId,
  }: CreateProductServiceRequest): Promise<void> {
    const productWithSameName = await this.productsRepository.findByName(name);

    if (productWithSameName) {
      throw new BadRequestException("Product with same name already exists.");
    }

    const product = {
      name,
      description,
      price,
      inStock,
      isAvailable,
      category,
      tags,
      modelId,
    };

    await this.productsRepository.create(product);
  }
}
