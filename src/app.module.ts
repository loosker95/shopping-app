import { Module } from '@nestjs/common';
import { DatabaseModule } from './databases/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { CartsModule } from './modules/carts/carts.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';



@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    ProductsModule,
    CategoriesModule,
    CartsModule,
    AuthModule,
    PaymentsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
