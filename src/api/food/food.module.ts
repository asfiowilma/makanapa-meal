import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FoodController } from './food.controller'
import { FoodHistory } from './food.entity'
import { FoodService } from './food.service'

@Module({
  imports: [TypeOrmModule.forFeature([FoodHistory])],
  controllers: [FoodController],
  providers: [FoodService]
})
export class FoodModule {}
