export class FoodResponse {
  idMeal: number
  strMeal: string
  strMealThumb: string
}

export class Food {
  idMeal: number
  name: string
  thumbnail: string
  calories: number
}

export class FoodHistoryRequest {
  idMeal: number
  serving: number
}

export class FoodHistoryResponse {
  id: number
  date: Date
  serving: number
  food: Food
}

export enum CATEGORY {
  BREAKFAST = 'breakfast',
  LUNCH = 'lunch',
  DINNER = 'dinner'
}

export class FoodByCategory {
  category: CATEGORY
  food: Food
}

export class User {
  id: number
}
