import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import reviews from "./entity/review.entity";
import { ReviewsController } from "./reviews.controller";
import { reviewsService } from "./reviews.service";



@Module({
    imports: [TypeOrmModule.forFeature([reviews])],
    controllers: [ReviewsController],
    providers: [reviewsService],
    exports: [reviewsService],
})

export class reviewsModule{}