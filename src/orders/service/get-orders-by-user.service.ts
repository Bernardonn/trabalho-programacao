import { Injectable, NotFoundException } from '@nestjs/common';
import { OrdersRepository } from '../repository/orders.repository';
import { PrismaService } from '../../prisma.service';

interface GetOrdersByUserRequest {
  userId: string;
}

@Injectable()
export class GetOrdersByUserService {
  constructor(
    private ordersRepository: OrdersRepository,
    private prisma: PrismaService
  ) {}

  async execute({ userId }: GetOrdersByUserRequest) {
    // Verificar se o usuário existe
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found.');

    const orders = await this.ordersRepository.findByUserId(userId);
    return { orders };
  }
}
