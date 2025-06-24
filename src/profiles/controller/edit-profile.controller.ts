import { Body, Controller, HttpCode, Param, Put } from '@nestjs/common';
import { EditProfileService } from '../service/edit-profile.service';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

const editProfileSchema = z.object({
  avatarUrl: z.string().url(),
});

@Controller('/profiles/:id')
export class EditProfileController {
  constructor(private service: EditProfileService) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(editProfileSchema)) body: { avatarUrl: string }
  ) {
    await this.service.execute({ id, avatarUrl: body.avatarUrl });
  }
}
