import { Controller, Get, Param } from '@nestjs/common';
import { GetUsersService } from '../service/get-users.service';

@Controller('/users/:id')
export class GetUserController {
  constructor(private getUserService: GetUsersService) {}

  @Get()
  async handle(@Param('id') id: string) {
    const user = await this.getUserService.execute({ id });
    return user;
  }
}
