import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriesController } from "./categories.controller";
import { categoriesServives } from "./categories.service";
import categories from "./entity/categories.entity";


@Module({
    imports: [TypeOrmModule.forFeature([categories])],
    controllers: [CategoriesController],
    providers: [categoriesServives],
    exports: [categoriesServives],
})

export class CategoriesModule{ }