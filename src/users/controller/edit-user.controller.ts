import { Body, Controller, HttpCode, Param, Put } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';
import { EditUserService } from '../service/edit-user.service';

const editUserBodySchema = z.object({
  email: z.string().email(),
});

type EditUserBody = z.infer<typeof editUserBodySchema>;

@Controller('/users/:id')
export class EditUserController {
  constructor(private editUserService: EditUserService) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(editUserBodySchema)) body: EditUserBody,
  ) {
    const { email } = body;
    await this.editUserService.execute({ id, email });
  }
}
