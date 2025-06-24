import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelsRepository } from '../repository/models.repository';

export interface Model {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date | null;
}

interface GetModelByIdServiceRequest {
  id: string;
}

type GetModelByIdServiceResponse = {
  model: Model;
}

@Injectable()
export class GetModelByIdService {
  constructor(private modelsRepository: ModelsRepository) {}

  async execute({ id }: GetModelByIdServiceRequest): Promise<GetModelByIdServiceResponse> {
    const model = await this.modelsRepository.findById(id);

    if (!model) {
      throw new NotFoundException('Model não encontrado');
    }

    return {
      model: {
        id: model.id,
        name: model.name,
        createdAt: model.createdAt,
        updatedAt: model.updatedAt,
      },
    };
  }
}
