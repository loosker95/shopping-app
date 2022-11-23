import { Module } from '@nestjs/common';
import { DatabaseModule } from './databases/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { CartsModule } from './modules/carts/carts.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { CouponsModule } from './modules/coupons/coupons.module';
import { OrdersModule } from './modules/orders/orders.module';
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
    PaymentsModule,
    OrdersModule,
    CouponsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
