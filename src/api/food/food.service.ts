import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { FoodHistory } from './food.entity'
import {
  CATEGORY,
  Food,
  FoodByCategory,
  FoodHistoryRequest,
  FoodHistoryResponse,
  FoodResponse,
  User
} from './food.dto'
import axios from 'axios'
import { AUTH_SERVICE_URL } from 'src/shared/constants'

@Injectable()
export class FoodService {
  @InjectRepository(FoodHistory)
  private historyRepository: Repository<FoodHistory>

  async generateFood(filter?: CATEGORY): Promise<FoodByCategory[]> {
    const category = [CATEGORY.BREAKFAST, CATEGORY.LUNCH, CATEGORY.DINNER]
    const res: FoodByCategory[] = []

    await axios.all([this.grabRandomMeal(), this.grabRandomMeal(), this.grabRandomMeal()]).then(
      axios.spread((...responses) => {
        for (let i = 0; i < responses.length; i++) {
          const {
            data: { meals }
          } = responses[i]
          const { idMeal, strMealThumb, strMeal } = meals.pop()
          res[i] = {
            category: category[i],
            food: {
              idMeal: idMeal,
              name: strMeal,
              thumbnail: strMealThumb,
              calories: Math.round(Math.random() * 300)
            }
          }
        }
      })
    )

    if (filter) {
      return res.filter((x) => x.category === filter)
    }
    return res
  }

  async getFoodById(id: number): Promise<Food> {
    const { idMeal, strMealThumb, strMeal } = await this.grabMealById(id)
    return {
      idMeal: idMeal,
      name: strMeal,
      thumbnail: strMealThumb,
      calories: Math.round(Math.random() * 300)
    }
  }

  async getFoodHistory(idUser: number): Promise<FoodHistoryResponse[]> {
    const histories = await this.historyRepository.find({ where: { idUser } })
    return Promise.all(
      histories.map(async (history) => {
        const { idMeal, strMealThumb, strMeal } = await this.grabMealById(history.idMeal)
        return {
          ...history,
          food: {
            idMeal: idMeal,
            name: strMeal,
            thumbnail: strMealThumb,
            calories: Math.round(Math.random() * 300)
          }
        }
      })
    )
  }

  async createFoodHistory(
    history: FoodHistoryRequest,
    idUser: number
  ): Promise<FoodHistoryResponse> {
    const { idMeal, strMealThumb, strMeal } = await this.grabMealById(history.idMeal)
    const history_ = new FoodHistory()
    history_.idMeal = history.idMeal
    history_.serving = history.serving
    history_.idUser = idUser
    this.historyRepository.save(history_)

    return {
      ...history_,
      food: {
        idMeal,
        name: strMeal,
        thumbnail: strMealThumb,
        calories: Math.round(Math.random() * 300)
      }
    }
  }

  async removeFoodHistory(id: number, idUser: number) {
    const history = await this.historyRepository.findOne({ where: { id } })
    if (!history) throw new HttpException("Record doesn't exist", HttpStatus.NOT_FOUND)
    else if (history.idUser === idUser) return this.historyRepository.delete(id)
    throw new HttpException('Record belogs to someone else', HttpStatus.FORBIDDEN)
  }

  grabRandomMeal() {
    return axios.get<{ meals: FoodResponse[] }>(
      'https://www.themealdb.com/api/json/v1/1/random.php'
    )
  }

  async grabMealById(id: number): Promise<FoodResponse> {
    const mealResponse = await axios.get<{ meals: FoodResponse[] }>(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    )
    const { meals } = mealResponse.data
    return meals.pop()
  }

  async verifyUser(token: string): Promise<number> {
    const { data: user } = await axios.get<User>(`${AUTH_SERVICE_URL}/pengguna/detail`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return user.id
  }
}
