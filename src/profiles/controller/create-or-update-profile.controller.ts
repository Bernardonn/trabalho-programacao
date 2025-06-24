import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateOrUpdateProfileService } from '../service/create-or-update-profile.service';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

const createOrUpdateProfileSchema = z.object({
  userId: z.string().uuid(),
  avatarUrl: z.string().url(),
});

@Controller('/profiles')
export class CreateOrUpdateProfileController {
  constructor(private service: CreateOrUpdateProfileService) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(new ZodValidationPipe(createOrUpdateProfileSchema)) body: { userId: string; avatarUrl: string }) {
    await this.service.execute(body);
  }
}
