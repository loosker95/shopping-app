import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { categoriesDto } from "./dto/category.dto";
import { updateCategoryDto } from "./dto/update-category.dto";
import categories from "./entity/categories.entity";


@Injectable()
export class categoriesServives {
    constructor(@InjectRepository(categories)
    private readonly categoriesRepository: Repository<categories>
    ) { }

    async addCategory(categoryCreate: categoriesDto) {
        const newCategory = this.categoriesRepository.create(categoryCreate)
        await this.categoriesRepository.save(newCategory)
        return newCategory
    }

    async getCategories() {
        const category = await this.categoriesRepository.find()
        if (Object.keys(category).length == 0) throw new NotFoundException("Category not found");
        return category
    }

    async getSingleCategory(id: string) {
        const category = await this.categoriesRepository.findOne({ where: { id: id } })
        if (!category) throw new NotFoundException("Category not found");
        return category
    }

    async updateSingleCategory(id: string, categoryUpdate: updateCategoryDto) {
        await this.categoriesRepository.update(id, categoryUpdate)
        const getCategory = await this.categoriesRepository.findOne({ where: { id: id } })
        if (!getCategory) throw new NotFoundException("Category not found");
        return getCategory
    }

    async deleSinglCategory(id: string) {
        const getCategory = await this.categoriesRepository.findOne({ where: { id: id } })
        if (!getCategory) throw new NotFoundException("Category not found");
        const category = await this.categoriesRepository.remove(getCategory)
        return category
    }

}