import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CacheModule } from 'src/shared/cache/cache.module'
import { FoodController } from './food.controller'
import { FoodHistory } from './food.entity'
import { FoodService } from './food.service'

@Module({
  imports: [TypeOrmModule.forFeature([FoodHistory]), CacheModule],
  controllers: [FoodController],
  providers: [FoodService]
})
export class FoodModule {}
