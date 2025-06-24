import { Injectable, NotFoundException } from '@nestjs/common';
import { ProfilesRepository } from '../repository/profiles.repository';

interface GetProfileByIdRequest {
  id: string;
}

@Injectable()
export class GetProfileByIdService {
  constructor(private profilesRepository: ProfilesRepository) {}

  async execute({ id }: GetProfileByIdRequest) {
    const profile = await this.profilesRepository.findById(id);

    if (!profile) {
      throw new NotFoundException('Profile não encontrado.');
    }

    return profile;
  }
}
