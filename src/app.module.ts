import { Module } from '@nestjs/common';
import { DatabaseModule } from './databases/database.module';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    ProductsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
