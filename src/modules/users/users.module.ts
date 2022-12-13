import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
