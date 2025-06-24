import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelsRepository } from '../repository/models.repository';

export interface Model {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date | null;
}

type FetchRecentModelsServiceResponse = {
  models: Model[];
}

@Injectable()
export class FetchRecentModelsService {
  constructor(private modelsRepository: ModelsRepository) {}

  async execute(): Promise<FetchRecentModelsServiceResponse> {
    const models = await this.modelsRepository.findManyRecent();

    if (models.length === 0) {
      throw new NotFoundException('Models não encontrado');
    }

    const formattedModels = models.map(model => ({
      id: model.id,
      name: model.name,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    }));

    return {
      models: formattedModels,
    };
  }
}
