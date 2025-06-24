import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';
import { CreateUserService } from '../service/create-user.service';

const createUserBodySchema = z.object({
  email: z.string().email(),
});

type CreateUserBody = z.infer<typeof createUserBodySchema>;

@Controller('/users')
export class CreateUserController {
  constructor(private createUserService: CreateUserService) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(new ZodValidationPipe(createUserBodySchema)) body: CreateUserBody,
  ) {
    const { email } = body;

    await this.createUserService.execute({ email });
  }
}
