import { Module } from '@nestjs/common';
import { CreateProductController } from './products/controller/create-product.controller';
import { PrismaService } from './prisma.service';
import { CreateProductService } from './products/service/create-product.service';
import { ProductsRepository } from './products/repository/products.repository';
import { CreateModelController } from './models/controller/create-model.controller';
import { DeleteModelController } from './models/controller/delete-model.controller';  
import { DeleteProductController } from './products/controller/delete-product.controller';
import { EditModelController } from './models/controller/edit-model.controller';
import { EditProductController } from './products/controller/edit-product-by-id.controller';
import { FetchRecentModelsController } from './models/controller/fetch-recent-models.controller';
import { FetchRecentProductsController } from './products/controller/fetch-recent-products.controller';
import { GetProductByIdController } from './products/controller/get-product-by-id.controller';
import { GetModelByIdController } from './models/controller/get-model-by-id.controller';
import { UpdateAvailableProductController } from './update-available-product.controller';
import { CreateModelService } from './models/service/create-model.service';
import { DeleteModelService } from './models/service/delete-model.service';
import { DeleteProductService } from './products/service/delete-product.service';
import { EditModelService } from './models/service/edit-model.service';
import { EditProductService } from './products/service/edit-product.service';
import { FetchRecentModelsService } from './models/service/fetch-recent-models.service';
import { FetchRecentProductsService } from './products/service/fetch-recent-products.service';
import { GetProductByIdService } from './products/service/get-product-by-id.service';
import { GetModelByIdService } from './models/service/get-model-by-id.service';
import { UpdateAvailableProductService } from './update-available-product.service';
import { ModelsRepository } from './models/repository/models.repository';

@Module({
  imports: [],
  controllers: [CreateProductController, CreateModelController, DeleteModelController, DeleteProductController, EditModelController, EditProductController, FetchRecentModelsController, FetchRecentProductsController, GetProductByIdController, GetModelByIdController, UpdateAvailableProductController],
  providers: [PrismaService, CreateProductService, CreateModelService, DeleteModelService, DeleteProductService, EditModelService, EditProductService, FetchRecentModelsService, FetchRecentProductsService, GetProductByIdService, GetModelByIdService, UpdateAvailableProductService, ProductsRepository, ModelsRepository],
})
export class AppModule {}
