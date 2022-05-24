import { Injectable } from '@nestjs/common'
import { CATEGORY, Food, FoodByCategory, FoodHistory, FoodHistoryRequest } from './food.dto'

@Injectable()
export class AppService {
  generateFood(filter?: CATEGORY): FoodByCategory[] {
    // TODO: dummy response
    const res: FoodByCategory[] = [
      {
        category: CATEGORY.BREAKFAST,
        food: {
          id: 12,
          name: 'avocado juice',
          calories: 102
        }
      },
      {
        category: CATEGORY.LUNCH,
        food: {
          id: 13,
          name: 'grilled chicken',
          calories: 102
        }
      },
      {
        category: CATEGORY.DINNER,
        food: {
          id: 14,
          name: 'fruit salad',
          calories: 102
        }
      }
    ]

    if (filter) {
      return res.filter((x) => x.category === filter)
    }
    return res
  }

  getFoodById(id: number): Food {
    return {
      id,
      name: 'Ayam Bakar',
      calories: 260
    }
  }

  getFoodHistory(): FoodHistory[] {
    return [
      {
        date: new Date(),
        serving: 400,
        food: {
          id: 12,
          name: 'avocado juice',
          calories: 102
        }
      },
      {
        date: new Date(),
        serving: 400,
        food: {
          id: 12,
          name: 'avocado juice',
          calories: 102
        }
      }
    ]
  }

  createFoodHistory(history: FoodHistoryRequest): FoodHistory {
    return {
      date: new Date(),
      serving: history.serving,
      food: {
        id: history.foodId,
        name: 'avocado juice',
        calories: 102
      }
    }
  }
}
