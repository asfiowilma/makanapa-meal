import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Query,
  Req
} from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger'
import { FoodService } from './food.service'
import { CATEGORY, FoodByCategory, FoodHistoryRequest, FoodHistoryResponse, Food } from './food.dto'
import { Request } from 'express'
import { INVALID_USER } from 'src/shared/constants'

@Controller()
export class FoodController {
  @Inject(FoodService)
  private readonly service: FoodService

  @Get('generate')
  @ApiQuery({
    name: 'filter',
    description: "Filter parameter, to be used with 'breakfast', 'lunch', or 'dinner'.",
    required: false
  })
  getRecommendation(@Query('filter') filter?: CATEGORY): Promise<FoodByCategory[]> {
    return this.service.generateFood(filter)
  }

  @Get('/food/:id')
  getFoodById(@Param('id') id: number): Promise<Food> {
    return this.service.getFoodById(id)
  }

  @Get('history')
  @ApiBearerAuth()
  async getFoodHistory(@Req() request: Request): Promise<FoodHistoryResponse[]> {
    const idUser = await this.service.verifyUser(request.headers.authorization)
    if (idUser === INVALID_USER) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)

    return this.service.getFoodHistory(idUser)
  }

  @ApiBody({
    type: FoodHistoryRequest,
    examples: {
      'Teriyaki Chicken Casserole': { value: { idMeal: 52772, serving: 1 } as FoodHistoryRequest }
    }
  })
  @Post('history')
  @ApiBearerAuth()
  async createFoodHistory(
    @Req() request: Request,
    @Body() history: FoodHistoryRequest
  ): Promise<FoodHistoryResponse> {
    const idUser = await this.service.verifyUser(request.headers.authorization)
    if (idUser === INVALID_USER) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)

    return this.service.createFoodHistory(history, idUser)
  }

  @Delete('history/:id')
  @ApiBearerAuth()
  async removeFoodHistory(@Req() request: Request, @Param('id') id: number) {
    const idUser = await this.service.verifyUser(request.headers.authorization)
    if (idUser === INVALID_USER) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)

    return this.service.removeFoodHistory(id, idUser)
  }
}
