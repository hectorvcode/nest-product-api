import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Query, Res } from '@nestjs/common';
import { CreateProductDto } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService){}

    @Post('/create')
    async createPost(@Res() res, @Body() createProductDto: CreateProductDto){
        const product = await this.productService.createProduct(createProductDto);
        return res.status(HttpStatus.OK).json({
            message: 'Succesfully Created',
            product: product
        })
    }

    @Get()
    async getProducts(@Res() res){
        const products = await this.productService.getProducts();
        return res.status(HttpStatus.OK).json({
            products
        })
    }

    @Get('/:productID')
    async getProduct(@Res() res, @Param('productID') productID){
        const product = await this.productService.getProduct(productID);
        if(!product){
            throw new NotFoundException('Product does not exist')
        }
        return res.status(HttpStatus.OK).json({
            product
        })
    }

    @Delete('delete')
    async deleteProduct(@Res() res, @Query('productID') productID){
        const productDeleted = await this.productService.deleteProduct(productID);
        if(!productDeleted) throw new NotFoundException('Product does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Product Deleted Succesfully',
            productDeleted
        })
    }

    @Put('/update')
    async updateProduct(@Res() res, @Body() createProductDto:CreateProductDto, @Query('productID') productID){
        const updatedProduct = await this.productService.updateProduct(productID, createProductDto);
        if(!updatedProduct) throw new NotFoundException('Product does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Product Updated Successfully',
            updatedProduct
        })
    }

}

/** 58:30
 * https://www.youtube.com/watch?v=jEKsD5f3Bqc
 */
