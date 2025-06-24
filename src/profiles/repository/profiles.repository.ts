import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Profile, Prisma } from '@prisma/client';

@Injectable()
export class ProfilesRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Profile | null> {
    return this.prisma.profile.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  async findByUserId(userId: string): Promise<Profile | null> {
    return this.prisma.profile.findUnique({
      where: { userId },
    });
  }

  async create(data: Prisma.ProfileCreateInput): Promise<Profile> {
    return this.prisma.profile.create({ data });
  }

  async update(id: string, data: Prisma.ProfileUpdateInput): Promise<Profile> {
    return this.prisma.profile.update({
      where: { id },
      data,
    });
  }
}
