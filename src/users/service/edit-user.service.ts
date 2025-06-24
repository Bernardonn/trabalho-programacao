import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../repository/users.repository';

interface EditUserServiceRequest {
  id: string;
  email: string;
}

@Injectable()
export class EditUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id, email }: EditUserServiceRequest): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    await this.usersRepository.update(id, { email });
  }
}
