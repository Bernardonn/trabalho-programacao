import { Injectable, NotFoundException } from '@nestjs/common';
import { ProfilesRepository } from '../repository/profiles.repository';

interface EditProfileRequest {
  id: string;
  avatarUrl: string;
}

@Injectable()
export class EditProfileService {
  constructor(private profilesRepository: ProfilesRepository) {}

  async execute({ id, avatarUrl }: EditProfileRequest): Promise<void> {
    const profile = await this.profilesRepository.findById(id);

    if (!profile) {
      throw new NotFoundException('Profile não encontrado.');
    }

    await this.profilesRepository.update(id, { avatarUrl });
  }
}
