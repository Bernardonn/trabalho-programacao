import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { OrdersRepository } from '../repository/orders.repository';
import { PrismaService } from '../../prisma.service';

interface OrderItemInput {
  productId: string;
  quantity: number;
}

interface CreateOrderRequest {
  userId: string;
  orderItems: OrderItemInput[];
}

@Injectable()
export class CreateOrderService {
  constructor(
    private ordersRepository: OrdersRepository,
    private prisma: PrismaService
  ) {}

  async execute({ userId, orderItems }: CreateOrderRequest): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found.');

    let total = 0;

    for (const item of orderItems) {
      const product = await this.prisma.product.findUnique({ where: { id: item.productId } });
      if (!product) throw new NotFoundException(`Product not found for item: ${item.productId}.`);

      if (product.inStock < item.quantity) {
        throw new BadRequestException(`Insufficient stock for product: ${item.productId}.`);
      }

      total += product.price * item.quantity;
    }

    await this.prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          user: { connect: { id: userId } },
          total,
          orderItems: {
            create: orderItems.map((item) => ({
              product: { connect: { id: item.productId } },
              quantity: item.quantity,
            })),
          },
        },
      });

      for (const item of orderItems) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            inStock: {
              decrement: item.quantity,
            },
          },
        });
      }
    });
  }
}
