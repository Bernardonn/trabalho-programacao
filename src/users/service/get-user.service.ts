import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repository/users.repository';

@Injectable()
export class GetUsersService {
  constructor(private usersRepository: UsersRepository) {}

  async execute() {
    return await this.usersRepository.findAll();
  }
}
