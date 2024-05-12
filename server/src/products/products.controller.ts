import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {ProductsService} from "./products.service";
import ProductDto from "../dto/product.dto";

@Controller('product')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {
  }

  @Get()
  async getProducts(
    @Query() query: {
      name?: string,
      category?: string,
      owner?: string,
      order?: 'asc' | 'desc',
      orderField?: string,
      limit?: number,
      offset?: number,
    }
  ) {
    return await this.productService.searchProduct(query);
  }

  @Get(":id")
  async getProduct(@Param('id') id: string) {
    return await this.productService.findOne(id);
  }

  @Post()
  async create(@Body() createProductDto: ProductDto) {
    console.log(createProductDto);
    return await this.productService.create(createProductDto)
  }

  @Put("/:id")
  async update(@Param('id') id: string, @Body() updateProductDto: ProductDto) {
    return await this.productService.update(id, updateProductDto);
  }

  @Put("/decrease/:id")
  async decreaseQuantity(@Param('id') id: string) {
    return await this.productService.decreaseQuantity(id);
  }

  @Delete(":id")
  async remove(@Param('id') id: string) {
    return await this.productService.remove(id);
  }

}
