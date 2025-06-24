import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Product, Category } from '@prisma/client';

interface CreateProductData {
  name: string;
  description?: string;
  price: number;
  inStock: number;
  isAvailable: boolean;
  category: Category;
  tags: string[];
  modelId?: string;
}

interface UpdateProductData {
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
export class ProductsRepository {
  constructor(private prisma: PrismaService) {}

  async findByName(name: string): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { name },
    });
  }

  async findById(id: string): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  async create(data: CreateProductData): Promise<Product> {
    return this.prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        inStock: data.inStock,
        isAvailable: data.isAvailable,
        category: data.category,
        tags: data.tags,
        modelId: data.modelId || null,
      },
    });
  }

  async update(id: string, data: UpdateProductData): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        inStock: data.inStock,
        isAvailable: data.isAvailable,
        category: data.category,
        tags: data.tags,
        modelId: data.modelId || undefined,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({
      where: { id },
    });
  }

  async findRecent(limit = 10): Promise<Product[]> {
    return this.prisma.product.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
      take: limit,
    });
  }
}
