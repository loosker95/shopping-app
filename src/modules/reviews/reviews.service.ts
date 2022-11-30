import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateReviewsDto } from "./dto/create-review.dto";
import { UpdateReviewsDto } from "./dto/update-review.dto";
import reviews from "./entity/review.entity";


@Injectable()
export class reviewsService {
    constructor(@InjectRepository(reviews)
    private readonly reviewsRepository: Repository<reviews>
    ) { }

    async addReview( reviewCreate: CreateReviewsDto){
        const newReviews = this.reviewsRepository.create(reviewCreate)
        await this.reviewsRepository.save(newReviews)
        return newReviews;
    }

    async getReviews() {
        const reviews = await this.reviewsRepository.find()
        if (Object.keys(reviews).length == 0) throw new NotFoundException("Reviews not found");
        return reviews;
    }

    async getSingleReview(id: string){
        const review = await this.reviewsRepository.findOne({where: {id: id}})
        if (!review) throw new NotFoundException("Review not found");
        return review;
    }

    async updateSingleReview(id: string, reviewUpdate: UpdateReviewsDto){ 
        await this.reviewsRepository.update(id, reviewUpdate)
        const getReview = await this.reviewsRepository.findOne({where: {id: id}})
        if (!getReview) throw new NotFoundException("Review not found");
        return getReview
    }

    async deleteSingleReview(id: string){
        const getReview = await this.reviewsRepository.findOne({where: {id: id}})
        if (!getReview) throw new NotFoundException("Review not found");
        const review = await this.reviewsRepository.remove(getReview)
        return review
    }
}