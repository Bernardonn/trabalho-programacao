import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelsRepository } from '../repository/models.repository';

interface EditModelServiceRequest {
  name: string;
  id: string;
}

@Injectable()
export class EditModelService {
  constructor(private modelsRepository: ModelsRepository) {}

  async execute({ name, id }: EditModelServiceRequest): Promise<void> {
    const model = await this.modelsRepository.findById(id);

    if (!model) {
      throw new NotFoundException('Model não encontrado');
    }

    await this.modelsRepository.update(id, { name });
  }
}
