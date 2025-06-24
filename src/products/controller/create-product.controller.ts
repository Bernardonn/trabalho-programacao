import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { ZodValidationPipe } from "../../pipes/zod-validation-pipe";
import { z } from "zod";
import { CreateProductService } from "../service/create-product.service";
import { Category } from "@prisma/client";

const categories = Object.values(Category) as [string, ...string[]];

const createProductBodySchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  price: z.number(),
  inStock: z.number(),
  isAvailable: z.boolean(),
  category: z.enum(categories),
  tags: z.array(z.string()),
  modelId: z.string().uuid().optional(),
});

const bodyValidationPipe = new ZodValidationPipe(createProductBodySchema);

type CreateProductBody = z.infer<typeof createProductBodySchema>;

@Controller('/products')
export class CreateProductController {
  constructor(private readonly createProductService: CreateProductService) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(bodyValidationPipe) body: CreateProductBody) {
    const {
      name,
      description,
      price,
      inStock,
      isAvailable,
      category,
      tags,
      modelId,
    } = body;

    await this.createProductService.execute({
      name,
      description,
      price,
      inStock,
      isAvailable,
      category,
      tags,
      modelId,
    });

    return { message: 'Product created successfully.' };
  }
}
