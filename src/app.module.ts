import { Module } from '@nestjs/common';
import { CreateProductController } from './product/controller/create-product.controller';
import { PrismaService } from './prisma.service';
import { CreateProductService } from './product/service/create-product.service';
import { ProductsRepository } from './products.repository';
import { CreateModelController } from './create-model.controller';
import { DeleteModelController } from './delete-model.controller';  
import { DeleteProductController } from './product/controller/delete-product.controller';
import { EditModelController } from './edit-model.controller';
import { EditProductController } from './product/controller/edit-product.controller';
import { FetchRecentModelsController } from './fetch-recent-models.controller';
import { FetchRecentProductsController } from './product/controller/fetch-recent-products.controller';
import { GetProductByIdController } from './product/controller/get-product-by-id.controller';
import { GetModelByIdController } from './get-model-by-id.controller';
import { UpdateAvailableProductController } from './update-available-product.controller';
import { CreateModelService } from './create-model.service';
import { DeleteModelService } from './delete-model.service';
import { DeleteProductService } from './product/service/delete-product.service';
import { EditModelService } from './edit-model.service';
import { EditProductService } from './product/service/edit-product.service';
import { FetchRecentModelsService } from './fetch-recent-models.service';
import { FetchRecentProductsService } from './product/service/fetch-recent-products.service';
import { GetProductByIdService } from './product/service/get-product-by-id.service';
import { GetModelByIdService } from './get-model-by-id.service';
import { UpdateAvailableProductService } from './update-available-product.service';
import { ModelsRepository } from './models.repository';

@Module({
  imports: [],
  controllers: [CreateProductController, CreateModelController, DeleteModelController, DeleteProductController, EditModelController, EditProductController, FetchRecentModelsController, FetchRecentProductsController, GetProductByIdController, GetModelByIdController, UpdateAvailableProductController],
  providers: [PrismaService, CreateProductService, CreateModelService, DeleteModelService, DeleteProductService, EditModelService, EditProductService, FetchRecentModelsService, FetchRecentProductsService, GetProductByIdService, GetModelByIdService, UpdateAvailableProductService, ProductsRepository, ModelsRepository],
})
export class AppModule {}
