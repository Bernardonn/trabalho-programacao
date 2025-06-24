import { Body, Controller, HttpCode, Param, Put } from "@nestjs/common";
import { z } from "zod";
import { ZodValidationPipe } from "../../pipes/zod-validation-pipe";
import { EditProductService } from "../service/edit-product.service";
import { Category } from "@prisma/client";

const categories = Object.values(Category) as [string, ...string[]];

const editProductBodySchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  price: z.number(),
  inStock: z.number(),
  isAvailable: z.boolean(),
  category: z.enum(categories),
  tags: z.array(z.string()),
});

const bodyValidationPipe = new ZodValidationPipe(editProductBodySchema);

type EditProductBodySchema = z.infer<typeof editProductBodySchema>;

@Controller('/products')
export class EditProductController {
  constructor(private readonly editProduct: EditProductService) {}

  @Put(':id')
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditProductBodySchema,
    @Param('id') id: string,
  ) {
    await this.editProduct.execute({ ...body, id });
  }
}
