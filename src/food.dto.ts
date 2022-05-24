export class Food {
  id: number
  name: string
  calories: number
}

export class FoodHistory {
  date: Date
  serving: number
  food: Food
}

export class FoodHistoryRequest {
  foodId: number
  serving: number
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
