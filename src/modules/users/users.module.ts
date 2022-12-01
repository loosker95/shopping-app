import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import users from './entity/users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.sevice';

@Module({
  imports: [
    TypeOrmModule.forFeature([users]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
