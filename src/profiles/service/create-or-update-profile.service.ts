import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ProfilesRepository } from '../repository/profiles.repository';
import { PrismaService } from '../../prisma.service';

interface CreateOrUpdateProfileRequest {
  userId: string;
  avatarUrl: string;
}

@Injectable()
export class CreateOrUpdateProfileService {
  constructor(
    private profilesRepository: ProfilesRepository,
    private prisma: PrismaService
  ) {}

  async execute({ userId, avatarUrl }: CreateOrUpdateProfileRequest): Promise<void> {
    // Verifica se usuário existe
    const userExists = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!userExists) {
      throw new NotFoundException('User não encontrado.');
    }

    const existingProfile = await this.profilesRepository.findByUserId(userId);

    if (existingProfile) {
      await this.profilesRepository.update(existingProfile.id, { avatarUrl });
    } else {
      await this.profilesRepository.create({
        user: { connect: { id: userId } },
        avatarUrl,
      });
    }
  }
}
