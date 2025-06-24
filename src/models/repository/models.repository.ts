import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Model } from '@prisma/client';

@Injectable()
export class ModelsRepository {
  constructor(private prisma: PrismaService) {}

  async findManyRecent(limit = 10): Promise<Model[]> {
    return this.prisma.model.findMany({
      orderBy: { updatedAt: 'desc' },
      take: limit,
    });
  }

  async findById(id: string): Promise<Model | null> {
    return this.prisma.model.findUnique({
      where: { id },
    });
  }

  async create(data: { name: string }): Promise<Model> {
    return this.prisma.model.create({ data });
  }

  async update(id: string, data: { name: string }): Promise<Model> {
    return this.prisma.model.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.model.delete({
      where: { id },
    });
  }
}
