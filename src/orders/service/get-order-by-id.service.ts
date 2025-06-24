import { Injectable, NotFoundException } from '@nestjs/common';
import { OrdersRepository } from '../repository/orders.repository';

interface GetOrderByIdRequest {
  id: string;
}

@Injectable()
export class GetOrderByIdService {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({ id }: GetOrderByIdRequest) {
    const order = await this.ordersRepository.findById(id);

    if (!order) {
      throw new NotFoundException('Order fnot ound.');
    }

    return { order };
  }
}
