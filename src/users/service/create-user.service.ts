import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from '../repository/users.repository';

interface CreateUserServiceRequest {
  email: string;
}

@Injectable()
export class CreateUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email }: CreateUserServiceRequest): Promise<void> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new BadRequestException('User with this email already exists.');
    }

    await this.usersRepository.create({ email });
  }
}