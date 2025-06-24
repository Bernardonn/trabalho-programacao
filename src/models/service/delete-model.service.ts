import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelsRepository } from '../repository/models.repository';

interface DeleteModelServiceRequest {
  id: string;
}

@Injectable()
export class DeleteModelService {
  constructor(private modelsRepository: ModelsRepository) {}

  async execute({ id }: DeleteModelServiceRequest): Promise<void> {
    const model = await this.modelsRepository.findById(id);

    if (!model) {
      throw new NotFoundException('Model não encontrado');
    }

    await this.modelsRepository.delete(id);
  }
}
