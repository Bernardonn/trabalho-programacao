import { Controller, Get } from '@nestjs/common';
import { GetUsersService } from '../service/get-user.service';

@Controller('/users')
export class GetUsersController {
  constructor(private getUsersService: GetUsersService) {}

  @Get()
  async handle() {
    const users = await this.getUsersService.execute();
    return users;
  }
}
