import { Injectable, BadRequestException } from '@nestjs/common';
import { ModelsRepository } from '../repository/models.repository';

interface CreateModelServiceRequest {
  name: string;
}

@Injectable()
export class CreateModelService {
  constructor(private modelsRepository: ModelsRepository) {}

  async execute({ name }: CreateModelServiceRequest): Promise<void> {
    const modelExists = await this.modelsRepository.findManyRecent();

    if (modelExists.some(model => model.name === name)) {
      throw new BadRequestException('Ja existe um produto com o mesmo nome');
    }

    await this.modelsRepository.create({ name });
  }
}
