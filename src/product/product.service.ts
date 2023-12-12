import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';


@Injectable()
export class ProductService {


    constructor(

        @InjectRepository(Product)
        // Product라는 테이블의 데이터를 활용하겠다는 의미
        private productRepo : Repository<Product>


    ) {}


    async createProduct(product : CreateProductDto) {
        const newProduct = await this.productRepo.create(product)
        await this.productRepo.save(newProduct)
        return newProduct
    }

    async getProducts() {
        return await this.productRepo.find()
        
    }

    async getProductById(id:string) {

        const product : Product = await this.productRepo.findOneBy({id});
        if (product) return product 
        throw new HttpException("Product not found", HttpStatus.NOT_FOUND)
    }

    async deleteProductById(id:string) {
        const  deleteResponse = await this.productRepo.delete({id});
        console.log("sssssssssss", deleteResponse)
        if (!deleteResponse.affected) {
            throw new HttpException("product not found", HttpStatus.NOT_FOUND)
        }
        return "deleted"

    }

    async updateProductById(id:string, product : CreateProductDto) {

        await this.productRepo.update(id, product)

        const updatedProduct = await this.productRepo.findOneBy({id})

        if (updatedProduct) return updatedProduct 

        throw new HttpException("product not found", HttpStatus.NOT_FOUND)

    }


}
