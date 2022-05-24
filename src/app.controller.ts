import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { ApiBody, ApiQuery } from '@nestjs/swagger'
import { AppService } from './app.service'
import { CATEGORY, Food, FoodByCategory, FoodHistory, FoodHistoryRequest } from './food.dto'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('generate')
  @ApiQuery({
    name: 'filter',
    description: "Filter parameter, to be used with 'breakfast', 'lunch', or 'dinner'.",
    required: false
  })
  getRecommendation(@Query('filter') filter?: CATEGORY): FoodByCategory[] {
    console.log(
      '🚀 ~ file: app.controller.ts ~ line 11 ~ AppController ~ getRecommendation ~ filter',
      filter
    )
    return this.appService.generateFood(filter)
  }

  @Get('/food/:id')
  getFoodById(@Param('id') id: number): Food {
    console.log('🚀 ~ file: app.controller.ts ~ line 15 ~ AppController ~ getFoodById ~ id', id)
    return this.appService.getFoodById(id)
  }

  @Get('history')
  getFoodHistory(): FoodHistory[] {
    return this.appService.getFoodHistory()
  }

  @ApiBody({
    type: FoodHistoryRequest,
    examples: { a: { value: { foodId: 12, serving: 400 } as FoodHistoryRequest } }
  })
  @Post('history')
  createFoodHistory(@Body() history: FoodHistoryRequest): FoodHistory {
    console.log(
      '🚀 ~ file: app.controller.ts ~ line 28 ~ AppController ~ createFoodHistory ~ history',
      history
    )
    return this.appService.createFoodHistory(history)
  }
}
