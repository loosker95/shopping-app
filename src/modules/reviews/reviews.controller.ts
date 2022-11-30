import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { returnResponse } from 'src/utils/helpers/returnResponse';
import { CreateReviewsDto } from './dto/create-review.dto';
import { UpdateReviewsDto } from './dto/update-review.dto';
import { reviewsService } from './reviews.service';



@Controller('api/v1/reviews')
export class ReviewsController {
    constructor(
        private readonly reviewsService: reviewsService
    ) { }

    @Post()
    async createreview(@Body() reviewCreate: CreateReviewsDto){
        try {
            const data = await this.reviewsService.addReview(reviewCreate)
            return returnResponse(HttpStatus.CREATED, "Review added successfully!", data)
        } catch (err) {
            return returnResponse(err.status, err.message);
        }
    }

    @Get()
    async getAllReviews() {
        const data = await this.reviewsService.getReviews()
        return returnResponse(HttpStatus.OK, "Get all reviews successfully", data)
    }

    @Get(':id')
    async getOneReview(@Param('id') id: string) {
        try {
            const data = await this.reviewsService.getSingleReview(id)
            return returnResponse(HttpStatus.OK, "Get review successfully!", data)
        } catch (err) {
            return returnResponse(err.status, err.message);
        }
    }

    @Patch(':id')
    @UsePipes(ValidationPipe)
    async updateOneReview(@Param('id') id: string, @Body() updateReview: UpdateReviewsDto){
        try{
            const data = await this.reviewsService.updateSingleReview(id, updateReview)
            return returnResponse(HttpStatus.OK, "Review updated successfully!", data)
        } catch (err) {
            return returnResponse(err.status, err.message);
        }
    }

    @Delete(':id')
    async deleteOneCoupon(@Param('id') id: string) {
        try {
            const data = await this.reviewsService.deleteSingleReview(id)
            return returnResponse(HttpStatus.ACCEPTED, "Review deleted successfully!", data)
        } catch (err) {
            return returnResponse(err.status, err.message);
        }
    }

}
