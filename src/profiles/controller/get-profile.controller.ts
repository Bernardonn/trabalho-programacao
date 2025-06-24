import { Controller, Get, Param } from '@nestjs/common';
import { GetProfileByIdService } from '../service/get-profile-by-id.service';

@Controller('/profiles/:id')
export class GetProfileController {
  constructor(private service: GetProfileByIdService) {}

  @Get()
  async handle(@Param('id') id: string) {
    return await this.service.execute({ id });
  }
}
