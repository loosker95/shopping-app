import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import products from './entity/products.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';


@Module({
  imports: [TypeOrmModule.forFeature([products])],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
